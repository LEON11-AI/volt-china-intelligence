import { Link } from 'react-router-dom';

const PricingPlans: React.FC = () => {
  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Unlock the Full Intelligence Stack</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Choose the level of depth your team needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          
          {/* Column 1: The Observer (Free) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col hover:border-slate-700 transition-colors">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-white">Newsletter</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="ml-2 text-slate-500">/ forever</span>
              </div>
              <p className="text-sm text-slate-400 mt-4 min-h-[40px]">
                For individual investors and enthusiasts following the headlines.
              </p>
            </div>
            
            <a 
              href="https://voltchina.substack.com/subscribe" 
              target="_blank"
              rel="noreferrer"
              className="block w-full py-3 text-center bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors border border-slate-700 mt-4"
            >
              Join for Free
            </a>

            <div className="mt-8 pt-8 border-t border-slate-800">
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <i className="fa-solid fa-check text-green-500 mt-1"></i>
                  <span>Weekly market commentary</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <i className="fa-solid fa-check text-green-500 mt-1"></i>
                  <span>Basic teardown summaries</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <i className="fa-solid fa-check text-green-500 mt-1"></i>
                  <span>Access to public articles</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-500">
                  <i className="fa-solid fa-xmark text-slate-600 mt-1"></i>
                  <span>No raw data access</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 2: The Investor (Institutional Access) - Recommended */}
          <div className="bg-slate-900 border-2 border-volt rounded-2xl p-8 flex flex-col relative shadow-2xl shadow-volt/10 transition-transform duration-300 hover:scale-105 z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-volt text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide shadow-lg shadow-volt/20">
              Most Popular
            </div>
            
            <div className="mb-4">
              <h3 className="text-xl font-bold text-white">Institutional Access</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold text-white">$1,499</span>
                <span className="ml-2 text-slate-500">/ year</span>
              </div>
              <p className="text-sm text-slate-400 mt-4 min-h-[40px]">
                For hedge funds, PE firms, and automotive strategy teams requiring raw data and supply chain alpha.
              </p>
            </div>
            
            <Link 
              to="/request-access"
              className="block w-full py-3 text-center bg-volt hover:bg-volt-hover text-white font-bold rounded-lg transition-colors shadow-lg shadow-volt/20 hover:shadow-volt/40 mt-4"
            >
              Apply for Access
            </Link>

            <div className="mt-8 pt-8 border-t border-slate-800">
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <i className="fa-solid fa-check text-volt mt-1"></i>
                  <span>Everything in Newsletter</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <i className="fa-solid fa-check text-volt mt-1"></i>
                  <span><strong className="text-white">Master Supply Chain Database (Excel)</strong>: Full Tier-1/2 supplier lists & tickers (Updated Monthly).</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <i className="fa-solid fa-check text-volt mt-1"></i>
                  <span><strong className="text-white">Full Archive Unlock</strong>: Access to all past & future deep-dive PDF reports (Huawei, BYD, Xiaomi).</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <i className="fa-solid fa-check text-volt mt-1"></i>
                  <span><strong className="text-white">Priority Asynchronous Q&A</strong>: Direct line to suggest research topics.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <i className="fa-solid fa-check text-volt mt-1"></i>
                  <span><strong className="text-white">Team License</strong>: Share access within your organization (up to 5 seats).</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Enterprise (Custom) */}
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-8 flex flex-col hover:border-amber-500/50 transition-colors">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-amber-400">Enterprise</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold text-white">Custom</span>
              </div>
              <p className="text-sm text-slate-400 mt-4 min-h-[40px]">
                For large organizations needing bespoke research, on-the-ground validation, and direct hardware sourcing.
              </p>
            </div>
            
            <Link 
              to="/request-access"
              className="block w-full py-3 text-center bg-transparent hover:bg-amber-500/10 text-amber-500 font-bold rounded-lg transition-colors border border-amber-500/50 mt-4"
            >
              Contact Us
            </Link>

            <div className="mt-8 pt-8 border-t border-slate-800">
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <i className="fa-solid fa-check text-amber-500 mt-1"></i>
                  <span>Everything in Institutional</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <i className="fa-solid fa-check text-amber-500 mt-1"></i>
                  <span>Supplier Identification & Due Diligence</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <i className="fa-solid fa-check text-amber-500 mt-1"></i>
                  <span>Priority Asynchronous Q&A</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <i className="fa-solid fa-check text-amber-500 mt-1"></i>
                  <span>Raw Document Translation</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <i className="fa-solid fa-check text-amber-500 mt-1"></i>
                  <span><strong>Hardware Procurement & Matchmaking</strong> (Direct sourcing for Chinese robotics and EV components).</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
