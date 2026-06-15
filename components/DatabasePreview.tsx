import React from 'react';

const DatabasePreview: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 relative border-t border-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center gap-12 lg:gap-16 max-w-5xl mx-auto">
          <div className="w-full flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 mb-6 shadow-sm">
              <i className="fa-solid fa-compass-drafting text-volt"></i>
              How VoltChina Explains
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              From Headlines to <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-b md:bg-gradient-to-r from-white to-slate-400">
                Engineering Reality.
              </span>
            </h2>

            <p className="text-lg text-slate-400 leading-relaxed mb-6 max-w-3xl">
              China launches new batteries, smart-driving systems, robots, and EV platforms at a speed that is hard to follow from the outside. VoltChina slows the story down and explains the mechanism: what changed, why it matters, who built the key parts, and where the limits still are.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl w-full mt-2">
              <MethodCard
                icon="fa-gears"
                title="Mechanism First"
                text="We explain the physical system before the market narrative: battery chemistry, power flow, sensors, chips, software, and manufacturing constraints."
              />
              <MethodCard
                icon="fa-language"
                title="China-Source Context"
                text="We use Chinese-language product launches, patents, filings, supplier signals, and local industry discussions to add context that global readers often miss."
              />
              <MethodCard
                icon="fa-triangle-exclamation"
                title="Limits Included"
                text="Every good technology story has tradeoffs. We point out bottlenecks, cost pressure, production limits, safety risks, and unresolved engineering problems."
              />
            </div>
          </div>

          <div className="w-full relative group perspective-1000">
            <div className="absolute -top-3 -left-2 md:-left-4 z-20 bg-red-600/90 backdrop-blur-sm text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded shadow-lg shadow-red-900/20 border border-red-500 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              SOURCE-BACKED
            </div>

            <div className="relative rounded-xl bg-slate-900 border border-slate-700/80 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)] p-2 transform transition-transform duration-700 hover:scale-[1.02]">
              <div className="relative rounded-lg overflow-hidden border border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/40 via-transparent to-slate-900/20 z-10 pointer-events-none"></div>
                <img
                  src="/database-preview.png"
                  alt="VoltChina source-backed research preview"
                  className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/database-preview.jpg'; }}
                />
              </div>
            </div>

            <div className="absolute -inset-4 bg-gradient-to-tr from-slate-800 to-slate-900 rounded-3xl blur-2xl -z-10 opacity-50 group-hover:opacity-70 transition-opacity duration-700"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MethodCard: React.FC<{ icon: string; title: string; text: string }> = ({ icon, title, text }) => (
  <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-5 text-left shadow-lg shadow-black/20">
    <div className="w-10 h-10 bg-volt/10 rounded-full flex items-center justify-center mb-4">
      <i className={`fa-solid ${icon} text-volt`}></i>
    </div>
    <h3 className="text-white font-semibold mb-2">{title}</h3>
    <p className="text-sm text-slate-400 leading-relaxed">{text}</p>
  </div>
);

export default DatabasePreview;
