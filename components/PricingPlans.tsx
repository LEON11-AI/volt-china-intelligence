import { Link } from 'react-router-dom';

const PricingPlans: React.FC = () => {
  return (
    <section id="plans" className="py-20 bg-slate-950 scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-volt mb-4">Start simple</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Start With the Free Brief</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Build trust first. Sponsorship and custom written research are available only when there is a clear fit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          <PlanCard
            title="Free Weekly Brief"
            price="$0"
            subtitle="For readers who want clear context on China's EV, battery, robotics, and manufacturing systems."
            ctaLabel="Subscribe Free"
            href="https://voltchina.substack.com/subscribe"
            external
            bullets={[
              "Weekly engineering explanations",
              "Source links and China-context notes",
              "Bonus BYD solid-state battery report",
              "No investment advice and no hype",
            ]}
          />

          <PlanCard
            title="Sponsorship & Partnerships"
            price="Custom"
            subtitle="For brands that fit a global audience interested in EVs, robotics, manufacturing, tools, and hard-tech careers."
            ctaLabel="View Business Services"
            to="/business"
            highlighted
            bullets={[
              "Sponsored YouTube integration",
              "Dedicated explainer or product walkthrough",
              "Newsletter placement for relevant offers",
              "Transparent sponsorship disclosure",
            ]}
          />

          <PlanCard
            title="Custom Written Research"
            price="From $800"
            subtitle="For a focused question that needs Chinese-source context and a written, source-backed brief."
            ctaLabel="Request a Written Brief"
            to="/submit-query"
            bullets={[
              "Written async delivery",
              "Public and verifiable source trail",
              "EVs, batteries, smart driving, robotics, and manufacturing",
              "Clear limits and uncertainty notes",
            ]}
          />
        </div>
      </div>
    </section>
  );
};

type PlanCardProps = {
  title: string;
  price: string;
  subtitle: string;
  ctaLabel: string;
  href?: string;
  to?: string;
  external?: boolean;
  highlighted?: boolean;
  bullets: string[];
};

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  price,
  subtitle,
  ctaLabel,
  href,
  to,
  external = false,
  highlighted = false,
  bullets,
}) => {
  const cardClass = highlighted
    ? 'bg-slate-900 border-2 border-volt rounded-2xl p-8 flex flex-col relative shadow-2xl shadow-volt/10'
    : 'bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col hover:border-slate-700 transition-colors';

  const buttonClass = highlighted
    ? 'block w-full py-3 text-center bg-volt hover:bg-volt-hover text-white font-bold rounded-lg transition-colors shadow-lg shadow-volt/20 hover:shadow-volt/40 mt-6'
    : 'block w-full py-3 text-center bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors border border-slate-700 mt-6';

  return (
    <div className={cardClass}>
      {highlighted && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-volt text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide shadow-lg shadow-volt/20">
          Best for revenue
        </div>
      )}

      <div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-bold text-white">{price}</span>
        </div>
        <p className="text-sm text-slate-400 mt-4 min-h-[96px]">{subtitle}</p>
      </div>

      {to ? (
        <Link to={to} className={buttonClass}>
          {ctaLabel}
        </Link>
      ) : (
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer' : undefined}
          className={buttonClass}
        >
          {ctaLabel}
        </a>
      )}

      <div className="mt-8 pt-8 border-t border-slate-800 flex-1">
        <ul className="space-y-4">
          {bullets.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
              <i className={`fa-solid fa-check ${highlighted ? 'text-volt' : 'text-green-500'} mt-1`}></i>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingPlans;
