import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RequestAccess: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 构建邮件主题和正文
    const subject = `New Institutional Access Request: ${formData.company}`;
    const body = `
New Institutional Access Request

Full Name: ${formData.fullName}
Work Email: ${formData.email}
Company / Organization: ${formData.company}

Plan: Institutional Access ($1,499/yr)
Payment Method: Invoice (Wire/ACH)
    `.trim();

    // 构建 mailto 链接
    const mailtoLink = `mailto:business@voltchina.net?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // 打开邮件客户端
    window.location.href = mailtoLink;
    
    // 显示提交成功状态
    setIsSubmitted(true);
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
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/favicon.png" alt="Volt China Logo" className="w-12 h-12 rounded-xl object-cover" />
            <span className="text-xl font-bold tracking-tight text-white">
              VOLT CHINA <span className="font-light text-slate-400">| Intelligence</span>
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-xl bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-sm animate-fade-in">
          
          {!isSubmitted ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-3">Request Institutional Access</h1>
                <div className="inline-block bg-volt/10 text-volt px-3 py-1 rounded-full text-sm font-bold mb-4">
                  $1,499 / year
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  To accommodate enterprise procurement processes, we currently process institutional subscriptions via manual invoicing (Wire Transfer / ACH accepted). Please fill out the details below.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-volt focus:ring-1 focus:ring-volt transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Work Email <span className="text-slate-500 font-normal ml-1">(Corporate email preferred)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-volt focus:ring-1 focus:ring-volt transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-2">Company / Organization</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-volt focus:ring-1 focus:ring-volt transition-colors"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-volt hover:bg-volt-hover text-white font-bold rounded-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-volt/20 flex items-center justify-center gap-2"
                  >
                    <span>Submit Request</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                  <div className="text-center mt-4">
                    <Link to="/" className="text-slate-500 hover:text-slate-300 text-sm font-medium transition-colors">
                      Cancel
                    </Link>
                  </div>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-8 animate-fade-in">
              <div className="w-20 h-20 bg-volt/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fa-solid fa-check text-4xl text-volt"></i>
              </div>
              <h2 className="text-3xl font-bold mb-4">Request Received</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Thank you. Our team will send an official invoice ($1,499 USD) to your email within 12 hours. Your access will be activated immediately upon receipt of payment.
              </p>
              
              <Link
                to="/"
                className="inline-flex px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors items-center gap-2"
              >
                <i className="fa-solid fa-house"></i>
                <span>Back to Home</span>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RequestAccess;