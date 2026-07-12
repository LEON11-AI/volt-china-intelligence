import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const mediaServices = [
  { icon: 'fa-youtube', title: 'YouTube Sponsorship', text: 'A relevant sponsor integration for VoltChina’s global audience interested in Chinese EVs, robotics, manufacturing, tools, and hard-tech careers.' },
  { icon: 'fa-envelope-open-text', title: 'Newsletter Placement', text: 'A clearly marked placement for products or services that genuinely fit the weekly brief’s readers.' },
  { icon: 'fa-clapperboard', title: 'Dedicated Product Explainer', text: 'A sponsor-funded, clearly disclosed explainer or walkthrough for a relevant product, tool, or technology.' },
];

const Media: React.FC = () => {
  const mailto = 'mailto:business@voltchina.net?subject=VoltChina%20Media%20Inquiry';
  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <Navbar forceDark />
      <main>
        <section className="relative overflow-hidden pb-20 pt-32 lg:pb-28 lg:pt-44">
          <div className="pointer-events-none absolute left-1/2 top-0 h-full w-full max-w-7xl -translate-x-1/2"><div className="absolute right-10 top-24 hidden h-96 w-96 rounded-full bg-volt/10 blur-[130px] md:block"></div></div>
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><div className="max-w-4xl"><div className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs font-semibold text-volt"><i className="fa-solid fa-bullhorn"></i> VoltChina Media</div><h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">Reach a global audience following China’s EV and hard-tech industries.</h1><p className="mb-10 max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl">Media partnerships are for brands with something useful to offer VoltChina’s audience. They are a distinct commercial service, separate from intelligence research.</p><a href={mailto} className="inline-flex rounded-lg bg-volt px-6 py-3 font-bold text-white shadow-lg shadow-volt/20 transition-all hover:bg-volt-hover hover:shadow-volt/40">Discuss a Media Partnership</a></div></div>
        </section>
        <section className="border-y border-slate-800 bg-slate-900 py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mb-14 max-w-3xl"><p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">Media offerings</p><h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Clear formats. Clear disclosure.</h2><p className="text-slate-400">Every partnership is assessed for audience fit and presented as sponsored content.</p></div><div className="grid gap-6 md:grid-cols-3">{mediaServices.map((service) => <div key={service.title} className="rounded-2xl border border-slate-800 bg-slate-950 p-8"><div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-volt/10"><i className={`fa-solid ${service.icon} text-volt`}></i></div><h3 className="mb-3 text-xl font-bold text-white">{service.title}</h3><p className="text-sm leading-relaxed text-slate-400">{service.text}</p><a href={mailto} className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-volt hover:text-volt-light">Discuss this format <i className="fa-solid fa-arrow-right text-xs"></i></a></div>)}</div></div></section>
        <section className="bg-slate-950 py-20"><div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"><div className="rounded-2xl border border-volt/25 bg-volt/10 p-8 text-center md:p-12"><p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">Editorial boundary</p><h2 className="mb-5 text-3xl font-bold text-white">Commercial partnerships do not shape research conclusions.</h2><p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-300">Sponsored content is clearly disclosed and kept separate from commissioned research conclusions.</p></div></div></section>
      </main>
      <Footer />
    </div>
  );
};

export default Media;
