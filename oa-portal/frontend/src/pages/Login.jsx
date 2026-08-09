import { useState } from 'react';
import { api, setSession } from '../api.js';

export default function Login({ onDone }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr('');
    setBusy(true);
    try {
      const r = await api.login(username.trim(), password);
      setSession(r.token, r.username);
      // per-account default language, set fresh on each sign-in
      if (r.defaultLang) localStorage.setItem('oa_lang', r.defaultLang);
      onDone(r.username);
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={submit}>
        <div className="mark">OA</div>
        <h1>OA Portal</h1>
        <p className="sub">Local practice judge — sign in to continue.</p>

        {err && <div className="err">{err}</div>}

        <div className="field">
          <label htmlFor="u">Username</label>
          <input id="u" value={username} onChange={(e) => setUsername(e.target.value)}
                 autoComplete="username" autoFocus required />
        </div>

        <div className="field">
          <label htmlFor="p">Password</label>
          <input id="p" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                 autoComplete="current-password" required />
        </div>

        <button className="btn primary" disabled={busy}>
          {busy ? <span className="spin" /> : 'Sign in'}
        </button>

        <div className="hint">
          Accounts: <code>Subhodeep</code> and <code>kashish</code>.<br />
          Runs entirely on this machine — nothing is sent anywhere.
        </div>
      </form>
    </div>
  );
}
