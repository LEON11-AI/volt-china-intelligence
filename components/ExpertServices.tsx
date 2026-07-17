import React from 'react';
import { Link } from 'react-router-dom';

const ExpertServices: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-slate-950 relative scroll-mt-24 md:scroll-mt-28">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-900/20 skew-x-12 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-volt uppercase bg-volt/10 rounded-full">
              Written Research
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Move from Chinese sources to a decision-ready brief.
            </h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              For small investment firms, independent researchers, boutique consultancies, and corporate strategy teams: bring one focused question about a Chinese EV, battery, smart-driving, robotics, supplier, or manufacturing topic. VoltChina will return a concise English brief grounded in public, verifiable Chinese-language sources.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                'Written delivery by email or shared document',
                'Chinese-language sources screened, translated, and linked',
                'Focused on a defined decision, company, technology, or category',
                'Async-first workflow, so no live call is required',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-300">
                  <div className="mt-1 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-check text-xs text-green-500"></i>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-volt to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-2xl">
              <div className="flex justify-between items-start mb-8 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Custom Written Brief</h3>
                  <p className="text-sm text-slate-400 mt-1">For one focused research question.</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-white">Starting at $800</div>
                  <div className="text-xs text-slate-500">per written brief</div>
                </div>
              </div>

              <div className="h-px w-full bg-slate-800 mb-8"></div>

              <div className="space-y-4 mb-8">
                <FeatureRow icon="fa-stopwatch" text="5-7 day turnaround" />
                <FeatureRow icon="fa-file-lines" text="Written memo delivered by email" />
                <FeatureRow icon="fa-phone-slash" text="Async follow-up if clarification is needed" />
                <FeatureRow icon="fa-link" text="Public and verifiable source trail" />
              </div>

              <Link
                to="/intelligence#research-request"
                className="block w-full py-4 text-center bg-volt text-white hover:bg-volt-hover font-bold rounded-lg transition-colors shadow-lg shadow-volt/20 hover:shadow-volt/40"
              >
                Submit a Research Question
              </Link>
              <p className="text-xs text-center text-slate-500 mt-4">
                Research is source-backed and scope-defined; full terms and limitations are stated before work begins.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureRow: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-slate-300 shrink-0">
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <span className="text-slate-300 font-medium">{text}</span>
  </div>
);

export default ExpertServices;
