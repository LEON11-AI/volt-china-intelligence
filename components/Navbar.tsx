import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Latest Research', href: '#research' },
    { name: 'Expert Services', href: '#services' },
    { name: 'About', href: '#about' },
  ];

  const handleScrollTo = (href: string) => {
    if (!href.startsWith('#')) return;
    const el = document.querySelector(href) as HTMLElement | null;
    if (!el) return;
    const header = document.querySelector('nav') as HTMLElement | null;
    const offset = header ? header.getBoundingClientRect().height : 80;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 border-b border-white/5 ${
      scrolled ? 'bg-slate-950/90 backdrop-blur-md py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2 group">
              <img src="/favicon.png" alt="Volt China Logo" className="w-16 h-16 rounded-sm object-cover" />
              <span className="text-xl font-bold tracking-tight text-white">
                VOLT CHINA <span className="font-light text-slate-400">| Intelligence</span>
              </span>
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { if (link.href.startsWith('#')) { e.preventDefault(); handleScrollTo(link.href); } }}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="https://voltchina.gumroad.com/l/qa" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-volt hover:bg-volt-hover text-white text-sm font-semibold rounded transition-all shadow-lg shadow-volt/20 hover:shadow-volt/40"
            >
              Get Priority Access
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2"
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md"
                onClick={(e) => { if (link.href.startsWith('#')) { e.preventDefault(); handleScrollTo(link.href); } setMobileMenuOpen(false); }}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4">
              <a 
                href="https://voltchina.gumroad.com/l/qa"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-5 py-3 bg-volt hover:bg-volt-hover text-white text-base font-semibold rounded"
              >
                Get Priority Access
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
