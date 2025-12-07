import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ResearchIndex: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <Navbar />
      <main>
        <section className="pt-24 pb-12 lg:pt-32 lg:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">Deep Dive Research & Intelligence</h1>
            <p className="text-slate-400 max-w-2xl">Curated analyses on EV technology and market dynamics for institutional investors.</p>
          </div>
        </section>

        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Huawei ADS 3.0 Report */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col">
                <div className="aspect-[16/9] overflow-hidden relative group">
                  <img 
                    src="/huawei-cover.webp" 
                    alt="Huawei ADS 3.0 Report" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-lg">PREMIUM</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Huawei ADS 3.0: The Hardware-Fusion Moat
                  </h3>
                  <p className="text-slate-400 mb-4 line-clamp-3">
                    Exclusive BOM cost breakdown vs Tesla FSD, and a supply chain investment watchlist (10 Tickers). We reveal how Huawei achieves 5x safety redundancy.
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800">
                    <div className="text-xs text-slate-500">Report • Hardware</div>
                    <a 
                      href="https://voltchina.gumroad.com/l/huawei-ads" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-volt hover:bg-volt-hover text-white rounded-lg font-semibold inline-flex items-center gap-2 text-sm transition-colors"
                    >
                      <span>Get Report ($49)</span>
                      <i className="fa-solid fa-arrow-right text-xs" />
                    </a>
                  </div>
                </div>
              </div>

              {/* BYD Solid State Report */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col">
                <div className="aspect-[16/9] overflow-hidden">
                  <img src="/og-image.jpg" alt="Solid State Battery Report" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <Link to="/research/solid-state-battery" className="text-xl font-bold text-white mb-2 hover:text-volt" aria-label="Read BYD solid-state breakthroughs">
                    BYD solid-state breakthroughs
                  </Link>
                  <p className="text-slate-400 mb-4 text-sm flex-grow">A comprehensive analysis of technical routes and 2030 market forecast.</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800">
                    <div className="text-xs text-slate-500">Report • Technology</div>
                    <Link to="/research/solid-state-battery" className="px-4 py-2 bg-volt hover:bg-volt-hover text-white rounded-lg font-semibold inline-flex items-center gap-2 text-sm">
                      <span>Read Analysis</span>
                      <i className="fa-solid fa-arrow-right text-xs" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ResearchIndex;
