'use strict';
/**
 * Judge: compile, run against tests with a wall-clock limit, compare tokens.
 * Zero external dependencies.
 *
 * Verdicts: AC | WA | TLE | RE | CE | OLE | IE
 */
const { spawn, spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { compileCpp, compileJava } = require('./compile');

const OUTPUT_CAP_BYTES = 64 * 1024 * 1024; // 64 MB -> OLE

/**
 * Supported languages. `tlFactor` scales the problem's time limit: the JVM
 * costs ~100-250 ms just to start, which would unfairly TLE correct Java on
 * tight limits. Scaling the limit is standard judge practice.
 */
const LANGS = {
  cpp: { ext: '.cpp', label: 'C++', tlFactor: 1 },
  java: { ext: '.java', label: 'Java', tlFactor: 3 },
};

function tmpDir() {
  const d = path.join(os.tmpdir(), 'oa-portal', 'build-' + process.pid + '-' + Date.now());
  fs.mkdirSync(d, { recursive: true });
  return d;
}

/**
 * Compile and return how to run the result.
 * @returns {{ok, cmd?, args?, error?, diagnostics?, dir?}}
 */
function compile(sourcePath, lang, displayName) {
  const cfg = LANGS[lang];
  if (!cfg) return { ok: false, error: 'Unsupported language: ' + lang, diagnostics: [] };

  const dir = tmpDir();
  const name = displayName || path.basename(sourcePath);

  if (lang === 'java') {
    const r = compileJava(sourcePath, dir, name);
    if (!r.ok) return { ok: false, error: r.stderr, diagnostics: r.diagnostics || [], dir };
    return {
      ok: true, dir,
      cmd: 'java',
      args: ['-XX:+UseSerialGC', '-Xss64m', '-Xmx512m', '-cp', dir, r.className],
    };
  }

  const exe = path.join(dir, 'sol' + (os.platform() === 'win32' ? '.exe' : ''));
  const r = compileCpp(sourcePath, exe, name);
  if (!r.ok) return { ok: false, error: r.stderr, diagnostics: r.diagnostics || [], dir };
  return { ok: true, dir, cmd: exe, args: [], standard: r.standard };
}

const asBig = (s) => (/^-?\d+$/.test(s) ? BigInt(s) : null);

/**
 * Name the failure when the numbers say what went wrong.
 *
 * Wrong-by-overflow is the single most common way a correct algorithm fails
 * here, and it is invisible in a bare "yours X, expected Y" when both are big.
 * If your value is exactly the expected one wrapped to 32 bits, that is not a
 * logic bug and you should not go hunting for one.
 */
function numericHint(gotStr, wantStr) {
  const g = asBig(gotStr), w = asBig(wantStr);
  if (g === null || w === null || g === w) return '';

  if (BigInt.asIntN(32, w) === g) {
    return ' — that is exactly the right answer wrapped to a signed 32-bit int. ' +
           'Something in the chain is an int where it needs to be a 64-bit type.';
  }
  if (BigInt.asUintN(32, w) === g) {
    return ' — that is exactly the right answer wrapped to an unsigned 32-bit int. Use a 64-bit type.';
  }
  if ((g - w) % (1n << 32n) === 0n) {
    return ' — your value differs from the right one by a multiple of 2^32, which is 32-bit overflow.';
  }
  if ((g - w) % (1n << 64n) === 0n) {
    return ' — your value differs from the right one by a multiple of 2^64, which is 64-bit overflow.';
  }
  if (g === -w) return ' — same magnitude, opposite sign.';
  return '';
}

/** Every value identical while the expected output varies = untouched stub. */
function stubHint(a, b) {
  if (a.length < 2) return '';
  const mine = new Set(a);
  if (mine.size === 1 && new Set(b).size > 1) {
    return ` — every value you printed is "${a[0]}", so the starter stub is probably still returning its placeholder.`;
  }
  return '';
}

/** Token comparison: whitespace-insensitive, trailing-newline tolerant. */
function compareTokens(actual, expected) {
  const a = actual.split(/\s+/).filter(Boolean);
  const b = expected.split(/\s+/).filter(Boolean);
  if (a.length !== b.length) {
    let reason = `token count differs (yours ${a.length}, expected ${b.length})`;
    if (a.length === 0) reason += ' — your program printed nothing at all.';
    return { ok: false, reason };
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      const reason = `first difference at token ${i + 1}: yours "${a[i]}", expected "${b[i]}"` +
                     numericHint(a[i], b[i]) + stubHint(a, b);
      return { ok: false, reason };
    }
  }
  return { ok: true };
}

/**
 * Some problems accept many different correct outputs - any allocation using
 * the minimum number of rooms, any valid ordering, any shortest path. Token
 * comparison would reject a correct answer for the crime of numbering things
 * differently, so those problems ship a checker.cpp beside the statement.
 *
 * It is compiled once per submission and invoked as
 *     checker <input> <expected> <submitted>
 * exiting 0 to accept and non-zero to reject, with the reason on stdout.
 *
 * Problems without a `checker` field are unaffected and keep comparing tokens.
 */
