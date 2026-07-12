import React from 'react';
import { Link } from 'react-router-dom';

const SupplierMapThanks: React.FC = () => (
  <div className="min-h-screen bg-slate-950 px-4 py-12 text-white sm:px-6 lg:px-8">
    <main className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center">
      <div className="w-full rounded-3xl border border-volt/25 bg-slate-900 p-8 text-center shadow-2xl shadow-volt/10 md:p-12">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-volt/10 text-volt"><i className="fa-solid fa-check text-xl"></i></div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-volt">Requirement received</p>
        <h1 className="mb-5 text-3xl font-bold">Thank you for defining your map need.</h1>
        <p className="mb-8 leading-relaxed text-slate-400">VoltChina will compare category, decision use, timeline, format, and willingness-to-pay signals before choosing any founding edition. We will follow up if your request matches the next verified map.</p>
        <Link to="/business#supplier-map-beta" className="inline-flex rounded-lg bg-volt px-6 py-3 font-bold text-white transition-colors hover:bg-volt-hover">Back to VoltChina Intelligence</Link>
      </div>
    </main>
  </div>
);

export default SupplierMapThanks;
