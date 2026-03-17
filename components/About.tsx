import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-slate-950 scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative w-32 h-32 mx-auto mb-6 group">
            {/* Gradient Ring matching the yellow/orange theme */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-yellow-400 via-volt to-orange-600 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-500"></div>
            
            {/* 
              NOTE: To use your own image:
              1. Place 'leon-avatar.png' in your public folder.
              2. Change the src below to: src="/leon-avatar.png"
            */}
            <img 
                src="/vc.png"
                alt="Volt China"
                loading="lazy"
                decoding="async"
                width={128}
                height={128}
                className="relative w-full h-full object-cover rounded-full border-2 border-slate-700 shadow-2xl bg-slate-900"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/avatar-default.svg'; }}
            />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4">Volt China Intelligence</h2>
        
        <div className="text-base md:text-lg text-slate-400 leading-relaxed mb-8 text-left space-y-5 max-w-2xl mx-auto">
          <p className="text-xl md:text-2xl font-semibold text-white text-center mb-8">
            The Bridge to China's Hard-Tech Reality.
          </p>
          <p>
            Volt China is an independent intelligence platform founded by a solo research analyst deeply immersed in the Chinese technology ecosystem.
          </p>
          <p>
            I don't sell insider leaks, and I don't rely on corporate PR. Instead, I specialize in extreme OSINT (Open Source Intelligence).
          </p>
          <p>
            While Western analysts wait for translated press releases, I directly mine and decode the raw, unfiltered data sources at the ground level:
          </p>
          <ul className="list-disc pl-5 md:pl-8 space-y-3 text-slate-300 py-2">
            <li><strong className="text-white">CNIPA Engineering Patents</strong> (translating complex mechanical blueprints before they hit global markets).</li>
            <li><strong className="text-white">Tier-2/Tier-3 Supplier Procurement Bids</strong> (tracking exactly who is supplying the lasers, motors, and chips).</li>
            <li><strong className="text-white">Local Manufacturing Capacity Reports</strong> (verifying true yield rates and BOM costs).</li>
          </ul>
          <p>
            The language barrier and fragmented nature of Chinese domestic data create a massive blind spot for global investors. My mission is to eliminate that blind spot.
          </p>
          <p>
            Whether you are a hedge fund manager or an automotive strategist, Volt China saves you hundreds of hours of research by delivering the exact engineering and supply chain realities driving the world's fastest-moving market.
          </p>
          <p className="font-bold text-volt text-center pt-6 text-xl">
            Strictly data-driven. Zero hype.
          </p>
        </div>

        <div className="flex justify-center gap-6">
          <a href="mailto:business@voltchina.net" className="text-slate-400 hover:text-volt transition-colors">
            <i className="fa-solid fa-envelope mr-2"></i> Get in touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
