import React from 'react';
import { Link } from 'react-router-dom';

const RequestAccess: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [showFallback, setShowFallback] = React.useState(false);

  React.useEffect(() => {
    // 设置超时计时器，5秒后显示备用按钮
    const timer = setTimeout(() => {
      if (isLoading) {
        setShowFallback(true);
      }
    }, 5000);

    // 动态加载 Tally 脚本
    const scriptUrl = "https://tally.so/Widgets/Embed/v1.js";
    
    const loadTally = () => {
      if (typeof (window as any).Tally !== 'undefined') {
        (window as any).Tally.loadEmbeds();
      }
    };

    if (typeof (window as any).Tally !== 'undefined') {
      loadTally();
    } else if (document.querySelector(`script[src="${scriptUrl}"]`) === null) {
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      script.onload = loadTally;
      script.onerror = () => setShowFallback(true);
      document.body.appendChild(script);
    }

    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

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
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4 md:p-6 relative z-10">
        <div className="w-full max-w-xl bg-slate-900/50 border border-slate-800 rounded-2xl p-4 md:p-8 shadow-2xl backdrop-blur-sm animate-fade-in relative min-h-[650px]">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 z-20">
              <div className="w-12 h-12 border-4 border-volt border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-slate-400">Loading application form...</p>
              
              {showFallback && (
                <div className="mt-6 animate-fade-in">
                  <a 
                    href="https://tally.so/r/vGA7Rg" 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                  >
                    Load Form Manually <i className="fa-solid fa-external-link-alt text-xs"></i>
                  </a>
                </div>
              )}
            </div>
          )}
          
          <iframe 
            src="https://tally.so/embed/vGA7Rg?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            data-tally-src="https://tally.so/embed/vGA7Rg?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
            loading="eager" 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            title="Institutional Membership Application"
            style={{ margin: 0, minHeight: '650px', overflow: 'hidden' }}
            onLoad={handleIframeLoad}
          ></iframe>
        </div>
      </main>
    </div>
  );
};

export default RequestAccess;