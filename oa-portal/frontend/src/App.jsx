import { useEffect, useState, useCallback } from 'react';
import { api, getUser, clearSession } from './api.js';
import { useTheme, ThemeIcon } from './theme.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Problem from './pages/Problem.jsx';
import RoundZero from './pages/RoundZero.jsx';
import Sheet from './pages/Sheet.jsx';

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash || '#/');
  useEffect(() => {
    const on = () => setHash(window.location.hash || '#/');
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return hash;
}

const THEME_LABEL = { light: 'Light', dark: 'Dark', system: 'System' };

export default function App() {
  const hash = useHashRoute();
  const [user, setUser] = useState(getUser());
  const [checking, setChecking] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    api.me()
      .then((r) => {
        setUser(r.username);
        // each account has its own default language (Subhodeep C++, kashish Java)
        if (r.defaultLang && !localStorage.getItem('oa_lang')) {
          localStorage.setItem('oa_lang', r.defaultLang);
        }
      })
      .catch(() => setUser(null))
      .finally(() => setChecking(false));
  }, []);

  const onLogout = useCallback(async () => {
    await api.logout();
    clearSession();
    setUser(null);
    window.location.hash = '#/login';
  }, []);

  if (checking) return <div className="center-note">Loading…</div>;

  if (!user) {
    return (
      <>
        <Login onDone={(u) => { setUser(u); window.location.hash = '#/'; }} />
        <button
          className="icon-btn"
          style={{ position: 'fixed', top: 18, right: 18 }}
          onClick={theme.cycle}
          title={`Theme: ${THEME_LABEL[theme.mode]}`}
          aria-label={`Theme: ${THEME_LABEL[theme.mode]}`}
        >
          <ThemeIcon mode={theme.mode} />
        </button>
      </>
    );
  }

  const solveMatch = hash.match(/^#\/solve\/([\w-]+)/);
  const sheetMatch = hash.match(/^#\/rz\/([\w-]+)/);
  const onRz = hash.startsWith('#/rz');

  return (
    <div className="shell">
      <header className="topbar">
        <a href="#/" className="brand">
          <span className="dot">OA</span>
          Portal
          <span className="tag">local judge</span>
        </a>
        <nav className="topnav">
          <a href="#/" className={onRz ? '' : 'on'}>Question Bank</a>
          <a href="#/rz" className={onRz ? 'on' : ''}>Round Zero</a>
        </nav>
        <div className="spacer" />
        <button className="icon-btn" onClick={theme.cycle}
                title={`Theme: ${THEME_LABEL[theme.mode]} — click to change`}
                aria-label={`Theme: ${THEME_LABEL[theme.mode]}`}>
          <ThemeIcon mode={theme.mode} />
        </button>
        <div className="who">signed in as <b>{user}</b></div>
        <button className="btn ghost sm" onClick={onLogout}>Sign out</button>
      </header>

      <main className="main">
        {solveMatch ? <Problem id={solveMatch[1]} isDark={theme.isDark} />
          : sheetMatch ? <Sheet id={sheetMatch[1]} />
          : onRz ? <RoundZero />
          : <Home />}
      </main>
    </div>
  );
}
