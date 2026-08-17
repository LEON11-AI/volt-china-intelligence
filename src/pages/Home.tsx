import React from 'react';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import RoboticsAccessPilot from '../../components/RoboticsAccessPilot';
import PricingPlans from '../../components/PricingPlans';
import DatabasePreview from '../../components/DatabasePreview';
import About from '../../components/About';
import Footer from '../../components/Footer';

const Home: React.FC = () => (
  <div className="min-h-screen bg-slate-950 font-sans">
    <Navbar />
    <main>
      <Hero />
      <RoboticsAccessPilot />
      <DatabasePreview />
      <PricingPlans />
      <About />
    </main>
    <Footer />
  </div>
);

export default Home;
