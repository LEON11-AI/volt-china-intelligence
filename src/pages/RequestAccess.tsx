import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ResearchRequestForm from '../../components/ResearchRequestForm';

const RequestAccess: React.FC = () => <div className="min-h-screen bg-slate-950 font-sans text-slate-200">
  <Navbar forceDark />
  <main className="px-4 pb-20 pt-32 sm:px-6 lg:pt-40">
    <section className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
      <div><p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">Written research request</p><h1 className="mb-5 text-4xl font-bold tracking-tight text-white">Submit a Research Question</h1><p className="max-w-xl text-lg leading-relaxed text-slate-300">Tell us the exact question you need checked from Chinese-language public sources. VoltChina will reply by email with suitability, a written scope, fixed price, and delivery date. No call is required.</p></div>
      <ResearchRequestForm />
    </section>
  </main>
  <Footer />
</div>;

export default RequestAccess;