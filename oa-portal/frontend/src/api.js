const TOKEN_KEY = 'oa_token';
const USER_KEY = 'oa_user';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUser = () => localStorage.getItem(USER_KEY);
export function setSession(token, username) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, username);
}
export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

async function call(path, options = {}) {
  const token = getToken();
  const res = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (res.status === 401) {
    clearSession();
    if (!path.endsWith('/login')) window.location.hash = '#/login';
  }

  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || `Request failed (${res.status})`);
  return body;
}

export const api = {
  login: (username, password) =>
    call('/api/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  logout: () => call('/api/logout', { method: 'POST' }).catch(() => {}),
  me: () => call('/api/me'),
  catalog: () => call('/api/catalog'),
  entry: (docId) => call(`/api/entry/${docId}`),
  problem: (id) => call(`/api/problem/${id}`),
  getCode: (id, lang = 'cpp') => call(`/api/code/${id}?lang=${lang}`),
  saveCode: (id, code, lang = 'cpp') =>
    call(`/api/code/${id}`, { method: 'POST', body: JSON.stringify({ code, lang }) }),
  judge: (id, { mode, code, lang = 'cpp' }) =>
    call(`/api/judge/${id}`, { method: 'POST', body: JSON.stringify({ mode, code, lang }) }),
  custom: (id, { code, lang = 'cpp', input }) =>
    call(`/api/custom/${id}`, { method: 'POST', body: JSON.stringify({ code, lang, input }) }),
  reset: (id, lang = 'cpp') =>
    call(`/api/reset/${id}`, { method: 'POST', body: JSON.stringify({ lang }) }),
  submissions: (id) => call(`/api/submissions/${id}`),
  setPlatform: (docId, status) =>
    call(`/api/platform/${docId}`, { method: 'POST', body: JSON.stringify({ status }) }),
};
