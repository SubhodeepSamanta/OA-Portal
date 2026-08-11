import { useEffect, useRef, useState, useCallback } from 'react';
import { marked } from 'marked';
import { api } from '../api.js';

marked.setOptions({ gfm: true, breaks: false });

const TIER_LABEL = { must: 'must do', should: 'should do', edge: 'if time' };

export default function Sheet({ id }) {
  const [sheet, setSheet] = useState(null);
  const [checked, setChecked] = useState([]);
  const [err, setErr] = useState('');
  const bodyRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    let alive = true;
    setSheet(null); setErr('');
    api.rzSheet(id)
      .then((s) => { if (!alive) return; setSheet(s); setChecked(s.checked || []); })
      .catch((e) => { if (alive) setErr(e.message); });
    window.scrollTo(0, 0);
    return () => { alive = false; };
  }, [id]);

  const toggle = useCallback(async (i, next) => {
    setChecked((c) => { const d = c.slice(); d[i] = next; return d; });
    try { await api.rzTick(id, i, next ? 'done' : 'todo'); }
    catch (e) {
      setErr(e.message);
      setChecked((c) => { const d = c.slice(); d[i] = !next; return d; });
    }
  }, [id]);

  const setAll = useCallback(async (next) => {
    const n = sheet ? sheet.checks : 0;
    const before = checked;
    setChecked(new Array(n).fill(next));
    try { await api.rzTickSheet(id, next ? 'done' : 'todo'); }
    catch (e) { setErr(e.message); setChecked(before); }
  }, [id, sheet, checked]);

  /**
   * `marked` renders GFM task list items as disabled checkboxes. Turn them
   * into live ones: the Nth checkbox in document order is checkpoint N, which
   * is the same order the server counts them in.
   */
  useEffect(() => {
    const root = bodyRef.current;
    if (!root || !sheet) return;
    const boxes = Array.from(root.querySelectorAll('input[type="checkbox"]'));
    const bound = [];
    boxes.forEach((box, i) => {
      box.disabled = false;
      box.checked = !!checked[i];
      const li = box.closest('li');
      if (li) li.classList.toggle('ck-done', !!checked[i]);
      const on = () => toggle(i, box.checked);
      box.addEventListener('change', on);
      bound.push([box, on]);
    });
    return () => bound.forEach(([b, h]) => b.removeEventListener('change', h));
  }, [sheet, checked, toggle]);

  if (err && !sheet) return <div className="page"><div className="err">{err}</div></div>;
  if (!sheet) return <div className="center-note">Loading…</div>;

  const done = checked.filter(Boolean).length;
  const pct = sheet.checks > 0 ? Math.round((done / sheet.checks) * 100) : 0;

  return (
    <div className="page sheet-page" ref={scrollRef}>
      <div className="sheet-head">
        <a className="btn ghost sm" href="#/rz">← Round Zero</a>
        <span className="sheet-crumb">{sheet.trackTitle}</span>
        <span className={`chip rz-${sheet.tier}`}>{TIER_LABEL[sheet.tier] || sheet.tier}</span>
        <span className="mutedmono">{sheet.mins} min</span>
        <div className="spacer" />
        <span className="mutedmono">{done}/{sheet.checks} checkpoints</span>
        <button className="btn sm" onClick={() => setAll(done < sheet.checks)}>
          {done < sheet.checks ? 'Tick all' : 'Clear all'}
        </button>
      </div>

      <div className="sheet-progress"><i style={{ width: `${pct}%` }} /></div>

      {err && <div className="err" style={{ marginTop: 14 }}>{err}</div>}

      <div className="md sheet-body" ref={bodyRef}
           dangerouslySetInnerHTML={{ __html: marked.parse(sheet.markdown) }} />

      <div className="sheet-nav">
        {sheet.prev
          ? <a className="btn" href={`#/rz/${sheet.prev.id}`}>← {sheet.prev.title}</a>
          : <span />}
        {sheet.next
          ? <a className="btn primary" href={`#/rz/${sheet.next.id}`}>{sheet.next.title} →</a>
          : <a className="btn" href="#/rz">Back to the shelf</a>}
      </div>
    </div>
  );
}
