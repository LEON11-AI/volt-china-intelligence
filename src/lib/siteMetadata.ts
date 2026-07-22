export type PageMetadata = {
  path: string;
  title: string;
  description: string;
  image: string;
  schema: Record<string, unknown>;
  robots?: string;
};

export const SITE_URL = 'https://voltchina.net';
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

const organization = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: 'VoltChina',
  alternateName: 'VoltChina Intelligence',
  url: SITE_URL,
  logo: `${SITE_URL}/VC.png`,
  image: `${SITE_URL}/og-image.jpg`,
  description: 'Source-verified Chinese-language intelligence for focused questions about China\'s EVs, batteries, robotics, suppliers, and manufacturing.',
  email: 'business@voltchina.net',
  sameAs: [
    'https://www.youtube.com/@VoltChina',
    'https://voltchina.substack.com/',
  ],
};

const webPage = (path: string, name: string, description: string, type = 'WebPage') => ({
  '@context': 'https://schema.org',
  '@type': type,
  '@id': `${SITE_URL}${path}#webpage`,
  url: `${SITE_URL}${path}`,
  name,
  description,
  inLanguage: 'en',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  publisher: { '@id': ORGANIZATION_ID },
});

export const PAGE_METADATA: Record<string, PageMetadata> = {
  '/': {
    path: '/',
    title: 'VoltChina | Source-Verified China Intelligence',
    description: 'Source-verified Chinese-language intelligence for focused questions about China\'s EVs, batteries, robotics, suppliers, and manufacturing.',
    image: `${SITE_URL}/og-image.jpg`,
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        organization,
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: 'VoltChina',
          description: 'Chinese-language source intelligence for EV and hard-tech research.',
          inLanguage: 'en',
          publisher: { '@id': ORGANIZATION_ID },
        },
        webPage('/', 'VoltChina | Source-Verified China Intelligence', 'Source-verified Chinese-language intelligence for focused questions about China\'s EVs, batteries, robotics, suppliers, and manufacturing.'),
      ],
    },
  },
  '/intelligence': {
    path: '/intelligence',
    title: 'China-Language Research for EV & Hard-Tech Diligence | VoltChina',
    description: 'Written source-verified research for investors, consultancies, independent researchers, and strategy teams assessing Chinese EV and hard-tech claims.',
    image: `${SITE_URL}/og-image.jpg`,
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        webPage('/intelligence', 'China-Language Research for EV & Hard-Tech Diligence | VoltChina', 'Written source-verified research for investors, consultancies, independent researchers, and strategy teams assessing Chinese EV and hard-tech claims.'),
        {
          '@type': 'Service',
          name: 'VoltChina Intelligence',
          serviceType: 'Chinese-language public-source research and technology verification',
          provider: { '@id': ORGANIZATION_ID },
          areaServed: 'Worldwide',
          audience: { '@type': 'Audience', audienceType: 'Investment firms, research teams, consultancies, and corporate strategy teams' },
          offers: { '@type': 'Offer', priceCurrency: 'USD', price: '800', description: 'Starting price for a focused written research brief.' },
        },
      ],
    },
  },
  '/sourcing': {
    path: '/sourcing',
    title: 'China Supplier Verification & RFQ Pilot | VoltChina',
    description: 'Buyer-side screening, written RFQ coordination, and direct introductions for overseas teams sourcing Chinese EV and robotics components.',
    image: `${SITE_URL}/og-image.jpg`,
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        webPage('/sourcing', 'China Supplier Verification & RFQ Pilot | VoltChina', 'Buyer-side screening, written RFQ coordination, and direct introductions for overseas teams sourcing Chinese EV and robotics components.'),
        {
          '@type': 'Service',
          name: 'China Supplier Verification & RFQ Pilot',
          serviceType: 'Buyer-side Chinese supplier screening and RFQ coordination',
          provider: { '@id': ORGANIZATION_ID },
          areaServed: 'Worldwide',
          audience: { '@type': 'Audience', audienceType: 'Importers, distributors, system integrators, and technical sourcing teams' },
        },
      ],
    },
  },
  '/research': {
    path: '/research',
    title: 'China EV & Hard-Tech Research and Editorial Analysis | VoltChina',
    description: 'Public research samples and clearly labelled editorial analysis on China\'s EV, battery, robotics, smart-driving, and manufacturing sectors.',
    image: `${SITE_URL}/og-image.jpg`,
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        webPage('/research', 'China EV & Hard-Tech Research and Editorial Analysis | VoltChina', 'Public research samples and clearly labelled editorial analysis on China\'s EV, battery, robotics, smart-driving, and manufacturing sectors.', 'CollectionPage'),
        {
          '@type': 'ItemList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, url: `${SITE_URL}/research/byd-solid-state-battery-2026`, name: 'BYD All-Solid-State Battery Commercialization Timeline' },
            { '@type': 'ListItem', position: 2, url: `${SITE_URL}/research/byd-adas-strategy`, name: 'BYD ADAS Revolution' },
            { '@type': 'ListItem', position: 3, url: `${SITE_URL}/research/byd-song-plus-2026`, name: '2026 BYD Song Plus Deep Dive' },
            { '@type': 'ListItem', position: 4, url: `${SITE_URL}/research/byd-humanoid-robot`, name: 'BYD\'s Secret Robot Division' },
          ],
        },
      ],
    },
  },
  '/research/byd-solid-state-battery-2026': {
    path: '/research/byd-solid-state-battery-2026',
    title: 'BYD All-Solid-State Battery Commercialization Timeline | VoltChina',
    description: 'A public-source assessment of BYD\'s reported around-2027 demonstration and around-2030 mass-production milestones.',
    image: `${SITE_URL}/reports/byd-all-solid-state-battery-evidence-report-cover.png`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Report',
      '@id': `${SITE_URL}/research/byd-solid-state-battery-2026#report`,
      headline: 'BYD All-Solid-State Battery Commercialization Timeline',
      description: 'A public-source assessment of BYD\'s reported around-2027 demonstration and around-2030 mass-production milestones.',
      url: `${SITE_URL}/research/byd-solid-state-battery-2026`,
      image: `${SITE_URL}/reports/byd-all-solid-state-battery-evidence-report-cover.png`,
      inLanguage: 'en',
      dateModified: '2026-07-17',
      author: { '@id': ORGANIZATION_ID },
      publisher: { '@id': ORGANIZATION_ID },
      isAccessibleForFree: true,
      mainEntityOfPage: `${SITE_URL}/research/byd-solid-state-battery-2026`,
    },
  },
  '/research/byd-adas-strategy': {
    path: '/research/byd-adas-strategy',
    title: 'BYD ADAS Revolution | Editorial Analysis | VoltChina',
    description: 'Editorial analysis of BYD ADAS architecture, strategy, and software context.',
    image: `${SITE_URL}/og-image.jpg`,
    schema: webPage('/research/byd-adas-strategy', 'BYD ADAS Revolution | Editorial Analysis | VoltChina', 'Editorial analysis of BYD ADAS architecture, strategy, and software context.', 'Article'),
  },
  '/research/byd-song-plus-2026': {
    path: '/research/byd-song-plus-2026',
    title: '2026 BYD Song Plus Deep Dive | Editorial Analysis | VoltChina',
    description: 'Editorial analysis of the 2026 BYD Song Plus platform, specifications, and competitive positioning.',
    image: `${SITE_URL}/battery-cover.webp`,
    schema: webPage('/research/byd-song-plus-2026', '2026 BYD Song Plus Deep Dive | Editorial Analysis | VoltChina', 'Editorial analysis of the 2026 BYD Song Plus platform, specifications, and competitive positioning.', 'Article'),
  },
  '/research/byd-humanoid-robot': {
    path: '/research/byd-humanoid-robot',
    title: 'BYD Humanoid Robotics | Editorial Analysis | VoltChina',
    description: 'Editorial analysis of BYD\'s reported humanoid-robotics roadmaps and manufacturing ambitions.',
    image: `${SITE_URL}/og-image.jpg`,
    schema: webPage('/research/byd-humanoid-robot', 'BYD Humanoid Robotics | Editorial Analysis | VoltChina', 'Editorial analysis of BYD\'s reported humanoid-robotics roadmaps and manufacturing ambitions.', 'Article'),
  },
  '/blog': {
    path: '/blog',
    title: 'China EV & Hard-Tech Briefs | VoltChina',
    description: 'A directory of VoltChina research reports, editorial analysis, and China EV and hard-tech briefs.',
    image: `${SITE_URL}/og-image.jpg`,
    schema: webPage('/blog', 'China EV & Hard-Tech Briefs | VoltChina', 'A directory of VoltChina research reports, editorial analysis, and China EV and hard-tech briefs.', 'CollectionPage'),
  },
  '/privacy': {
    path: '/privacy',
    title: 'Privacy Policy | VoltChina',
    description: 'How VoltChina handles information submitted through its website forms and related communications.',
    image: `${SITE_URL}/og-image.jpg`,
    schema: webPage('/privacy', 'Privacy Policy | VoltChina', 'How VoltChina handles information submitted through its website forms and related communications.'),
  },
  '/terms': {
    path: '/terms',
    title: 'Terms of Use | VoltChina',
    description: 'Terms governing VoltChina research, commentary, forms, and commercial service inquiries.',
    image: `${SITE_URL}/og-image.jpg`,
    schema: webPage('/terms', 'Terms of Use | VoltChina', 'Terms governing VoltChina research, commentary, forms, and commercial service inquiries.'),
  },
};

const normalisePath = (value: string) => {
  if (!value || value === '/') return '/';
  const withoutTrailingSlash = value.replace(/\/+$/, '');
  return withoutTrailingSlash.startsWith('/') ? withoutTrailingSlash : `/${withoutTrailingSlash}`;
};

export const getPageMetadata = (path: string) => PAGE_METADATA[normalisePath(path)] ?? PAGE_METADATA['/'];
export const indexablePages = Object.values(PAGE_METADATA).filter((page) => !page.robots?.includes('noindex'));
