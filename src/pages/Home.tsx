import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import SocialProof from '../../components/SocialProof';
import PricingPlans from '../../components/PricingPlans';
import DatabasePreview from '../../components/DatabasePreview';
import About from '../../components/About';
import MediaPartnerships from '../../components/MediaPartnerships';
import Footer from '../../components/Footer';

const Home: React.FC = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const frame = window.requestAnimationFrame(() => {
      const target = document.querySelector(hash) as HTMLElement | null;
      if (!target) return;
      const header = document.querySelector('nav') as HTMLElement | null;
      const offset = header ? header.getBoundingClientRect().height : 80;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'auto' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);
  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <DatabasePreview />
        <PricingPlans />
        <MediaPartnerships />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
