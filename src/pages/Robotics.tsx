import React from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import PageHero from '../../components/PageHero';
import RoboticsRequestForm from '../../components/RoboticsRequestForm';
import { trackEvent } from '../lib/analytics';

const audiences = [
  'Universities and academic research labs',
  'Embodied-AI and robotics R&D teams',
  'Qualified robotics integrators with in-house technical capability',
];

const coordination = [
  'Product and configuration fit',
  'Written requirement clarification',
  'Manufacturer availability and quotation request',
  'Commercial term clarification',
  'Manufacturer introduction and order coordination',
];

const steps = [
  ['Step 1', 'Submit a defined requirement', 'Describe the intended use, technical configuration, quantity, destination, and purchasing timeframe.'],
  ['Step 2', 'VoltChina qualifies the request in writing', 'Suitability, missing information, and the next written step are clarified by email.'],
  ['Step 3', 'Project terms are checked', 'Product availability and project-specific commercial terms are checked with the manufacturer.'],
  ['Step 4', 'Receive the written result', 'The buyer receives the written result and decides whether to proceed.'],
];

const Robotics: React.FC = () => <div className="min-h-screen overflow-x-hidden bg-slate-950 font-sans text-slate-200">
  <Navbar forceDark />
  <main>
    <PageHero
      eyebrow="ROBOTICS ACCESS PILOT"
      title="Access Chinese Robotics Platforms for Research and Integration"
      description="VoltChina helps qualified overseas research and technical teams identify suitable Chinese robotics platforms, clarify written requirements, and coordinate project-specific commercial questions with manufacturers."
    >
      <div className="text-center">
        <a href="#robotics-requirement" onClick={() => trackEvent('click_robotics_access')} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-volt px-6 py-3.5 font-bold text-white shadow-lg shadow-volt/20 transition-all hover:bg-volt-hover hover:shadow-volt/40 sm:w-auto">Submit a Robotics Requirement <i className="fa-solid fa-arrow-right text-xs" /></a>
        <p className="mx-auto mt-5 max-w-4xl text-sm leading-relaxed text-slate-400">Availability, pricing, warranty, support, delivery, export eligibility, and commercial terms are confirmed for each qualified project. VoltChina does not currently provide local installation, on-site engineering, customs brokerage, logistics, or after-sales support unless explicitly confirmed in writing for a specific project.</p>
      </div>
    </PageHero>

    <section className="border-y border-slate-800 bg-slate-900 py-16 md:py-20"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start"><div><p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">Who This Is For</p><h2 className="text-3xl font-bold text-white md:text-4xl">Qualified technical teams with a defined project.</h2></div><div className="grid gap-4">{audiences.map((item) => <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950 p-5 text-slate-200"><i className="fa-solid fa-check mt-1 text-volt" /><span>{item}</span></div>)}</div></div></div></section>

    <section className="bg-slate-950 py-16 md:py-20"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><div className="mb-10 max-w-3xl"><p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">What VoltChina Coordinates</p><h2 className="text-3xl font-bold text-white md:text-4xl">A written path from requirement to manufacturer response.</h2></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{coordination.map((item) => <div key={item} className="rounded-xl border border-slate-800 bg-slate-900/70 p-5"><i className="fa-solid fa-arrow-right-long text-volt" /><p className="mt-4 text-sm leading-relaxed text-slate-300">{item}</p></div>)}</div></div></section>

    <section className="border-y border-slate-800 bg-slate-900 py-16 md:py-20"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><div className="mb-10 max-w-3xl"><p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">How It Works</p><h2 className="text-3xl font-bold text-white md:text-4xl">Four written steps. No meeting required.</h2></div><div className="grid gap-5 md:grid-cols-2">{steps.map(([number, title, description]) => <div key={number} className="rounded-2xl border border-slate-800 bg-slate-950 p-6"><span className="text-sm font-bold tracking-[0.18em] text-volt">{number}</span><h3 className="mb-3 mt-3 text-xl font-bold text-white">{title}</h3><p className="leading-relaxed text-slate-400">{description}</p></div>)}</div><p className="mt-8 text-center text-sm font-medium text-slate-300">100% async. No phone or video meeting is required.</p></div></section>

    <section id="robotics-requirement" className="scroll-mt-24 bg-slate-950 py-16 md:scroll-mt-28 md:py-20"><div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8"><div><p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">Project Requirement</p><h2 className="mb-5 text-3xl font-bold text-white md:text-4xl">Submit a Robotics Requirement</h2><p className="max-w-xl text-lg leading-relaxed text-slate-300">Provide a defined research, integration, or purchasing requirement. VoltChina will review it and reply in writing, normally within 1–2 business days.</p><div className="mt-8 space-y-4 text-sm text-slate-400"><p className="flex gap-3"><i className="fa-solid fa-list-check mt-1 text-volt" /><span>Specific project details make manufacturer qualification faster.</span></p><p className="flex gap-3"><i className="fa-solid fa-envelope mt-1 text-volt" /><span>Availability, scope, and next steps are handled in writing.</span></p><p className="flex gap-3"><i className="fa-solid fa-shield-halved mt-1 text-volt" /><span>No online payment or purchase obligation is created by this form.</span></p></div></div><RoboticsRequestForm /></div></section>
  </main>
  <Footer />
</div>;

export default Robotics;
