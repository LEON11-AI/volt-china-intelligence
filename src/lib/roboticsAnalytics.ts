import { trackEvent } from './analytics';

export const ROBOTICS_EVENT_NAMES = [
  'robotics_access_view',
  'robotics_checklist_click',
  'checklist_view',
  'checklist_item_checked',
  'po_gate_started',
  'po_gate_completed',
  'worksheet_started',
  'robotics_form_start',
  'request_verification',
  'robotics_form_submit',
] as const;

export type RoboticsEventName = typeof ROBOTICS_EVENT_NAMES[number];

type PublicProperties = Record<string, string | number | boolean | undefined>;

type Attribution = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  landing_path: string;
  referrer_domain: string;
  anonymous_session: string;
};

const attributionKey = 'voltchina_robotics_attribution_v1';
const sessionKey = 'voltchina_robotics_session_v1';
const isRoboticsEvent = (event: string): event is RoboticsEventName => (ROBOTICS_EVENT_NAMES as readonly string[]).includes(event);

const safeValue = (value: unknown, limit = 80) => {
  if (typeof value !== 'string') return '';
  const normalized = value.trim().replace(/[\r\n\t]+/g, ' ');
  return normalized.slice(0, limit);
};

const safeReferrerDomain = () => {
  if (!document.referrer) return '';
  try { return safeValue(new URL(document.referrer).hostname, 120); } catch { return ''; }
};

const anonymousSession = () => {
  try {
    const existing = sessionStorage.getItem(sessionKey);
    if (existing) return existing;
    const value = typeof crypto?.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    sessionStorage.setItem(sessionKey, value);
    return value;
  } catch {
    return '';
  }
};

const attribution = (): Attribution => {
  const query = new URLSearchParams(window.location.search);
  const incoming = {
    utm_source: safeValue(query.get('utm_source')),
    utm_medium: safeValue(query.get('utm_medium')),
    utm_campaign: safeValue(query.get('utm_campaign')),
    landing_path: safeValue(window.location.pathname, 160),
    referrer_domain: safeReferrerDomain(),
  };

  try {
    const saved = JSON.parse(sessionStorage.getItem(attributionKey) || '{}') as Partial<Attribution>;
    const hasCampaign = Boolean(incoming.utm_source || incoming.utm_medium || incoming.utm_campaign);
    const next = hasCampaign
      ? incoming
      : {
          ...incoming,
          utm_source: safeValue(saved.utm_source),
          utm_medium: safeValue(saved.utm_medium),
          utm_campaign: safeValue(saved.utm_campaign),
          landing_path: safeValue(saved.landing_path || incoming.landing_path, 160),
          referrer_domain: safeValue(saved.referrer_domain || incoming.referrer_domain, 120),
        };
    sessionStorage.setItem(attributionKey, JSON.stringify(next));
    return { ...next, anonymous_session: anonymousSession() };
  } catch {
    return { ...incoming, anonymous_session: anonymousSession() };
  }
};

const newEventId = () => typeof crypto?.randomUUID === 'function'
  ? crypto.randomUUID()
  : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const sendToRoboticsStore = (event: RoboticsEventName, context: Attribution) => {
  const payload = JSON.stringify({ type: 'event', event, event_id: newEventId(), attribution: context });
  try {
    if (navigator.sendBeacon) {
      const sent = navigator.sendBeacon('/api/robotics-analytics', new Blob([payload], { type: 'application/json' }));
      if (sent) return;
    }
    void fetch('/api/robotics-analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    });
  } catch {
    // Analytics must never interfere with a public page or form submission.
  }
};

/** Sends only allowlisted, non-PII event names and attribution fields. */
export const trackRoboticsEvent = (event: RoboticsEventName, properties: PublicProperties = {}) => {
  if (typeof window === 'undefined' || !isRoboticsEvent(event)) return;
  const context = attribution();
  trackEvent(event, {
    ...properties,
    utm_source: context.utm_source || undefined,
    utm_medium: context.utm_medium || undefined,
    utm_campaign: context.utm_campaign || undefined,
    landing_path: context.landing_path,
    referrer_domain: context.referrer_domain || undefined,
  });
  sendToRoboticsStore(event, context);
};