function loadChecker(problemDir, buildDir) {
  let meta;
  try {
    meta = JSON.parse(fs.readFileSync(path.join(problemDir, 'problem.json'), 'utf8'));
  } catch (_) {
    return null;
  }
  if (!meta.checker) return null;

  const src = path.join(problemDir, meta.checker);
  if (!fs.existsSync(src)) {
    return { error: `This problem declares a checker (${meta.checker}) but the file is missing.` };
  }
  const exe = path.join(buildDir, 'checker' + (os.platform() === 'win32' ? '.exe' : ''));
  const r = compileCpp(src, exe, meta.checker);
  if (!r.ok) {
    return { error: 'The problem checker failed to compile:\n' + (r.stderr || '').slice(0, 2000) };
  }
  return { exe, gotFile: path.join(buildDir, 'submitted.out') };
}

/** Ask the checker whether `stdout` is acceptable for this test. */
function runChecker(checker, inputFile, expectedFile, stdout) {
  try {
    fs.writeFileSync(checker.gotFile, stdout);
  } catch (e) {
    return { ok: false, ie: true, reason: 'Cannot stage your output for the checker: ' + e.message };
  }
  const r = spawnSync(checker.exe, [inputFile, expectedFile, checker.gotFile], {
    maxBuffer: 8 * 1024 * 1024,
    windowsHide: true,
  });
  if (r.error) {
    return { ok: false, ie: true, reason: 'Could not run the problem checker: ' + r.error.message };
  }
  const note = (r.stdout ? r.stdout.toString() : '').trim();
  if (r.status === 0) return { ok: true, note };
  return { ok: false, reason: note || `the problem checker rejected your output (exit ${r.status})` };
}

/** Run one test. Resolves to {verdict, timeMs, stdout, stderr, message}. */
function runOne(cmd, args, inputFile, expectedFile, timeLimitMs, checker) {
  return new Promise((resolve) => {
    let stdin;
    try {
      stdin = fs.openSync(inputFile, 'r');
    } catch (e) {
      return resolve({ verdict: 'IE', timeMs: 0, message: 'Cannot open test input: ' + e.message });
    }

    const started = process.hrtime.bigint();
    let out = [];
    let outLen = 0;
    let err = '';
    let done = false;
    let killedForTime = false;
    let killedForOutput = false;

    // windowsHide stops a console window flashing for EVERY test case.
    const child = spawn(cmd, args, { stdio: [stdin, 'pipe', 'pipe'], windowsHide: true });

    const timer = setTimeout(() => {
      killedForTime = true;
      try { child.kill('SIGKILL'); } catch (_) {}
    }, timeLimitMs);

    child.stdout.on('data', (c) => {
      outLen += c.length;
      if (outLen > OUTPUT_CAP_BYTES) {
        killedForOutput = true;
        try { child.kill('SIGKILL'); } catch (_) {}
        return;
      }
      out.push(c);
    });
    child.stderr.on('data', (c) => { if (err.length < 8000) err += c.toString(); });

    const finish = (res) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      try { fs.closeSync(stdin); } catch (_) {}
      resolve(res);
    };

    child.on('error', (e) => {
      finish({ verdict: 'IE', timeMs: 0, message: 'Could not run program: ' + e.message });
    });

    child.on('close', (code, signal) => {
      const timeMs = Number(process.hrtime.bigint() - started) / 1e6;

      if (killedForOutput) {
        return finish({ verdict: 'OLE', timeMs, message: 'Output exceeded 64 MB' });
      }
      if (killedForTime) {
        return finish({ verdict: 'TLE', timeMs: timeLimitMs, message: `Exceeded ${timeLimitMs} ms` });
      }
      if (code !== 0 || signal) {
        return finish({
          verdict: 'RE',
          timeMs,
          message: `Exited with code ${code}${signal ? ' (signal ' + signal + ')' : ''}` +
                   (err ? '\n' + err.trim().slice(0, 1500) : ''),
        });
      }

      const stdout = Buffer.concat(out).toString();
      let expected;
      try {
        expected = fs.readFileSync(expectedFile, 'utf8');
      } catch (e) {
        return finish({ verdict: 'IE', timeMs, message: 'Cannot read expected output: ' + e.message });
      }

      if (checker) {
        const v = runChecker(checker, inputFile, expectedFile, stdout);
        if (v.ie) return finish({ verdict: 'IE', timeMs, message: v.reason, stdout, expected });
        if (!v.ok) return finish({ verdict: 'WA', timeMs, message: v.reason, stdout, expected });
        return finish({ verdict: 'AC', timeMs, stdout, expected, message: v.note || '' });
      }

      const cmp = compareTokens(stdout, expected);
      if (!cmp.ok) {
        return finish({ verdict: 'WA', timeMs, message: cmp.reason, stdout, expected });
      }
      return finish({ verdict: 'AC', timeMs, stdout, expected });
    });
  });
}

/**
 * Judge a submission.
 * mode 'run'    -> samples only, reveals input/output
 * mode 'submit' -> every test, hides input on hidden tests
 */
