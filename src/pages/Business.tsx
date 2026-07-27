import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ResearchRequestForm from '../../components/ResearchRequestForm';
import SupplierMapForm from '../../components/SupplierMapForm';
import PageHero from '../../components/PageHero';

const pricingTiers = [
  {
    title: 'Rapid Claim Verification',
    price: '$500',
    priceNote: 'fixed fee',
    description: 'For one narrow, publicly verifiable claim about a Chinese company, technology, product, supplier, or production milestone.',
    bullets: [
      'One clearly defined claim',
      'Approximately 5-10 relevant Chinese-language public sources',
      'Evidence status: confirmed, company-claimed, reported, inferred, or unverified',
      'Concise 2-3 page English memo with source links',
      'Clear verdict, limitations, and verification gaps',
      'Delivered within 3 business days',
      'One written clarification after delivery',
    ],
    cta: 'Check a Claim',
    service: 'rapid',
  },
  {
    title: 'China Evidence Brief',
    price: '$1,000',
    priceNote: 'fixed fee',
    description: 'For one focused research question that requires a deeper, source-traced assessment.',
    bullets: [
      'One clearly defined research question',
      'Typically 5-8 pages',
      'Approximately 10-25 relevant Chinese-language public sources',
      'Confirmed facts, company claims, third-party reporting, inference, and unknowns separated clearly',
      'Counterevidence, uncertainties, and verification gaps',
      'Decision implications and recommended next steps',
      'Delivered within 5 business days',
      'One written clarification after delivery',
    ],
    cta: 'Submit a Research Question',
    service: 'evidence',
    popular: true,
  },
  {
    title: 'Strategic Intelligence Program',
    price: 'From $10,000',
    priceNote: 'custom written scope',
    description: 'For multi-company, multi-technology, or ongoing strategic research requirements.',
    bullets: [
      'Multi-question or multi-company research scope',
      'Competitive landscape and evidence mapping',
      'Structured source database and documented methodology',
      'Custom deliverables, timeline, and written update schedule',
      'Final scope and fixed quote confirmed in writing before payment',
    ],
    cta: 'Request a Custom Scope',
    service: 'strategic',
  },
];

const workflow = [
  ['01', 'Submit a Question', 'Choose a service and provide the claim or question you need checked.'],
  ['02', 'Receive a Written Scope', 'VoltChina replies by email with suitability, scope, exclusions, a fixed quote, and a delivery date.'],
  ['03', 'Approve and Pay', 'Work begins only after written approval and payment.'],
  ['04', 'Receive the English Memo', 'The report is delivered in writing with the relevant source links.'],
  ['05', 'Written Clarification', 'One written clarification is included after delivery.'],
];

