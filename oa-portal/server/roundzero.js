'use strict';
/**
 * Round Zero - the non-coding half of the assessment.
 *
 * Aptitude, reasoning, verbal and CS fundamentals. Deliberately kept in its
 * own module, its own content directory and its own URL space so that it
 * shares nothing with the problem catalogue except the HTTP server and the
 * progress store. Adding questions to `problems/` can never break this, and
 * editing a sheet can never break the judge.
 *
 * Content lives in  roundzero/index.json  +  roundzero/<track>/<sheet>.md
 *
 * Progress is stored through the existing platform-tick store under keys
 * prefixed `rz:`, which cannot collide with the catalogue's Q/R/Z doc ids.
 */
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const DIR = path.join(ROOT, 'roundzero');
const MANIFEST = path.join(DIR, 'index.json');

const KEY = (sheetId, i) => `rz:${sheetId}#${i}`;

/** Read the manifest fresh every time - sheets are edited while the server runs. */
function manifest() {
  return JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
}

function allSheets(mf) {
  return mf.tracks.flatMap((t) =>
    t.sheets.map((s) => ({ ...s, track: t.id, trackTitle: t.title })));
}

/**
 * Count the GFM task-list items in a sheet.
 *
 * These are the checkpoints, and the frontend hydrates the Nth rendered
 * checkbox with the Nth stored tick - so this count and that order have to
 * agree with what `marked` emits. Fenced code blocks are skipped, because a
 * "- [ ]" inside a code sample is printed, not turned into a checkbox.
 */
const TASK_LINE = /^\s*[-*+]\s+\[[ xX]\]\s/;

function countChecks(md) {
  let n = 0, inFence = false;
  for (const line of md.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) { inFence = !inFence; continue; }
    if (!inFence && TASK_LINE.test(line)) n++;
  }
  return n;
}

function sheetPath(sheet) {
  // The path comes from the manifest, never from the request, but normalise
  // and re-check anyway so a bad edit to index.json cannot escape the folder.
  const f = path.resolve(DIR, sheet.file);
  if (!f.startsWith(DIR + path.sep)) throw new Error('sheet path escapes roundzero/');
  return f;
}

function readSheet(sheet) {
  const f = sheetPath(sheet);
  if (!fs.existsSync(f)) return null;
  return fs.readFileSync(f, 'utf8');
}

/** ticks for this user, as { 'sheetId#3': 'done' } with the rz: prefix removed */
function rzTicks(all) {
  const out = {};
  for (const [k, v] of Object.entries(all)) {
    if (k.startsWith('rz:')) out[k.slice(3)] = v;
  }
  return out;
}

function doneCount(ticks, sheetId, total) {
  let n = 0;
  for (let i = 0; i < total; i++) if (ticks[`${sheetId}#${i}`] === 'done') n++;
  return n;
}

/**
 * Handle a Round Zero request.
 * Returns true if it took the request, false to let the main router continue.
 */
async function handle({ pathname, method, url, body, store, who, sendJson, res }) {
  if (!pathname.startsWith('/api/rz')) return false;

  // ---- the whole shelf, with progress ---------------------------------
  if (pathname === '/api/rz' && method === 'GET') {
    const mf = manifest();
    const ticks = rzTicks(await store.getPlatformStatus(who));

    let checks = 0, checksDone = 0, sheetsDone = 0, sheets = 0, mins = 0, minsLeft = 0;

    const tracks = mf.tracks.map((t) => {
      const list = t.sheets.map((s) => {
        const md = readSheet(s);
        const total = md ? countChecks(md) : 0;
        const done = doneCount(ticks, s.id, total);
        const complete = total > 0 && done === total;

        sheets++; checks += total; checksDone += done;
        mins += s.mins || 0;
        if (!complete) minsLeft += s.mins || 0;
        if (complete) sheetsDone++;

        return {
          id: s.id, title: s.title, mins: s.mins, tier: s.tier,
          missing: !md, checks: total, done, complete,
        };
      });
      return {
        id: t.id, title: t.title, blurb: t.blurb, sheets: list,
        checks: list.reduce((a, x) => a + x.checks, 0),
        done: list.reduce((a, x) => a + x.done, 0),
        complete: list.filter((x) => x.complete).length,
      };
    });

    return sendJson(res, 200, {
      name: mf.name, tagline: mf.tagline, blurb: mf.blurb,
      tracks,
      summary: { sheets, sheetsDone, checks, checksDone, mins, minsLeft },
    });
  }

  // ---- one sheet -------------------------------------------------------
  let m = pathname.match(/^\/api\/rz\/sheet\/([\w-]+)$/);
  if (m && method === 'GET') {
    const mf = manifest();
    const list = allSheets(mf);
    const i = list.findIndex((s) => s.id === m[1]);
    if (i < 0) return sendJson(res, 404, { error: 'No such sheet' });

    const sheet = list[i];
    const md = readSheet(sheet);
    if (md == null) return sendJson(res, 404, { error: `Sheet file missing: ${sheet.file}` });

    const total = countChecks(md);
    const ticks = rzTicks(await store.getPlatformStatus(who));
    const checked = [];
    for (let k = 0; k < total; k++) checked.push(ticks[`${sheet.id}#${k}`] === 'done');

    return sendJson(res, 200, {
      id: sheet.id, title: sheet.title, mins: sheet.mins, tier: sheet.tier,
      track: sheet.track, trackTitle: sheet.trackTitle,
      markdown: md, checks: total, checked,
      prev: i > 0 ? { id: list[i - 1].id, title: list[i - 1].title } : null,
      next: i < list.length - 1 ? { id: list[i + 1].id, title: list[i + 1].title } : null,
    });
  }

  // ---- tick / untick one checkpoint ------------------------------------
  if (pathname === '/api/rz/tick' && method === 'POST') {
    const { sheetId, index, status } = body || {};
    const sheet = allSheets(manifest()).find((s) => s.id === sheetId);
    if (!sheet) return sendJson(res, 404, { error: 'No such sheet' });

    const md = readSheet(sheet);
    const total = md ? countChecks(md) : 0;
    const i = Number(index);
    if (!Number.isInteger(i) || i < 0 || i >= total) {
      return sendJson(res, 400, { error: 'checkpoint index out of range' });
    }

    await store.setPlatformStatus(who, KEY(sheetId, i), status === 'done' ? 'done' : 'todo');
    return sendJson(res, 200, { ok: true });
  }

  // ---- tick / untick every checkpoint on a sheet ------------------------
  if (pathname === '/api/rz/tick-sheet' && method === 'POST') {
    const { sheetId, status } = body || {};
    const sheet = allSheets(manifest()).find((s) => s.id === sheetId);
    if (!sheet) return sendJson(res, 404, { error: 'No such sheet' });

    const md = readSheet(sheet);
    const total = md ? countChecks(md) : 0;
    const st = status === 'done' ? 'done' : 'todo';
    for (let i = 0; i < total; i++) await store.setPlatformStatus(who, KEY(sheetId, i), st);
    return sendJson(res, 200, { ok: true, checks: total });
  }

  return sendJson(res, 404, { error: 'No such endpoint' });
}

module.exports = { handle, countChecks, manifest, allSheets, DIR };
