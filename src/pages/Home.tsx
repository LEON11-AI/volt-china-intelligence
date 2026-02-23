import React from 'react';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import FeaturedReport from '../../components/FeaturedReport';
import SocialProof from '../../components/SocialProof';
import ExpertServices from '../../components/ExpertServices';
import Enterprise from '../../components/Enterprise';
import PricingPlans from '../../components/PricingPlans';
import About from '../../components/About';
import Footer from '../../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <FeaturedReport />
        <ExpertServices />
        <PricingPlans />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
