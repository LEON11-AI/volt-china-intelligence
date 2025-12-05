import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const HuaweiStocksList: React.FC = () => {
  const [src, setSrc] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const pickSrc = async () => {
      const candidates = ['/exclusive/huawei-stocks.html', '/huawei-stocks.html'];
      for (const url of candidates) {
        try {
          const res = await fetch(url, { method: 'HEAD' });
          if (res.ok) {
            setSrc(url);
            return;
          }
        } catch {}
      }
      setSrc('/exclusive/huawei-stocks.html');
    };
    pickSrc();
  }, []);

  useEffect(() => {
    const existing = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const prev = existing ? existing.getAttribute('content') : null;
    let el = existing;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', 'robots');
      document.head.appendChild(el);
    }
    el.setAttribute('content', 'noindex');
    return () => {
      if (existing) {
        if (prev !== null) existing.setAttribute('content', prev);
      } else if (el) {
        document.head.removeChild(el);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 mb-6">
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Huawei Stocks List</h1>
            {(() => {
              const location = useLocation();
              const isStocks = location.pathname.includes('/exclusive/huawei-supply-chain-alpha');
              return (
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/60 border border-slate-700/60 p-1">
                    <Link to="/exclusive/huawei-ads-cost-breakdown" className={`px-4 py-2 rounded-full transition-colors ${!isStocks ? 'bg-slate-900 text-white' : 'text-slate-300 hover:text-white'}`}>Cost Analysis</Link>
                    <Link to="/exclusive/huawei-supply-chain-alpha" className={`px-4 py-2 rounded-full transition-colors ${isStocks ? 'bg-slate-900 text-white' : 'text-slate-300 hover:text-white'}`}>Supply Chain Alpha</Link>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold">CONFIDENTIAL REPORT</div>
                </div>
              );
            })()}
          </div>
          {src ? (
            <iframe
              ref={iframeRef}
              src={src}
              onLoad={() => {
                const el = iframeRef.current;
                if (!el) return;
                try {
                  const h = el.contentWindow?.document?.documentElement?.scrollHeight || el.contentWindow?.document?.body?.scrollHeight || 0;
                  if (h) el.style.height = h + 'px';
                } catch {}
              }}
              style={{ width: '100%', height: '100vh', border: '0', background: 'transparent', borderRadius: '12px' }}
            />
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-400">Content not available. Please place the HTML file under <code>/public/exclusive/huawei-stocks.html</code>.</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HuaweiStocksList;
