import React from 'react';

const About: React.FC = () => (
  <section id="about" className="scroll-mt-24 border-t border-slate-900 bg-slate-950 py-16 md:scroll-mt-28 md:py-20">
    <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-[auto_1fr] md:items-center lg:px-8">
      <img src="/VC.png" alt="VoltChina" loading="lazy" width="88" height="88" className="h-20 w-20 rounded-xl object-cover shadow-2xl md:h-24 md:w-24" />
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-volt">About VoltChina</p>
        <h2 className="text-3xl font-bold text-white md:text-4xl">China-source context for global technical decisions</h2>
        <p className="mt-4 max-w-4xl leading-relaxed text-slate-400">VoltChina is an independent English-language research and media project focused on China&apos;s electric vehicles, batteries, smart-driving systems, robotics, and advanced manufacturing. It separates public evidence, company claims, inference, and unknowns so global teams can decide what deserves further investigation.</p>
      </div>
    </div>
  </section>
);

export default About;
