import React from 'react';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  compact?: boolean;
};

const PageHero: React.FC<PageHeroProps> = ({ eyebrow, title, description, children, compact = false }) => (
  <section data-scroll-motion-skip className={`relative overflow-hidden border-b border-white/10 ${compact ? 'pb-16 pt-32 md:pb-20 md:pt-40' : 'min-h-[68svh] pb-20 pt-32 md:pb-28 md:pt-44'}`}>
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <img src="/images/china-world-intelligence-map.png" alt="" className="hero-map-motion h-full w-full object-cover object-center opacity-45" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.78)_0%,rgba(2,6,23,0.48)_47%,rgba(2,6,23,0.9)_100%)]" />
      <div className="absolute left-[12%] top-1/3 h-64 w-64 rounded-full bg-volt/15 blur-[120px]" />
      <div className="absolute bottom-0 right-[12%] h-72 w-72 rounded-full bg-blue-900/20 blur-[130px]" />
    </div>

    <div className={`relative z-10 mx-auto w-full max-w-[90rem] px-4 text-center sm:px-6 lg:px-12 xl:px-16 2xl:px-20 ${compact ? '' : 'flex min-h-[48svh] flex-col justify-center'}`}>
      <div className="page-hero-reveal mb-6 inline-flex self-center items-center gap-2 rounded-full border border-white/15 bg-slate-950/35 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-volt shadow-lg shadow-black/20 backdrop-blur-xl" style={{ animationDelay: '70ms' }}>
        <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-volt" /></span>
        {eyebrow}
      </div>
      <h1 className={`page-hero-reveal mx-auto font-black uppercase leading-[0.9] tracking-[-0.05em] text-white ${compact ? 'max-w-6xl text-4xl sm:text-5xl md:text-6xl' : 'max-w-[90rem] text-5xl sm:text-6xl md:text-7xl lg:text-[clamp(4.5rem,5.25vw,6.75rem)]'}`} style={{ animationDelay: '160ms' }}>{title}</h1>
      <p className="page-hero-reveal mx-auto mt-7 max-w-4xl text-base leading-[1.5] text-slate-300 md:text-lg" style={{ animationDelay: '260ms' }}>{description}</p>
      {children && <div className="page-hero-reveal mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: '360ms' }}>{children}</div>}
    </div>
  </section>
);

export default PageHero;
