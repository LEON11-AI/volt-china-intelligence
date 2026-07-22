import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';

type EditorialItem = { title: string; description: string; label: string; image: string; to?: string; href?: string; cta: string };

const editorialItems: EditorialItem[] = [
  { title: 'Huawei ADS 3.0: The Hardware-Fusion Moat', description: 'Engineering commentary on Huawei\'s sensor and compute stack, including architecture context and supplier signals.', label: 'Free Brief / Engineering', image: '/huawei-cover.webp', href: 'https://voltchina.substack.com/subscribe', cta: 'Read / Subscribe' },
  { title: 'BYD\'s ADAS Revolution', description: 'Architecture overview and strategy analysis for BYD ADAS.', label: 'Editorial Analysis / Software', image: '/og-image.jpg', to: '/research/byd-adas-strategy', cta: 'Read Analysis' },
  { title: '2026 BYD Song Plus Deep Dive', description: 'Platform, specifications, and competitive positioning in the 2026 lineup.', label: 'Editorial Analysis / Product', image: '/battery-cover.webp', to: '/research/byd-song-plus-2026', cta: 'Read Analysis' },
  { title: 'BYD\'s Secret Robot Division', description: 'Early-stage commentary on humanoid-robotics roadmaps and manufacturing ambitions.', label: 'Editorial Analysis / Robotics', image: '/og-image.jpg', to: '/research/byd-humanoid-robot', cta: 'Read Analysis' },
];

const ResearchIndex: React.FC = () => {
return <div className="min-h-screen bg-slate-950 font-sans text-slate-200">
    <Navbar />
    <main>
      <PageHero
        compact
        eyebrow="VOLTCHINA RESEARCH"
        title="Research and editorial analysis"
        description="Public research samples and clearly labelled editorial analysis on China閳ユ獨 EV, battery, smart-driving, robotics, and manufacturing systems."
      />

      <section className="border-y border-slate-800 bg-slate-900 py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mb-10 max-w-3xl"><p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-volt">Public Research Samples</p><h2 className="mb-3 text-3xl font-bold text-white">Client-style evidence work, published openly.</h2><p className="text-slate-400">These reports use VoltChina\'s stated public-source review method and separate confirmed facts, company claims, inference, and evidence gaps.</p></div><div className="overflow-hidden rounded-2xl border border-volt/30 bg-slate-950 md:grid md:grid-cols-[0.9fr_1.1fr]"><Link to="/research/byd-solid-state-battery-2026" className="block bg-slate-900"><img src="/reports/byd-all-solid-state-battery-evidence-report-cover.png" alt="Cover of the BYD all-solid-state battery evidence report" className="h-full min-h-64 w-full object-cover" /></Link><div className="flex flex-col justify-center p-7 md:p-10"><p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-volt">Public Research Sample</p><h3 className="mb-4 text-2xl font-bold text-white">BYD All-Solid-State Battery Commercialization Timeline</h3><p className="mb-6 leading-relaxed text-slate-300">A public-source assessment of BYD\'s reported around-2027 demonstration and around-2030 mass-production milestones, including confidence levels, evidence gaps, and 18 linked records.</p><div><Link to="/research/byd-solid-state-battery-2026" className="inline-flex items-center gap-2 rounded-lg bg-volt px-5 py-3 font-bold text-white transition-colors hover:bg-volt-hover">Read the Public Research Sample <i className="fa-solid fa-arrow-right text-xs" /></Link></div></div></div></div></section>

      <section className="py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mb-10 max-w-3xl"><p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-volt">Editorial Analysis / Free Brief</p><h2 className="mb-3 text-3xl font-bold text-white">Context, explainers, and earlier analysis.</h2><p className="text-slate-400">These pieces remain available as useful commentary and free-brief material. They are not presented as client-grade source-verified research samples.</p></div><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{editorialItems.map((item) => <EditorialCard key={item.title} {...item} />)}</div></div></section>
    </main>
    <Footer />
  </div>;
};

const EditorialCard: React.FC<EditorialItem> = ({ title, description, label, image, to, href, cta }) => <div className="flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-lg"><div className="aspect-[16/9] overflow-hidden"><img src={image} alt="" className="h-full w-full object-cover" /></div><div className="flex flex-grow flex-col p-6"><p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p><h3 className="mb-3 text-xl font-bold text-white">{title}</h3><p className="mb-5 flex-grow text-sm leading-relaxed text-slate-400">{description}</p>{to ? <Link to={to} className="inline-flex items-center gap-2 self-start text-sm font-bold text-volt hover:text-volt-light">{cta} <i className="fa-solid fa-arrow-right text-xs" /></Link> : <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 self-start text-sm font-bold text-volt hover:text-volt-light">{cta} <i className="fa-solid fa-arrow-right text-xs" /></a>}</div></div>;

export default ResearchIndex;