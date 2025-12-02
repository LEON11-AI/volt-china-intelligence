import React from 'react';
import Navbar from '../components/Navbar';
import Research from '../components/Research';
import Footer from '../components/Footer';
import ChartDemo from '../components/ChartDemo';

const ResearchPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <Navbar />
      <main>
        <Research />
        <section className="py-20 bg-slate-900 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-white mb-6">Market Cost Trend</h3>
            <ChartDemo />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ResearchPage;
