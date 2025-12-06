import React from 'react';

const FeaturedReport: React.FC = () => {
  return (
    <section className="py-12 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col md:flex-row relative group">
          
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-volt opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-1000"></div>
          
          {/* Image Side */}
          <div className="w-full md:w-1/2 relative h-64 md:h-auto bg-slate-800 overflow-hidden z-10">
            <img 
              src="/huawei-cover.webp"
              alt="Huawei ADS 3.0 Analysis"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
            <div className="absolute top-4 left-4">
              <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                NEW RELEASE
              </span>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center relative z-10">
            <div className="mb-4">
              <span className="text-volt font-bold tracking-wider text-xs uppercase mb-2 block">Premium Intelligence</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Huawei ADS 3.0: <br/>
                <span className="text-slate-400">The Hardware-Fusion Moat</span>
              </h2>
            </div>
            
            <p className="text-slate-300 mb-8 text-base md:text-lg leading-relaxed">
              Exclusive BOM cost breakdown vs Tesla FSD, and a supply chain investment watchlist (12 Tickers). We reveal how Huawei achieves 5x safety redundancy.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto">
              <a 
                href="https://voltchina.gumroad.com/l/huawei-ads" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-volt hover:bg-volt-hover text-white rounded-lg font-bold text-center transition-all shadow-lg shadow-volt/20 hover:shadow-volt/40 flex items-center justify-center gap-2"
              >
                <span>Get the Report ($49)</span>
                <i className="fa-solid fa-arrow-right"></i>
              </a>
              <div className="text-slate-500 text-sm">
                Instant PDF Download
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedReport;
