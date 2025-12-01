import React from 'react';

const ExpertServices: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-slate-950 relative scroll-mt-24 md:scroll-mt-28">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-900/20 skew-x-12 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div>
            <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-volt uppercase bg-volt/10 rounded-full">
              Expert Network
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Direct Access to the Source
            </h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Skip the noise of mainstream media. Get specific, actionable intelligence on battery technology, manufacturing costs, and supply chain dynamics directly from experts on the ground.
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                "Verification of rumor vs. reality in China's market",
                "Technical breakdown of new EV architectures",
                "Supply chain sourcing and cost analysis",
                "Competitor benchmarking (BYD, Xiaomi, Huawei)"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-300">
                  <div className="mt-1 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-check text-xs text-green-500"></i>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing Card */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-volt to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-2xl">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white">Priority Q&A Service</h3>
                  <p className="text-sm text-slate-400 mt-1">For immediate, specific inquiries.</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">$149</div>
                  <div className="text-xs text-slate-500">per query</div>
                </div>
              </div>

              <div className="h-px w-full bg-slate-800 mb-8"></div>

              <div className="space-y-4 mb-8">
                <FeatureRow icon="fa-stopwatch" text="48-hour turnaround time" />
                <FeatureRow icon="fa-file-lines" text="Written report delivered via email" />
                <FeatureRow icon="fa-phone-slash" text="No calls required - Asynchronous" />
                <FeatureRow icon="fa-user-tie" text="Researched by Senior Analysts" />
              </div>

              <a 
                href="https://voltchina.gumroad.com/l/qa"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 text-center bg-white text-slate-950 hover:bg-slate-200 font-bold rounded-lg transition-colors"
              >
                Submit Your Question
              </a>
              <p className="text-xs text-center text-slate-500 mt-4">
                100% Satisfaction Guarantee or full refund.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const FeatureRow: React.FC<{icon: string, text: string}> = ({ icon, text }) => (
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-slate-300 shrink-0">
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <span className="text-slate-300 font-medium">{text}</span>
  </div>
);

export default ExpertServices;
