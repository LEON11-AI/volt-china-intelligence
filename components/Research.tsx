import React from 'react';

const Research: React.FC = () => {
  return (
    <section id="research" className="py-20 bg-slate-900 border-t border-slate-800 scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Deep Dive Reports</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Our premium research papers break down the engineering and economics behind the headlines.
          </p>
        </div>

        {/* Featured Card */}
        <div className="max-w-4xl mx-auto bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 shadow-xl flex flex-col md:flex-row">
          
          {/* Image Side */}
          <div className="w-full md:w-2/5 relative h-64 md:h-auto bg-slate-800 group overflow-hidden">
             {/* Using an Unsplash image that looks like technical/automotive engineering */}
            <img 
              src="/battery-cover.webp"
              alt="Battery Technology"
              loading="lazy"
              decoding="async"
              srcSet="/battery-cover.webp 1x, /battery-cover@2x.webp 2x"
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1598209279122-8541213a0383?q=80&w=1000&auto=format&fit=crop'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90"></div>
            <div className="absolute bottom-4 left-4">
              <span className="bg-volt text-white text-xs font-bold px-2 py-1 rounded shadow-lg">FEATURED</span>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-mono text-slate-400 border border-slate-600 px-2 py-0.5 rounded">REPORT #VC-2025-01</span>
              <span className="text-xs font-bold text-green-400 flex items-center gap-1">
                <i className="fa-solid fa-clock"></i> Limited Time Free
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-3">
              BYD Solid-State Battery Report 2025
            </h3>
            
            <p className="text-slate-300 mb-6 leading-relaxed text-sm">
              A comprehensive 15-page engineering and cost analysis. We deconstruct the supply chain and explain exactly why BYD will beat Toyota to mass production of solid-state cells.
            </p>
            
            <div className="flex items-center gap-4 mt-auto">
              <a 
                href="https://voltchina.gumroad.com/l/byd-solid-state-report" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 bg-white hover:bg-slate-200 text-slate-900 py-3 rounded font-bold text-center transition-colors flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-download"></i>
                Download for $0
              </a>
              <div className="text-center px-4">
                <div className="text-lg font-bold text-slate-400 line-through">$49</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Research;
