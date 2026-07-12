import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC<{ forceDark?: boolean }> = ({ forceDark = false }) => {
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
    { name: 'YouTube', href: 'https://www.youtube.com/@VoltChina' },
    { name: 'Free Brief', href: '#brief' },
    { name: 'Intelligence', href: '/business' },
    { name: 'Media', href: '/media' },
    { name: 'About', href: '#about' },
  ];

  const handleScrollTo = (href: string) => {
    if (!href.startsWith('#')) return false;
    const el = document.querySelector(href) as HTMLElement | null;
    if (!el) {
      window.location.href = `/${href}`;
      return false;
    }
    const header = document.querySelector('nav') as HTMLElement | null;
    const offset = header ? header.getBoundingClientRect().height : 80;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
    return true;
  };

  const navTone = scrolled || forceDark
    ? 'bg-slate-950/95 md:backdrop-blur-md'
    : 'bg-slate-950/80 md:bg-transparent';

  return (
    <nav className={`fixed w-full z-50 border-b border-white/5 py-4 transition-colors duration-200 ${navTone}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <img src="/VC.png" alt="Volt China Logo" className="w-16 h-16 rounded-xl object-cover" />
              <span className="text-xl font-bold tracking-tight text-white">
                VOLT CHINA <span className="font-light text-slate-400">| Intelligence</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { if (link.href.startsWith('#')) { e.preventDefault(); handleScrollTo(link.href); } }}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="https://voltchina.substack.com/subscribe" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-volt hover:bg-volt-hover text-white text-sm font-semibold rounded transition-all shadow-lg shadow-volt/20 hover:shadow-volt/40"
            >
              Subscribe Free
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

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-slate-900 border-b border-slate-800 shadow-2xl z-50 animate-fade-in-up">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <div className="flex items-center mb-4 pb-4 border-b border-slate-800">
              <Link to="/" className="flex items-center gap-2 group" onClick={() => setMobileMenuOpen(false)}>
                <img src="/VC.png" alt="Volt China Logo" className="w-16 h-16 rounded-xl object-cover" />
                <span className="text-xl font-bold tracking-tight text-white">
                  VOLT CHINA <span className="font-light text-slate-400">| Intelligence</span>
                </span>
              </Link>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md"
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                onClick={(e) => { if (link.href.startsWith('#')) { e.preventDefault(); handleScrollTo(link.href); } setMobileMenuOpen(false); }}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4">
              <a 
                href="https://voltchina.substack.com/subscribe"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-5 py-3 bg-volt hover:bg-volt-hover text-white text-base font-semibold rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Subscribe Free
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
