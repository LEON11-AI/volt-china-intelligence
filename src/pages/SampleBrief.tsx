import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const reportUrl = '/reports/VoltChina_BYD_Solid_State_Battery_Evidence_Report_2026.pdf';

const dashboard = [
  { label: 'Long-running R&D', status: 'Confirmed', text: 'Selected patent priorities date to 2015 and span electrolyte, electrode, cell, pack, and vehicle-pressure topics.', tone: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' },
  { label: 'Reported 2027 target', status: 'Attributable', text: 'An official event report attributes an around-2027 batch demonstration target to BYD Lithium Battery CTO Sun Huajun.', tone: 'border-amber-500/30 bg-amber-500/10 text-amber-300' },
  { label: 'Pilot line / yield', status: 'Not disclosed', text: 'No primary public source was located for capacity, commissioning status, process yield, or throughput.', tone: 'border-red-500/30 bg-red-500/10 text-red-300' },
  { label: 'Cell performance', status: 'Not verified', text: 'No public test certificate or report was located for energy density, cycle life, safety, or temperature performance.', tone: 'border-red-500/30 bg-red-500/10 text-red-300' },
  { label: 'Named vehicle program', status: 'Not disclosed', text: 'No primary source was found naming a model, fleet size, delivery quarter, or homologation program.', tone: 'border-red-500/30 bg-red-500/10 text-red-300' },
  { label: 'Around-2030 scale', status: 'Not forecast-ready', text: 'The direction is reported; the manufacturing, supply, and cost evidence needed for scale is absent.', tone: 'border-amber-500/30 bg-amber-500/10 text-amber-300' },
];

const evidenceRules = [
  ['Confirmed', 'A directly accessible corporate, regulatory, patent, or government source establishes the fact.'],
  ['Attributable executive statement', 'An official event report attributes the statement to a named company executive; it is not the same as a board-approved filing or product commitment.'],
  ['Analytical inference', 'A reasoned interpretation from multiple confirmed facts. The underlying sources do not state the conclusion directly.'],
  ['Not publicly disclosed', 'No qualifying primary source was located within the defined search scope. This does not prove the information does not exist internally.'],
  ['Unsupported claim', 'A claim found in secondary circulation but not supported by a qualifying primary source and therefore excluded from the assessment.'],
];

const evidenceNeeded = [
  ['Pilot line', 'Official disclosure of location, designed capacity, commissioning status, and production-intent purpose.'],
  ['Traceable cell specification', 'Cell capacity, energy density, chemistry, pressure condition, test method, and sample identity.'],
  ['Independent validation', 'A complete report or certificate from a named laboratory under an identified standard and sample configuration.'],
  ['Manufacturing evidence', 'Continuous-run output, yield, process capability, equipment readiness, and batch consistency.'],
  ['Vehicle program', 'Named platform or model, fleet size, integration status, test mileage, and homologation pathway.'],
  ['Supply chain and economics', 'Qualified suppliers or internal capacity, plus a cost bridge covering materials, yield, capex, pack design, and recycling.'],
];

const SampleBrief: React.FC = () => {
  React.useEffect(() => {
    document.title = 'BYD All-Solid-State Battery Report | VoltChina';
    (window as any).gtag?.('event', 'view_byd_solid_state_report');
    (window as any).plausible?.('view_byd_solid_state_report');
  }, []);

  return <div className="min-h-screen bg-slate-950 font-sans text-slate-200">
    <Navbar forceDark />
    <main>
      <section className="border-b border-slate-800 bg-slate-950 pb-16 pt-32 md:pb-20 md:pt-40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-volt">Public Research Report</p>
          <h1 className="mb-6 max-w-5xl text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">BYD All-Solid-State Battery Commercialization Timeline</h1>
          <p className="max-w-4xl text-lg leading-relaxed text-slate-300 md:text-xl">What public primary sources actually support about the reported 2027 demonstration and around-2030 mass-production milestones.</p>
          <div className="mt-7 flex flex-wrap gap-3 text-xs font-medium"><span className="rounded-full border border-slate-700 px-3 py-1 text-slate-300">Information cut-off: 17 July 2026</span><span className="rounded-full border border-slate-700 px-3 py-1 text-slate-300">11-page PDF report</span><span className="rounded-full border border-slate-700 px-3 py-1 text-slate-300">Primary-source first</span></div>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><a href={reportUrl} target="_blank" rel="noopener noreferrer" onClick={() => (window as any).gtag?.('event', 'download_byd_solid_state_report')} className="inline-flex items-center gap-2 rounded-lg bg-volt px-6 py-3 font-bold text-white shadow-lg shadow-volt/20 transition-all hover:bg-volt-hover hover:shadow-volt/40"><i className="fa-solid fa-file-pdf" /> Read the Full Report (PDF)</a><Link to="/intelligence#research-request" className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/80 px-6 py-3 font-bold text-white transition-all hover:bg-slate-800">Submit a Research Question <i className="fa-solid fa-arrow-right text-xs" /></Link></div>
        </div>
      </section>

      <article className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="mb-14 rounded-2xl border border-volt/25 bg-volt/10 p-6 md:p-8"><p className="mb-2 text-sm font-bold uppercase tracking-wider text-volt">Executive assessment</p><h2 className="mb-4 text-3xl font-bold text-white">Plausible direction. Not an execution-ready schedule.</h2><p className="text-lg leading-relaxed text-slate-100">Public evidence confirms a long-running and technically broad BYD research program in solid electrolytes and all-solid-state cell, pack, and vehicle-integration concepts. An official conference report records a BYD battery executive stating a plan to begin batch demonstration vehicle deployment around 2027 and to pursue large-scale production around 2030. The current public primary-source record does not disclose the pilot-line capacity, process yield, independently verified cell performance, named vehicle program, supplier qualification, unit cost, or capital commitment needed to underwrite either milestone as an execution-ready production schedule.</p></section>

        <SectionNumber number="01" title="Decision dashboard"><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{dashboard.map((item) => <div key={item.label} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"><h3 className="mb-1 font-bold text-white">{item.label}</h3><p className={`mb-3 text-xs font-bold uppercase tracking-wide ${item.tone.split(' ').pop()}`}>{item.status}</p><p className="text-sm leading-relaxed text-slate-400">{item.text}</p></div>)}</div></SectionNumber>

        <SectionNumber number="02" title="Research question and evidence rules"><div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6"><p className="mb-2 text-sm font-bold text-slate-400">Research question</p><p className="text-lg leading-relaxed text-white">What do publicly accessible primary and primary-adjacent sources support about BYD's reported plan to begin batch demonstration vehicle deployment of all-solid-state batteries around 2027 and achieve large-scale production around 2030?</p></div><div className="mt-5 overflow-hidden rounded-xl border border-slate-800"><div className="grid grid-cols-[minmax(135px,0.9fr)_minmax(0,1.7fr)] bg-slate-900 px-5 py-3 text-sm font-bold text-white"><div>Classification</div><div>Meaning</div></div>{evidenceRules.map(([label, description]) => <div key={label} className="grid grid-cols-[minmax(135px,0.9fr)_minmax(0,1.7fr)] border-t border-slate-800 px-5 py-4 text-sm leading-relaxed"><div className="pr-4 font-medium text-white">{label}</div><div className="text-slate-400">{description}</div></div>)}</div></SectionNumber>

        <SectionNumber number="03" title="Source review performed"><div className="grid gap-4 md:grid-cols-2"><ul className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-sm leading-relaxed text-slate-300"><li><i className="fa-solid fa-check mr-2 text-volt" />BYD 2025 interim and annual reports, plus the 2026 first-quarter report, text-searched for solid-state battery terminology.</li><li><i className="fa-solid fa-check mr-2 text-volt" />Official reporting for the February 2025 China all-solid-state battery collaborative innovation platform annual meeting.</li><li><i className="fa-solid fa-check mr-2 text-volt" />National standards project records for EV solid-state battery terminology, performance, and life specifications.</li></ul><ul className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-sm leading-relaxed text-slate-300"><li><i className="fa-solid fa-check mr-2 text-volt" />Selected BYD patent publications with priorities from 2015 through 2024, covering materials, electrodes, cell and pack architecture, and vehicle pressure management.</li><li><i className="fa-solid fa-check mr-2 text-volt" />Official Toyota, Nissan, and Samsung SDI disclosures used only to calibrate public execution evidence, not as proof of BYD progress.</li><li><i className="fa-solid fa-check mr-2 text-volt" />No confidential supplier, customer, laboratory, or internal program data was used.</li></ul></div></SectionNumber>

        <SectionNumber number="04" title="Milestone assessment"><div className="grid gap-5 md:grid-cols-2"><div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6"><p className="mb-2 text-sm font-bold uppercase tracking-wider text-amber-300">Around-2027 batch demonstration</p><h3 className="mb-3 text-2xl font-bold text-white">Plausible, not underwritten</h3><p className="leading-relaxed text-slate-200">Low-medium confidence. The reported target and patent record make a limited demonstration a plausible program objective, but the public evidence cannot establish that BYD is on schedule, define the scale, or identify a production vehicle.</p></div><div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6"><p className="mb-2 text-sm font-bold uppercase tracking-wider text-red-300">Around-2030 large-scale production</p><h3 className="mb-3 text-2xl font-bold text-white">Direction credible, date not supported</h3><p className="leading-relaxed text-slate-200">Low confidence as a dated scale outcome. The ambition is attributable, but the current public record is insufficient to forecast volume, cost parity, model coverage, or market share.</p></div></div><p className="mt-5 rounded-xl border border-slate-800 bg-slate-900/60 p-5 text-sm leading-relaxed text-slate-300"><strong className="text-white">Practical monitoring rule:</strong> upgrade the 2027 assessment only when at least two independent execution layers appear, for example a disclosed pilot line plus a traceable automotive test report, or a named vehicle program plus qualified supplier or capacity evidence.</p></SectionNumber>

        <SectionNumber number="05" title="What would change the assessment"><div className="grid gap-4 md:grid-cols-2">{evidenceNeeded.map(([trigger, requirement]) => <div key={trigger} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"><h3 className="mb-2 font-bold text-white">{trigger}</h3><p className="text-sm leading-relaxed text-slate-400">{requirement}</p></div>)}</div></SectionNumber>

        <SectionNumber number="06" title="Source appendix"><div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"><p className="leading-relaxed text-slate-300">The full report contains an appendix of 18 primary and official source records, including the Southeast University and Xinhua event report, SAMR and SAC standards-project records, BYD statutory disclosures, selected BYD patent publications, and peer-company official disclosures. The PDF retains the full appendix and source links.</p><a href={reportUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-volt hover:text-orange-300">Open the full source appendix in the PDF <i className="fa-solid fa-arrow-up-right-from-square text-xs" /></a></div></SectionNumber>

        <section className="mt-16 rounded-3xl border border-volt/25 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 text-center shadow-2xl shadow-volt/10 md:p-12"><p className="mb-3 text-sm font-bold uppercase tracking-wider text-volt">VoltChina view</p><h2 className="mb-4 text-3xl font-bold text-white">Evidence is strong enough to justify monitoring and deeper diligence, not a specific production forecast.</h2><p className="mx-auto mb-7 max-w-3xl leading-relaxed text-slate-300">The central diligence question is no longer whether BYD has relevant inventions. It is whether BYD can publicly demonstrate reproducible automotive cells, industrial process control, and a qualified path from cell to vehicle.</p><div className="flex flex-col items-center justify-center gap-4 sm:flex-row"><a href={reportUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-volt px-6 py-3 font-bold text-white shadow-lg shadow-volt/20 transition-all hover:bg-volt-hover hover:shadow-volt/40"><i className="fa-solid fa-file-pdf" /> Read the Full Report</a><Link to="/intelligence#research-request" className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-6 py-3 font-bold text-white transition-all hover:bg-slate-800">Submit a Research Question <i className="fa-solid fa-arrow-right text-xs" /></Link></div></section>
      </article>
    </main>
    <Footer />
  </div>;
};

const SectionNumber: React.FC<{ number: string; title: string; children: React.ReactNode }> = ({ number, title, children }) => <section className="mb-14"><div className="mb-5 flex items-center gap-3"><span className="text-sm font-bold tracking-[0.2em] text-volt">{number}</span><h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2></div>{children}</section>;

export default SampleBrief;
