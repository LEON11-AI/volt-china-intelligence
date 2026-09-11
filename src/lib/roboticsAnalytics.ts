import { trackEvent } from './analytics';

export const ROBOTICS_EVENT_NAMES = [
  'robotics_access_view',
  'robotics_checklist_click',
  'checklist_view',
  'checklist_item_checked',
  'po_gate_started',
  'po_gate_completed',
  'worksheet_started',
  'request_verification',
  'robotics_form_start',
  'robotics_form_submit',
  'checklist_lead_form_view',
  'checklist_lead_form_submit',
  'download_printable_checklist',
  'pricing_section_view',
  'verification_pricing_cta_click',
  'procurement_pricing_cta_click',
] as const;

export type RoboticsEventName = typeof ROBOTICS_EVENT_NAMES[number];

type PublicProperties = {
  lead_id?: string;
  item_number?: number;
  checked?: boolean;
  checklist_items_reviewed?: number;
};

export type RoboticsAttribution = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  landing_page: string;
  referrer: string;
  anonymous_session: string;
};

const attributionKey = 'voltchina_robotics_attribution_v1';
const sessionKey = 'voltchina_robotics_session_v1';
const leadIdKey = 'voltchina_robotics_lead_id_v1';
const isRoboticsEvent = (event: string): event is RoboticsEventName => (ROBOTICS_EVENT_NAMES as readonly string[]).includes(event);

const safeValue = (value: unknown, limit = 120) => {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/[\r\n\t]+/g, ' ').slice(0, limit);
};

const safeReferrer = () => {
  try { return document.referrer ? safeValue(new URL(document.referrer).hostname, 120) : ''; } catch { return ''; }
};
const safeLeadId = (value: unknown) => {
  const leadId = safeValue(value, 64);
  return /^RBT-\d{4}-[A-Z0-9]{8,40}$/.test(leadId) ? leadId : '';
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

export const getRoboticsAttribution = (): RoboticsAttribution => {
  const query = new URLSearchParams(window.location.search);
  const incoming = {
    utm_source: safeValue(query.get('utm_source')),
    utm_medium: safeValue(query.get('utm_medium')),
    utm_campaign: safeValue(query.get('utm_campaign')),
    utm_content: safeValue(query.get('utm_content')),
    utm_term: safeValue(query.get('utm_term')),
    landing_page: safeValue(window.location.pathname, 180),
    referrer: safeReferrer(),
  };

  try {
    const saved = JSON.parse(sessionStorage.getItem(attributionKey) || '{}') as Partial<RoboticsAttribution>;
    const hasCampaign = Boolean(incoming.utm_source || incoming.utm_medium || incoming.utm_campaign || incoming.utm_content || incoming.utm_term);
    const next = hasCampaign
      ? incoming
      : {
          ...incoming,
          utm_source: safeValue(saved.utm_source),
          utm_medium: safeValue(saved.utm_medium),
          utm_campaign: safeValue(saved.utm_campaign),
          utm_content: safeValue(saved.utm_content),
          utm_term: safeValue(saved.utm_term),
          landing_page: safeValue(saved.landing_page || incoming.landing_page, 180),
          referrer: safeValue(saved.referrer || incoming.referrer, 180),
        };
    sessionStorage.setItem(attributionKey, JSON.stringify(next));
    return { ...next, anonymous_session: anonymousSession() };
  } catch {
    return { ...incoming, anonymous_session: anonymousSession() };
  }
};

export const getOrCreateRoboticsLeadId = () => {
  try {
    const existing = safeLeadId(sessionStorage.getItem(leadIdKey));
    if (existing) return existing;
    const fragment = typeof crypto?.randomUUID === 'function'
      ? crypto.randomUUID().replace(/-/g, '').slice(0, 12).toUpperCase()
      : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`.toUpperCase();
    const leadId = `RBT-${new Date().getUTCFullYear()}-${fragment}`;
    sessionStorage.setItem(leadIdKey, leadId);
    return leadId;
  } catch {
    return `RBT-${new Date().getUTCFullYear()}-${Math.random().toString(36).slice(2, 14).toUpperCase()}`;
  }
};

const newEventId = () => typeof crypto?.randomUUID === 'function'
  ? crypto.randomUUID()
  : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const sendToRoboticsStore = (event: RoboticsEventName, context: RoboticsAttribution, leadId = '') => {
  const payload = JSON.stringify({
    type: 'event',
    event,
    event_id: newEventId(),
    attribution: context,
    lead_id: safeLeadId(leadId),
  });
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

/** Sends only allowlisted, non-PII event names, anonymous IDs, and campaign fields. */
export const trackRoboticsEvent = (event: RoboticsEventName, properties: PublicProperties = {}) => {
  if (typeof window === 'undefined' || !isRoboticsEvent(event)) return;
  const context = getRoboticsAttribution();
  const leadId = safeLeadId(properties.lead_id);
  trackEvent(event, {
    item_number: properties.item_number,
    checked: properties.checked,
    checklist_items_reviewed: properties.checklist_items_reviewed,
    utm_source: context.utm_source || undefined,
    utm_medium: context.utm_medium || undefined,
    utm_campaign: context.utm_campaign || undefined,
    utm_content: context.utm_content || undefined,
    utm_term: context.utm_term || undefined,
    landing_page: context.landing_page,
    referrer: context.referrer || undefined,
  });
  sendToRoboticsStore(event, context, leadId);
};
