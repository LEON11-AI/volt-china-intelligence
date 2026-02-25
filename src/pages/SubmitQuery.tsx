import React from 'react';
import { Link } from 'react-router-dom';

const SubmitQuery: React.FC = () => {
  React.useEffect(() => {
    // 动态加载 Tally 脚本
    const scriptUrl = "https://tally.so/Widgets/Embed/v1.js";
    
    const loadTally = () => {
      if (typeof (window as any).Tally !== 'undefined') {
        (window as any).Tally.loadEmbeds();
      } else {
        document.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((e) => {
          (e as HTMLIFrameElement).src = (e as HTMLElement).dataset.tallySrc || "";
        });
      }
    };

    if (typeof (window as any).Tally !== 'undefined') {
      loadTally();
    } else if (document.querySelector(`script[src="${scriptUrl}"]`) === null) {
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.onload = loadTally;
      script.onerror = loadTally;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-volt/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-slate-800">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/favicon.png" alt="Volt China Logo" className="w-12 h-12 rounded-xl object-cover" />
            <span className="text-xl font-bold tracking-tight text-white">
              VOLT CHINA <span className="font-light text-slate-400">| Intelligence</span>
            </span>
          </Link>
          <div className="text-sm text-slate-400">
            Submit Query
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 relative z-10 h-full">
        <h1 className="text-3xl font-bold mb-8 text-center">Priority Intelligence Request</h1>
        <div className="w-full max-w-2xl bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-sm overflow-hidden">
          <iframe 
            data-tally-src="https://tally.so/embed/GxzNPO?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
            loading="eager" 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            title="Priority Intelligence Request"
            style={{ margin: 0, minHeight: '650px', overflow: 'hidden' }}
          ></iframe>
        </div>
      </main>
    </div>
  );
};

export default SubmitQuery;
