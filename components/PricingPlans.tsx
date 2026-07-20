import { Link } from 'react-router-dom';

const PricingPlans: React.FC = () => (
  <section id="plans" className="scroll-mt-24 bg-slate-950 py-20 md:scroll-mt-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-16 text-center"><p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">Start simple</p><h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Start With the Free Brief</h2><p className="mx-auto max-w-2xl text-slate-400">Follow the free brief or commission source-verified intelligence.</p></div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
        <PlanCard title="Free Weekly Brief" price="$0" subtitle="For readers who want clear context on China's EV, battery, robotics, and manufacturing systems." ctaLabel="Subscribe Free" href="https://voltchina.substack.com/subscribe" external bullets={['Weekly engineering explanations', 'Source links and China-context notes', 'Bonus BYD solid-state battery report', 'No hype—just clearer context']} />
        <PlanCard title="VoltChina Intelligence" price="From $800" subtitle="For small investment firms, independent researchers, boutique consultancies, and corporate strategy teams with a focused China question." ctaLabel="Submit a Research Question" to="/intelligence#research-request" bullets={['Custom research and technology verification', 'Supplier and competitor mapping', 'Public, verifiable Chinese-source trails', 'Clear conclusions and uncertainty notes']} />
      </div>
      <div className="mx-auto mt-6 max-w-6xl rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:flex md:items-center md:justify-between md:gap-8">
        <div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-volt">Commercial Pilot</p><h3 className="text-xl font-bold text-white">Supplier Verification &amp; RFQ Pilot</h3><p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">For overseas buyers with a specific product requirement who need Chinese supplier screening, comparable written quotations, and a direct introduction.</p></div>
        <Link to="/sourcing" className="mt-5 inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-bold text-white transition-colors hover:border-volt/70 hover:bg-slate-700 md:mt-0">Explore the Sourcing Pilot <i className="fa-solid fa-arrow-right text-xs" /></Link>
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
