import React from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../src/lib/analytics';

const PricingPlans: React.FC = () => (
  <section id="plans" className="scroll-mt-24 border-t border-slate-900 bg-slate-950 py-16 md:scroll-mt-28 md:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">Choose a path</p>
        <h2 className="text-3xl font-bold text-white md:text-4xl">Bring a defined project or research question</h2>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
        <EntryCard
          eyebrow="Robotics Access"
          title="Coordinate a robotics platform requirement"
          description="For universities, embodied-AI labs, robotics R&D teams, and qualified integrators with a defined platform or project requirement."
          button="Submit a Robotics Requirement"
          to="/robotics#robotics-requirement"
          event="click_robotics_access"
        />
        <EntryCard
          eyebrow="China Intelligence"
          title="Verify a focused China claim"
          description="For teams that need a source-verified answer to a focused Chinese company, technology, supplier, or commercialization claim."
          button="Explore Research Services"
          to="/intelligence"
        />
      </div>

      <div id="brief" className="mx-auto mt-8 flex max-w-6xl scroll-mt-24 flex-col gap-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl md:scroll-mt-28 md:flex-row md:items-center md:justify-between md:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-volt">Free Brief</p>
          <h3 className="mt-2 text-2xl font-bold text-white">Follow the Free Brief</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">Weekly China-source analysis on EVs, batteries, robotics, and advanced manufacturing.</p>
        </div>
        <a href="https://voltchina.substack.com/subscribe" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('click_subscribe')} className="inline-flex shrink-0 items-center justify-center rounded-lg bg-volt px-6 py-3.5 font-bold text-white shadow-lg shadow-volt/20 transition-all hover:bg-volt-hover hover:shadow-volt/40">Subscribe Free</a>
      </div>
    </div>
  </section>
);

const EntryCard: React.FC<{ eyebrow: string; title: string; description: string; button: string; to: string; event?: string }> = ({ eyebrow, title, description, button, to, event }) => (
  <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-7 backdrop-blur-xl transition-colors hover:border-slate-700 md:p-8">
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-volt">{eyebrow}</p>
    <h3 className="mt-3 text-2xl font-bold text-white">{title}</h3>
    <p className="mt-4 flex-1 leading-relaxed text-slate-400">{description}</p>
    <Link to={to} onClick={() => event && trackEvent(event)} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-5 py-3 font-bold text-white transition-all hover:border-volt/70 hover:bg-slate-700">{button} <i className="fa-solid fa-arrow-right text-xs" /></Link>
  </div>
);

export default PricingPlans;
