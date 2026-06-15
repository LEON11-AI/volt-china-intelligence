import React from 'react';

const SocialProof: React.FC = () => {
  const testimonials = [
    {
      text: "Very intelligently explained. The engineering breakdown made BYD's approach much easier to understand.",
      name: "VoltChina viewer",
      title: "EV technology reader",
    },
    {
      text: "The clearest value is the mechanism-first framing: not just what China announced, but how the system works.",
      name: "Newsletter reader",
      title: "Global hard-tech audience",
    },
  ];

  return (
    <section className="py-12 bg-slate-900 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-volt mb-4">
            Trusted by a global niche audience
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Engineering explanations for readers who want more than headlines.
          </h2>
          <p className="text-slate-400 leading-relaxed">
            VoltChina reaches viewers and subscribers interested in Chinese EVs, batteries, smart-driving systems,
            robotics, manufacturing, and the real mechanisms behind hard-tech announcements.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          {testimonials.map((t, i) => (
            <div key={i} className="relative p-8 bg-slate-800/30 rounded-2xl border border-slate-700/50">
              <i className="fa-solid fa-quote-left absolute top-6 left-6 text-4xl text-slate-700 opacity-50"></i>
              <blockquote className="relative z-10 text-xl md:text-2xl text-slate-200 font-light leading-relaxed mb-6">
                "{t.text}"
              </blockquote>
              <cite className="not-italic flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-slate-400">
                  <i className="fa-solid fa-user"></i>
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-white">{t.name}</div>
                  <div className="text-xs text-slate-400">{t.title}</div>
                </div>
              </cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
