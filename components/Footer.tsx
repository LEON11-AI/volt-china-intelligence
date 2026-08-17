import React from 'react';

const Footer: React.FC = () => <footer className="border-t border-slate-900 bg-slate-950 py-12">
  <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 sm:px-6 md:flex-row md:items-start lg:px-8">
    <div className="max-w-xl text-center md:text-left"><div className="mb-1 text-lg font-bold text-white">VOLT CHINA</div><p className="text-sm text-slate-500">© 2026 VoltChina. All rights reserved.</p><p className="mt-3 text-xs leading-relaxed text-slate-500">VoltChina provides source-backed research and commentary for informational and pre-diligence purposes. It does not provide investment, legal, or procurement advice. Sponsored content is clearly disclosed and kept separate from commissioned research conclusions.</p></div>
    <div className="flex flex-col items-center gap-4 md:items-end"><div className="flex gap-3"><SocialLink label="X" href="https://x.com/VoltChinaEV" icon="fa-x-twitter" /><SocialLink label="YouTube" href="https://www.youtube.com/@VoltChina" icon="fa-youtube" /><SocialLink label="Contact VoltChina" href="mailto:business@voltchina.net" icon="fa-envelope" /></div><div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-slate-500 md:justify-end"><a id="media-partnerships" href="mailto:business@voltchina.net?subject=VoltChina%20Media%20Partnership" className="scroll-mt-24 hover:text-white">Media Partnerships</a><a href="/privacy" className="hover:text-white">Privacy Policy</a><a href="/terms" className="hover:text-white">Terms</a></div></div>
  </div>
</footer>;

const SocialLink: React.FC<{ href: string; icon: string; label: string }> = ({ href, icon, label }) => { const isMail = href.startsWith('mailto:'); const iconClass = icon === 'fa-envelope' ? `fa-solid ${icon}` : `fa-brands ${icon}`; return <a href={href} aria-label={label} target={isMail ? undefined : '_blank'} rel={isMail ? undefined : 'noopener noreferrer'} className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-slate-400 transition-all hover:bg-slate-800 hover:text-white"><i className={iconClass} /></a>; };

export default Footer;
