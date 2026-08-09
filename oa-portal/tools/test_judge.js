'use strict';
/**
 * Judge self-test. Proves every verdict path fires correctly.
 *
 *   AC  - the reference solution
 *   WA  - a solution that is subtly wrong
 *   TLE - the O(n^2) brute force against max-size tests
 *   CE  - a syntax error, reported with line + column
 *   RE  - a program that crashes at runtime
 *
 * Usage: node tools/test_judge.js
 */
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { judge } = require('../server/judge');

const ROOT = path.resolve(__dirname, '..');
const PDIR = path.join(ROOT, 'problems', 'm1-refund-reconciliation');
const TMP = path.join(os.tmpdir(), 'oa-portal-selftest');
fs.mkdirSync(TMP, { recursive: true });

const write = (name, code) => {
  const f = path.join(TMP, name);
  fs.writeFileSync(f, code, 'utf8');
  return f;
};

// --- the five submissions -------------------------------------------------

const SRC_AC = fs.readFileSync(path.join(PDIR, 'solutions', 'ref.cpp'), 'utf8');
const SRC_TLE = fs.readFileSync(path.join(PDIR, 'solutions', 'brute.cpp'), 'utf8');

// Wrong: uses a SET instead of a frequency map, so repeated prefixes undercount.
const SRC_WA = `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n; long long k;
    if(!(cin>>n>>k)) return 0;
    set<long long> seen;      // BUG: should count occurrences, not just membership
    seen.insert(0);
    long long pref=0, ans=0;
    for(int i=0;i<n;i++){ long long v; cin>>v; pref+=v;
        if(seen.count(pref-k)) ans++;
        seen.insert(pref); }
    cout<<ans<<'\\n';
}
`;

// Compile error on line 5: missing semicolon.
const SRC_CE = `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n; long long k;
    cin >> n >> k
    cout << 0 << endl;
    return 0;
}
`;

// Runtime error: divide by zero / bad access.
const SRC_RE = `#include <bits/stdc++.h>
using namespace std;
int main(){
    int n; long long k;
    cin>>n>>k;
    vector<int> v(1);
    v.at(999999) = 5;        // throws std::out_of_range -> nonzero exit
    cout<<0<<'\\n';
}
`;

const CASES = [
  { label: 'reference solution', file: 'ac.cpp', src: SRC_AC, mode: 'submit', expect: 'AC' },
  { label: 'set instead of freq map', file: 'wa.cpp', src: SRC_WA, mode: 'submit', expect: 'WA' },
  { label: 'O(n^2) brute force', file: 'tle.cpp', src: SRC_TLE, mode: 'submit', expect: 'TLE' },
  { label: 'missing semicolon', file: 'ce.cpp', src: SRC_CE, mode: 'run', expect: 'CE' },
  { label: 'out_of_range throw', file: 're.cpp', src: SRC_RE, mode: 'run', expect: 'RE' },
];

(async () => {
  console.log('\nJudge self-test on m1 (Refund Reconciliation), TL 2000 ms\n');
  console.log('  ' + 'submission'.padEnd(26) + 'expect  got     detail');
  console.log('  ' + '-'.repeat(76));

  let fails = 0;

  for (const c of CASES) {
    const f = write(c.file, c.src);
    const r = await judge({
      sourcePath: f,
      lang: 'cpp',
      problemDir: PDIR,
      timeLimitMs: 2000,
      mode: c.mode,
      displayName: c.file,
    });

    const ok = r.verdict === c.expect;
    if (!ok) fails++;

    let detail = '';
    if (r.verdict === 'CE') {
      const d = (r.diagnostics || [])[0];
      detail = d ? `line ${d.line}${d.column ? ':' + d.column : ''} - ${d.message.slice(0, 44)}` : '(no diagnostics)';
    } else if (r.verdict === 'AC') {
      detail = `${r.passed}/${r.total} tests, max ${r.maxTimeMs} ms`;
    } else {
      const bad = (r.tests || []).find((t) => t.verdict !== 'AC');
      detail = bad ? `test ${bad.index} (${bad.name}) ${bad.timeMs} ms` : '';
      if (bad && bad.message) detail += ' - ' + bad.message.split('\n')[0].slice(0, 40);
    }

    console.log(
      '  ' + (ok ? 'PASS ' : 'FAIL ') + c.label.padEnd(21) +
      c.expect.padEnd(8) + r.verdict.padEnd(8) + detail
    );
  }

  console.log('');
  if (fails === 0) console.log('  ALL VERDICT PATHS CORRECT\n');
  else { console.log(`  ${fails} VERDICT PATH(S) WRONG\n`); process.exitCode = 1; }
})();
