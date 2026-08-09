'use strict';
/**
 * Shared C++ compilation with diagnostics.
 *
 * Handles a real toolchain bug: MinGW GCC 8.1.0 ships a broken <filesystem>
 * header, and <bits/stdc++.h> pulls it in under -std=c++17. Since nearly every
 * competitive submission includes bits/stdc++.h, we transparently retry under
 * gnu++14 (which does not include <filesystem>) instead of blaming the user.
 */
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const fs = require('node:fs');

const STANDARDS = ['-std=gnu++17', '-std=gnu++14'];

/** True when the failure is the toolchain's own broken header, not user code. */
function isToolchainHeaderBug(stderr) {
  return /fs_path\.h|bits\/fs_|include\/c\+\+\/filesystem/.test(stderr);
}

/**
 * Parse g++ diagnostics into structured entries.
 * g++ format:  path:LINE:COL: severity: message
 */
function parseDiagnostics(stderr, sourcePath) {
  const base = path.basename(sourcePath);
  const out = [];
  const seen = new Set();

  const lines = stderr.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(.*?):(\d+):(?:(\d+):)?\s*(error|warning|note):\s*(.*)$/);
    if (!m) continue;

    const file = m[1];
    // only surface diagnostics that point at the submitted file
    if (path.basename(file) !== base) continue;

    const entry = {
      line: Number(m[2]),
      column: m[3] ? Number(m[3]) : null,
      severity: m[4],
      message: m[5].trim(),
    };

    // the source line g++ echoes underneath, if present
    if (lines[i + 1] && !/^\s*(.*?):(\d+):/.test(lines[i + 1])) {
      const snippet = lines[i + 1];
      if (snippet.trim() && !/^\s*[\^~]+\s*$/.test(snippet)) entry.snippet = snippet;
    }

    const key = `${entry.line}:${entry.column}:${entry.severity}:${entry.message}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(entry);
  }
  return out;
}

/** Strip absolute temp paths so the user sees their own filename only. */
function cleanStderr(stderr, sourcePath, displayName) {
  const esc = sourcePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return stderr
    .replace(new RegExp(esc, 'g'), displayName)
    .replace(/[A-Za-z]:[\\/][^\s:]*[\\/]([\w.+-]+\.(?:h|hpp|cpp|tcc))/g, '<$1>')
    .trim();
}

/**
 * Compile a C++ source file.
 * @returns {{ok:boolean, exe?:string, standard?:string, stderr?:string,
 *             diagnostics?:Array, warnings?:Array}}
 */
function compileCpp(sourcePath, exePath, displayName = 'solution.cpp') {
  let lastResult = null;

  for (const std of STANDARDS) {
    const r = spawnSync(
      'g++',
      [std, '-O2', '-static', '-w', '-o', exePath, sourcePath],
      { encoding: 'utf8', timeout: 60000, windowsHide: true }
    );

    if (r.error) {
      return { ok: false, stderr: 'Compiler could not be started: ' + r.error.message, diagnostics: [] };
    }

    if (r.status === 0) {
      return { ok: true, exe: exePath, standard: std, warnings: [] };
    }

    const stderr = (r.stderr || '').toString();
    lastResult = { stderr, std };

    // Toolchain header bug -> try the next standard rather than failing.
    if (isToolchainHeaderBug(stderr)) continue;

    // A genuine user error: report it now.
    const cleaned = cleanStderr(stderr, sourcePath, displayName);
    return {
      ok: false,
      standard: std,
      stderr: cleaned,
      diagnostics: parseDiagnostics(cleaned, displayName),
    };
  }

  // Every standard failed with a header-bug-looking error.
  const cleaned = cleanStderr(lastResult.stderr, sourcePath, displayName);
  return {
    ok: false,
    standard: lastResult.std,
    stderr: cleaned,
    diagnostics: parseDiagnostics(cleaned, displayName),
  };
}

// ---------------------------------------------------------------- java

/** javac reports `File.java:LINE: error: message` (no column). */
function parseJavacDiagnostics(stderr, displayName) {
  const out = [];
  const lines = stderr.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(.*?\.java):(\d+):\s*(error|warning):\s*(.*)$/);
    if (!m) continue;
    const entry = {
      line: Number(m[2]),
      column: null,
      severity: m[3],
      message: m[4].trim(),
    };
    // javac echoes the offending source line, then a caret line marking the column
    if (lines[i + 1] && !/^\s*\d+\s+(error|warning)/.test(lines[i + 1])) entry.snippet = lines[i + 1];
    const caret = lines[i + 2];
    if (caret && /^\s*\^\s*$/.test(caret)) entry.column = caret.indexOf('^') + 1;
    out.push(entry);
  }
  return out;
}

/**
 * Compile Java. The public class may be named anything; we detect it and lay
 * the file out as <ClassName>.java so javac is happy.
 * @returns {{ok, className?, dir?, stderr?, diagnostics?}}
 */
function compileJava(sourcePath, workDir, displayName = 'solution.java') {
  const src = fs.readFileSync(sourcePath, 'utf8');

  const pub = src.match(/public\s+(?:final\s+|abstract\s+)?class\s+([A-Za-z_$][\w$]*)/);
  const any = src.match(/(?:^|\s)class\s+([A-Za-z_$][\w$]*)/);
  const className = (pub && pub[1]) || (any && any[1]) || 'Main';

  if (/^\s*package\s+/m.test(src)) {
    return {
      ok: false,
      stderr: 'Remove the `package` declaration — the judge compiles into the default package.',
      diagnostics: [{
        line: src.split(/\r?\n/).findIndex((l) => /^\s*package\s+/.test(l)) + 1,
        column: 1, severity: 'error',
        message: 'package declarations are not supported; delete this line',
      }],
    };
  }

  fs.mkdirSync(workDir, { recursive: true });
  const javaFile = path.join(workDir, className + '.java');
  fs.writeFileSync(javaFile, src, 'utf8');

  const r = spawnSync('javac', ['-nowarn', '-d', workDir, javaFile],
    { encoding: 'utf8', timeout: 90000, windowsHide: true });

  if (r.error) {
    return { ok: false, stderr: 'javac could not be started: ' + r.error.message, diagnostics: [] };
  }
  if (r.status !== 0) {
    const raw = (r.stderr || r.stdout || '').toString();
    const cleaned = raw
      .replace(new RegExp(javaFile.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), displayName)
      .trim();
    return { ok: false, stderr: cleaned, diagnostics: parseJavacDiagnostics(cleaned, displayName) };
  }
  return { ok: true, className, dir: workDir };
}

module.exports = { compileCpp, compileJava, parseDiagnostics, parseJavacDiagnostics, STANDARDS };