async function judge({ sourcePath, lang, problemDir, timeLimitMs, mode, displayName }) {
  const c = compile(sourcePath, lang, displayName);
  if (!c.ok) {
    if (c.dir) { try { fs.rmSync(c.dir, { recursive: true, force: true }); } catch (_) {} }
    return {
      verdict: 'CE',
      compileError: c.error,
      diagnostics: c.diagnostics || [],
      passed: 0,
      total: 0,
      tests: [],
    };
  }

  const sampleDir = path.join(problemDir, 'samples');
  const hiddenDir = path.join(problemDir, 'tests');

  const collect = (dir, visible) => {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
      .filter((f) => f.endsWith('.in'))
      .sort()
      .map((f) => ({
        name: path.basename(f, '.in'),
        input: path.join(dir, f),
        expected: path.join(dir, path.basename(f, '.in') + '.out'),
        visible,
      }));
  };

  let cases = collect(sampleDir, true);
  if (mode === 'submit') cases = cases.concat(collect(hiddenDir, false));

  if (cases.length === 0) {
    return { verdict: 'IE', compileError: 'No test cases found for this problem.', tests: [] };
  }

  // Problems with many valid outputs are graded by their own checker.
  const checker = loadChecker(problemDir, c.dir || tmpDir());
  if (checker && checker.error) {
    if (c.dir) { try { fs.rmSync(c.dir, { recursive: true, force: true }); } catch (_) {} }
    return { verdict: 'IE', compileError: checker.error, passed: 0, total: 0, tests: [] };
  }

  const results = [];
  let overall = 'AC';
  let maxTime = 0;

  // Java pays a JVM start-up cost on every test; scale the limit accordingly.
  const effectiveTL = Math.round(timeLimitMs * (LANGS[lang] ? LANGS[lang].tlFactor : 1));

  for (let i = 0; i < cases.length; i++) {
    const t = cases[i];
    const r = await runOne(c.cmd, c.args, t.input, t.expected, effectiveTL, checker);
    maxTime = Math.max(maxTime, r.timeMs || 0);

    const entry = {
      index: i + 1,
      name: t.name,
      visible: t.visible,
      verdict: r.verdict,
      timeMs: Math.round(r.timeMs || 0),
      message: r.message || '',
    };

    if (t.visible) {
      entry.input = fs.readFileSync(t.input, 'utf8').slice(0, 4000);
      entry.expected = (r.expected !== undefined ? r.expected : fs.readFileSync(t.expected, 'utf8')).slice(0, 4000);
      entry.stdout = (r.stdout || '').slice(0, 4000);
    }

    results.push(entry);

    if (r.verdict !== 'AC' && overall === 'AC') {
      overall = r.verdict;
      // Stop at first failure on submit, exactly like a real OA that reports the first bad test.
      if (mode === 'submit') { results.push(...[]); break; }
    }
  }

  // cleanup build dir
  if (c.dir) {
    try { fs.rmSync(c.dir, { recursive: true, force: true }); } catch (_) {}
  }

  const passed = results.filter((r) => r.verdict === 'AC').length;
  const total = cases.length;

  return {
    verdict: overall,
    passed,
    total,
    maxTimeMs: Math.round(maxTime),
    timeLimitMs: effectiveTL,
    lang,
    tests: results,
  };
}

/**
 * Compile and run once against arbitrary input. No expected output, no
 * comparison - just show what the program printed. Used by the Custom tab.
 */
async function runCustom({ sourcePath, lang, input, timeLimitMs, displayName }) {
  const c = compile(sourcePath, lang, displayName);
  if (!c.ok) {
    if (c.dir) { try { fs.rmSync(c.dir, { recursive: true, force: true }); } catch (_) {} }
    return { verdict: 'CE', compileError: c.error, diagnostics: c.diagnostics || [] };
  }

  const dir = c.dir || tmpDir();
  const inFile = path.join(dir, 'custom.in');
  const expFile = path.join(dir, 'custom.exp');
  fs.writeFileSync(inFile, input == null ? '' : String(input), 'utf8');
  // Sentinel the comparison can never match, so we always get the raw output
  // back through the WA branch rather than a bare "AC".
  fs.writeFileSync(expFile, ' __no_expected_output__ ', 'utf8');

  const effectiveTL = Math.round(timeLimitMs * (LANGS[lang] ? LANGS[lang].tlFactor : 1));
  const r = await runOne(c.cmd, c.args, inFile, expFile, effectiveTL);

  if (c.dir) { try { fs.rmSync(c.dir, { recursive: true, force: true }); } catch (_) {} }

  // WA here just means "output differed from the sentinel", i.e. it ran fine.
  const ok = r.verdict === 'AC' || r.verdict === 'WA';
  return {
    verdict: ok ? 'OK' : r.verdict,
    stdout: r.stdout || '',
    timeMs: Math.round(r.timeMs || 0),
    timeLimitMs: effectiveTL,
    message: ok ? '' : (r.message || ''),
  };
}

module.exports = { judge, runCustom, compile, compareTokens, LANGS };
