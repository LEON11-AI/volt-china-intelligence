import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';

const Legal: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  const privacy = type === 'privacy';
  const title = privacy ? 'Privacy Policy' : 'Terms of Use';
  const description = privacy
    ? 'How VoltChina handles information submitted through its website forms and related communications.'
    : 'Terms governing VoltChina research, commentary, forms, and commercial service inquiries.';

  return <div className="min-h-screen bg-slate-950 font-sans text-slate-200">
    <Navbar forceDark />
    <main>
      <PageHero compact eyebrow="VOLTCHINA" title={title} description={description} />
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/15 bg-slate-900/60 p-7 leading-relaxed text-slate-300 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-10">
          {privacy ? <div className="space-y-5"><p>VoltChina collects the information you submit through its forms solely to review your request, provide a written response, and deliver requested work. We do not sell personal information.</p><p>Form submissions are processed through the website閳ユ獨 form provider and delivered to VoltChina閳ユ獨 business inbox. You may contact business@voltchina.net to ask about information connected to your request.</p><p>External links, including source links and newsletter links, are governed by the policies of the websites that host them.</p></div> : <div className="space-y-5"><p>VoltChina provides source-backed research and commentary for informational and pre-diligence purposes. It does not provide investment, legal, or procurement advice.</p><p>A submitted research request does not create a purchase obligation. Scope, fixed price, delivery date, exclusions, and payment terms are confirmed in writing before work begins.</p><p>Sponsored content is clearly disclosed and kept separate from commissioned research conclusions.</p></div>}
        </div>
      </section>
    </main>
    <Footer />
  </div>;
};

export default Legal;