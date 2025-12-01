import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-volt/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-xs font-medium text-volt mb-8 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-volt opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-volt"></span>
          </span>
          On-the-Ground Intelligence
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 leading-tight max-w-5xl mx-auto">
          Unrivaled Intelligence on <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
            China's EV Revolution.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          We bridge the context gap. Delivering expert analysis and curated data on the world's fastest-moving automotive market for institutional investors.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="https://voltchina.gumroad.com/l/qa"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-volt hover:bg-volt-hover text-white text-base font-bold rounded-lg transition-all shadow-xl shadow-volt/20 hover:shadow-volt/40 flex items-center justify-center gap-2"
          >
            <span>Ask an Expert ($149)</span>
            <i className="fa-solid fa-arrow-right text-sm"></i>
          </a>
          
          <a 
            href="#research"
            className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-white border border-slate-700 hover:border-slate-600 text-base font-semibold rounded-lg transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
          >
            <i className="fa-regular fa-file-lines"></i>
            <span>Read Latest Research</span>
          </a>
        </div>

        {/* Stats / Mini Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-slate-800/50 pt-8">
            <div className="text-center">
                <div className="text-2xl font-bold text-white">48hr</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">Turnaround</div>
            </div>
            <div className="text-center">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">Independent</div>
            </div>
            <div className="text-center">
                <div className="text-2xl font-bold text-white">No.1</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">Source</div>
            </div>
            <div className="text-center">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">OEMs Covered</div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
