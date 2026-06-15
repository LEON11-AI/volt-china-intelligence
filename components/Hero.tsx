import React from 'react';

const Hero: React.FC = () => {
  const [email, setEmail] = React.useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // 尝试构建完整的订阅链接，并将 email 参数放在最前面
    const subscribeUrl = `https://voltchina.substack.com/subscribe?email=${encodeURIComponent(email)}&simple=true`;
    window.open(subscribeUrl, '_blank');
  };

  return (
    <section id="brief" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden scroll-mt-24 md:scroll-mt-28">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-volt/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-xs font-medium text-volt mb-8 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-volt opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-volt"></span>
          </span>
          On-the-Ground Intelligence
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 leading-tight max-w-5xl mx-auto">
          Understand How China's EV & Robotics <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-b md:bg-gradient-to-r from-white to-slate-400">
            Breakthroughs Actually Work.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          VoltChina explains the engineering behind China's batteries, smart-driving systems, EV architectures, humanoid robots, and manufacturing scale in clear English for global tech readers.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <a
            href="https://voltchina.substack.com/subscribe"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 bg-volt hover:bg-volt-hover text-white font-bold rounded-lg transition-all shadow-lg shadow-volt/20 hover:shadow-volt/40"
          >
            Subscribe Free
          </a>
          <a
            href="https://www.youtube.com/@VoltChina"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 bg-slate-900/80 hover:bg-slate-800 text-white font-bold rounded-lg transition-all border border-slate-700"
          >
            Watch on YouTube
          </a>
        </div>

        {/* Lead Magnet / Email Capture */}
        <div className="max-w-2xl mx-auto mb-16 bg-slate-900/80 border border-volt/20 rounded-2xl p-6 backdrop-blur-sm shadow-2xl shadow-volt/10">
          <div className="flex items-center justify-center gap-2 mb-4 text-volt">
            <i className="fa-solid fa-envelope-open-text"></i>
            <span className="text-sm font-bold uppercase tracking-wider">Free Weekly Brief</span>
          </div>
          <h3 className="text-lg md:text-xl font-medium text-slate-300 mb-3 leading-snug">
            <span className="block text-2xl md:text-3xl font-bold text-white mb-2">Get the China EV & Robotics Engineering Brief.</span>
            One clear weekly email explaining the Chinese technologies global audiences keep hearing about but rarely understand.
          </h3>
          <p className="text-slate-400 text-sm mb-6">
            Bonus: receive the 15-page BYD Solid-State Battery Engineering Report when you subscribe.
          </p>
          
          <div className="relative">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                required
                className="flex-1 bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-volt focus:ring-1 focus:ring-volt transition-all placeholder-slate-500"
              />
              <button 
                type="submit"
                className="bg-volt hover:bg-volt-hover text-white font-bold px-6 py-3 rounded-lg transition-all shadow-lg shadow-volt/20 hover:shadow-volt/40 whitespace-nowrap text-center flex items-center justify-center cursor-pointer"
              >
                Subscribe Free
              </button>
            </form>
          </div>
          <p className="text-xs text-slate-600 mt-3">
            Engineering explanations. China-source context. No investment advice. Unsubscribe anytime.
          </p>
        </div>
        
        {/* Stats / Mini Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-slate-800/50 pt-8">
            <div className="text-center">
                <div className="text-2xl font-bold text-white">1M+</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">YouTube Views</div>
            </div>
            <div className="text-center">
                <div className="text-2xl font-bold text-white">5,000+</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">Subscribers</div>
            </div>
            <div className="text-center">
                <div className="text-2xl font-bold text-white">Weekly</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">English Brief</div>
            </div>
            <div className="text-center">
                <div className="text-2xl font-bold text-white">Global</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">Tech Readers</div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
