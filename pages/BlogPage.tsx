import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const BlogPage: React.FC = () => {
  const posts = [
    { 
      id: 0, 
      title: 'Huawei ADS 3.0: The Hardware-Fusion Moat', 
      date: '2025-12-05',
      link: 'https://voltchina.gumroad.com/l/huawei-ads',
      isExternal: true,
      tag: 'Premium'
    },
    { 
      id: 1, 
      title: 'BYD solid-state breakthroughs', 
      date: '2025-11-20',
      link: '/research/solid-state-battery',
      isExternal: false,
      tag: 'Report'
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <Navbar />
      <main className="pt-32 pb-20 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Research Blog</h2>
            <p className="text-slate-400">Analysis, notes, and charts.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((p) => {
              const content = (
                <>
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-xs text-slate-400">{p.date}</div>
                    {p.tag && <span className={`text-xs px-2 py-0.5 rounded ${p.tag === 'Premium' ? 'bg-red-600/20 text-red-400' : 'bg-slate-700 text-slate-300'}`}>{p.tag}</span>}
                  </div>
                  <div className="text-lg font-semibold text-white group-hover:text-volt transition-colors">{p.title}</div>
                </>
              );

              if (p.link) {
                if (p.isExternal) {
                  return (
                    <a key={p.id} href={p.link} target="_blank" rel="noopener noreferrer" className="block bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800 transition-colors group">
                      {content}
                    </a>
                  );
                }
                return (
                  <Link key={p.id} to={p.link} className="block bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800 transition-colors group">
                    {content}
                  </Link>
                );
              }

              return (
                <div key={p.id} className="block bg-slate-800/50 border border-slate-700 rounded-xl p-6 opacity-75">
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
