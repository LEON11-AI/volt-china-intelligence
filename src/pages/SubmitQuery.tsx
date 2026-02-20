import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SubmitQuery: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    company: '',
    supplyChain: '',
    budget: '',
    timeline: '',
    email: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  // This would be replaced with your actual Stripe Payment Link or integration
  const handlePayment = () => {
    // Example: Redirect to Stripe Payment Link
    window.location.href = 'https://buy.stripe.com/your-payment-link-id'; 
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-volt/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-slate-800">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
            <span className="text-volt">⚡</span> VOLT
          </Link>
          <div className="text-sm text-slate-400">
            Step {step} of 3
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-2xl bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
          
          {/* Progress Bar */}
          <div className="w-full h-1 bg-slate-800 rounded-full mb-8 overflow-hidden">
            <div 
              className="h-full bg-volt transition-all duration-500 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>

          {/* Step 1: Investigation Details */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-2">What do you want to investigate?</h2>
              <p className="text-slate-400 mb-8">Tell us about the specific company or supply chain you need intelligence on.</p>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-2">Target Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="e.g. BYD, CATL, Xiaomi"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-volt focus:ring-1 focus:ring-volt transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="supplyChain" className="block text-sm font-medium text-slate-300 mb-2">Specific Supply Chain / Component</label>
                  <textarea
                    id="supplyChain"
                    name="supplyChain"
                    value={formData.supplyChain}
                    onChange={handleInputChange}
                    placeholder="e.g. Battery cathode suppliers, Lidar integration, Motor controller costs..."
                    rows={4}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-volt focus:ring-1 focus:ring-volt transition-colors resize-none"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={nextStep}
                  disabled={!formData.company || !formData.supplyChain}
                  className="px-6 py-3 bg-volt hover:bg-volt-hover text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Next <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Budget & Timeline */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-2">Project Parameters</h2>
              <p className="text-slate-400 mb-8">Help us understand your constraints and requirements.</p>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-slate-300 mb-2">Estimated Budget (USD)</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-volt focus:ring-1 focus:ring-volt transition-colors appearance-none"
                  >
                    <option value="" disabled>Select a range</option>
                    <option value="1k-5k">$1,000 - $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-50k">$10,000 - $50,000</option>
                    <option value="50k+">$50,000+</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-slate-300 mb-2">Desired Timeline</label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-volt focus:ring-1 focus:ring-volt transition-colors appearance-none"
                  >
                    <option value="" disabled>Select a timeline</option>
                    <option value="asap">ASAP (Urgent)</option>
                    <option value="1-week">Within 1 week</option>
                    <option value="2-weeks">Within 2 weeks</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Your Business Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@company.com"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-volt focus:ring-1 focus:ring-volt transition-colors"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={prevStep}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={!formData.budget || !formData.timeline || !formData.email}
                  className="px-6 py-3 bg-volt hover:bg-volt-hover text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Next <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment & Confirmation */}
          {step === 3 && (
            <div className="animate-fade-in text-center">
              <div className="w-16 h-16 bg-volt/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fa-solid fa-shield-halved text-2xl text-volt"></i>
              </div>
              <h2 className="text-3xl font-bold mb-4">Secure Pre-authorization</h2>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                To initiate this request, a fully refundable deposit is required. We will review your request and confirm feasibility within 24 hours.
              </p>
              
              <div className="bg-slate-800/50 rounded-xl p-6 mb-8 text-left border border-slate-700">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Target</span>
                    <span className="font-medium">{formData.company}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Focus</span>
                    <span className="font-medium truncate max-w-[200px]">{formData.supplyChain}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-700 pt-3 mt-3">
                    <span className="text-white font-bold">Deposit Required</span>
                    <span className="text-volt font-bold">$149.00</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handlePayment}
                  className="w-full px-6 py-4 bg-gradient-to-r from-volt to-orange-600 hover:from-volt-hover hover:to-orange-500 text-white font-bold rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-volt/20 flex items-center justify-center gap-2"
                >
                  <span>Proceed to Payment</span>
                  <i className="fa-solid fa-lock text-sm"></i>
                </button>
                
                <button
                  onClick={prevStep}
                  className="text-slate-500 hover:text-slate-300 text-sm font-medium transition-colors"
                >
                  Go Back
                </button>
              </div>
              
              <p className="text-xs text-slate-500 mt-6">
                <i className="fa-brands fa-stripe text-slate-400 mr-1"></i>
                Secure payment powered by Stripe. No charges will be finalized until an expert accepts your request.
              </p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default SubmitQuery;
