import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { trackEvent } from '../lib/analytics';

const reportUrl = '/reports/VoltChina_BYD_Solid_State_Battery_Evidence_Report_2026.pdf';
const coverUrl = '/reports/byd-all-solid-state-battery-evidence-report-cover.png';

const evidence = [
  ['Long-running R&D is confirmed', 'Selected BYD patent priorities date to 2015 and span electrolyte, electrode, cell, pack, and vehicle-integration topics.'],
  ['The direction is attributable', 'An official event report records a BYD battery executive describing an around-2027 batch demonstration and around-2030 scale ambition.'],
  ['Execution evidence is not public', 'The reviewed public record does not disclose pilot capacity, commissioning status, process yield, or throughput.'],
  ['Production readiness is not established', 'No public test certificate, named vehicle program, supplier qualification, unit cost, or capital commitment underwrites a production schedule.'],
];

const ReportButton: React.FC<{ className?: string }> = ({ className = '' }) => <a href={reportUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('download_byd_report')} className={`inline-flex items-center gap-2 rounded-lg bg-volt px-6 py-3 font-bold text-white shadow-lg shadow-volt/20 transition-all hover:bg-volt-hover hover:shadow-volt/40 ${className}`}><i className="fa-solid fa-file-pdf" /> Read the Full Evidence Report &mdash; PDF</a>;

const SampleBrief: React.FC = () => {
  React.useEffect(() => {
    document.title = 'BYD All-Solid-State Battery Commercialization Timeline | VoltChina';
    trackEvent('view_public_research_sample');
  }, []);

  return <div className="min-h-screen bg-slate-950 font-sans text-slate-200">
    <Navbar forceDark />
    <main>
      <section className="border-b border-slate-800 bg-slate-950 pb-16 pt-32 md:pb-20 md:pt-40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-volt">Public Research Report</p>
          <h1 className="mb-6 max-w-5xl text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">BYD All-Solid-State Battery Commercialization Timeline</h1>
          <p className="max-w-4xl text-lg leading-relaxed text-slate-300 md:text-xl">What publicly accessible corporate, patent, standards, and official-event records support about the reported 2027 demonstration and around-2030 mass-production milestones.</p>
          <p className="mt-5 max-w-4xl text-sm leading-relaxed text-slate-400">This is an independently prepared public research sample created to demonstrate VoltChina&rsquo;s methodology. It was not commissioned by a client.</p>
          <div className="mt-7 flex flex-wrap gap-3 text-xs font-medium"><span className="rounded-full border border-slate-700 px-3 py-1 text-slate-300">Information cut-off: 17 July 2026</span><span className="rounded-full border border-slate-700 px-3 py-1 text-slate-300">Public-source-first method</span></div>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><ReportButton /><Link to="/intelligence#research-request" className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/80 px-6 py-3 font-bold text-white transition-all hover:bg-slate-800">Submit a Research Question <i className="fa-solid fa-arrow-right text-xs" /></Link></div>
        </div>
      </section>

      <article className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="mb-14">
          <SectionHeading number="01" title="Research question" />
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8"><p className="text-lg leading-relaxed text-white">What do publicly accessible Chinese-language corporate filings, official event records, standards records, and patent publications support about BYD&rsquo;s reported plan to begin batch demonstration deployment around 2027 and achieve large-scale production around 2030?</p></div>
        </section>

        <section className="mb-14">
          <SectionHeading number="02" title="Executive assessment" />
          <div className="rounded-2xl border border-volt/25 bg-volt/10 p-6 md:p-8"><h2 className="mb-4 text-3xl font-bold text-white">Plausible direction. Not an execution-ready schedule.</h2><p className="text-lg leading-relaxed text-slate-100">Public evidence confirms a long-running and technically broad BYD research program. The public record also supports an attributable 2027 demonstration target and around-2030 scale ambition. It does not disclose the pilot-line, yield, independently verified cell-performance, vehicle, supply, or cost evidence needed to treat either milestone as a production-ready schedule.</p></div>
        </section>

        <section className="mb-14">
          <SectionHeading number="03" title="2027 and 2030 confidence" />
          <div className="grid gap-5 md:grid-cols-2"><div className="rounded-2xl border border-volt/30 bg-volt/10 p-6"><p className="mb-2 text-sm font-bold uppercase tracking-wider text-volt-light">Around-2027 batch demonstration</p><h3 className="mb-3 text-2xl font-bold text-white">Low-medium confidence</h3><p className="leading-relaxed text-slate-200">A plausible program objective, but the public record does not establish timing, scale, or a production vehicle.</p></div><div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6"><p className="mb-2 text-sm font-bold uppercase tracking-wider text-red-300">Around-2030 large-scale production</p><h3 className="mb-3 text-2xl font-bold text-white">Low confidence</h3><p className="leading-relaxed text-slate-200">The strategic direction is credible; a dated scale outcome is not yet supported by public manufacturing or economics evidence.</p></div></div>
        </section>

        <section className="mb-14">
          <SectionHeading number="04" title="Core evidence conclusions" />
          <div className="grid gap-4 md:grid-cols-2">{evidence.map(([title, text]) => <div key={title} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"><i className="fa-solid fa-check mb-4 text-volt" /><h3 className="mb-2 text-lg font-bold text-white">{title}</h3><p className="text-sm leading-relaxed text-slate-400">{text}</p></div>)}</div>
        </section>

        <section className="mb-14">
          <SectionHeading number="05" title="Full report" />
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 md:grid md:grid-cols-[1.15fr_0.85fr]">
            <a href={reportUrl} target="_blank" rel="noopener noreferrer" className="block bg-slate-950"><img src={coverUrl} alt="Cover of the BYD all-solid-state battery evidence report" className="h-full w-full object-cover transition-opacity hover:opacity-90" /></a>
            <div className="flex flex-col justify-center p-7 md:p-9"><p className="mb-3 text-sm font-bold uppercase tracking-wider text-volt">11-page evidence report</p><h2 className="mb-4 text-2xl font-bold text-white">Read the source trail behind the assessment.</h2><p className="mb-6 leading-relaxed text-slate-300">The PDF includes the complete methodology, confidence assessment, source appendix, and linked source records.</p><p className="mb-5 text-sm font-medium text-slate-400">11 pages &middot; 18 linked sources &middot; Updated July 2026</p><ReportButton className="self-start" /></div>
          </div>
        </section>

        <section className="rounded-3xl border border-volt/25 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 text-center shadow-2xl shadow-volt/10 md:p-12"><p className="mb-3 text-sm font-bold uppercase tracking-wider text-volt">A focused next step</p><h2 className="mb-4 text-3xl font-bold text-white">Need a source-verified answer to a China technology question?</h2><p className="mx-auto mb-7 max-w-3xl leading-relaxed text-slate-300">Submit one focused question. You will receive a written scope, fixed quote, and delivery date by email.</p><Link to="/intelligence#research-request" className="inline-flex items-center gap-2 rounded-lg bg-volt px-6 py-3 font-bold text-white shadow-lg shadow-volt/20 transition-all hover:bg-volt-hover hover:shadow-volt/40">Submit a Research Question <i className="fa-solid fa-arrow-right text-xs" /></Link></section>
      </article>
    </main>
    <Footer />
  </div>;
};

const SectionHeading: React.FC<{ number: string; title: string }> = ({ number, title }) => <div className="mb-5 flex items-center gap-3"><span className="text-sm font-bold tracking-[0.2em] text-volt">{number}</span><h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2></div>;

export default SampleBrief;
