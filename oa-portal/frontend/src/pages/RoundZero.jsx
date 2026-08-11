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

const TIERS = [
  { key: 'all',    label: 'Everything' },
  { key: 'must',   label: 'Must do' },
  { key: 'should', label: 'Should do' },
  { key: 'edge',   label: 'If time' },
  { key: 'todo',   label: 'Unfinished' },
];

const TIER_LABEL = { must: 'must do', should: 'should do', edge: 'if time' };

const num = (x) => (Number.isFinite(x) ? x : 0);

function hrs(mins) {
  const m = num(mins);
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60), r = m % 60;
  return r ? `${h} h ${r} m` : `${h} h`;
}

export default function RoundZero() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');
  const [tier, setTier] = useState('all');

  useEffect(() => { api.rz().then(setData).catch((e) => setErr(e.message)); }, []);

  const tracks = useMemo(() => {
    if (!data) return [];
    return data.tracks
      .map((t) => ({
        ...t,
        sheets: t.sheets.filter((s) => {
          if (tier === 'todo') return !s.complete;
          if (tier === 'all') return true;
          return s.tier === tier;
        }),
      }))
      .filter((t) => t.sheets.length > 0);
  }, [data, tier]);

  if (err && !data) return <div className="page"><div className="err">{err}</div></div>;
  if (!data) return <div className="center-note">Loading…</div>;

  const s = data.summary || {};
  const all = data.tracks.flatMap((t) => t.sheets);
  const counts = {
    all: all.length,
    must: all.filter((x) => x.tier === 'must').length,
    should: all.filter((x) => x.tier === 'should').length,
    edge: all.filter((x) => x.tier === 'edge').length,
    todo: all.filter((x) => !x.complete).length,
  };

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>{data.name}</h1>
          <p>{data.blurb}</p>
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <Ring value={s.checksDone} total={s.checks} />
          <div className="txt"><div className="k">Checkpoints</div>
            <div className="v">{num(s.checksDone)}<small> / {num(s.checks)}</small></div></div>
        </div>
        <div className="stat">
          <Ring value={s.sheetsDone} total={s.sheets} green />
          <div className="txt"><div className="k">Sheets finished</div>
            <div className="v">{num(s.sheetsDone)}<small> / {num(s.sheets)}</small></div></div>
        </div>
        <div className="stat">
          <div className="txt"><div className="k">Reading left</div>
            <div className="v" style={{ fontSize: 22 }}>{hrs(s.minsLeft)}</div></div>
        </div>
        <div className="stat">
          <div className="txt"><div className="k">Whole shelf</div>
            <div className="v" style={{ fontSize: 22 }}>{hrs(s.mins)}</div></div>
        </div>
      </div>

      <div className="toolbar">
        <div className="segs">
          {TIERS.map((f) => (
            <button key={f.key} className={tier === f.key ? 'on' : ''} onClick={() => setTier(f.key)}>
              {f.label}<span className="n">{num(counts[f.key])}</span>
            </button>
          ))}
        </div>
      </div>

      {tracks.map((t) => (
        <div key={t.id} className="group">
          <div className="group-head rz-track-head">
            <span>{t.title}</span>
            <span className="rz-track-blurb">{t.blurb}</span>
            <span className="rz-track-count">{t.complete}/{t.sheets.length} done</span>
          </div>
          <div className="list">
            {t.sheets.map((sh) => {
              const pct = sh.checks > 0 ? Math.round((sh.done / sh.checks) * 100) : 0;
              return (
                <div className={`row rz-row${sh.complete ? ' done' : ''}`} key={sh.id}>
                  <span className={`state locked${sh.complete ? ' on' : ''}`}
                        title={sh.complete ? 'Every checkpoint ticked' : `${sh.done} of ${sh.checks} checkpoints`}>✓</span>

                  <div className="main">
                    <div className="title">
                      <a href={`#/rz/${sh.id}`}>{sh.title}</a>
                      <span className={`chip rz-${sh.tier}`}>{TIER_LABEL[sh.tier] || sh.tier}</span>
                      {sh.missing && <span className="chip soon">not written yet</span>}
                    </div>
                    <div className="meta">
                      <span>{sh.mins} min read</span>
                      <span>{sh.done}/{sh.checks} checkpoints</span>
                    </div>
                    <div className="rz-bar"><i style={{ width: `${pct}%` }} /></div>
                  </div>

                  <div className="right">
                    <a className={`btn sm ${sh.complete ? '' : 'primary'}`} href={`#/rz/${sh.id}`}>
                      {sh.done === 0 ? 'Open' : sh.complete ? 'Review' : 'Continue'}
                    </a>
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
