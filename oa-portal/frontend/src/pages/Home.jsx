import { useEffect, useState, useMemo } from 'react';
import { api } from '../api.js';

function Ring({ value, total, green }) {
  const v = Number.isFinite(value) ? value : 0;
  const t = Number.isFinite(total) ? total : 0;
  const pct = t > 0 ? Math.max(0, Math.min(1, v / t)) : 0;
  const R = 18, C = 2 * Math.PI * R;
  return (
    <div className={`ring${green ? ' green' : ''}`}>
      <svg width="44" height="44">
        <circle className="trk" cx="22" cy="22" r={R} fill="none" strokeWidth="4" />
        <circle className="val" cx="22" cy="22" r={R} fill="none" strokeWidth="4"
                strokeDasharray={C} strokeDashoffset={C * (1 - pct)} />
      </svg>
      <span className="pct">{Math.round(pct * 100)}%</span>
    </div>
  );
}

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'playable', label: 'Solve here' },
  { key: 'external', label: 'External' },
  { key: 'soon', label: 'Coming soon' },
  { key: 'todo', label: 'To do' },
  { key: 'Z', label: 'Aptitude' },
];

/** Never render NaN: coerce anything non-numeric to 0. */
const num = (x) => (Number.isFinite(x) ? x : 0);

export default function Home() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');
  const [filter, setFilter] = useState('all');
  const [q, setQ] = useState('');

  const load = () => api.catalog().then(setData).catch((e) => setErr(e.message));
  useEffect(() => { load(); }, []);

  const isDone = (it) => (it.playable ? !!it.solved : it.status === 'done');
  const isSoon = (it) => !it.playable && !it.url && it.series !== 'Z';

  async function toggle(item) {
    const next = item.status === 'done' ? 'todo' : 'done';
    setData((d) => ({
      ...d,
      items: d.items.map((x) => (x.docId === item.docId ? { ...x, status: next } : x)),
      summary: { ...d.summary, done: num(d.summary.done) + (next === 'done' ? 1 : -1) },
    }));
    try { await api.setPlatform(item.docId, next); }
    catch (e) { setErr(e.message); load(); }
  }

  const shown = useMemo(() => {
    if (!data) return [];
    const needle = q.trim().toLowerCase();
    return (data.items || []).filter((it) => {
      if (filter === 'playable' && !it.playable) return false;
      if (filter === 'external' && it.kind !== 'platform') return false;
      if (filter === 'soon' && !isSoon(it)) return false;
      if (filter === 'todo' && isDone(it)) return false;
      if (filter === 'Z' && it.series !== 'Z') return false;
      if (needle && !`${it.docId} ${it.title} ${it.source || ''} ${it.section || ''}`
            .toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [data, filter, q]);

  // group consecutive rows under their section heading from the plan
  const groups = useMemo(() => {
    const out = [];
    for (const it of shown) {
      const key = it.section || 'Other';
      if (!out.length || out[out.length - 1].key !== key) out.push({ key, rows: [it] });
      else out[out.length - 1].rows.push(it);
    }
    return out;
  }, [shown]);

  if (err && !data) return <div className="page"><div className="err">{err}</div></div>;
  if (!data) return <div className="center-note">Loading…</div>;

  const s = data.summary || {};
  const items = data.items || [];
  const counts = {
    all: items.length,
    playable: items.filter((x) => x.playable).length,
    external: items.filter((x) => x.kind === 'platform').length,
    soon: items.filter(isSoon).length,
    todo: items.filter((x) => !isDone(x)).length,
    Z: items.filter((x) => x.series === 'Z').length,
  };

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Question Bank</h1>
          <p>
            <b>{num(s.playable)}</b> problems are judged right here — hidden tests, real time
            limits, C++ and Java. <b>{num(s.external)}</b> open on LeetCode, CSES or Codeforces.
            <b> {counts.soon}</b> are queued and being built in question order.
            <b> {counts.Z}</b> are aptitude, which a code judge cannot grade.
          </p>
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <Ring value={s.done} total={s.total} />
          <div className="txt"><div className="k">Overall</div>
            <div className="v">{num(s.done)}<small> / {num(s.total)}</small></div></div>
        </div>
        <div className="stat">
          <Ring value={s.playableSolved} total={s.playable} green />
          <div className="txt"><div className="k">Solved here</div>
            <div className="v">{num(s.playableSolved)}<small> / {num(s.playable)}</small></div></div>
        </div>
        <div className="stat">
          <Ring value={s.externalDone} total={s.external} green />
          <div className="txt"><div className="k">External done</div>
            <div className="v">{num(s.externalDone)}<small> / {num(s.external)}</small></div></div>
        </div>
        <div className="stat">
          <Ring value={s.aptitudeDone} total={s.aptitude} />
          <div className="txt"><div className="k">Aptitude</div>
            <div className="v">{num(s.aptitudeDone)}<small> / {num(s.aptitude)}</small></div></div>
        </div>
      </div>

      <div className="toolbar">
        <div className="segs">
          {FILTERS.map((f) => (
            <button key={f.key} className={filter === f.key ? 'on' : ''} onClick={() => setFilter(f.key)}>
              {f.label}<span className="n">{num(counts[f.key])}</span>
            </button>
          ))}
        </div>
        <input className="search" placeholder={`Search ${num(s.total)} questions…`}
               value={q} onChange={(e) => setQ(e.target.value)} />
        <span className="mutedmono">{shown.length} shown</span>
      </div>

      {groups.length === 0 && <div className="list"><div className="empty-list">Nothing matches.</div></div>}

      {groups.map((g) => (
        <div key={g.key + g.rows[0].docId} className="group">
          <div className="group-head">{g.key}</div>
          <div className="list">
            {g.rows.map((it) => {
              const done = isDone(it);
              const soon = isSoon(it);
              return (
                <div className={`row${it.playable ? ' modelled' : ''}${done ? ' done' : ''}${soon ? ' soon' : ''}`}
                     key={it.docId}>
                  {it.playable ? (
                    <span className={`state locked${done ? ' on' : ''}`}
                          title={done ? 'Accepted by the judge' : 'Solve it here to tick this'}>✓</span>
                  ) : (
                    <button className={`state clickable${done ? ' on' : ''}`} onClick={() => toggle(it)}
                            title={done ? 'Mark as not done' : 'Mark as done'}>✓</button>
                  )}

                  <div className="qid">{it.docId}</div>

                  <div className="main">
                    <div className="title">
                      {it.playable ? (
                        <a href={`#/solve/${it.id}`}>{it.title}</a>
                      ) : it.url ? (
                        <a href={it.url} target="_blank" rel="noreferrer">{it.title} ↗</a>
                      ) : (
                        <span className="plain-title">{it.title}</span>
                      )}

                      {it.playable && <span className="chip k-modelled">solve here</span>}
                      {soon && <span className="chip soon">coming soon</span>}
                      {!it.playable && it.source && <span className="chip k-platform">{it.source}</span>}
                      {!it.playable && !it.source && it.series === 'Z' && (
                        <span className="chip k-platform">aptitude</span>
                      )}
                      <span className={`chip d-${it.difficulty}`}>{it.difficulty}</span>
                      {done && it.playable && <span className="chip solved">accepted</span>}
                    </div>

                    <div className="meta">
                      {it.playable ? (
                        <>
                          <span>{it.id}</span>
                          <span>{it.tests} hidden tests</span>
                          <span>{it.timeLimitMs} ms</span>
                          {it.attempts > 0 && <span>{it.attempts} attempt{it.attempts > 1 ? 's' : ''}</span>}
                          {it.bestMs != null && <span>best {it.bestMs} ms</span>}
                        </>
                      ) : soon ? (
                        <>
                          <span>judge not built yet</span>
                          {it.hasStatement && <span>statement is in the plan document</span>}
                          {it.reserved && <span>reserved for {it.reserved} sets</span>}
                        </>
                      ) : (
                        <>
                          {it.url && <span>opens on {it.source}</span>}
                          {it.url && !it.urlExact && <span>link is a search</span>}
                          {it.note && <span>{it.note}</span>}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="right">
                    {it.playable ? (
                      <a className={`btn sm ${done ? '' : 'primary'}`} href={`#/solve/${it.id}`}>
                        {done ? 'Review' : 'Solve'}
                      </a>
                    ) : it.url ? (
                      <a className="btn sm" href={it.url} target="_blank" rel="noreferrer">Open ↗</a>
                    ) : (
                      <span className="soon-label">{it.series === 'Z' ? 'aptitude' : 'coming soon'}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
