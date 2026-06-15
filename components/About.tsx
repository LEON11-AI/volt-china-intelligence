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

          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">About VoltChina</h2>
          <p className="text-xl md:text-2xl font-medium text-volt mb-8">
            Source-backed intelligence from inside China's hard-tech signal layer.
          </p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
          <div className="text-base md:text-lg text-slate-300 leading-relaxed space-y-6">
            <p>
              VoltChina is an independent English-language media and research project focused on China's electric vehicles, batteries, smart-driving systems, humanoid robots, and advanced manufacturing supply chains.
            </p>
            <p>
              We do not sell investment advice, insider leaks, or undisclosed paid puff pieces. We may work with sponsors and partners when the product fits our audience, the relationship is clearly disclosed, and VoltChina keeps full editorial control.
            </p>
            <p>
              The goal is simple: help global readers understand not just what China announced, but why it matters mechanically, industrially, and competitively.
            </p>

            <div className="bg-slate-950/50 rounded-xl p-6 border border-slate-800/50 my-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <i className="fa-solid fa-microchip text-volt mt-1 mr-4 w-5 text-center"></i>
                  <span><strong className="text-white">Technical materials and patents</strong> for understanding how systems are physically designed.</span>
                </li>
                <li className="flex items-start">
                  <i className="fa-solid fa-industry text-volt mt-1 mr-4 w-5 text-center"></i>
                  <span><strong className="text-white">Supplier and manufacturing signals</strong> for adding context behind product claims.</span>
                </li>
                <li className="flex items-start">
                  <i className="fa-solid fa-chart-line text-volt mt-1 mr-4 w-5 text-center"></i>
                  <span><strong className="text-white">Local industry discussions</strong> for spotting real bottlenecks, tradeoffs, and adoption barriers.</span>
                </li>
              </ul>
            </div>

            <div className="pt-10 mt-10 border-t border-slate-800/80 text-center">
              <p className="font-extrabold text-white text-2xl md:text-3xl tracking-[0.16em] uppercase flex items-center justify-center gap-4">
                <span className="w-10 md:w-16 h-[2px] bg-gradient-to-r from-transparent to-volt"></span>
                Mechanism first. Evidence always. No hype.
                <span className="w-10 md:w-16 h-[2px] bg-gradient-to-l from-transparent to-volt"></span>
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
