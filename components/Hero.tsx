import React from 'react';
import { Link } from 'react-router-dom';

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
        
        {/* Pricing/Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12 text-left">
          {/* Existing Offer - Standard/Q&A */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 flex flex-col hover:bg-slate-800 transition-colors">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-volt/10 text-volt text-xs font-bold rounded-full mb-2">INDIVIDUAL ACCESS</span>
              <h3 className="text-xl font-bold text-white">Expert Q&A Service</h3>
              <p className="text-sm text-slate-400 mt-2">Get verified answers to specific technical or market questions from our network.</p>
            </div>
            <div className="mt-auto pt-6 border-t border-slate-700/50">
               <div className="flex items-end justify-between mb-4">
                 <div>
                   <span className="text-2xl font-bold text-white">$149</span>
                   <span className="text-sm text-slate-500"> / query</span>
                 </div>
               </div>
               <a 
                href="https://voltchina.gumroad.com/l/qa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-6 py-3 bg-volt hover:bg-volt-hover text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>Ask an Expert</span>
                <i className="fa-solid fa-arrow-right text-sm"></i>
              </a>
            </div>
          </div>

          {/* New Offer - Enterprise */}
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 flex flex-col relative overflow-hidden group hover:border-amber-500/50 transition-all shadow-xl shadow-amber-900/10">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <i className="fa-solid fa-building-columns text-8xl text-amber-500"></i>
            </div>
            <div className="mb-4 relative z-10">
              <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-500 text-xs font-bold rounded-full mb-2">ENTERPRISE</span>
              <h3 className="text-xl font-bold text-amber-400">Enterprise Research & Advisory</h3>
              <p className="text-sm text-slate-400 mt-2">For Institutional Investors & Strategy Teams</p>
              
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <i className="fa-solid fa-check text-amber-500 mt-1"></i>
                  <span>Bespoke Supply Chain Due Diligence</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <i className="fa-solid fa-check text-amber-500 mt-1"></i>
                  <span>Custom Competitor Benchmarking</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <i className="fa-solid fa-check text-amber-500 mt-1"></i>
                  <span>On-the-ground Factory Validation</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-auto pt-6 border-t border-slate-800 relative z-10">
               <div className="flex items-end justify-between mb-4">
                 <div>
                   <span className="text-xl font-bold text-white">Custom Quote</span>
                 </div>
               </div>
               <a 
                href="mailto:business@voltchina.net"
                className="w-full px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-envelope"></i>
                <span>Contact Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Secondary Link */}
        <div className="mb-12">
           <Link 
            to="/blog"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5"
          >
            <i className="fa-regular fa-file-lines"></i>
            <span>Or read our latest public research</span>
          </Link>
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