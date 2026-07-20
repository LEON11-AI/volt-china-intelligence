import React, { useEffect } from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import SourcingRequestForm from '../../components/SourcingRequestForm';
import { trackEvent } from '../lib/analytics';

const pilotIncludes = [
  'Clarification of one defined sourcing requirement',
  'Initial screening of relevant Chinese suppliers',
  'Legal-identity and public-record checks',
  'Written outreach to selected suppliers',
  'Comparison of quotations, MOQ, lead time, certifications, and payment terms',
  'Clear separation of supplier claims, reviewed documents, public evidence, and verification gaps',
  'Direct buyer–supplier introduction after the buyer selects a candidate',
];

const evidenceLabels = ['Legal identity checked', 'Document reviewed', 'Supplier-claimed', 'Publicly reported', 'Third-party verified', 'Not yet verified'];

const sourcingSteps = [
  ['Step 1', 'Submit a Specific Requirement', 'Provide the product, specifications, quantity, destination, certification requirements, and timeline.'],
  ['Step 2', 'Receive a Written Scope', 'VoltChina reviews suitability and replies with the defined scope, exclusions, fixed service fee, possible success-fee terms if applicable, and delivery date.'],
  ['Step 3', 'Approve the Paid Pilot', 'Work begins only after written approval, an appropriate service agreement, and payment. The website itself does not collect payment at this validation stage.'],
  ['Step 4', 'Receive the Supplier Comparison', 'The buyer receives a written shortlist and comparison. Any purchase contract, goods payment, logistics, inspection, and customs work remain directly between the appropriate commercial parties.'],
];

