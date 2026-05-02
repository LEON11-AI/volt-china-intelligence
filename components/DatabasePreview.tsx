import React from 'react';

const DatabasePreview: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 relative border-t border-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Column: Image with Classified Feel */}
          <div className="w-full lg:w-1/2 relative group perspective-1000">
            {/* Red Badge */}
            <div className="absolute -top-3 -left-2 md:-left-4 z-20 bg-red-600/90 backdrop-blur-sm text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded shadow-lg shadow-red-900/20 border border-red-500 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              REDACTED
            </div>
            
            {/* Image Wrapper */}
            <div className="relative rounded-xl bg-slate-900 border border-slate-700/80 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)] p-2 transform transition-transform duration-700 hover:scale-[1.02]">
              {/* Inner subtle border and dark overlay for classified look */}
              <div className="relative rounded-lg overflow-hidden border border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/40 via-transparent to-slate-900/20 z-10 pointer-events-none"></div>
                <img 
                  src="/database-preview.png" 
                  alt="Master Tier-2 Supply Chain Database" 
                  className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/database-preview.jpg'; }}
                />
              </div>
            </div>
            
            {/* Decorative glow behind image */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-slate-800 to-slate-900 rounded-3xl blur-2xl -z-10 opacity-50 group-hover:opacity-70 transition-opacity duration-700"></div>
          </div>

          {/* Right Column: Text */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 mb-6 w-fit shadow-sm">
              <i className="fa-solid fa-database text-volt"></i>
              Inside the Master Database
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              Uncover the Hidden <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                Tier-2 Supply Chain
              </span>
            </h2>
            
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              Stop guessing who actually builds the components. Our Master Database maps the exact Tier-2 and Tier-3 suppliers enabling China's EV dominance—complete with verifiable stock tickers, core categories, and exclusive OEM supply relationships.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DatabasePreview;
