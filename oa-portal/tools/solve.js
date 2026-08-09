'use strict';
/**
 * CLI runner - practise immediately, no server needed.
 *
 *   node tools/solve.js              list all problems + your status
 *   node tools/solve.js m1           print the statement
 *   node tools/solve.js m1 run       compile + run against SAMPLE tests
 *   node tools/solve.js m1 submit    compile + run against ALL tests
 *
 * Your code lives in  workspace/<id>_<docId>.cpp  - open that in VS Code.
 */
const fs = require('node:fs');
const path = require('node:path');
const { judge } = require('../server/judge');

const ROOT = path.resolve(__dirname, '..');
const PROBLEMS = path.join(ROOT, 'problems');
const WORKSPACE = path.join(ROOT, 'workspace');
fs.mkdirSync(WORKSPACE, { recursive: true });

const C = {
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
};

const VERDICT_COLOR = {
  AC: C.green, WA: C.red, TLE: C.yellow, RE: C.red, CE: C.red, OLE: C.yellow, IE: C.red,
};

function loadProblems() {
  return fs.readdirSync(PROBLEMS)
    .filter((d) => fs.existsSync(path.join(PROBLEMS, d, 'problem.json')))
    .map((d) => {
      const m = JSON.parse(fs.readFileSync(path.join(PROBLEMS, d, 'problem.json'), 'utf8'));
      m.dir = path.join(PROBLEMS, d);
      return m;
    })
    .sort((a, b) => a.order - b.order);
}

const STARTER = `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // your code here

    return 0;
}
`;

function fileFor(p) {
  const f = path.join(WORKSPACE, `${p.id}_${p.docId.toLowerCase()}.cpp`);
  if (!fs.existsSync(f)) {
    const banner =
      `// ${p.docId} / ${p.id}  -  ${p.title}\n` +
      `// ${p.difficulty}   time limit ${p.timeLimitMs} ms\n` +
      `// statement: node tools/solve.js ${p.id}\n\n`;
    fs.writeFileSync(f, banner + STARTER, 'utf8');
  }
  return f;
}

async function main() {
  const problems = loadProblems();
  const [id, action] = process.argv.slice(2);

  // ---- list ----------------------------------------------------------
  if (!id) {
    console.log('\n  ' + C.bold('MODELLED PROBLEMS') + C.dim('   (platform problems live on their own sites)') + '\n');
    for (const p of problems) {
      const f = path.join(WORKSPACE, `${p.id}_${p.docId.toLowerCase()}.cpp`);
      const started = fs.existsSync(f) && fs.readFileSync(f, 'utf8').includes('your code here') === false;
      const nTests = fs.existsSync(path.join(p.dir, 'tests'))
        ? fs.readdirSync(path.join(p.dir, 'tests')).filter((x) => x.endsWith('.in')).length : 0;
      console.log(
        `  ${C.cyan(p.id.padEnd(4))} ${C.dim(p.docId.padEnd(5))} ${p.title.padEnd(28)}` +
        `${p.difficulty.padEnd(8)} ${C.dim(String(nTests) + ' tests')}  ${started ? C.green('started') : C.dim('-')}`
      );
    }
    console.log('\n  ' + C.dim('node tools/solve.js m1          read the statement'));
    console.log('  ' + C.dim('node tools/solve.js m1 run      test against samples'));
    console.log('  ' + C.dim('node tools/solve.js m1 submit   test against everything') + '\n');
    return;
  }

  const p = problems.find((x) => x.id === id || x.docId.toLowerCase() === id.toLowerCase());
  if (!p) { console.log(`\n  no problem "${id}"\n`); process.exitCode = 1; return; }

  // ---- statement ------------------------------------------------------
  if (!action) {
    console.log('\n' + fs.readFileSync(path.join(p.dir, 'statement.md'), 'utf8'));
    console.log(C.dim(`  your file: workspace/${path.basename(fileFor(p))}`));
    console.log(C.dim(`  then:      node tools/solve.js ${p.id} run\n`));
    return;
  }

  // ---- judge ----------------------------------------------------------
  const mode = action === 'submit' ? 'submit' : 'run';
  const f = fileFor(p);

  console.log(`\n  ${C.bold(p.docId + ' / ' + p.id)}  ${p.title}`);
  console.log(`  ${C.dim(mode === 'submit' ? 'SUBMIT - all tests' : 'RUN - sample tests only')}   ${C.dim('TL ' + p.timeLimitMs + ' ms')}\n`);

  const r = await judge({
    sourcePath: f, lang: 'cpp', problemDir: p.dir,
    timeLimitMs: p.timeLimitMs, mode, displayName: path.basename(f),
  });

  if (r.verdict === 'CE') {
    console.log('  ' + C.red('COMPILE ERROR') + '\n');
    for (const d of r.diagnostics || []) {
      const where = `${path.basename(f)}:${d.line}` + (d.column ? ':' + d.column : '');
      console.log(`  ${C.cyan(where)}  ${d.severity === 'error' ? C.red(d.severity) : C.yellow(d.severity)}: ${d.message}`);
      if (d.snippet) console.log('      ' + C.dim(d.snippet.trim()));
    }
    if (!(r.diagnostics || []).length) console.log(r.compileError);
    console.log('');
    process.exitCode = 1;
    return;
  }

  for (const t of r.tests) {
    const col = VERDICT_COLOR[t.verdict] || ((s) => s);
    console.log(`  ${col(t.verdict.padEnd(4))} test ${String(t.index).padStart(2)}  ${C.dim(t.name.padEnd(26))} ${String(t.timeMs).padStart(5)} ms`);
    if (t.verdict !== 'AC') {
      if (t.message) console.log('        ' + C.dim(t.message.split('\n')[0]));
      if (t.visible) {
        const cut = (s) => (s || '').trim().slice(0, 200);
        console.log('        ' + C.dim('input:    ') + cut(t.input).replace(/\n/g, ' | '));
        console.log('        ' + C.dim('expected: ') + cut(t.expected));
        console.log('        ' + C.dim('yours:    ') + cut(t.stdout));
      }
    }
  }

  const col = VERDICT_COLOR[r.verdict] || ((s) => s);
  console.log(`\n  ${col(C.bold(r.verdict))}   ${r.passed}/${r.total} tests passed   max ${r.maxTimeMs} ms\n`);
  if (r.verdict !== 'AC') process.exitCode = 1;
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
