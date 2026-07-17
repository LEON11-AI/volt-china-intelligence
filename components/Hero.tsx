import React from 'react';

const Hero: React.FC = () => {
  const [email, setEmail] = React.useState('');

  const handleSubscribe = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) return;
    (window as any).gtag?.('event', 'click_subscribe');
    window.open(`https://voltchina.substack.com/subscribe?email=${encodeURIComponent(email)}&simple=true`, '_blank');
  };

  return (
    <section id="brief" className="relative overflow-hidden scroll-mt-24 pb-20 pt-32 md:scroll-mt-28 lg:pb-32 lg:pt-48">
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-full max-w-7xl -translate-x-1/2">
        <div className="absolute left-10 top-20 hidden h-72 w-72 rounded-full bg-volt/10 blur-[100px] md:block" />
        <div className="absolute bottom-20 right-10 hidden h-96 w-96 rounded-full bg-blue-900/10 blur-[120px] md:block" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-800/50 px-3 py-1 text-xs font-medium text-volt animate-fade-in-up">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-volt" /></span>
          Chinese-Language Source Intelligence
        </div>

        <h1 className="mx-auto mb-6 max-w-5xl text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
          Source-verified China intelligence for <br className="hidden md:block" />
          <span className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent md:bg-gradient-to-r">pre-diligence and strategy.</span>
        </h1>

        <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl">
          VoltChina turns Chinese-language public sources into clear, source-verified English answers on EVs, batteries, smart driving, automotive technology, robotics, suppliers, and manufacturing.
          <br className="hidden md:block" /><br className="hidden md:block" />
          Designed for teams that need to decide what deserves deeper investigation before committing to a larger diligence or consulting project.
        </p>

        <div className="mb-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="/research/byd-solid-state-battery-2026" onClick={() => (window as any).gtag?.('event', 'view_byd_solid_state_report')} className="w-full rounded-lg bg-volt px-6 py-3 font-bold text-white shadow-lg shadow-volt/20 transition-all hover:bg-volt-hover hover:shadow-volt/40 sm:w-auto">Read the BYD Report</a>
          <a href="/intelligence#research-request" onClick={() => (window as any).gtag?.('event', 'click_submit_research_question')} className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-6 py-3 font-bold text-white transition-all hover:bg-slate-800 sm:w-auto">Submit a Research Question</a>
        </div>
        <p className="mb-10 text-sm font-medium text-slate-400">100% async. No calls required. Scope, pricing, delivery, and follow-up are handled in writing.</p>

        <div className="mx-auto mb-16 max-w-2xl rounded-2xl border border-volt/20 bg-slate-900/80 p-6 shadow-2xl shadow-volt/10 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-center gap-2 text-volt"><i className="fa-solid fa-envelope-open-text" /><span className="text-sm font-bold uppercase tracking-wider">Free Weekly Brief</span></div>
          <h3 className="mb-3 text-lg font-medium leading-snug text-slate-300 md:text-xl"><span className="mb-2 block text-2xl font-bold text-white md:text-3xl">Get the China EV & Hard-Tech Intelligence Brief.</span>A weekly source-backed brief decoding China's EV, battery, smart-driving, robotics, and manufacturing breakthroughs through engineering, cost, yield, and supply-chain signals.</h3>
          <p className="mb-6 text-sm text-slate-400">Also available: the 11-page BYD All-Solid-State Battery Evidence Report, updated 17 July 2026.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row">
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email..." required className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white transition-all placeholder-slate-500 focus:border-volt focus:outline-none focus:ring-1 focus:ring-volt" />
            <button type="submit" className="flex items-center justify-center whitespace-nowrap rounded-lg bg-volt px-6 py-3 font-bold text-white shadow-lg shadow-volt/20 transition-all hover:bg-volt-hover hover:shadow-volt/40">Subscribe Free</button>
          </form>
          <p className="mt-3 text-xs text-slate-600">Chinese-source context, engineering explanations, and manufacturing signals. Unsubscribe anytime.</p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 border-t border-slate-800/50 pt-8 md:grid-cols-4">
          <Stat value="1M+" label="YouTube Views" />
          <Stat value="5,000+" label="YouTube Subscribers" />
          <Stat value="Weekly" label="English Brief" />
          <Stat value="Global" label="English-Speaking Audience" />
        </div>
      </div>
    </section>
  );
};

const Stat: React.FC<{ value: string; label: string }> = ({ value, label }) => <div className="text-center"><div className="text-2xl font-bold text-white">{value}</div><div className="text-xs uppercase tracking-wider text-slate-500">{label}</div></div>;

export default Hero;
