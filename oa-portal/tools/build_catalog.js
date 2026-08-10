'use strict';
/**
 * Generates the full catalogue by parsing "OA Master Plan.md".
 *
 *   node tools/build_catalog.js
 *
 * Writes server/catalog.generated.json with every Q / R / Z entry, the
 * section it belongs to, its statement (for modelled questions), and a link
 * for platform questions. Parsing the doc means the portal can never drift
 * out of sync with the plan.
 */
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..', '..');
const DOC = path.join(ROOT, 'OA Master Plan.md');
const OUT = path.join(__dirname, '..', 'server', 'catalog.generated.json');

if (!fs.existsSync(DOC)) {
  console.error(`\n  Cannot find ${DOC}\n`);
  process.exit(1);
}

const lines = fs.readFileSync(DOC, 'utf8').split(/\r?\n/);

const DIFF = { F: 'Foundation', M: 'Medium', H: 'Hard', X: 'Hard' };
const DIFF_RAW = { F: 'F', M: 'M', H: 'H', X: 'X' };

const SOURCE_NAME = {
  LC: 'LeetCode', CSES: 'CSES', EDPC: 'AtCoder EDPC',
  CF: 'Codeforces', AC: 'AtCoder', GFG: 'GeeksForGeeks', HR: 'HackerRank',
};

const lcSlug = (t) =>
  t.toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

function platformUrl(source, title) {
  switch (source) {
    case 'LC':
      return { url: `https://leetcode.com/problems/${lcSlug(title)}/`, exact: true };
    case 'CSES':
      return { url: `https://cses.fi/problemset/`, exact: false };
    case 'EDPC':
      return { url: `https://atcoder.jp/contests/dp/tasks`, exact: false };
    case 'CF':
      return { url: `https://codeforces.com/problemset?search=${encodeURIComponent(title)}`, exact: false };
    case 'AC':
      return { url: `https://atcoder.jp/contests/`, exact: false };
    case 'GFG':
      return { url: `https://www.geeksforgeeks.org/?s=${encodeURIComponent(title)}`, exact: false };
    default:
      return { url: null, exact: false };
  }
}

