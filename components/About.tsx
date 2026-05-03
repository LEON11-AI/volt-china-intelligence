import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-slate-950 scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="relative w-28 h-28 mx-auto mb-6 group">
              <img 
                  src="/VC.png"
                  alt="Volt China"
                  loading="lazy"
                  decoding="async"
                  width={112}
                  height={112}
                  className="relative w-full h-full object-cover rounded-xl shadow-2xl bg-slate-900"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/avatar-default.svg'; }}
              />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Volt China Intelligence</h2>
          <p className="text-xl md:text-2xl font-medium text-volt mb-8">
            The Bridge to China's Hard-Tech Reality.
          </p>
        </div>
        
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
          <div className="text-base md:text-lg text-slate-300 leading-relaxed space-y-6">
            <p>
              Volt China is an independent intelligence platform deeply immersed in the Chinese technology ecosystem.
            </p>
            <p>
              We don't sell insider leaks, and we don't rely on corporate PR. Instead, we specialize in extreme OSINT (Open Source Intelligence).
            </p>
            <p>
              While Western analysts wait for translated press releases, we directly mine and decode the raw, unfiltered data sources at the ground level:
            </p>
            <div className="bg-slate-950/50 rounded-xl p-6 border border-slate-800/50 my-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <i className="fa-solid fa-microchip text-volt mt-1 mr-4 w-5 text-center"></i>
                  <span><strong className="text-white">CNIPA Engineering Patents</strong> (translating complex mechanical blueprints before they hit global markets).</span>
                </li>
                <li className="flex items-start">
                  <i className="fa-solid fa-industry text-volt mt-1 mr-4 w-5 text-center"></i>
                  <span><strong className="text-white">Tier-2 and critical Tier-3 Supplier Procurement Bids</strong> (tracking exactly who is supplying the lasers, motors, and chips).</span>
                </li>
                <li className="flex items-start">
                  <i className="fa-solid fa-chart-line text-volt mt-1 mr-4 w-5 text-center"></i>
                  <span><strong className="text-white">Local Manufacturing Capacity Reports</strong> (verifying true yield rates and BOM costs).</span>
                </li>
              </ul>
            </div>
            <p>
              The language barrier and fragmented nature of Chinese domestic data create a massive blind spot for global investors. Our mission is to eliminate that blind spot.
            </p>
            <p>
              Whether you are a hedge fund manager or an automotive strategist, Volt China saves you hundreds of hours of research by delivering the exact engineering and supply chain realities driving the world's fastest-moving market.
            </p>
            
            <div className="pt-10 mt-10 border-t border-slate-800/80 text-center">
              <p className="font-extrabold text-white text-2xl md:text-3xl tracking-[0.2em] uppercase flex items-center justify-center gap-4">
                <span className="w-12 md:w-20 h-[2px] bg-gradient-to-r from-transparent to-volt"></span>
                Strictly data-driven. Zero hype.
                <span className="w-12 md:w-20 h-[2px] bg-gradient-to-l from-transparent to-volt"></span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <a href="mailto:business@voltchina.net" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors border border-slate-700">
            <i className="fa-solid fa-envelope"></i> Get in touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
