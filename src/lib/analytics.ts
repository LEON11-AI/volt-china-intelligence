type EventProperties = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    plausible?: ((event: string, options?: { props?: EventProperties }) => void) & { q?: unknown[][] };
  }
}

const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN?.trim();
const plausibleScriptUrl = import.meta.env.VITE_PLAUSIBLE_SCRIPT_URL?.trim() || 'https://plausible.io/js/script.js';

let initialized = false;

const addScript = (src: string, attributes: Record<string, string> = {}) => {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  Object.entries(attributes).forEach(([name, value]) => script.setAttribute(name, value));
  document.head.appendChild(script);
};

export const initializeAnalytics = () => {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  if (gaMeasurementId && /^G-[A-Z0-9]+$/i.test(gaMeasurementId)) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => { window.dataLayer?.push(args); };
    window.gtag('js', new Date());
    window.gtag('config', gaMeasurementId, { anonymize_ip: true });
    addScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaMeasurementId)}`);
  }

  if (plausibleDomain) {
    const queuedPlausible = ((event: string, options?: { props?: EventProperties }) => {
      const queue = window.plausible?.q || [];
      queue.push([event, options]);
      if (window.plausible) window.plausible.q = queue;
    }) as Window['plausible'];
    window.plausible = window.plausible || queuedPlausible;
    addScript(plausibleScriptUrl, { defer: '', 'data-domain': plausibleDomain });
  }
};

export const trackEvent = (event: string, properties: EventProperties = {}) => {
  if (typeof window === 'undefined') return;
  if (gaMeasurementId && window.gtag) window.gtag('event', event, properties);
  if (plausibleDomain && window.plausible) window.plausible(event, { props: properties });
};