// strip markdown emphasis / code ticks from a title fragment
const clean = (s) =>
  s.replace(/`([^`]*)`/g, '$1')
   .replace(/\*\*(.*?)\*\*/g, '$1')
   .replace(/\*(.*?)\*/g, '$1')
   .replace(/\s+/g, ' ')
   .trim();

/**
 * Turn a raw doc heading into something readable in the UI.
 *   "7.1 · REPEATED WORK → STRUCTURE · Q1–Q22"  ->  "Repeated work → structure"
 *   "8.3 · Sprinklr"                            ->  "Sprinklr"
 */
function prettySection(raw) {
  let s = clean(raw);
  s = s.replace(/^\d+(?:\.\d+)*\s*[·.\-—]\s*/, '');        // drop "7.1 · "
  s = s.replace(/\s*[·|]\s*[QRZ]\d+\s*[–—-]\s*[QRZ]?\d+\s*$/, ''); // drop " · Q1–Q22"
  s = s.replace(/\s*[·|]\s*$/, '').trim();
  if (!s) return 'Other';

  // ALL CAPS headings read badly as-is; sentence-case them but keep acronyms
  const letters = s.replace(/[^A-Za-z]/g, '');
  const upper = letters.replace(/[^A-Z]/g, '').length;
  if (letters.length > 3 && upper / letters.length > 0.8) {
    s = s.toLowerCase().replace(/^([a-z])/, (m) => m.toUpperCase());
    // case-insensitive: the sentence-case step above may have capitalised the
    // first letter of an acronym ("Oa-style"), which a lowercase-only
    // alternation would then miss
    s = s.replace(/\b(dp|oa|lca|bfs|dfs|dsu|mst|api|io|zs|ii)\b/gi, (m) => m.toUpperCase());
  }
  return s;
}

/**
 * Split "Title — note" while respecting parentheses.
 *
 * The doc uses an em dash both as the title/note separator AND inside
 * parentheticals, so a naive split truncates:
 *   "*Meeting Rooms II* (premium — otherwise use Q36)"
 *       -> title "Meeting Rooms II (premium"        <- wrong
 * Keep absorbing fragments until the brackets balance, then peel a trailing
 * parenthetical off as the note - that is what it always is in this document.
 */
function splitTitleNote(rest) {
  const bal = (s) => (s.match(/\(/g) || []).length - (s.match(/\)/g) || []).length;
  const parts = rest.split(/\s+—\s+/);
  let title = parts[0];
  let i = 1;
  while (i < parts.length && bal(title) > 0) { title += ' — ' + parts[i]; i++; }
  let note = parts.slice(i).join(' — ');

  title = clean(title);
  const trailing = title.match(/^(.+?)\s*\(([^()]*)\)$/);
  if (trailing) {
    title = trailing[1].trim();
    note = note ? `${trailing[2]} — ${note}` : trailing[2];
  }
  return { title, note: clean(note) };
}

// ---------------------------------------------------------------- parse
const items = [];
let section = '';
let part = '';

// full form:  **Q1** `[PLATFORM]` LC · `M` — *Title*     (source may be "LC/GFG")
const RE_Q = /^\*\*(Q\d+)\*\*\s*`\[([A-Z-]+(?:\s*—[^\]]*)?)\]`\s*([A-Z/]+)?\s*·?\s*`([FMHX])`\s*—\s*(.+)$/;
// reserved pools:  **Q286** — **Title**   or   **Q306** `M` — **Title**
const RE_Q_BARE = /^\*\*(Q\d+)\*\*\s*(?:`([FMHX])`\s*)?—\s*(.+)$/;
const RE_R = /^\*\*(R\d+)\*\*\s*(?:`\[([A-Z-]+)\]`\s*)?·\s*`([FMHX])`\s*—\s*(.+)$/;
// title-only reported:  **R22** `[REPORTED-TITLE]` → analogue **Q68** …
const RE_R_REF = /^\*\*(R\d+)\*\*\s*`\[([A-Z-]+)\]`\s*→\s*(.+)$/;
const RE_Z = /^\*\*(Z\d+)\*\*\s*`([FMHX])`\s*—\s*(.+)$/;

function grabStatement(startIdx) {
  const out = [];
  for (let j = startIdx + 1; j < lines.length; j++) {
    const l = lines[j];
    if (/^>\s?/.test(l)) { out.push(l.replace(/^>\s?/, '')); continue; }
    if (out.length && l.trim() === '') break;
    if (!out.length && l.trim() === '') continue;
    break;
  }
  return out.join('\n').trim();
}

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (/^##\s+PART\s/i.test(line) || /^#\s+/.test(line)) {
    part = clean(line.replace(/^#+\s*/, ''));
  }
  if (/^###\s+/.test(line)) {
    section = prettySection(line.replace(/^#+\s*/, ''));
  }

  let m;

  if ((m = line.match(RE_Q))) {
    const [, docId, tagRaw, src, d, rest] = m;
    const tag = tagRaw.split(/\s|—/)[0];                    // MODELLED / PLATFORM / REPORTED-TITLE
    const { title, note } = splitTitleNote(rest);
    const kind = tag === 'PLATFORM' ? 'platform' : 'modelled';
    // a source may be listed as "LC/GFG" - link against the first one
    const primarySrc = src ? src.split('/')[0] : null;
    const link = kind === 'platform' ? platformUrl(primarySrc, title) : { url: null, exact: false };

    items.push({
      docId, n: Number(docId.slice(1)), series: 'Q',
      kind, provenance: tag,
      source: src ? src.split('/').map((s) => SOURCE_NAME[s] || s).join(' / ') : null,
      sourceCode: src || null,
      difficulty: DIFF[d], diffCode: DIFF_RAW[d],
      title, note,
      url: link.url, urlExact: link.exact,
      statement: kind === 'modelled' ? grabStatement(i) : '',
      section, part,
    });
    continue;
  }

  // reserved blind / mock pool: no tag, difficulty optional
  if ((m = line.match(RE_Q_BARE))) {
    const [, docId, d, rest] = m;
    const n = Number(docId.slice(1));
    const reserved = n >= 286 && n <= 305 ? 'blind' : (n >= 306 && n <= 320 ? 'mock' : null);
    items.push({
      docId, n, series: 'Q',
      kind: 'modelled', provenance: 'MODELLED',
      source: null, sourceCode: null,
      difficulty: d ? DIFF[d] : 'Medium', diffCode: d ? DIFF_RAW[d] : 'M',
      title: splitTitleNote(rest).title, note: '',
      url: null, urlExact: false,
      statement: grabStatement(i),
      reserved, section, part,
    });
    continue;
  }

  if ((m = line.match(RE_R_REF))) {
    const [, docId, tag, rest] = m;
    items.push({
      docId, n: Number(docId.slice(1)), series: 'R',
      kind: 'reference', provenance: tag,
      source: null, sourceCode: null,
      difficulty: 'Medium', diffCode: 'M',
      title: clean(rest), note: 'name only — statement not recovered; train with the linked analogues',
      url: null, urlExact: false, statement: '', section, part,
    });
    continue;
  }

  if ((m = line.match(RE_R))) {
    const [, docId, tag, d, rest] = m;
    const { title, note } = splitTitleNote(rest);
    items.push({
      docId, n: Number(docId.slice(1)), series: 'R',
      kind: 'modelled', provenance: tag || 'REPORTED',
      source: null, sourceCode: null,
      difficulty: DIFF[d], diffCode: DIFF_RAW[d],
      title, note, url: null, urlExact: false,
      statement: grabStatement(i),
      section, part,
    });
    continue;
  }

  if ((m = line.match(RE_Z))) {
    const [, docId, d, rest] = m;
    items.push({
      docId, n: Number(docId.slice(1)), series: 'Z',
      kind: 'aptitude', provenance: 'MODELLED',
      source: null, sourceCode: null,
      difficulty: DIFF[d], diffCode: DIFF_RAW[d],
      title: clean(rest), note: '',
      url: null, urlExact: false, statement: '',
      section, part,
    });
    continue;
  }
}

// ---------------------------------------------------------------- link the 7 solvable problems
const SOLVABLE = {
  Q2: 'm1', Q3: 'm2', Q4: 'm3', Q11: 'm4', Q12: 'm5', Q17: 'm6', Q18: 'm7',
  Q46: 'm8', Q47: 'm9', Q48: 'm10', Q51: 'm11', Q52: 'm12',
  Q54: 'm13', Q63: 'm14', Q107: 'm15', Q66: 'm16', Q108: 'm17',
  Q29: 'm18', Q30: 'm19', Q36: 'm20', Q37: 'm21', Q41: 'm22', Q45: 'm23',
  Q64: 'm24', Q65: 'm25', Q69: 'm26', Q70: 'm27', Q71: 'm28', Q73: 'm29',
  Q72: 'm30', Q74: 'm31', Q75: 'm32', Q76: 'm33', Q77: 'm34', Q78: 'm35',
  Q109: 'm36', Q110: 'm37', Q113: 'm38', Q118: 'm39', Q119: 'm40', Q126: 'm41',
  Q127: 'm42', Q130: 'm43', Q131: 'm44', Q132: 'm45', Q133: 'm46', Q134: 'm47',
  Q135: 'm48', Q136: 'm49', Q137: 'm50', Q138: 'm51', Q139: 'm52', Q140: 'm53',
  Q149: 'm54', Q150: 'm55', Q151: 'm56', Q152: 'm57', Q153: 'm58', Q154: 'm59',
  Q155: 'm60', Q156: 'm61', Q157: 'm62', Q158: 'm63', Q159: 'm64', Q160: 'm65',
  Q161: 'm66', Q162: 'm67', Q163: 'm68', Q164: 'm69', Q165: 'm70', Q166: 'm71',
  Q167: 'm72', Q168: 'm73', Q173: 'm74', Q174: 'm75', Q175: 'm76', Q176: 'm77',
  Q177: 'm78', Q178: 'm79',
};
let solvable = 0;
for (const it of items) {
  if (SOLVABLE[it.docId]) { it.id = SOLVABLE[it.docId]; it.playable = true; solvable++; }
  else if (it.kind === 'modelled') { it.playable = false; }
}

items.sort((a, b) => {
  const order = { Q: 0, R: 1, Z: 2 };
  return order[a.series] - order[b.series] || a.n - b.n;
});

fs.writeFileSync(OUT, JSON.stringify(items, null, 1), 'utf8');

// ---------------------------------------------------------------- report
const by = (f) => items.filter(f).length;
console.log('');
console.log(`  parsed ${items.length} entries from OA Master Plan.md`);
console.log(`    Q series        ${by((x) => x.series === 'Q')}   (expect 320)`);
console.log(`    R series        ${by((x) => x.series === 'R')}   (expect 34)`);
console.log(`    Z series        ${by((x) => x.series === 'Z')}   (expect 42)`);
console.log('');
console.log(`    platform        ${by((x) => x.kind === 'platform')}`);
console.log(`    modelled        ${by((x) => x.kind === 'modelled')}`);
console.log(`    aptitude        ${by((x) => x.kind === 'aptitude')}`);
console.log(`    playable here   ${solvable}`);
console.log(`    with statement  ${by((x) => x.statement && x.statement.length > 40)}`);
console.log(`    exact links     ${by((x) => x.urlExact)}`);
console.log('');

const missingTitle = items.filter((x) => !x.title);
if (missingTitle.length) {
  console.log(`  ${missingTitle.length} entries parsed without a title:`);
  missingTitle.slice(0, 8).forEach((x) => console.log('    ' + x.docId));
}
console.log(`  written -> ${path.relative(process.cwd(), OUT)}\n`);
