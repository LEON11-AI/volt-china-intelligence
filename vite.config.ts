import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

type RouteMetadata = { path: string; title: string; description: string; image: string };

const escapeHtml = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const metadataHtml = ({ path: routePath, title, description, image }: RouteMetadata, entryScript: string) => {
  const canonical = `https://voltchina.net/${routePath}`;
  return `<!doctype html><html lang="en" class="scroll-smooth"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(description)}" /><link rel="canonical" href="${canonical}" /><meta property="og:type" content="website" /><meta property="og:site_name" content="VoltChina" /><meta property="og:title" content="${escapeHtml(title)}" /><meta property="og:description" content="${escapeHtml(description)}" /><meta property="og:url" content="${canonical}" /><meta property="og:image" content="${image}" /><meta property="og:image:secure_url" content="${image}" /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:site" content="@VoltChinaEV" /><meta name="twitter:title" content="${escapeHtml(title)}" /><meta name="twitter:description" content="${escapeHtml(description)}" /><meta name="twitter:image" content="${image}" /><link rel="icon" href="/VC.png" type="image/png" /><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" /><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" /><script src="https://cdn.tailwindcss.com"></script><script>tailwind.config={theme:{extend:{fontFamily:{sans:['Inter','sans-serif']},colors:{volt:{DEFAULT:'#F97316',hover:'#EA580C',light:'#FB923C'},slate:{850:'#1e293b',900:'#0f172a',950:'#020617'}}}}}</script></head><body class="bg-slate-950 text-slate-200 antialiased selection:bg-volt selection:text-white"><div id="root"></div><script type="module" crossorigin src="${entryScript}"></script></body></html>`;
};

const routeMetadata = (): Plugin => ({
  name: 'route-metadata',
  closeBundle() {
    const outputDirectory = path.resolve(__dirname, 'dist');
    const builtIndex = readFileSync(path.join(outputDirectory, 'index.html'), 'utf8');
    const entryScript = builtIndex.match(/<script type="module" crossorigin src="([^"]+)"><\/script>/)?.[1];
    if (!entryScript) throw new Error('Could not locate the Vite entry script for route metadata.');
    const routes: RouteMetadata[] = [
      { path: 'intelligence', title: 'Submit a Research Question | VoltChina Intelligence', description: 'Submit a focused question for a written assessment based on Chinese-language public sources. Scope, fixed price, and delivery are confirmed by email.', image: 'https://voltchina.net/og-image.jpg' },
      { path: 'research/byd-solid-state-battery-2026', title: 'BYD All-Solid-State Battery Commercialization Timeline | VoltChina', description: 'A public-source assessment of BYD\'s reported around-2027 demonstration and around-2030 mass-production milestones.', image: 'https://voltchina.net/reports/byd-all-solid-state-battery-evidence-report-cover.png' },
      { path: 'sourcing', title: 'China Supplier Verification & RFQ Pilot | VoltChina', description: 'Buyer-side screening, written RFQ coordination, and direct introductions for overseas teams sourcing Chinese EV and robotics components.', image: 'https://voltchina.net/og-image.jpg' },
    ];
    routes.forEach((route) => {
      const targetDirectory = path.join(outputDirectory, route.path);
      mkdirSync(targetDirectory, { recursive: true });
      writeFileSync(path.join(targetDirectory, 'index.html'), metadataHtml(route, entryScript));
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