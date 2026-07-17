import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Legal: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  const privacy = type === 'privacy';
  return <div className="min-h-screen bg-slate-950 font-sans text-slate-200"><Navbar forceDark /><main className="mx-auto max-w-3xl px-4 pb-20 pt-32 sm:px-6 lg:px-8"><p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">VoltChina</p><h1 className="mb-8 text-4xl font-bold text-white">{privacy ? 'Privacy Policy' : 'Terms of Use'}</h1>{privacy ? <div className="space-y-5 leading-relaxed text-slate-300"><p>VoltChina collects the information you submit through its forms solely to review your request, provide a written response, and deliver requested work. We do not sell personal information.</p><p>Form submissions are processed through the website’s form provider and delivered to VoltChina’s business inbox. You may contact business@voltchina.net to ask about information connected to your request.</p><p>External links, including source links and newsletter links, are governed by the policies of the websites that host them.</p></div> : <div className="space-y-5 leading-relaxed text-slate-300"><p>VoltChina provides source-backed research and commentary for informational and pre-diligence purposes. It does not provide investment, legal, or procurement advice.</p><p>A submitted research request does not create a purchase obligation. Scope, fixed price, delivery date, exclusions, and payment terms are confirmed in writing before work begins.</p><p>Sponsored content is clearly disclosed and kept separate from commissioned research conclusions.</p></div>}</main><Footer /></div>;
};

export default Legal;
