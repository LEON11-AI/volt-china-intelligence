import React from 'react';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import FeaturedReport from '../../components/FeaturedReport';
import SocialProof from '../../components/SocialProof';
import ExpertServices from '../../components/ExpertServices';
import Research from '../../components/Research';
import About from '../../components/About';
import Footer from '../../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <Navbar />
      <main>
        <Hero />
        <FeaturedReport />
        <SocialProof />
        <ExpertServices />
        <Research />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
