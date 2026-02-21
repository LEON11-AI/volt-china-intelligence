import React from 'react';

const Enterprise: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group hover:border-amber-500/50 transition-all shadow-xl shadow-amber-900/10">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <i className="fa-solid fa-building-columns text-9xl text-amber-500"></i>
            </div>
            
            <div className="relative z-10 md:w-1/2 mb-6 md:mb-0">
              <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-500 text-xs font-bold rounded-full mb-4">ENTERPRISE</span>
              <h3 className="text-2xl font-bold text-amber-400 mb-2">Enterprise Research & Advisory</h3>
              <p className="text-slate-400 mb-4">For Institutional Investors & Strategy Teams</p>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <i className="fa-solid fa-check text-amber-500 mt-1"></i>
                  <span>Supplier Identification & Due Diligence</span>
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
            
            <div className="relative z-10 md:w-1/3 flex flex-col items-center md:items-end">
               <div className="mb-6 text-center md:text-right">
                 <span className="text-2xl font-bold text-white block">Custom Quote</span>
               </div>
               <a 
                href="mailto:business@voltchina.net"
                className="w-full px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-envelope"></i>
                <span>Contact Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Enterprise;
