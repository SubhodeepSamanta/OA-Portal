'use strict';
/**
 * Does each statement show the samples the judge actually uses?
 *
 *   node tools/check_statements.js
 *
 * build_tests.js checks the REFERENCE against SAMPLE_EXPECT, and writes the
 * sample files from SAMPLES. Nothing checked that the fenced blocks a student
 * reads in statement.md say the same thing. A mistyped character in a 32-long
 * binary address, or a stale expected answer left behind after an edit, would
 * sail straight through - and the student would be debugging correct code
 * against a statement that lied to them.
 *
 * So: parse the "## Sample N" blocks out of every statement and compare them
 * token-by-token with samples/NN.in and samples/NN.out.
 */
const fs = require('node:fs');
const path = require('node:path');

const PROBLEMS = path.resolve(__dirname, '..', 'problems');
const norm = (s) => s.trim().split(/\s+/).filter(Boolean).join(' ');

/** Pull the Input/Output fenced blocks out of each "## Sample n" section. */
function parseSamples(md) {
  const out = [];
  // split on sample headings, keeping what follows each one
  const parts = md.split(/^##\s+Sample\b[^\n]*$/m).slice(1);
  for (const part of parts) {
    // stop at the next top-level heading so we never read the following section
    const body = part.split(/^##\s+/m)[0];
    const inM = body.match(/\*\*Input\*\*\s*\n+```[a-z]*\n([\s\S]*?)```/);
    const outM = body.match(/\*\*Output\*\*\s*\n+```[a-z]*\n([\s\S]*?)```/);
    out.push({ input: inM ? inM[1] : null, output: outM ? outM[1] : null });
  }
  return out;
}

let problems = 0, checked = 0, bad = 0;
const failures = [];

for (const dir of fs.readdirSync(PROBLEMS)) {
  const base = path.join(PROBLEMS, dir);
  const pj = path.join(base, 'problem.json');
  const sm = path.join(base, 'statement.md');
  if (!fs.existsSync(pj) || !fs.existsSync(sm)) continue;

  const meta = JSON.parse(fs.readFileSync(pj, 'utf8'));
  const samples = parseSamples(fs.readFileSync(sm, 'utf8'));
  const sDir = path.join(base, 'samples');
  const files = fs.existsSync(sDir)
    ? fs.readdirSync(sDir).filter((f) => f.endsWith('.in')).sort()
    : [];
  problems++;

  if (samples.length !== files.length) {
    bad++;
    failures.push(`${meta.id} (${meta.docId}): statement shows ${samples.length} sample(s), ` +
                  `${files.length} sample file(s) on disk`);
    continue;
  }

  samples.forEach((s, i) => {
    const stem = files[i].replace(/\.in$/, '');
    const realIn = fs.readFileSync(path.join(sDir, stem + '.in'), 'utf8');
    const realOut = fs.readFileSync(path.join(sDir, stem + '.out'), 'utf8');
    checked++;

    if (s.input === null || s.output === null) {
      bad++;
      failures.push(`${meta.id} (${meta.docId}) sample ${i + 1}: could not find an ` +
                    `**Input**/**Output** fenced block`);
      return;
    }
    if (norm(s.input) !== norm(realIn)) {
      bad++;
      failures.push(`${meta.id} (${meta.docId}) sample ${i + 1} INPUT differs\n` +
                    `      statement: ${norm(s.input).slice(0, 90)}\n` +
                    `      test file: ${norm(realIn).slice(0, 90)}`);
      return;
    }
    if (norm(s.output) !== norm(realOut)) {
      bad++;
      failures.push(`${meta.id} (${meta.docId}) sample ${i + 1} OUTPUT differs\n` +
                    `      statement: ${norm(s.output).slice(0, 90)}\n` +
                    `      judge says: ${norm(realOut).slice(0, 90)}`);
    }
  });
}

console.log('');
console.log(`  statements checked : ${problems}`);
console.log(`  sample blocks      : ${checked}`);
console.log('');
if (failures.length) {
  for (const f of failures) console.log('  ' + f);
  console.log('');
  console.log(`  ${bad} STATEMENT SAMPLE(S) DO NOT MATCH THE JUDGE\n`);
  process.exitCode = 1;
} else {
  console.log(`  ALL ${checked} STATEMENT SAMPLES MATCH THE JUDGE\n`);
}
