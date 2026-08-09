/**
 * localStorage mirror.
 *
 * The file on disk (and MongoDB) remain the source of truth - that is what
 * keeps VS Code editing working. This is a *mirror*: written instantly on
 * every keystroke, and read back only when the server cannot be reached.
 * It means a crashed tab, a closed laptop or a stopped server never costs
 * you the last few seconds of typing.
 */
const K = {
  code: (id, lang) => `oa_code:${id}:${lang}`,
  custom: (id) => `oa_custom:${id}`,
  lang: 'oa_lang',
  lastProblem: 'oa_last_problem',
};

function read(key, dflt = null) {
  try { const v = localStorage.getItem(key); return v === null ? dflt : v; }
  catch (_) { return dflt; }
}
function write(key, value) {
  try { localStorage.setItem(key, value); } catch (_) { /* quota or private mode */ }
}

export const local = {
  getCode: (id, lang) => read(K.code(id, lang)),
  setCode: (id, lang, code) => write(K.code(id, lang), code),

  getCustom: (id) => read(K.custom(id)),
  setCustom: (id, v) => write(K.custom(id), v),

  getLang: () => {
    const l = read(K.lang, 'cpp');
    return l === 'java' ? 'java' : 'cpp';
  },
  setLang: (l) => write(K.lang, l),

  getLastProblem: () => read(K.lastProblem),
  setLastProblem: (id) => write(K.lastProblem, id),

  /** Drop mirrored code for one problem, e.g. after an explicit Reset. */
  clearCode(id) {
    for (const lang of ['cpp', 'java']) {
      try { localStorage.removeItem(K.code(id, lang)); } catch (_) {}
    }
  },
};
