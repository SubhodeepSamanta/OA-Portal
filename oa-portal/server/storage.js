'use strict';
/**
 * Storage adapter.
 *
 *   default          -> JSON files under  .data/   (zero setup, zero deps)
 *   MONGODB_URI set  -> MongoDB / Atlas             (needs: npm i mongodb)
 *
 * Same interface either way, so the rest of the app never knows the difference.
 */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, '.data');

// ---------------------------------------------------------------- users
// Local-only tool: passwords are salted+hashed rather than stored in clear,
// but this is not an internet-facing auth system and is not built as one.
const SEED_USERS = [
  { username: 'Subhodeep', password: '123456', defaultLang: 'cpp' },
  { username: 'kashish', password: '123456', defaultLang: 'java' },
  // Used only by the automated test suites so they never pollute a real
  // account's progress. Not meant for actual practice.
  { username: '_selftest', password: 'selftest', defaultLang: 'cpp' },
];

const DEFAULT_LANG = Object.fromEntries(SEED_USERS.map((u) => [u.username, u.defaultLang]));
const defaultLangFor = (username) => DEFAULT_LANG[username] || 'cpp';

function hash(password, salt) {
  return crypto.scryptSync(password, salt, 32).toString('hex');
}

function makeUser({ username, password, defaultLang }) {
  const salt = crypto.randomBytes(16).toString('hex');
  return {
    username, salt, hash: hash(password, salt),
    defaultLang: defaultLang || 'cpp',
    createdAt: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------- file backend
function fileBackend() {
  fs.mkdirSync(DATA, { recursive: true });
  const p = (n) => path.join(DATA, n + '.json');
  const read = (n, dflt) => {
    try { return JSON.parse(fs.readFileSync(p(n), 'utf8')); } catch (_) { return dflt; }
  };
  const write = (n, v) => fs.writeFileSync(p(n), JSON.stringify(v, null, 2), 'utf8');

  return {
    kind: 'file',
    location: path.relative(ROOT, DATA),

    async init() {
      let users = read('users', null) || [];
      // top up any seed account that does not exist yet (idempotent)
      let changed = false;
      for (const s of SEED_USERS) {
        if (!users.some((u) => u.username.toLowerCase() === s.username.toLowerCase())) {
          users.push(makeUser(s));
          changed = true;
        }
      }
      if (changed || !read('users', null)) write('users', users);
      if (!fs.existsSync(p('submissions'))) write('submissions', []);
      if (!fs.existsSync(p('code'))) write('code', {});
    },

    async resetProgress(username) {
      const subs = read('submissions', []);
      const kept = subs.filter((s) => s.username !== username);
      const removed = subs.length - kept.length;
      write('submissions', kept);

      const plat = read('platform', {});
      let ticks = 0;
      for (const k of Object.keys(plat)) {
        if (k.startsWith(username + '::')) { delete plat[k]; ticks++; }
      }
      write('platform', plat);
      return { submissions: removed, platform: ticks };
    },

    async findUser(username) {
      return read('users', []).find(
        (u) => u.username.toLowerCase() === String(username).toLowerCase()
      ) || null;
    },

    async getCode(username, problemId) {
      const all = read('code', {});
      return all[`${username}::${problemId}`] || null;
    },

    async saveCode(username, problemId, code, lang) {
      const all = read('code', {});
      all[`${username}::${problemId}`] = { code, lang, updatedAt: new Date().toISOString() };
      write('code', all);
    },

    async addSubmission(rec) {
      const all = read('submissions', []);
      all.push(rec);
      if (all.length > 5000) all.splice(0, all.length - 5000);
      write('submissions', all);
    },

    async listSubmissions(username, problemId, limit = 20) {
      return read('submissions', [])
        .filter((s) => s.username === username && (!problemId || s.problemId === problemId))
        .slice(-limit).reverse();
    },

    async progress(username) {
      const subs = read('submissions', []).filter((s) => s.username === username);
      const byProblem = {};
      for (const s of subs) {
        const cur = byProblem[s.problemId] || { attempts: 0, solved: false, bestMs: null };
        cur.attempts++;
        if (s.verdict === 'AC' && s.mode === 'submit') {
          cur.solved = true;
          if (cur.bestMs === null || s.maxTimeMs < cur.bestMs) cur.bestMs = s.maxTimeMs;
        }
        byProblem[s.problemId] = cur;
      }
      return byProblem;
    },

    async setPlatformStatus(username, docId, status) {
      const all = read('platform', {});
      all[`${username}::${docId}`] = { status, updatedAt: new Date().toISOString() };
      write('platform', all);
    },

    async getPlatformStatus(username) {
      const all = read('platform', {});
      const out = {};
      for (const [k, v] of Object.entries(all)) {
        const [u, docId] = k.split('::');
        if (u === username) out[docId] = v.status;
      }
      return out;
    },

    // --- sessions: persisted so a server restart does not sign you out ---
    async putSession(token, username, expiresAt) {
      const all = read('sessions', {});
      all[token] = { username, expiresAt };
      // opportunistic sweep of expired rows
      const now = Date.now();
      for (const [t, s] of Object.entries(all)) if (s.expiresAt < now) delete all[t];
      write('sessions', all);
    },

    async getSession(token) {
      const s = read('sessions', {})[token];
      if (!s) return null;
      if (s.expiresAt < Date.now()) return null;
      return s;
    },

    async dropSession(token) {
      const all = read('sessions', {});
      delete all[token];
      write('sessions', all);
    },
  };
}

// ---------------------------------------------------------------- mongo backend
function mongoBackend(uri) {
  let MongoClient;
  try { ({ MongoClient } = require('mongodb')); }
  catch (_) {
    throw new Error(
      'MONGODB_URI is set but the "mongodb" package is not installed.\n' +
      'Run:  npm install mongodb        (inside oa-portal)\n' +
      'Or unset MONGODB_URI to use local file storage instead.'
    );
  }

  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 2500,
    connectTimeoutMS: 2500,
  });
  let db, users, code, subs, platform;

  return {
    kind: 'mongo',
    location: uri.replace(/\/\/[^@]*@/, '//<credentials>@'),

    async init() {
      await client.connect();
      db = client.db(process.env.MONGODB_DB || 'oa_portal');
      users = db.collection('users');
      code = db.collection('code');
      subs = db.collection('submissions');
      platform = db.collection('platform');

      await users.createIndex({ username: 1 }, { unique: true });
      await code.createIndex({ username: 1, problemId: 1 }, { unique: true });
      await subs.createIndex({ username: 1, problemId: 1, at: -1 });
      await platform.createIndex({ username: 1, docId: 1 }, { unique: true });
      await db.collection('sessions').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

      for (const s of SEED_USERS) {
        const exists = await users.findOne({ username: s.username });
        if (!exists) await users.insertOne(makeUser(s));
      }
    },

    async resetProgress(username) {
      const a = await subs.deleteMany({ username });
      const b = await platform.deleteMany({ username });
      return { submissions: a.deletedCount, platform: b.deletedCount };
    },

    async putSession(token, username, expiresAt) {
      await db.collection('sessions').updateOne(
        { _id: token },
        { $set: { username, expiresAt: new Date(expiresAt) } },
        { upsert: true }
      );
    },
    async getSession(token) {
      const s = await db.collection('sessions').findOne({ _id: token });
      if (!s || s.expiresAt.getTime() < Date.now()) return null;
      return { username: s.username, expiresAt: s.expiresAt.getTime() };
    },
    async dropSession(token) {
      await db.collection('sessions').deleteOne({ _id: token });
    },

    async findUser(username) {
      return users.findOne({ username: new RegExp('^' + String(username).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$', 'i') });
    },

    async getCode(username, problemId) {
      return code.findOne({ username, problemId });
    },

    async saveCode(username, problemId, c, lang) {
      await code.updateOne(
        { username, problemId },
        { $set: { code: c, lang, updatedAt: new Date() } },
        { upsert: true }
      );
    },

    async addSubmission(rec) { await subs.insertOne({ ...rec, at: new Date() }); },

    async listSubmissions(username, problemId, limit = 20) {
      const q = { username };
      if (problemId) q.problemId = problemId;
      return subs.find(q).sort({ at: -1 }).limit(limit).toArray();
    },

    async progress(username) {
      const rows = await subs.find({ username }).toArray();
      const byProblem = {};
      for (const s of rows) {
        const cur = byProblem[s.problemId] || { attempts: 0, solved: false, bestMs: null };
        cur.attempts++;
        if (s.verdict === 'AC' && s.mode === 'submit') {
          cur.solved = true;
          if (cur.bestMs === null || s.maxTimeMs < cur.bestMs) cur.bestMs = s.maxTimeMs;
        }
        byProblem[s.problemId] = cur;
      }
      return byProblem;
    },

    async setPlatformStatus(username, docId, status) {
      await platform.updateOne({ username, docId }, { $set: { status, updatedAt: new Date() } }, { upsert: true });
    },

    async getPlatformStatus(username) {
      const rows = await platform.find({ username }).toArray();
      const out = {};
      for (const r of rows) out[r.docId] = r.status;
      return out;
    },
  };
}

// ---------------------------------------------------------------- factory
const DEFAULT_URI = 'mongodb://127.0.0.1:27017';

/**
 * Prefer MongoDB, fall back to files.
 *
 *   MONGODB_URI set        -> use it, and fail loudly if it is unreachable
 *   not set                -> try a local mongod; silently use files if absent
 *   OA_STORAGE=file        -> force files
 */
let store = null;
async function getStore() {
  if (store) return store;

  if (process.env.OA_STORAGE === 'file') {
    store = fileBackend();
    await store.init();
    return store;
  }

  const explicit = !!process.env.MONGODB_URI;
  const uri = process.env.MONGODB_URI || DEFAULT_URI;

  try {
    const m = mongoBackend(uri);
    await m.init();
    store = m;
    return store;
  } catch (e) {
    if (explicit) {
      throw new Error(
        `Could not connect to MONGODB_URI.\n  ${e.message}\n` +
        `Unset MONGODB_URI or set OA_STORAGE=file to use local files instead.`
      );
    }
    console.log(`  (no local MongoDB at ${DEFAULT_URI} - using file storage)`);
    store = fileBackend();
    await store.init();
    return store;
  }
}

function verifyPassword(user, password) {
  if (!user) return false;
  const attempt = Buffer.from(hash(password, user.salt), 'hex');
  const stored = Buffer.from(user.hash, 'hex');
  return attempt.length === stored.length && crypto.timingSafeEqual(attempt, stored);
}

module.exports = { getStore, verifyPassword, SEED_USERS, defaultLangFor };
