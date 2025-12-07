import React, { useState, useEffect } from 'react';

const FeaturedReport: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ['/huawei-cover.webp', '/huawei-Stock.webp'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col md:flex-row relative group">
          
          {/* Image Side */}
          <div className="w-full md:w-3/5 relative h-64 md:h-auto bg-black overflow-hidden z-10 flex items-center justify-center shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]">
            {images.map((img, index) => (
              <img 
                key={img}
                src={img}
                alt="Huawei ADS 3.0 Analysis"
                loading="lazy"
                className={`absolute w-full transition-all duration-[2000ms] ease-out ${
                  index === currentImageIndex ? `opacity-100 brightness-95 ${index === 0 ? 'scale-100' : 'scale-105'}` : 'opacity-0 scale-100 brightness-50'
                } ${index === 1 ? 'top-14 h-[calc(100%-3.5rem)] object-top object-cover' : 'inset-0 h-full object-center object-contain'}`}
              />
            ))}
            {/* Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent opacity-40 pointer-events-none"></div>
            
            <div className="absolute top-4 left-4 z-20">
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
          <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-center relative z-10">
            <div className="mb-3">
              <span className="text-volt font-bold tracking-wider text-xs uppercase mb-1 block">Premium Intelligence</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                Huawei ADS 3.0: <br/>
                <span className="text-slate-400">The Hardware-Fusion Moat</span>
              </h2>
            </div>
            
            <p className="text-slate-300 mb-6 text-sm md:text-base leading-relaxed">
              Exclusive BOM cost breakdown vs Tesla FSD, and a supply chain investment watchlist (10 Tickers). We reveal how Huawei achieves 5x safety redundancy.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-auto w-full">
              <a 
                href="https://voltchina.gumroad.com/l/huawei-ads" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-volt hover:bg-volt-hover text-white rounded-lg font-bold text-center transition-all shadow-lg shadow-volt/20 hover:shadow-volt/40 flex items-center justify-center gap-2 text-sm"
              >
                <span>Get the Report ($49)</span>
                <i className="fa-solid fa-arrow-right"></i>
              </a>
              <div className="text-slate-500 text-xs text-right">
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