const Sourcing: React.FC = () => {
  useEffect(() => {
    document.title = 'China Supplier Verification & RFQ Pilot | VoltChina';
    trackEvent('view_sourcing_pilot');
  }, []);

  return <div className="min-h-screen overflow-x-hidden bg-slate-950 font-sans text-slate-200">
    <Navbar forceDark />
    <main>
      <section className="relative overflow-hidden pb-20 pt-32 lg:pb-28 lg:pt-44">
        <div className="pointer-events-none absolute left-1/2 top-0 h-full w-full max-w-7xl -translate-x-1/2"><div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-volt/10 blur-[120px]" /><div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-blue-900/10 blur-[120px]" /></div>
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-volt/30 bg-volt/10 px-3 py-1 text-xs font-bold tracking-[0.18em] text-volt"><i className="fa-solid fa-briefcase" /> COMMERCIAL PILOT</div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">China Supplier Verification &amp; RFQ Pilot</p>
          <h1 className="mb-6 max-w-5xl text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">Identify and verify Chinese EV and robotics suppliers before placing an order.</h1>
          <p className="mb-9 max-w-4xl text-lg leading-relaxed text-slate-300 md:text-xl">VoltChina helps overseas importers, distributors, and technical teams screen Chinese suppliers, collect comparable written quotations, identify verification gaps, and arrange direct introductions.</p>
          <a href="#sourcing-request" onClick={() => trackEvent('click_submit_sourcing_requirement')} className="inline-flex items-center justify-center gap-2 rounded-lg bg-volt px-6 py-3.5 font-bold text-white shadow-lg shadow-volt/20 transition-all hover:bg-volt-hover hover:shadow-volt/40">Submit a Sourcing Requirement <i className="fa-solid fa-arrow-right text-xs" /></a>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-400">Paid pilot service. 100% async. No call required. Suitability, scope, fixed service fee, and delivery date are confirmed in writing before any work begins.</p>
        </div></div>
      </section>

      <section className="border-y border-slate-800 bg-slate-900 py-20"><div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
        <div><p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">Who this is for</p><h2 className="mb-5 text-3xl font-bold text-white md:text-4xl">A defined buying need, not a general supplier search.</h2><p className="max-w-3xl text-lg leading-relaxed text-slate-300">For overseas importers, distributors, system integrators, and technical teams with a specific product requirement, estimated quantity, destination market, and purchasing timeline.</p></div>
        <div className="rounded-2xl border border-volt/25 bg-slate-950 p-6"><div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-volt/10 text-volt"><i className="fa-solid fa-circle-info" /></div><p className="leading-relaxed text-slate-300">This service is not designed for general curiosity, consumer vehicle imports, or free supplier lists.</p></div>
      </div></section>

      <section className="bg-slate-950 py-20"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><div className="mb-10 max-w-3xl"><p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">What the pilot can include</p><h2 className="text-3xl font-bold text-white md:text-4xl">Buyer-side screening and written RFQ coordination.</h2></div><div className="grid gap-4 md:grid-cols-2">{pilotIncludes.map((item) => <div key={item} className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900 p-5 text-slate-300"><i className="fa-solid fa-check mt-1 text-volt" /><span className="leading-relaxed">{item}</span></div>)}</div></div></section>

      <section className="border-y border-slate-800 bg-slate-900 py-20"><div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8"><div><p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">What VoltChina does not do</p><h2 className="text-3xl font-bold text-white md:text-4xl">Clear commercial boundaries.</h2></div><div className="rounded-2xl border border-slate-800 bg-slate-950 p-7 leading-relaxed text-slate-300"><p>VoltChina does not sell or export goods, receive purchase payments, act as importer or exporter of record, provide customs brokerage, arrange regulated logistics, perform factory inspection, or guarantee product quality, supplier performance, delivery, customs clearance, or transaction outcomes.</p><p className="mt-5 text-slate-400">Product inspection, shipping, insurance, customs clearance, and payment are handled directly by the buyer, supplier, or appropriately licensed third-party providers.</p></div></div></section>

      <section className="bg-slate-950 py-20"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><div className="mb-10 max-w-3xl"><p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">How it works</p><h2 className="text-3xl font-bold text-white md:text-4xl">A written pilot before commercial commitments.</h2></div><div className="grid gap-5 md:grid-cols-2">{sourcingSteps.map(([number, title, description]) => <div key={number} className="rounded-2xl border border-slate-800 bg-slate-900 p-6"><span className="text-sm font-bold tracking-[0.18em] text-volt">{number}</span><h3 className="mb-3 mt-3 text-xl font-bold text-white">{title}</h3><p className="leading-relaxed text-slate-400">{description}</p></div>)}</div></div></section>

      <section className="border-y border-slate-800 bg-slate-900 py-20"><div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8"><div><p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">Evidence labels</p><h2 className="mb-5 text-3xl font-bold text-white md:text-4xl">Every supplier signal is labelled by its evidentiary status.</h2><p className="leading-relaxed text-slate-400">A valid business registration does not by itself prove production capacity, product conformity, export experience, or delivery performance.</p></div><div className="grid gap-3 sm:grid-cols-2">{evidenceLabels.map((label) => <div key={label} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm font-medium text-slate-300"><i className="fa-solid fa-tag text-volt" />{label}</div>)}</div></div></section>

      <section className="bg-slate-950 py-20"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><div className="rounded-2xl border border-volt/25 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-7 md:p-10"><p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">Commercial independence</p><p className="max-w-4xl text-lg leading-relaxed text-slate-300">Sourcing and supplier-introduction work is a separate commercial service. Any supplier-paid commission or commercial relationship must be disclosed to the buyer and kept separate from VoltChina&rsquo;s independent research conclusions.</p></div></div></section>

      <section id="sourcing-request" className="scroll-mt-24 border-t border-slate-800 bg-slate-900 py-20 md:scroll-mt-28"><div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8"><div><p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">Sourcing request</p><h2 className="mb-5 text-3xl font-bold text-white md:text-4xl">Submit a Sourcing Requirement</h2><p className="max-w-xl text-lg leading-relaxed text-slate-300">Submit one specific purchasing requirement. VoltChina will review whether it is suitable for a written supplier-verification and RFQ pilot. No call is required.</p><div className="mt-8 space-y-4 text-sm text-slate-400"><p className="flex gap-3"><i className="fa-solid fa-file-lines mt-1 text-volt" /><span>One defined product, quantity, destination, and timeline makes screening more useful.</span></p><p className="flex gap-3"><i className="fa-solid fa-shield-halved mt-1 text-volt" /><span>Supplier claims, documents, public evidence, and gaps are kept separate.</span></p><p className="flex gap-3"><i className="fa-solid fa-envelope mt-1 text-volt" /><span>Scope, pricing, and delivery are confirmed in writing before work begins.</span></p></div></div><SourcingRequestForm /></div></section>
    </main>
    <Footer />
  </div>;
};

export default Sourcing;
