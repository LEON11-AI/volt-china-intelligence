import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Business: React.FC = () => {
  const supplierMapBetaHref = 'mailto:business@voltchina.net?subject=Supplier%20Map%20Beta&body=Hi%20VoltChina%2C%0A%0AI%27m%20interested%20in%20the%20Supplier%20Map%20Beta.%0A%0ACategory%20I%27m%20tracking%3A%0AUse%20case%20%2F%20role%3A%0A';

  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <Navbar forceDark />
      <main>
        <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
            <div className="hidden md:block absolute top-24 left-10 w-80 h-80 bg-volt/10 rounded-full blur-[120px]"></div>
            <div className="hidden md:block absolute bottom-10 right-10 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px]"></div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-volt mb-8">
                <i className="fa-solid fa-briefcase"></i>
                On-the-Ground Intelligence
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
                China EV & Robotics Context for Investors, Executives, and Sourcing Teams.
              </h1>

              <p className="text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed mb-10">
                VoltChina helps global teams understand China's fast-moving EV, battery, smart-driving, robotics, and manufacturing ecosystem through source-backed written briefs, supplier mapping, and relevant sponsorship partnerships.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/request-access"
                  className="px-6 py-3 bg-volt hover:bg-volt-hover text-white font-bold rounded-lg transition-all shadow-lg shadow-volt/20 hover:shadow-volt/40 text-center"
                >
                  Discuss a Business Brief
                </a>
                <a
                  href="https://voltchina.substack.com/subscribe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-slate-900/80 hover:bg-slate-800 text-white font-bold rounded-lg transition-all border border-slate-700 text-center"
                >
                  Read the Free Brief First
                </a>
                <a
                  href="#supplier-map-beta"
                  className="px-6 py-3 bg-slate-950/80 hover:bg-slate-900 text-white font-bold rounded-lg transition-all border border-volt/40 hover:border-volt text-center"
                >
                  Join Supplier Map Beta
                </a>
              </div>

              <p className="text-xs text-slate-500 mt-5">
                No investment advice. No insider leaks. No procurement guarantee. We work from public, verifiable sources and clearly state uncertainty.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-900 border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-volt mb-4">High-value work</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Where VoltChina Can Help</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                These are business services built around the same core advantage as the channel: Chinese-source context translated into clear English.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <BusinessCard
                icon="fa-file-lines"
                title="Custom Written Briefs"
                price="From $800"
                text="A focused memo answering one specific question about a Chinese company, technology route, product claim, supplier signal, or manufacturing bottleneck."
                bullets={[
                  '5-7 day written delivery',
                  'Chinese-source research trail',
                  'Clear conclusion plus uncertainty notes',
                  'Best for executives and analysts needing fast context',
                ]}
                ctaLabel="Request a Written Brief"
                to="/submit-query"
              />

              <BusinessCard
                icon="fa-network-wired"
                title="Supplier Mapping & Sourcing Support"
                price="From $1,500"
                text="A practical map of relevant Chinese suppliers, component categories, public signals, websites, and possible contact paths for a specific EV or robotics category."
                bullets={[
                  'Supplier shortlist and role mapping',
                  'Public filings, product pages, and procurement signals',
                  'Red flags and verification gaps',
                  'Support for discovery, not guaranteed procurement',
                ]}
                ctaLabel="Request Supplier Mapping"
                to="/request-access"
                highlighted
              />

              <BusinessCard
                icon="fa-bullhorn"
                title="Sponsorship & Partnerships"
                price="Custom"
                text="For brands that fit a global audience interested in Chinese EVs, robotics, manufacturing, AI tools, hardware, and hard-tech careers."
                bullets={[
                  'YouTube sponsor integration',
                  'Dedicated explainer or product walkthrough',
                  'Newsletter placement',
                  'Transparent disclosure and audience fit check',
                ]}
                ctaLabel="Discuss Sponsorship"
                to="/request-access"
              />
            </div>
          </div>
        </section>

        <section id="supplier-map-beta" className="py-20 bg-slate-950">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl border border-volt/25 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 md:p-12 shadow-2xl shadow-volt/10">
              <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-volt/10 blur-3xl"></div>
              <div className="relative z-10 grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-volt/30 bg-volt/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-volt">
                    <i className="fa-solid fa-flask"></i>
                    Beta Demand Test
                  </div>
                  <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                    Join the Supplier Map Beta.
                  </h2>
                  <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
                    We are testing demand for source-backed Chinese EV and robotics supplier maps behind VoltChina episodes.
                  </p>
                  <p className="mt-4 max-w-2xl text-slate-400">
                    Join if you want early access to supplier shortlists, component categories, Chinese-source trails, and uncertainty notes before we build a full product.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6">
                  <ul className="mb-6 space-y-3 text-sm text-slate-300">
                    <li className="flex gap-3">
                      <i className="fa-solid fa-check mt-1 text-volt"></i>
                      <span>Supplier shortlists by category</span>
                    </li>
                    <li className="flex gap-3">
                      <i className="fa-solid fa-check mt-1 text-volt"></i>
                      <span>Chinese-source trail and public signals</span>
                    </li>
                    <li className="flex gap-3">
                      <i className="fa-solid fa-check mt-1 text-volt"></i>
                      <span>Uncertainty notes, not hype</span>
                    </li>
                  </ul>
                  <a
                    href={supplierMapBetaHref}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-volt px-5 py-3 text-sm font-bold text-white shadow-lg shadow-volt/20 transition-all hover:bg-volt-hover hover:shadow-volt/40"
                  >
                    Join Supplier Map Beta
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </a>
                  <p className="mt-3 text-center text-xs text-slate-500">
                    No payment required. This is a demand test.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-volt mb-4">Who it is for</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Not a generic consulting shop.</h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  VoltChina is most useful when the question sits at the intersection of Chinese-language information, engineering mechanisms, manufacturing reality, and global business decisions.
                </p>
              </div>

              <div className="space-y-4">
                <AudienceRow
                  title="Investors and analysts"
                  text="Need faster context on Chinese EV, battery, robotics, or smart-driving claims before deciding what deserves deeper diligence."
                />
                <AudienceRow
                  title="Automotive and robotics executives"
                  text="Need to understand how Chinese competitors are structuring products, costs, supply chains, and manufacturing speed."
                />
                <AudienceRow
                  title="Sourcing and partnership teams"
                  text="Need a first-pass map of Chinese suppliers, product categories, and contact paths before spending time on direct outreach."
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-900 border-t border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Start with one concrete question.</h2>
            <p className="text-slate-400 text-lg mb-8">
              The best business brief starts narrow: one company, one technology route, one supplier category, or one claim you need verified from Chinese sources.
            </p>
            <a
              href="/request-access"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-volt hover:bg-volt-hover text-white font-bold rounded-lg transition-all shadow-lg shadow-volt/20 hover:shadow-volt/40"
            >
              <i className="fa-solid fa-envelope"></i>
              Contact VoltChina
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

type BusinessCardProps = {
  icon: string;
  title: string;
  price: string;
  text: string;
  bullets: string[];
  ctaLabel: string;
  href?: string;
  to?: string;
  highlighted?: boolean;
};

const BusinessCard: React.FC<BusinessCardProps> = ({
  icon,
  title,
  price,
  text,
  bullets,
  ctaLabel,
  href,
  to,
  highlighted = false,
}) => {
  const cardClass = highlighted
    ? 'border-2 border-volt shadow-2xl shadow-volt/10 hover:shadow-volt/25'
    : 'border border-slate-800 hover:border-volt/60 hover:shadow-2xl hover:shadow-volt/10';

  const buttonClass = highlighted
    ? 'bg-volt hover:bg-volt-hover text-white shadow-lg shadow-volt/20 hover:shadow-volt/40'
    : 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 hover:border-volt/70';

  const ctaContent = (
    <>
      <span>{ctaLabel}</span>
      <i className="fa-solid fa-arrow-right text-xs transition-transform duration-300 group-hover/cta:translate-x-1"></i>
    </>
  );

  return (
    <div className={`${cardClass} group relative overflow-hidden bg-slate-950 rounded-2xl p-8 flex flex-col transition-all duration-300 ease-out hover:-translate-y-2`}>
      <div className="absolute inset-0 bg-gradient-to-br from-volt/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-volt/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      <div className="relative z-10 flex items-start justify-between gap-4 mb-6">
        <div className="w-11 h-11 bg-volt/10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-volt/20">
          <i className={`fa-solid ${icon} text-volt`}></i>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-white">{price}</div>
        </div>
      </div>
      <h3 className="relative z-10 text-xl font-bold text-white mb-3">{title}</h3>
      <p className="relative z-10 text-slate-400 text-sm leading-relaxed mb-6">{text}</p>
      <ul className="relative z-10 space-y-3 mt-auto">
        {bullets.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
            <i className="fa-solid fa-check text-volt mt-1"></i>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {to ? (
        <Link
          to={to}
          className={`${buttonClass} group/cta relative z-10 mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition-all duration-300`}
        >
          {ctaContent}
        </Link>
      ) : (
        <a
          href={href}
          className={`${buttonClass} group/cta relative z-10 mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition-all duration-300`}
        >
          {ctaContent}
        </a>
      )}
    </div>
  );
};

const AudienceRow: React.FC<{ title: string; text: string }> = ({ title, text }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
    <h3 className="text-white font-semibold mb-2">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{text}</p>
  </div>
);

export default Business;
