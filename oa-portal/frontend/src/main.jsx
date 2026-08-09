import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

/**
 * Self-heal a stale tab.
 *
 * A browser that cached index.html before no-store headers existed will keep
 * loading an old bundle, which then talks to a newer API and renders NaN.
 * Ask the server which asset the current build points at; if this page is
 * running a different one, reload once (guarded so it can never loop).
 */
(async function checkBuild() {
  try {
    const mine = Array.from(document.scripts)
      .map((s) => s.getAttribute('src'))
      .find((s) => s && s.includes('/assets/'));
    if (!mine) return;

    const r = await fetch('/api/version', { cache: 'no-store' });
    if (!r.ok) return;
    const { asset } = await r.json();
    if (!asset || asset === mine) { sessionStorage.removeItem('oa_reloaded'); return; }

    if (sessionStorage.getItem('oa_reloaded')) return;   // only ever once
    sessionStorage.setItem('oa_reloaded', '1');
    location.reload();
  } catch (_) { /* offline: keep whatever we have */ }
})();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
