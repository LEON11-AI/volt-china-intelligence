import { Link } from 'react-router-dom';

const PricingPlans: React.FC = () => (
  <section id="plans" className="scroll-mt-24 bg-slate-950 py-20 md:scroll-mt-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-16 text-center"><p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">Start simple</p><h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Start With the Free Brief</h2><p className="mx-auto max-w-2xl text-slate-400">Follow the free brief, commission source-verified intelligence, or explore a separate media partnership.</p></div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
        <PlanCard title="Free Weekly Brief" price="$0" subtitle="For readers who want clear context on China's EV, battery, robotics, and manufacturing systems." ctaLabel="Subscribe Free" href="https://voltchina.substack.com/subscribe" external bullets={['Weekly engineering explanations', 'Source links and China-context notes', 'Bonus BYD solid-state battery report', 'No hype—just clearer context']} />
        <PlanCard title="VoltChina Intelligence" price="From $800" subtitle="For small investment firms, independent researchers, boutique consultancies, and corporate strategy teams with a focused China question." ctaLabel="Explore Intelligence" to="/business" bullets={['Custom research and technology verification', 'Supplier and competitor mapping', 'Public, verifiable Chinese-source trails', 'Clear conclusions and uncertainty notes']} />
        <PlanCard title="VoltChina Media" price="Custom" subtitle="For relevant brands seeking clearly disclosed access to VoltChina’s global EV and hard-tech audience." ctaLabel="Explore Media" to="/media" bullets={['YouTube sponsorship', 'Newsletter placement', 'Dedicated product explainer', 'Separate from research conclusions']} />
      </div>
    </div>
  </section>
);

type PlanCardProps = { title: string; price: string; subtitle: string; ctaLabel: string; href?: string; to?: string; external?: boolean; bullets: string[] };
const PlanCard: React.FC<PlanCardProps> = ({ title, price, subtitle, ctaLabel, href, to, external = false, bullets }) => (
  <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900 p-8 transition-colors hover:border-slate-700">
    <div><h3 className="text-xl font-bold text-white">{title}</h3><div className="mt-4 flex items-baseline"><span className="text-4xl font-bold text-white">{price}</span></div><p className="mt-4 min-h-[96px] text-sm text-slate-400">{subtitle}</p></div>
    {to ? <Link to={to} className="mt-6 block w-full rounded-lg border border-slate-700 bg-slate-800 py-3 text-center font-bold text-white transition-colors hover:bg-slate-700">{ctaLabel}</Link> : <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className="mt-6 block w-full rounded-lg border border-slate-700 bg-slate-800 py-3 text-center font-bold text-white transition-colors hover:bg-slate-700">{ctaLabel}</a>}
    <div className="mt-8 flex-1 border-t border-slate-800 pt-8"><ul className="space-y-4">{bullets.map((item) => <li key={item} className="flex items-start gap-3 text-sm text-slate-300"><i className="fa-solid fa-check mt-1 text-green-500"></i><span>{item}</span></li>)}</ul></div>
  </div>
);

export default PricingPlans;
