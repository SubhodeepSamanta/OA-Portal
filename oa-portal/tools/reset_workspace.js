'use strict';
/**
 * Reset workspace files back to starter code.
 *
 *   node tools/reset_workspace.js          reset every problem
 *   node tools/reset_workspace.js m1 m4    reset only these
 *
 * Existing work is backed up to workspace/.backup/ before being replaced,
 * so this can never silently destroy something you wrote.
 */
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const PROBLEMS = path.join(ROOT, 'problems');
const WS = path.join(ROOT, 'workspace');
const BACKUP = path.join(WS, '.backup');

const STARTER = `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // your code here

    return 0;
}
`;

const only = process.argv.slice(2);
fs.mkdirSync(WS, { recursive: true });

const metas = fs.readdirSync(PROBLEMS)
  .filter((d) => fs.existsSync(path.join(PROBLEMS, d, 'problem.json')))
  .map((d) => {
    const m = JSON.parse(fs.readFileSync(path.join(PROBLEMS, d, 'problem.json'), 'utf8'));
    m.dir = path.join(PROBLEMS, d);
    return m;
  })
  .filter((m) => !only.length || only.includes(m.id))
  .sort((a, b) => a.order - b.order);

/** Just the code - no banner. Title and limits live in the statement. */
function freshFor(m, lang) {
  const file = path.join(m.dir, 'starters', lang === 'java' ? 'main.java' : 'main.cpp');
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : STARTER;
}

let restored = 0, backedUp = 0;

for (const m of metas) {
  for (const lang of ['cpp', 'java']) {
    const f = path.join(WS, `${m.id}_${m.docId.toLowerCase()}.${lang}`);
    if (!fs.existsSync(f) && lang === 'java') continue;   // only reset java if it exists
    const fresh = freshFor(m, lang);

    if (fs.existsSync(f)) {
      const cur = fs.readFileSync(f, 'utf8');
      if (cur === fresh) { console.log(`  ${m.id} ${lang}  already starter`); continue; }
      fs.mkdirSync(BACKUP, { recursive: true });
      const stamp = new Date().toISOString().replace(/[:.]/g, '-');
      fs.writeFileSync(path.join(BACKUP, `${m.id}_${stamp}.${lang}`), cur, 'utf8');
      backedUp++;
    }

    fs.writeFileSync(f, fresh, 'utf8');
    restored++;
    console.log(`  ${m.id} ${lang}  reset to starter`);
  }
}

console.log('');
console.log(`  ${restored} file(s) reset, ${backedUp} backed up to workspace/.backup/`);
