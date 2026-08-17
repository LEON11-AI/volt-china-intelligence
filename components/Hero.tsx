import React, { useState } from 'react';
import { trackEvent } from '../src/lib/analytics';
import SubmissionNotice from './SubmissionNotice';

const Hero: React.FC = () => {
  const [email, setEmail] = useState('');
  const [noticeOpen, setNoticeOpen] = useState(false);

  const handleSubscribe = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) return;
    trackEvent('click_subscribe');
    window.open(`https://voltchina.substack.com/subscribe?email=${encodeURIComponent(email)}&simple=true`, '_blank');
    setNoticeOpen(true);
  };

  return <>
    <style>{'@keyframes hero-map-drift { 0% { transform: scale(1.06) translate3d(-0.7%, -0.4%, 0); } 50% { transform: scale(1.09) translate3d(0.2%, 0.35%, 0); } 100% { transform: scale(1.12) translate3d(0.7%, -0.25%, 0); } } @keyframes hero-title-reveal { from { opacity: 0; transform: translate3d(0, 0.45em, 0); filter: blur(5px); } to { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0); } } .hero-map-motion { animation: hero-map-drift 28s ease-in-out infinite alternate; will-change: transform; } .hero-title-line { opacity: 0; animation: hero-title-reveal 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards; will-change: transform, opacity, filter; } .hero-title-line:nth-child(1) { animation-delay: 90ms; } .hero-title-line:nth-child(2) { animation-delay: 190ms; } .hero-title-line:nth-child(3) { animation-delay: 290ms; } @media (prefers-reduced-motion: reduce) { .hero-map-motion { animation: none; transform: scale(1.06); } .hero-title-line { animation: none; opacity: 1; transform: none; filter: none; } }'}</style>
    <section className="relative min-h-[100svh] overflow-hidden pb-20 pt-32 lg:pb-28 lg:pt-48">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <img src="/images/china-world-intelligence-map.png" alt="" className="hero-map-motion h-full w-full object-cover object-center opacity-60" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(2, 6, 23, 0.78) 0%, rgba(2, 6, 23, 0.48) 47%, rgba(2, 6, 23, 0.82) 100%)' }} />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-full max-w-7xl -translate-x-1/2">
        <div className="absolute left-10 top-20 hidden h-72 w-72 rounded-full bg-volt/10 blur-[100px] md:block" />
        <div className="absolute bottom-20 right-10 hidden h-96 w-96 rounded-full bg-blue-900/10 blur-[120px] md:block" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/35 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-volt shadow-lg shadow-black/20 backdrop-blur-xl animate-fade-in-up">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-volt" /></span>
          Chinese-Language Source Intelligence
        </div>

        <h1 className="mx-auto mb-6 max-w-[90rem] text-5xl font-black uppercase leading-[0.88] tracking-[-0.055em] text-white sm:text-6xl md:text-7xl lg:text-[clamp(5rem,5.5vw,7rem)]">
          <span className="hero-title-line block">Verify Chinese EV and</span>
          <span className="hero-title-line block">hard-tech claims before</span>
          <span className="hero-title-line block bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent md:bg-gradient-to-r">committing to deeper diligence</span>
        </h1>

        <p className="mx-auto mb-8 max-w-3xl text-base leading-[1.45] text-slate-300 md:text-lg">
          VoltChina helps small investment firms, boutique consultancies, independent researchers, and strategy teams turn difficult-to-check Chinese-language public sources into clear written assessments&mdash;showing what is confirmed, what is claimed, what remains unknown, and what deserves further investigation.
        </p>

        <div className="mb-3 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="/research/byd-solid-state-battery-2026" onClick={() => trackEvent('click_public_sample')} className="w-full rounded-lg bg-volt px-6 py-3 font-bold text-white shadow-lg shadow-volt/20 transition-all hover:bg-volt-hover hover:shadow-volt/40 sm:w-auto">See a Public Research Sample</a>
          <a href="/intelligence#research-request" onClick={() => trackEvent('click_submit_research_question')} className="w-full rounded-lg border border-white/20 bg-slate-950/35 px-6 py-3 font-bold text-white shadow-lg shadow-black/20 backdrop-blur-xl transition-all hover:border-volt/80 hover:bg-slate-950/55 hover:shadow-volt/10 sm:w-auto">Submit a Research Question</a>
        </div>
        <p className="mb-8 text-sm font-medium text-slate-400">100% async. No calls required. Scope, pricing, delivery, and follow-up are handled in writing.</p>

        <div className="mx-auto mb-16 max-w-3xl rounded-2xl border border-white/15 bg-slate-950/45 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-center gap-2 text-volt"><i className="fa-solid fa-envelope-open-text" /><span className="text-sm font-bold uppercase tracking-wider">Free Weekly Brief</span></div>
          <h3 className="mb-3 text-lg font-medium leading-snug text-slate-300 md:text-xl"><span className="mb-2 block text-2xl font-bold text-white md:text-3xl">Get the China EV &amp; Hard-Tech Intelligence Brief</span>A weekly source-backed brief decoding China&apos;s EV, battery, smart-driving, robotics, and manufacturing breakthroughs through engineering, cost, yield, and supply-chain signals.</h3>
          <p className="mb-6 text-sm text-slate-400">Also available: the 11-page BYD All-Solid-State Battery Evidence Report, updated 17 July 2026.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row">
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email..." required className="flex-1 rounded-lg border border-white/15 bg-slate-800/45 px-4 py-3 text-white backdrop-blur-md transition-all placeholder-slate-500 focus:border-volt focus:outline-none focus:ring-1 focus:ring-volt" />
            <button type="submit" className="flex items-center justify-center whitespace-nowrap rounded-lg bg-volt px-6 py-3 font-bold text-white shadow-lg shadow-volt/20 transition-all hover:bg-volt-hover hover:shadow-volt/40">Subscribe Free</button>
          </form>
          <p className="mt-3 text-xs text-slate-600">Chinese-source context, engineering explanations, and manufacturing signals. Unsubscribe anytime.</p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 border-t border-slate-800/50 pt-8 md:grid-cols-4">
          <Stat value="1M+" label="YouTube Views" />
          <Stat value="5,000+" label="YouTube Subscribers" />
          <Stat value="Weekly" label="English Brief" />
          <Stat value="Global" label="English-Speaking Audience" />
        </div>
      </div>
    </section>
    <SubmissionNotice isOpen={noticeOpen} onClose={() => setNoticeOpen(false)} title="Subscription page opened" message="Please complete your subscription on the secure page that has just opened. VoltChina will receive your email only after you confirm there." />
  </>;
};

const Stat: React.FC<{ value: string; label: string }> = ({ value, label }) => <div className="text-center"><div className="text-2xl font-bold text-white">{value}</div><div className="text-xs uppercase tracking-wider text-slate-500">{label}</div></div>;

export default Hero;