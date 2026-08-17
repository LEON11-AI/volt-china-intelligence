import React from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../src/lib/analytics';

const accessPoints = [
  'Product and configuration matching',
  'Written requirement coordination',
  'Project-specific quotation requests',
  'Manufacturer introduction and order coordination',
  '100% async written workflow',
];

const RoboticsAccessPilot: React.FC = () => (
  <section className="border-y border-slate-800 bg-slate-900 py-16 md:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">Robotics Access Pilot</p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-white md:text-4xl">Access Chinese Robotics Platforms for Research and Integration</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">VoltChina helps universities, embodied-AI labs, robotics research teams, and qualified technical integrators identify suitable Chinese robotics platforms and coordinate project-specific requirements with manufacturers.</p>
          <Link to="/robotics#robotics-requirement" onClick={() => trackEvent('click_robotics_access')} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-volt px-6 py-3.5 font-bold text-white shadow-lg shadow-volt/20 transition-all hover:bg-volt-hover hover:shadow-volt/40 sm:w-auto">Submit a Robotics Requirement <i className="fa-solid fa-arrow-right text-xs" /></Link>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-950/80 p-6 shadow-2xl shadow-black/25 backdrop-blur-xl md:p-8">
          <ul className="space-y-4">
            {accessPoints.map((item) => <li key={item} className="flex items-start gap-3 text-slate-200"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-volt/10 text-xs text-volt"><i className="fa-solid fa-check" /></span><span>{item}</span></li>)}
          </ul>
        </div>
      </div>

      <p className="mt-10 border-t border-slate-800 pt-6 text-sm leading-relaxed text-slate-500">Project availability, pricing, warranty, technical support, delivery terms, and regional eligibility are confirmed with the manufacturer for each qualified opportunity. VoltChina does not currently provide local installation or on-site engineering support.</p>
    </div>
  </section>
);

export default RoboticsAccessPilot;
