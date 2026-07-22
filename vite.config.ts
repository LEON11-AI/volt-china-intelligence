import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { PAGE_METADATA, SITE_URL, indexablePages, type PageMetadata } from './src/lib/siteMetadata';

const escapeHtml = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const schemaJson = (schema: Record<string, unknown>) => JSON.stringify(schema).replace(/</g, '\\u003c');

const sharedStyles = `
      .scroll-reveal { opacity: 0; filter: blur(8px); transform: translate3d(0, 28px, 0); transition: opacity 720ms cubic-bezier(0.16, 1, 0.3, 1), transform 720ms cubic-bezier(0.16, 1, 0.3, 1), filter 720ms cubic-bezier(0.16, 1, 0.3, 1); transition-delay: var(--scroll-reveal-delay, 0ms); will-change: opacity, transform, filter; }
      .scroll-reveal.scroll-reveal--visible { opacity: 1; filter: blur(0); transform: translate3d(0, 0, 0); }
      @keyframes page-map-drift { 0% { transform: scale(1.05) translate3d(-0.6%, -0.3%, 0); } 100% { transform: scale(1.1) translate3d(0.6%, 0.35%, 0); } }
      @keyframes page-hero-reveal { from { opacity: 0; transform: translate3d(0, 26px, 0); filter: blur(6px); } to { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0); } }
      .hero-map-motion { animation: page-map-drift 26s ease-in-out infinite alternate; will-change: transform; }
      .page-hero-reveal { opacity: 0; animation: page-hero-reveal 760ms cubic-bezier(0.16, 1, 0.3, 1) forwards; will-change: opacity, transform, filter; }
      @media (prefers-reduced-motion: reduce) { .scroll-reveal { opacity: 1; filter: none; transform: none; transition: none; } .hero-map-motion { animation: none; transform: scale(1.05); } .page-hero-reveal { opacity: 1; animation: none; transform: none; filter: none; } }
`;
const itemMotionStyles = `
      .scroll-reveal-item { opacity: 0; filter: blur(10px); transform: translate3d(0, 42px, 0) scale(0.985); transition: opacity 820ms cubic-bezier(0.16, 1, 0.3, 1), transform 820ms cubic-bezier(0.16, 1, 0.3, 1), filter 820ms cubic-bezier(0.16, 1, 0.3, 1); transition-delay: var(--scroll-reveal-delay, 0ms); will-change: opacity, transform, filter; }
      .scroll-reveal-item.scroll-reveal-item--visible { opacity: 1; filter: blur(0); transform: translate3d(0, 0, 0) scale(1); }
      @media (prefers-reduced-motion: reduce) { .scroll-reveal-item { opacity: 1; filter: none; transform: none; transition: none; } }
`;

const metadataHtml = (page: PageMetadata, entryScript: string) => {
  const canonical = `${SITE_URL}${page.path}`;
  const schema = schemaJson(page.schema);
  return `<!doctype html><html lang="en" class="scroll-smooth"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>${escapeHtml(page.title)}</title><meta name="description" content="${escapeHtml(page.description)}" /><meta name="robots" content="${page.robots ?? 'index,follow,max-image-preview:large'}" /><link rel="canonical" href="${canonical}" /><meta property="og:type" content="website" /><meta property="og:site_name" content="VoltChina" /><meta property="og:title" content="${escapeHtml(page.title)}" /><meta property="og:description" content="${escapeHtml(page.description)}" /><meta property="og:url" content="${canonical}" /><meta property="og:image" content="${page.image}" /><meta property="og:image:secure_url" content="${page.image}" /><meta property="og:image:alt" content="${escapeHtml(page.title)}" /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:site" content="@VoltChinaEV" /><meta name="twitter:title" content="${escapeHtml(page.title)}" /><meta name="twitter:description" content="${escapeHtml(page.description)}" /><meta name="twitter:image" content="${page.image}" /><script id="voltchina-page-schema" type="application/ld+json">${schema}</script><link rel="icon" href="/VC.png" type="image/png" /><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" /><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" /><script src="https://cdn.tailwindcss.com"></script><script>tailwind.config={theme:{extend:{fontFamily:{sans:['Inter','sans-serif']},colors:{volt:{DEFAULT:'#CF0404',hover:'#A90303',light:'#E23838'},slate:{850:'#1e293b',900:'#0f172a',950:'#020617'}}}}}</script><style>${sharedStyles}${itemMotionStyles}</style></head><body class="bg-slate-950 text-slate-200 antialiased selection:bg-volt selection:text-white"><div id="root"></div><script type="module" crossorigin src="${entryScript}"></script></body></html>`;
};

const routeMetadata = (): Plugin => ({
  name: 'route-metadata',
  closeBundle() {
    const outputDirectory = path.resolve(__dirname, 'dist');
    const indexPath = path.join(outputDirectory, 'index.html');
    const builtIndex = readFileSync(indexPath, 'utf8');
    const entryScript = builtIndex.match(/<script type="module" crossorigin src="([^"]+)"><\/script>/)?.[1];
    if (!entryScript) throw new Error('Could not locate the Vite entry script for route metadata.');

    const root = PAGE_METADATA['/'];
    const rootWithSchema = builtIndex.replace('</head>', `<meta name="robots" content="${root.robots ?? 'index,follow,max-image-preview:large'}" /><script id="voltchina-page-schema" type="application/ld+json">${schemaJson(root.schema)}</script></head>`);
    writeFileSync(indexPath, rootWithSchema);

    indexablePages.filter((page) => page.path !== '/').forEach((page) => {
      const targetDirectory = path.join(outputDirectory, page.path.replace(/^\//, ''));
      mkdirSync(targetDirectory, { recursive: true });
      writeFileSync(path.join(targetDirectory, 'index.html'), metadataHtml(page, entryScript));
    });
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: { port: 3000, host: '0.0.0.0' },
    plugins: [react(), routeMetadata()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: { alias: { '@': path.resolve(__dirname, '.') } },
  };
});