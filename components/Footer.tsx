import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-center md:text-left">
          <div className="text-lg font-bold text-white mb-1">VOLT CHINA</div>
          <p className="text-sm text-slate-500">© 2025 Volt China Intelligence. All rights reserved.</p>
          <p className="mt-2 text-[11px] text-slate-500 max-w-xl">
            Disclaimer: Volt China Intelligence provides market analysis for informational purposes only and does not constitute financial investment advice.
          </p>
        </div>

        <div className="flex gap-6">
          <SocialLink href="https://x.com/VoltChinaEV" icon="fa-x-twitter" />
          <SocialLink href="https://www.youtube.com/@VoltChinaEV" icon="fa-youtube" />
          <SocialLink href="mailto:business@voltchina.net" icon="fa-envelope" />
        </div>

      </div>
    </footer>
  );
};

const SocialLink: React.FC<{href: string, icon: string}> = ({ href, icon }) => {
  const isMail = href.startsWith('mailto:');
  const iconClass = icon === 'fa-envelope' ? `fa-solid ${icon}` : `fa-brands ${icon}`;
  return (
    <a
      href={href}
      target={isMail ? undefined : '_blank'}
      rel={isMail ? undefined : 'noopener noreferrer'}
      className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
    >
      <i className={iconClass}></i>
    </a>
  );
};

export default Footer;