const Business: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const targetId = location.hash.replace('#', '');
    if (!targetId) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.search]);

  return <div className="min-h-screen bg-slate-950 font-sans">
    <Navbar forceDark />
    <main>
      <PageHero
        eyebrow="CHINA-SOURCE INTELLIGENCE"
        title="Source-verified China intelligence for pre-diligence and strategy"
        description="VoltChina helps small investment firms, independent researchers, boutique consultancies, and corporate strategy teams turn Chinese-language public sources into clear English answers: screened, verified, translated, and explained for a specific business question."
      >
        <Link to="/intelligence?service=evidence#research-request" className="rounded-lg bg-volt px-6 py-3 text-center font-bold text-white shadow-lg shadow-volt/20 transition-all hover:bg-volt-hover hover:shadow-volt/40">Submit a Research Question</Link>
        <Link to="/research/byd-solid-state-battery-2026" className="rounded-lg border border-white/20 bg-slate-950/35 px-6 py-3 text-center font-bold text-white shadow-lg shadow-black/20 backdrop-blur-xl transition-all hover:border-volt hover:bg-slate-900">See a Public Research Sample</Link>
      </PageHero>

      <section id="pricing" className="scroll-mt-24 border-y border-slate-800 bg-slate-900 py-20 md:scroll-mt-28"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl"><p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">VoltChina Intelligence</p><h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Choose the narrowest research service that answers the decision in front of you.</h2><p className="text-slate-400">All services are delivered through a 100% async, written workflow. No calls are required.</p></div>
        <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">{pricingTiers.map((tier) => <PricingCard key={tier.title} {...tier} />)}</div>
      </div></section>

      <section className="border-y border-slate-800 bg-slate-950 py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mb-12 max-w-3xl"><p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">How It Works</p><h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">A clear written workflow from question to memo.</h2><p className="text-slate-400">Submit a question, receive a written scope and fixed quote, approve and pay, receive the English report, then use one written clarification.</p></div><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">{workflow.map(([number, title, text]) => <div key={number} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"><span className="text-sm font-bold tracking-[0.18em] text-volt">{number}</span><h3 className="mb-3 mt-3 text-xl font-bold text-white">{title}</h3><p className="leading-relaxed text-slate-400">{text}</p></div>)}</div><p className="mt-8 text-center text-sm font-medium text-slate-300">All services are delivered through a 100% async, written workflow. No calls are required.</p></div></section>

      <section id="research-request" className="scroll-mt-24 bg-slate-950 py-20 md:scroll-mt-28"><div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8"><div><p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">Written research request</p><h2 className="mb-5 text-3xl font-bold text-white md:text-4xl">Submit a Research Question</h2><p className="max-w-xl text-lg leading-relaxed text-slate-300">Tell us the exact question you need checked from Chinese-language public sources. VoltChina will reply by email with suitability, a written scope, fixed price, and delivery date. No call is required.</p><div className="mt-8 space-y-4 text-sm text-slate-400"><p className="flex gap-3"><i className="fa-solid fa-file-lines mt-1 text-volt" /><span>Rapid Claim Verification and China Evidence Brief are both completed by VoltChina, not self-service products.</span></p><p className="flex gap-3"><i className="fa-solid fa-language mt-1 text-volt" /><span>Public Chinese-source evidence is screened, translated, and explained in English.</span></p><p className="flex gap-3"><i className="fa-solid fa-envelope mt-1 text-volt" /><span>Scope, price, delivery, and follow-up are handled in writing.</span></p></div></div><ResearchRequestForm /></div></section>

      <section id="supplier-map-beta" className="scroll-mt-24 bg-slate-950 pb-20 md:scroll-mt-28"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><div className="relative overflow-hidden rounded-3xl border border-volt/25 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 shadow-2xl shadow-volt/10 md:p-12"><div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-volt/10 blur-3xl" /><div className="relative z-10 grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start"><div><div className="mb-5 inline-flex items-center gap-2 rounded-full border border-volt/30 bg-volt/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-volt"><i className="fa-solid fa-flask" /> Founding Edition Test</div><h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">Help define one verified supplier map.</h2><p className="max-w-xl text-lg leading-relaxed text-slate-300">This is not a generic waitlist. Tell us the exact Chinese supplier category you need and the decision it would support. We will look for 5-10 comparable paid-use cases before choosing a founding edition.</p><ul className="mt-7 space-y-4 text-sm text-slate-300"><li className="flex gap-3"><i className="fa-solid fa-check mt-1 text-volt" /><span>Specific category, suppliers, and public Chinese-source trail</span></li><li className="flex gap-3"><i className="fa-solid fa-check mt-1 text-volt" /><span>Clear coverage limits, verification gaps, and update date</span></li><li className="flex gap-3"><i className="fa-solid fa-check mt-1 text-volt" /><span>Built around a decision use case, not curiosity alone</span></li></ul></div><SupplierMapForm /></div></div></div></section>

      <section className="border-t border-slate-800 bg-slate-900 py-20"><div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"><h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Start with one concrete question.</h2><p className="mb-8 text-lg text-slate-400">Verify one narrow claim from $500, or commission a focused China Evidence Brief for $1,000.</p><Link to="/intelligence?service=evidence#research-request" className="inline-flex items-center justify-center gap-2 rounded-lg bg-volt px-7 py-4 font-bold text-white shadow-lg shadow-volt/20 transition-all hover:bg-volt-hover hover:shadow-volt/40"><i className="fa-solid fa-file-lines" /> Submit a Research Question</Link><p className="mt-6 text-sm text-slate-500">Looking for sponsorship or a product explainer? Visit <a href="/#media-partnerships" className="text-slate-300 underline decoration-slate-600 underline-offset-4 hover:text-white">Media Partnerships</a>.</p></div></section>
    </main>
    <Footer />
  </div>;
};

type PricingCardProps = { title: string; price: string; priceNote: string; description: string; bullets: string[]; cta: string; service: string; popular?: boolean };
const PricingCard: React.FC<PricingCardProps> = ({ title, price, priceNote, description, bullets, cta, service, popular }) => <div className={`relative flex flex-col overflow-hidden rounded-2xl border p-7 shadow-2xl transition-transform duration-300 lg:p-8 ${popular ? 'border-volt bg-gradient-to-b from-volt/15 via-slate-950 to-slate-950 shadow-volt/20 lg:-translate-y-3 lg:scale-[1.02]' : 'border-slate-800 bg-slate-950 shadow-black/20'}`}><div className="min-h-7">{popular && <span className="inline-flex rounded-full bg-volt px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white">Most Popular</span>}</div><div className="mt-4"><h3 className="text-2xl font-bold text-white">{title}</h3><div className="mt-5 flex items-baseline gap-2"><span className="text-4xl font-black tracking-tight text-white">{price}</span><span className="text-sm font-medium text-slate-400">{priceNote}</span></div><p className="mt-5 min-h-[96px] text-sm leading-relaxed text-slate-300">{description}</p></div><ul className="mt-7 flex-1 space-y-3 border-t border-white/10 pt-7">{bullets.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate-300"><i className="fa-solid fa-check mt-1 text-volt" /><span>{item}</span></li>)}</ul><Link to={`/intelligence?service=${service}#research-request`} className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3.5 font-bold transition-all ${popular ? 'bg-volt text-white shadow-lg shadow-volt/20 hover:bg-volt-hover hover:shadow-volt/40' : 'border border-slate-700 bg-slate-900 text-white hover:border-volt/70 hover:bg-slate-800'}`}>{cta} <i className="fa-solid fa-arrow-right text-xs" /></Link></div>;

export default Business;