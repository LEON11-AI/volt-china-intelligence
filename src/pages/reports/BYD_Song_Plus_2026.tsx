import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import PageHero from '../../../components/PageHero';

const BYD_Song_Plus_2026: React.FC = () => {
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
        '/reports/byd-song-plus-2026.html',
        '/exclusive/byd-song-plus-2026.html',
        '/byd-song-plus-2026.html'
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
      <main>
        <PageHero compact eyebrow="EDITORIAL ANALYSIS" title="2026 BYD Song Plus Deep Dive" description="Editorial analysis of the 2026 BYD Song Plus platform, specifications, and competitive positioning.">
          <a href="/research" className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-slate-950/35 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-black/20 backdrop-blur-xl transition-all hover:border-volt hover:bg-slate-900">Browse Research <i className="fa-solid fa-arrow-right text-xs" /></a>
        </PageHero>
        <section className="bg-slate-950 px-4 pb-20 pt-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-6">
            <a href="#" onClick={handleBack} className="text-volt hover:text-volt-light flex items-center gap-2">
              <i className="fa-solid fa-arrow-left"></i>
              Back
            </a>
            <a href="https://voltchina.substack.com/subscribe" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-md bg-volt hover:bg-volt-hover text-white text-sm font-semibold">Subscribe for Access</a>
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
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-400">Place the HTML file under <code>/public/reports/byd-song-plus-2026.html</code>.</div>
          )}
        </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BYD_Song_Plus_2026;
