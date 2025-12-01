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
                src="/leon-avatar.webp"
                alt="Leon, Founder"
                loading="lazy"
                decoding="async"
                width={128}
                height={128}
                srcSet="/leon-avatar.webp 1x, /leon-avatar@2x.webp 2x"
                className="relative w-full h-full object-cover rounded-full border-2 border-slate-700 shadow-2xl bg-slate-900"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop'; }}
            />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4">Leon, Founder</h2>
        
        <p className="text-lg text-slate-400 leading-relaxed mb-8">
          Reporting from the ground in China. Focused on in-depth engineering and supply chain analysis. 
          My mission is to cut through the hype and provide investors with the raw, unfiltered reality 
          of the Chinese automotive manufacturing prowess.
        </p>

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
