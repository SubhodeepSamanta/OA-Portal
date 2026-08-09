import { useEffect, useRef, useState, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';
import { marked } from 'marked';
import { api } from '../api.js';
import { local } from '../local.js';

marked.setOptions({ gfm: true, breaks: false });

function Timer() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setS((x) => x + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return <span className="mutedmono">{mm}:{ss}</span>;
}

export default function Problem({ id, isDark }) {
  const [prob, setProb] = useState(null);
  const [code, setCode] = useState('');
  const [lang, setLangState] = useState(() => local.getLang());
  const setLang = useCallback((l) => { local.setLang(l); setLangState(l); }, []);
  const [file, setFile] = useState('');
  const [busy, setBusy] = useState(null);          // 'run' | 'submit' | 'custom'
  const [result, setResult] = useState(null);
  const [err, setErr] = useState('');
  const [saved, setSaved] = useState(true);
  const [openTest, setOpenTest] = useState(null);

  const [tab, setTab] = useState('problem');       // problem | results | custom
  const [customIn, setCustomIn] = useState('');
  const [customOut, setCustomOut] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const viewRef = useRef(null);
  const saveTimer = useRef(null);

  // ---- load ----------------------------------------------------------
  useEffect(() => {
    let alive = true;
    setProb(null); setResult(null); setErr(''); setTab('problem'); setCustomOut(null);
    local.setLastProblem(id);

    Promise.all([api.problem(id), api.getCode(id, lang)])
      .then(([p, c]) => {
        if (!alive) return;
        setProb(p);
        setCode(c.code);
        local.setCode(id, lang, c.code);      // keep the mirror in step
        setFile(c.file);
        setSaved(true);
        const cached = local.getCustom(id);
        setCustomIn(cached != null ? cached : (p.samples && p.samples[0] ? p.samples[0].input : ''));
      })
      .catch((e) => {
        if (!alive) return;
        // Server unreachable: fall back to whatever the mirror holds so the
        // page is still usable and nothing typed is lost.
        const cached = local.getCode(id, lang);
        if (cached != null) { setCode(cached); setErr(e.message + ' — showing your locally cached code'); }
        else setErr(e.message);
      });
    return () => { alive = false; };
  }, [id, lang]);

  // ---- debounced autosave --------------------------------------------
  const onChange = useCallback((val) => {
    setCode(val);
    setSaved(false);
    local.setCode(id, lang, val);           // instant, no debounce
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      api.saveCode(id, val, lang).then(() => setSaved(true)).catch(() => {});
    }, 900);
  }, [id, lang]);

  // ---- judge ----------------------------------------------------------
  const run = useCallback(async (mode) => {
    clearTimeout(saveTimer.current);
    setBusy(mode); setResult(null); setErr(''); setOpenTest(null); setTab('results');
    try {
      await api.saveCode(id, code, lang);
      setSaved(true);
      const r = await api.judge(id, { mode, code, lang });
      setResult(r);
      const firstBad = (r.tests || []).find((t) => t.verdict !== 'AC');
      if (firstBad && firstBad.visible) setOpenTest(firstBad.index);
    } catch (e) { setErr(e.message); }
    finally { setBusy(null); }
  }, [id, code, lang]);

  const runCustom = useCallback(async () => {
    clearTimeout(saveTimer.current);
    setBusy('custom'); setCustomOut(null); setErr(''); setTab('custom');
    try {
      await api.saveCode(id, code, lang);
      setSaved(true);
      setCustomOut(await api.custom(id, { code, lang, input: customIn }));
    } catch (e) { setErr(e.message); }
    finally { setBusy(null); }
  }, [id, code, lang, customIn]);

  const doReset = useCallback(async () => {
    clearTimeout(saveTimer.current);
    setConfirmReset(false);
    setBusy('reset'); setErr(''); setResult(null); setOpenTest(null);
    try {
      const r = await api.reset(id, lang);
      setCode(r.code);
      local.setCode(id, lang, r.code);
      setSaved(true);
      setTab('problem');
    } catch (e) { setErr(e.message); }
    finally { setBusy(null); }
  }, [id, lang]);

  // ---- shortcuts:  Ctrl+'  = Run    Ctrl+Enter = Submit ---------------
  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Escape' && confirmReset) { setConfirmReset(false); return; }
      if (!(e.ctrlKey || e.metaKey)) return;
      if (e.key === "'" || e.code === 'Quote') { e.preventDefault(); run('run'); }
      else if (e.key === 'Enter') { e.preventDefault(); run('submit'); }
    };
    window.addEventListener('keydown', h, true);
    return () => window.removeEventListener('keydown', h, true);
  }, [run, confirmReset]);

  function jumpTo(line, column) {
    const view = viewRef.current;
    if (!view) return;
    const ln = Math.min(Math.max(1, line), view.state.doc.lines);
    const l = view.state.doc.line(ln);
    const pos = Math.min(l.from + Math.max(0, (column || 1) - 1), l.to);
    view.dispatch({ selection: { anchor: pos }, scrollIntoView: true });
    view.focus();
  }

  if (err && !prob) return <div className="page"><div className="err">{err}</div></div>;
  if (!prob) return <div className="center-note">Loading…</div>;

  const badge = result ? result.verdict : null;

  return (
    <div className="solve">
      {/* ================================================= LEFT: statement / results / custom */}
      <section className="pane left">
        <div className="pane-head">
          <a className="btn ghost sm" href="#/">←</a>
          <div className="tabs">
            <button className={tab === 'problem' ? 'on' : ''} onClick={() => setTab('problem')}>Problem</button>
            <button className={tab === 'results' ? 'on' : ''} onClick={() => setTab('results')}>
              Results{badge && <span className={`tabdot ${badge}`} />}
            </button>
            <button className={tab === 'custom' ? 'on' : ''} onClick={() => setTab('custom')}>Custom input</button>
          </div>
          <div className="spacer" />
          <Timer />
        </div>

        {/* ---------- statement ---------- */}
        {tab === 'problem' && (
          <div className="pane-body md" dangerouslySetInnerHTML={{ __html: marked.parse(prob.statement) }} />
        )}

        {/* ---------- results ---------- */}
        {tab === 'results' && (
          <div className="pane-body pad0">
            {err && <div className="err" style={{ margin: 14 }}>{err}</div>}

            {!result && !busy && !err && (
              <div className="empty">
                Nothing run yet.<br />
                <b>Ctrl + '</b> runs the {prob.samples.length} samples · <b>Ctrl + Enter</b> submits all {prob.hiddenTests + prob.samples.length}.
                <br /><br />Your file: <code>{file}</code>
              </div>
            )}
            {busy && busy !== 'custom' && (
              <div className="empty"><span className="spin" />{' '}
                {busy === 'submit' ? 'Judging every test…' : 'Running samples…'}</div>
            )}

            {result && (
              <>
                <div className="results-head">
                  <span className={`verdict ${result.verdict}`}>{result.verdict}</span>
                  <span className="sum">
                    {result.verdict === 'CE'
                      ? 'Compilation failed'
                      : `${result.passed}/${result.total} passed · max ${result.maxTimeMs} ms of ${result.timeLimitMs} · ${result.mode}`}
                  </span>
                </div>

                {result.verdict === 'CE' && (
                  <div className="diag">
                    {(result.diagnostics || []).length > 0 ? (
                      result.diagnostics.map((d, i) => (
                        <div className="diag-item" key={i} onClick={() => jumpTo(d.line, d.column)} title="Jump to this line">
                          <span className="loc">line {d.line}{d.column ? ':' + d.column : ''}</span>
                          <span className={`sev ${d.severity}`}>{d.severity}</span>
                          <span className="msg">{d.message}</span>
                        </div>
                      ))
                    ) : <pre className="raw-compile">{result.compileError}</pre>}
                  </div>
                )}

                {(result.tests || []).map((t) => (
                  <div key={t.index}>
                    <div className="test-row"
                         style={{ cursor: t.visible ? 'pointer' : 'default' }}
                         onClick={() => t.visible && setOpenTest(openTest === t.index ? null : t.index)}>
                      <span className={`v ${t.verdict}`}>{t.verdict}</span>
                      <span className="nm">
                        {t.visible ? `sample ${t.index}` : `test ${t.index}`}
                        {!t.visible && <span style={{ opacity: .55 }}> · hidden</span>}
                      </span>
                      <span className="ms">{t.timeMs} ms</span>
                    </div>

                    {openTest === t.index && t.visible && (
                      <div className="test-detail">
                        {t.verdict !== 'AC' && t.message && <div className="why">{t.message}</div>}
                        <div className="lbl">Input</div><pre>{t.input}</pre>
                        <div className="lbl">Expected</div><pre>{t.expected}</pre>
                        <div className="lbl">Your output</div><pre>{t.stdout || '(nothing)'}</pre>
                      </div>
                    )}
                    {t.verdict !== 'AC' && !t.visible && t.message && (
                      <div className="test-detail"><div className="why">{t.message}</div></div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* ---------- custom input ---------- */}
        {tab === 'custom' && (
          <div className="pane-body">
            <div className="custom-head">
              <div className="lbl">Your input (fed to stdin)</div>
              <div className="spacer" />
              {prob.samples.map((s, i) => (
                <button key={i} className="btn sm" onClick={() => setCustomIn(s.input)}>
                  Load sample {i + 1}
                </button>
              ))}
            </div>

            <textarea className="custom-in" spellCheck="false" value={customIn}
                      onChange={(e) => { setCustomIn(e.target.value); local.setCustom(id, e.target.value); }}
                      placeholder="Paste or type any input here…" />

            <div className="custom-actions">
              <button className="btn primary" disabled={!!busy} onClick={runCustom}>
                {busy === 'custom' ? <span className="spin" /> : 'Run with this input'}
              </button>
              <span className="mutedmono">no expected answer — this just shows what your program prints</span>
            </div>

            {err && <div className="err">{err}</div>}

            {customOut && (
              <>
                {customOut.verdict === 'CE' ? (
                  <>
                    <div className="lbl" style={{ marginTop: 16 }}>Compile error</div>
                    <div className="diag" style={{ border: '1px solid var(--line)', borderRadius: 8, padding: 6 }}>
                      {(customOut.diagnostics || []).length > 0 ? (
                        customOut.diagnostics.map((d, i) => (
                          <div className="diag-item" key={i} onClick={() => jumpTo(d.line, d.column)}>
                            <span className="loc">line {d.line}{d.column ? ':' + d.column : ''}</span>
                            <span className={`sev ${d.severity}`}>{d.severity}</span>
                            <span className="msg">{d.message}</span>
                          </div>
                        ))
                      ) : <pre className="raw-compile">{customOut.compileError}</pre>}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="custom-head" style={{ marginTop: 16 }}>
                      <div className="lbl">Your output</div>
                      <div className="spacer" />
                      <span className={`verdict ${customOut.verdict === 'OK' ? 'AC' : customOut.verdict}`}>
                        {customOut.verdict === 'OK' ? 'RAN' : customOut.verdict}
                      </span>
                      <span className="mutedmono">{customOut.timeMs} ms</span>
                    </div>
                    <pre className="custom-out">{customOut.stdout || '(no output)'}</pre>
                    {customOut.message && <div className="why">{customOut.message}</div>}
                  </>
                )}
              </>
            )}
          </div>
        )}
      </section>

      {/* ================================================= RIGHT: editor */}
      <section className="pane">
        <div className="pane-head">
          <span className="t">{prob.docId} · {prob.title}</span>
          <span className={`chip d-${prob.difficulty}`}>{prob.difficulty}</span>
          <div className="spacer" />
          <select className="lang" value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>
          <span className="mutedmono">
            {lang === 'java' ? prob.timeLimitMs * 3 : prob.timeLimitMs} ms{lang === 'java' && ' (×3)'}
          </span>
          <span className="mutedmono">{saved ? 'saved' : 'saving…'}</span>
          <button className="btn sm" disabled={!!busy} onClick={() => setConfirmReset(true)}
                  title="Reset this file back to the starter">
            {busy === 'reset' ? <span className="spin" /> : 'Reset'}
          </button>
          <button className="btn sm" disabled={!!busy} onClick={() => run('run')} title="Ctrl + '">
            {busy === 'run' ? <span className="spin" /> : 'Run'} <kbd>Ctrl '</kbd>
          </button>
          <button className="btn sm primary" disabled={!!busy} onClick={() => run('submit')} title="Ctrl + Enter">
            {busy === 'submit' ? <span className="spin" /> : 'Submit'} <kbd>Ctrl ↵</kbd>
          </button>
        </div>

        <div className="editor-wrap">
          <CodeMirror
            value={code}
            height="100%"
            theme={isDark ? githubDark : githubLight}
            extensions={[lang === 'java' ? java() : cpp()]}
            onChange={onChange}
            onCreateEditor={(v) => { viewRef.current = v; }}
            basicSetup={{ lineNumbers: true, highlightActiveLine: true, tabSize: 4, autocompletion: false }}
          />
        </div>
      </section>

      {/* ================================================= reset confirmation */}
      {confirmReset && (
        <div className="modal-backdrop" onClick={() => setConfirmReset(false)}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="reset-title"
               onClick={(e) => e.stopPropagation()}>
            <h3 id="reset-title">Reset your code?</h3>
            <p>
              This replaces <code>{file}</code> with the blank starter for
              {' '}<b>{lang === 'java' ? 'Java' : 'C++'}</b>. Everything you have written for
              {' '}<b>{prob.docId} · {prob.title}</b> goes away.
            </p>
            <p className="fine">
              A timestamped copy is saved to <code>workspace/.backup/</code> first, so this is recoverable.
            </p>
            <div className="modal-actions">
              <button className="btn" onClick={() => setConfirmReset(false)} autoFocus>Cancel</button>
              <button className="btn danger" onClick={doReset}>Yes, reset it</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
