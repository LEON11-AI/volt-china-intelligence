import React from 'react';

const SocialProof: React.FC = () => {
  const testimonials = [
    {
      text: "Very intelligently explained. I believe that BYD is there to stay and dominate. A new strong player is born.",
      name: "Bruno L.",
      title: "EV Market Observer",
    },
    {
      text: "It's about time we realize that Chinese [EV makers] are ahead of legacy automakers in many areas. Being the world's factory makes them unbeatable.",
      name: "John Simpson",
      title: "Industry Analyst",
    },
  ];

  return (
    <section className="py-12 bg-slate-900 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-lg md:text-xl font-semibold text-slate-400 mb-16">
          Read by 5,000+ industry professionals, with 1M+ views on YouTube.
        </p>

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
