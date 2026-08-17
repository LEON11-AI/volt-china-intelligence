import React from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../src/lib/analytics';

const audiences = ['Universities', 'Robotics Labs', 'Embodied-AI Teams', 'Qualified Integrators'];

const RoboticsAccessPilot: React.FC = () => (
  <section className="border-y border-slate-800 bg-slate-900 py-12 md:py-14">
    <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-end lg:px-8">
      <div className="max-w-4xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">Robotics Access</p>
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">A Clearer Path From Robotics Requirements to Manufacturer-Confirmed Options in China</h2>
        <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">VoltChina helps overseas research and technical teams structure their requirements, identify potentially relevant Chinese robotics platforms, coordinate written questions with manufacturers, and understand the confirmed options and unresolved issues before deciding what to do next.</p>
        <div className="mt-6 flex flex-wrap gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-[0.13em] text-slate-400">{audiences.map((audience, index) => <React.Fragment key={audience}><span>{audience}</span>{index < audiences.length - 1 && <span className="text-volt">·</span>}</React.Fragment>)}</div>
      </div>
      <Link to="/robotics" onClick={() => trackEvent('click_robotics_access')} className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-volt px-6 py-3.5 font-bold text-white shadow-lg shadow-volt/20 transition-all hover:bg-volt-hover hover:shadow-volt/40 sm:w-auto">Explore Robotics Access <i className="fa-solid fa-arrow-right text-xs" /></Link>
    </div>
  </section>
);

export default RoboticsAccessPilot;