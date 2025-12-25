import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const BYD_ADAS_Strategy: React.FC = () => {
  const [src, setSrc] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const navigate = useNavigate();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    const ref = document.referrer;
    try {
      const sameOrigin = ref && new URL(ref).origin === window.location.origin;
      if (sameOrigin) navigate(-1); else navigate('/research');
    } catch { navigate('/research'); }
  };

  useEffect(() => {
    const pickSrc = async () => {
      const candidates = [
        '/reports/byd-adas-strategy.html',
        '/exclusive/byd-adas-strategy.html',
        '/byd-adas-strategy.html'
      ];
      for (const url of candidates) {
        try {
          const res = await fetch(url, { method: 'HEAD' });
          if (res.ok) { setSrc(url); return; }
        } catch {}
      }
      setSrc('');
    };
    pickSrc();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <a href="#" onClick={handleBack} className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
              <i className="fa-solid fa-arrow-left"></i>
              Back
            </a>
            <a href="https://voltchina.gumroad.com/l/qa" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-md bg-volt hover:bg-volt-hover text-white text-sm font-semibold">Download Full PDF Report</a>
          </div>
          {src ? (
            <iframe
              ref={iframeRef}
              src={src}
              onLoad={() => {
                const el = iframeRef.current; if (!el) return;
                try {
                  const h = el.contentWindow?.document?.documentElement?.scrollHeight || el.contentWindow?.document?.body?.scrollHeight || 0;
                  if (h) el.style.height = h + 'px';
                } catch {}
              }}
              style={{ width: '100%', height: '100vh', border: '0', background: '#020617', borderRadius: '12px' }}
            />
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-400">Place the HTML file under <code>/public/reports/byd-adas-strategy.html</code>.</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BYD_ADAS_Strategy;
