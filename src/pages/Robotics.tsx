import React from 'react';
import { Link } from 'react-router-dom';
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

const reasons = [
  ['China-Source Product Research', 'We review Chinese-language product materials, configurations, manufacturer information, and domestic-market context that may be difficult to identify through overseas channels alone.'],
  ['Requirement-First Platform Screening', 'We start with the buyer’s stated research goals, technical requirements, budget, destination, and timeline to identify potentially relevant platforms for further evaluation.'],
  ['Structured Manufacturer Inquiries', 'We turn broad research needs into structured written questions covering configuration, interfaces, software environment, availability, project eligibility, quotation requirements, and stated support terms.'],
  ['Written Comparison and Coordination', 'We organize manufacturer-confirmed information, commercial differences, stated limitations, unresolved questions, and next-step options so the buyer can decide whether to request a quote, conduct deeper technical evaluation, or proceed no further.'],
];

const capabilities = ['Requirement Mapping', 'Platform Screening', 'Written Manufacturer Confirmation', 'Commercial Coordination'];

const steps = [
  ['Step 1', 'Tell us what you are trying to achieve'],
  ['Step 2', 'VoltChina structures the technical and project requirement'],
  ['Step 3', 'Potentially relevant platforms are screened'],
  ['Step 4', 'Written questions are coordinated with relevant manufacturers for accepted projects'],
  ['Step 5', 'VoltChina organizes the confirmed information, limitations, and unresolved questions for the buyer’s next-step decision'],
];

const Robotics: React.FC = () => <div className="min-h-screen overflow-x-hidden bg-slate-950 font-sans text-slate-200">
  <Navbar forceDark />
  <main>
    <PageHero
      eyebrow="ROBOTICS ACCESS"
      title="A Clearer Path From Robotics Requirements to Manufacturer-Confirmed Options in China"
      description="VoltChina helps overseas research and technical teams move from broad robotics requirements to structured written inquiries, potentially relevant Chinese platforms, and manufacturer-confirmed project information."
      matchHomeHero
    >
      <div className="text-center">
        <a href="#robotics-requirement" onClick={() => trackEvent('click_robotics_access')} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-volt px-6 py-3.5 font-bold text-white shadow-lg shadow-volt/20 transition-all hover:bg-volt-hover hover:shadow-volt/40 sm:w-auto">Tell Us What You Are Trying to Achieve <i className="fa-solid fa-arrow-right text-xs" /></a>
        <p className="mt-5 text-sm font-medium text-slate-400">100% async. No telephone or video meeting is required.</p>
      </div>
    </PageHero>

    <section className="border-y border-slate-800 bg-slate-900 py-16 md:py-20"><div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:px-8"><div><p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">Who We Help</p><h2 className="text-3xl font-bold text-white md:text-4xl">Who This Is For</h2><p className="mt-5 max-w-xl leading-relaxed text-slate-400">Robotics Access is most useful for teams that have a defined research objective but still need to evaluate, clarify, or compare potentially relevant platforms in China.</p></div><div className="grid gap-4">{audiences.map((item) => <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950 p-5 text-slate-200"><i className="fa-solid fa-check mt-1 text-volt" /><span>{item}</span></div>)}</div></div></section>

    <section className="bg-slate-950 py-16 md:py-20"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">Why VoltChina?</p><h2 className="max-w-4xl text-3xl font-bold leading-tight text-white md:text-4xl">You Don’t Need Another Robot Catalog. You Need a Clearer Path to the Right Platform in China.</h2><p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-300">VoltChina reduces the time required to understand, approach, and evaluate selected Chinese robotics platforms before an overseas research or technical team commits to a purchase process.</p><div className="mt-10 grid gap-5 md:grid-cols-2">{reasons.map(([title, description], index) => <article key={title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"><span className="text-sm font-bold tracking-[0.16em] text-volt">0{index + 1}</span><h3 className="mt-3 text-xl font-bold text-white">{title}</h3><p className="mt-3 leading-relaxed text-slate-400">{description}</p></article>)}</div></div></section>

    <section className="border-y border-slate-800 bg-slate-900 py-16 md:py-20"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><div className="mb-9 max-w-3xl"><p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">What We Coordinate</p><h2 className="text-3xl font-bold text-white md:text-4xl">Four focused parts of the written workflow</h2></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{capabilities.map((item) => <div key={item} className="rounded-xl border border-slate-800 bg-slate-950 p-5"><i className="fa-solid fa-arrow-right-long text-volt" /><p className="mt-4 font-semibold leading-relaxed text-slate-200">{item}</p></div>)}</div><p className="mt-8 rounded-xl border border-slate-800 bg-slate-950/70 p-5 text-sm leading-relaxed text-slate-400">Manufacturer-confirmed information represents written statements received from the relevant manufacturer. It is not an independent technical certification or a guarantee of product suitability, regulatory compliance, export eligibility, delivery, warranty, support, or performance. Final terms are confirmed for each accepted project.</p></div></section>

    <section className="bg-slate-950 py-16 md:py-20"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><div className="mb-10 max-w-3xl"><p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">How It Works</p><h2 className="text-3xl font-bold text-white md:text-4xl">From requirement to a clearer next-step decision</h2></div><ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">{steps.map(([number, description]) => <li key={number} className="rounded-xl border border-slate-800 bg-slate-900/70 p-5"><span className="text-sm font-bold tracking-[0.16em] text-volt">{number}</span><p className="mt-4 leading-relaxed text-slate-300">{description}</p></li>)}</ol><p className="mt-8 text-center text-sm font-medium text-slate-300">100% async. No telephone or video meeting is required.</p></div></section>

    <section className="border-y border-slate-800 bg-slate-900 py-12 md:py-14"><div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8"><div className="max-w-3xl"><p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-volt">China-Source Research</p><h2 className="text-2xl font-bold text-white md:text-3xl">Built on a China-Source Research Workflow</h2><p className="mt-3 leading-relaxed text-slate-400">VoltChina follows Chinese-language technology, product, company, and industry sources and uses a source-conscious written workflow to help international audiences understand information that can be difficult to evaluate from outside China.</p></div><Link to="/research/byd-solid-state-battery-2026" onClick={() => trackEvent('click_public_sample')} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-5 py-3 font-bold text-white transition-colors hover:border-volt/70 hover:bg-slate-700">View a Public Research Sample <i className="fa-solid fa-arrow-right text-xs" /></Link></div></section>

    <section id="robotics-requirement" className="scroll-mt-24 bg-slate-950 py-16 md:scroll-mt-28 md:py-20"><div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8"><div><p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">Robotics Access</p><h2 className="mb-5 text-3xl font-bold text-white md:text-4xl">Tell Us What You Are Trying to Achieve</h2><p className="max-w-xl text-lg leading-relaxed text-slate-300">Describe the research, technical, or integration objective behind the requirement. VoltChina will review it and reply in writing, normally within 1–2 business days.</p><div className="mt-8 space-y-4 text-sm text-slate-400"><p className="flex gap-3"><i className="fa-solid fa-list-check mt-1 text-volt" /><span>Specific requirements help structure the right written questions.</span></p><p className="flex gap-3"><i className="fa-solid fa-envelope mt-1 text-volt" /><span>Manufacturer interaction and next steps are coordinated in writing.</span></p><p className="flex gap-3"><i className="fa-solid fa-shield-halved mt-1 text-volt" /><span>No online payment or purchase obligation is created by this form.</span></p></div></div><RoboticsRequestForm /></div></section>
  </main>
  <Footer />
</div>;

export default Robotics;