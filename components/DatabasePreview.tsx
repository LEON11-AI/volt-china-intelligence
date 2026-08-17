import React from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../src/lib/analytics';

const evidenceValues = [
  ['fa-language', 'Chinese-language source access'],
  ['fa-code-compare', 'Evidence and claims separated'],
  ['fa-circle-exclamation', 'Technical limits and unknowns included'],
];

const DatabasePreview: React.FC = () => (
  <section className="border-t border-slate-900/50 bg-slate-950 py-16 md:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">Research Evidence</p>
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Inspect a Real Public Research Sample</h2>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {evidenceValues.map(([icon, label]) => (
          <div key={label} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-4 text-sm font-medium text-slate-200 backdrop-blur-lg">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-volt/10 text-volt"><i className={`fa-solid ${icon}`} /></span>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="grid overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-2xl shadow-black/25 md:grid-cols-[0.38fr_0.62fr]">
        <div className="relative min-h-[20rem] overflow-hidden bg-slate-950/70 md:min-h-0">
          <img src="/reports/byd-all-solid-state-battery-evidence-report-cover.png" alt="Cover of the VoltChina BYD all-solid-state battery evidence report" loading="lazy" className="absolute inset-0 h-full w-full max-w-none object-cover object-center" />
        </div>
        <div className="flex flex-col justify-center p-6 md:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-volt">Public Research Sample</p>
          <h3 className="mt-3 text-2xl font-bold leading-tight text-white md:text-3xl">BYD All-Solid-State Battery Commercialization Timeline</h3>
          <p className="mt-4 leading-relaxed text-slate-400">An 11-page evidence report separating public records, reported milestones, confidence levels, counterevidence, and unresolved verification gaps.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {['18 linked sources', '2027 / 2030 confidence', 'Limits stated clearly'].map((item) => <div key={item} className="rounded-lg border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">{item}</div>)}
          </div>
          <Link to="/research/byd-solid-state-battery-2026" onClick={() => trackEvent('click_public_sample')} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-volt px-6 py-3.5 font-bold text-white shadow-lg shadow-volt/20 transition-all hover:bg-volt-hover hover:shadow-volt/40 sm:w-auto sm:self-start">View a Public Research Sample <i className="fa-solid fa-arrow-right text-xs" /></Link>
        </div>
      </div>
    </div>
  </section>
);

export default DatabasePreview;
