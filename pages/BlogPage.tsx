import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BlogPage: React.FC = () => {
  const posts = [
    { id: 1, title: 'BYD solid-state breakthroughs', date: '2025-11-20' },
    { id: 2, title: 'CATL LFP cost curve 2025', date: '2025-10-05' },
    { id: 3, title: 'EV supply chain stress points', date: '2025-09-12' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <Navbar />
      <main className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Research Blog</h2>
            <p className="text-slate-400">Analysis, notes, and charts.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((p) => (
              <a key={p.id} href="#" className="block bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800">
                <div className="text-xs text-slate-400 mb-2">{p.date}</div>
                <div className="text-lg font-semibold text-white">{p.title}</div>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
