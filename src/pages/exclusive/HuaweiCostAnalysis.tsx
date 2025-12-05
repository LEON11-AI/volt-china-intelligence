import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const HuaweiCostAnalysis: React.FC = () => {
  const [src, setSrc] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const location = useLocation();
  const isCost = location.pathname.includes('/exclusive/vip-cost-8848');

  useEffect(() => {
    const pickSrc = async () => {
      const candidates = ['/exclusive/huawei-cost.html', '/huawei-cost.html'];
      for (const url of candidates) {
        try {
          const res = await fetch(url, { method: 'HEAD' });
          if (res.ok) {
            setSrc(url);
            return;
          }
        } catch {}
      }
      setSrc('/exclusive/huawei-cost.html');
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
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Huawei Cost Analysis</h1>
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/60 border border-slate-700/60 p-1">
                <Link to="/exclusive/vip-cost-8848" className={`px-4 py-2 rounded-full transition-colors ${isCost ? 'bg-slate-900 text-white' : 'text-slate-300 hover:text-white'}`}>Cost Analysis</Link>
                <Link to="/exclusive/vip-supply-9961" className={`px-4 py-2 rounded-full transition-colors ${!isCost ? 'bg-slate-900 text-white' : 'text-slate-300 hover:text-white'}`}>Supply Chain Alpha</Link>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold">CONFIDENTIAL REPORT</div>
            </div>
          </div>
          {src ? (
            <iframe
              ref={iframeRef}
              src={src}
              onLoad={() => {
                const el = iframeRef.current;
                if (!el) return;
                try {
                  const doc = el.contentWindow?.document;
                  if (doc) {
                    const toEnglishOnly = (input: string) => {
                      let out = input;
                      const dict: Array<[RegExp, string]> = [
                        [/坚持/g, ' insists on '],
                        [/供应链/g, 'supply chain'],
                        [/成本/g, 'cost'],
                        [/突破/g, 'breakthroughs'],
                        [/市场/g, 'market'],
                        [/路线/g, 'route'],
                        [/公司/g, 'company'],
                        [/优势/g, 'advantages'],
                        [/挑战/g, 'challenges'],
                        [/中国/g, 'China'],
                        [/华为/g, 'Huawei'],
                        [/美元/g, 'USD'],
                        [/人民币/g, 'RMB']
                      ];
                      dict.forEach(([re, en]) => { out = out.replace(re, en); });
                      out = out.replace(/([0-9\.])(insists)/g, '$1 $2');
                      out = out.replace(/\s{2,}/g, ' ');
                      out = out.replace(/[\u4e00-\u9fff]+/g, '');
                      return out;
                    };
                    const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
                    let node = walker.nextNode();
                    while (node) {
                      const t = node.nodeValue || '';
                      const u = toEnglishOnly(t);
                      if (u !== t) node.nodeValue = u;
                      node = walker.nextNode();
                    }
                  }
                  const h = el.contentWindow?.document?.documentElement?.scrollHeight || el.contentWindow?.document?.body?.scrollHeight || 0;
                  if (h) el.style.height = h + 'px';
                } catch {}
              }}
              style={{ width: '100%', height: '100vh', border: '0', background: 'transparent', borderRadius: '12px' }}
            />
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-400">Content not available. Please place the HTML file under <code>/public/exclusive/huawei-cost.html</code>.</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HuaweiCostAnalysis;
