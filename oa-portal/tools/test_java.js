'use strict';
/**
 * Java support check: AC on a correct solution, plus CE with a line number.
 * Uses the isolated _selftest account and restores the workspace.
 */
const fs = require('node:fs');
const path = require('node:path');

const BASE = process.env.BASE || 'http://localhost:4321';
const WS = path.join(__dirname, '..', 'workspace');

let token = null;
async function call(p, opts = {}) {
  const r = await fetch(BASE + p, {
    ...opts,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: 'Bearer ' + token } : {}) },
  });
  return { status: r.status, body: await r.json().catch(() => ({})) };
}

// m1 Refund Reconciliation in Java: prefix sums + HashMap of frequencies.
const AC = `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        DataInputStream in = new DataInputStream(new BufferedInputStream(System.in, 1 << 16));
        int n = (int) readLong(in);
        long k = readLong(in);
        HashMap<Long, Integer> freq = new HashMap<>();
        freq.put(0L, 1);
        long pref = 0, ans = 0;
        for (int i = 0; i < n; i++) {
            pref += readLong(in);
            Integer c = freq.get(pref - k);
            if (c != null) ans += c;
            freq.merge(pref, 1, Integer::sum);
        }
        System.out.println(ans);
    }
    private static long readLong(DataInputStream in) throws IOException {
        long ret = 0; int b = in.read();
        while (b < '0' && b != '-') b = in.read();
        boolean neg = b == '-';
        if (neg) b = in.read();
        while (b >= '0') { ret = ret * 10 + (b - '0'); b = in.read(); }
        return neg ? -ret : ret;
    }
}
`;

// Missing semicolon on line 6.
const CE = `import java.util.*;

public class Main {
    public static void main(String[] args) {
        int x = 5
        System.out.println(x);
    }
}
`;

// Compiles, wrong logic (counts distinct prefixes, not occurrences).
const WA = `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); long k = sc.nextLong();
        HashSet<Long> seen = new HashSet<>();
        seen.add(0L);
        long pref = 0, ans = 0;
        for (int i = 0; i < n; i++) { pref += sc.nextLong();
            if (seen.contains(pref - k)) ans++;
            seen.add(pref); }
        System.out.println(ans);
    }
}
`;

(async () => {
  console.log('\nJava support check\n');
  const results = [];
  const check = (n, ok, d = '') => { results.push(ok); console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${n.padEnd(38)} ${d}`); };

  let r = await call('/api/login', { method: 'POST', body: JSON.stringify({ username: '_selftest', password: 'selftest' }) });
  if (r.status !== 200) { console.log('  server not running\n'); process.exit(1); }
  token = r.body.token;

  // snapshot so we leave nothing behind
  const snap = {};
  for (const f of fs.existsSync(WS) ? fs.readdirSync(WS) : []) {
    const p = path.join(WS, f);
    if (fs.statSync(p).isFile()) snap[p] = fs.readFileSync(p, 'utf8');
  }

  r = await call('/api/code/m1?lang=java');
  check('java starter file created', r.status === 200 && r.body.code.includes('public class Main'), r.body.file);

  r = await call('/api/judge/m1', { method: 'POST', body: JSON.stringify({ mode: 'submit', lang: 'java', code: AC }) });
  check('correct Java -> AC', r.body.verdict === 'AC',
        `${r.body.passed}/${r.body.total}, max ${r.body.maxTimeMs} ms, TL ${r.body.timeLimitMs} ms`);

  r = await call('/api/judge/m1', { method: 'POST', body: JSON.stringify({ mode: 'run', lang: 'java', code: CE }) });
  const d = (r.body.diagnostics || [])[0];
  check('Java compile error -> line no.', r.body.verdict === 'CE' && d && d.line === 5,
        d ? `line ${d.line} - ${d.message.slice(0, 34)}` : 'no diagnostics');

  r = await call('/api/judge/m1', { method: 'POST', body: JSON.stringify({ mode: 'submit', lang: 'java', code: WA }) });
  check('wrong Java -> rejected', r.body.verdict !== 'AC', r.body.verdict);

  r = await call('/api/judge/m1', { method: 'POST', body: JSON.stringify({ mode: 'run', lang: 'java', code: 'package foo;\npublic class Main { public static void main(String[] a){} }' }) });
  check('package declaration explained', r.body.verdict === 'CE' && /package/i.test(r.body.compileError || ''));

  for (const [p, c] of Object.entries(snap)) fs.writeFileSync(p, c, 'utf8');
  for (const f of fs.readdirSync(WS)) {
    const p = path.join(WS, f);
    if (fs.statSync(p).isFile() && !snap[p]) fs.unlinkSync(p);   // remove files we created
  }

  const bad = results.filter((x) => !x).length;
  console.log('');
  console.log(bad === 0 ? `  ALL ${results.length} JAVA CHECKS PASSED\n` : `  ${bad} FAILED\n`);
  if (bad) process.exitCode = 1;
})().catch((e) => { console.error(e); process.exitCode = 1; });
