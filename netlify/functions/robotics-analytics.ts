import { getStore } from '@netlify/blobs';

const eventNames = new Set([
  'robotics_access_view',
  'checklist_view',
  'checklist_item_checked',
  'po_gate_started',
  'po_gate_completed',
  'worksheet_started',
  'robotics_form_start',
  'request_verification',
  'robotics_form_submit',
]);

const opportunityStages = new Set(['qualified', 'proposal', 'paid']);
const opportunitySignals = new Set(['organization', 'defined_use', 'timeframe', 'commercial_detail']);
const store = () => getStore({ name: 'robotics-analytics', consistency: 'strong' });

type EventRecord = {
  event: string;
  at: string;
  anonymous_session: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  landing_path: string;
  referrer_domain: string;
};

type Opportunity = {
  id: string;
  label: string;
  source: string;
  stage: 'qualified' | 'proposal' | 'paid';
  signals: string[];
  created_at: string;
  updated_at: string;
};

const response = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
});

const cleanString = (value: unknown, limit = 120) => {
  if (typeof value !== 'string') return '';
  const normalized = value.trim().replace(/[\r\n\t]+/g, ' ').slice(0, limit);
  return normalized.includes('@') ? '' : normalized;
};

const validSession = (value: unknown) => {
  const session = cleanString(value, 80);
  return /^[a-zA-Z0-9-]{12,80}$/.test(session) ? session : '';
};

const safeAttribution = (value: unknown) => {
  const raw = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  return {
    anonymous_session: validSession(raw.anonymous_session),
    utm_source: cleanString(raw.utm_source),
    utm_medium: cleanString(raw.utm_medium),
    utm_campaign: cleanString(raw.utm_campaign),
    landing_path: cleanString(raw.landing_path, 180),
    referrer_domain: cleanString(raw.referrer_domain, 120),
  };
};

const expectedToken = () => process.env.ROBOTICS_ADMIN_TOKEN?.trim();
const hasAdminAccess = (request: Request) => {
  const token = expectedToken();
  return Boolean(token) && request.headers.get('authorization') === `Bearer ${token}`;
};

const hasSameSiteOrigin = (request: Request) => {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  try { return new URL(origin).origin === new URL(request.url).origin; } catch { return false; }
};

const eventKey = () => `events/${new Date().toISOString().slice(0, 10)}/${Date.now()}-${crypto.randomUUID()}.json`;
const opportunityKey = (id: string) => `opportunities/${id}.json`;

const readJsonList = async <T>(prefix: string) => {
  const { blobs } = await store().list({ prefix });
  const records = await Promise.all(blobs.map(async ({ key }) => {
    try { return await store().get(key, { type: 'json' }) as T; } catch { return null; }
  }));
  return records.filter(Boolean) as T[];
};

const sessionOrRecord = (record: EventRecord, index: number) => record.anonymous_session || `${record.at}-${index}`;
const campaignKey = (record: Pick<EventRecord, 'utm_source' | 'utm_medium' | 'utm_campaign' | 'referrer_domain'>) => [
  record.utm_source || (record.referrer_domain ? `Referral: ${record.referrer_domain}` : 'Direct / untagged'),
  record.utm_medium || '—',
  record.utm_campaign || '—',
].join('|');

const daysFromRequest = (request: Request) => {
  const value = Number(new URL(request.url).searchParams.get('days') || 30);
  return [7, 30, 90].includes(value) ? value : 30;
};

const buildSummary = async (request: Request) => {
  const days = daysFromRequest(request);
  const after = Date.now() - (days * 24 * 60 * 60 * 1000);
  const events = (await readJsonList<EventRecord>('events/'))
    .filter((event) => eventNames.has(event.event) && Date.parse(event.at) >= after)
    .sort((a, b) => Date.parse(b.at) - Date.parse(a.at));
  const opportunities = (await readJsonList<Opportunity>('opportunities/'))
    .filter((item) => opportunityStages.has(item.stage))
    .filter((item) => Date.parse(item.updated_at) >= after)
    .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at));

  const sessionsFor = (event: string, filter?: (record: EventRecord) => boolean) => new Set(
    events.reduce<string[]>((sessions, record, index) => {
      if (record.event === event && (!filter || filter(record))) sessions.push(sessionOrRecord(record, index));
      return sessions;
    }, []),
  ).size;

  const metrics = {
    robotics_access_visitors: sessionsFor('robotics_access_view'),
    buyer_checklist_opens: sessionsFor('checklist_view'),
    checklist_engagement: sessionsFor('checklist_item_checked'),
    po_gate_started: sessionsFor('po_gate_started'),
    po_gate_completed: sessionsFor('po_gate_completed'),
    request_verification_clicks: sessionsFor('request_verification'),
    form_submits: sessionsFor('robotics_form_submit'),
    qualified_leads: opportunities.filter((item) => ['qualified', 'proposal', 'paid'].includes(item.stage)).length,
    proposals_sent: opportunities.filter((item) => ['proposal', 'paid'].includes(item.stage)).length,
    paid_projects: opportunities.filter((item) => item.stage === 'paid').length,
  };

  const campaigns = new Map<string, { source: string; medium: string; campaign: string; access: Set<string>; checklist: Set<string>; engaged: Set<string>; requests: Set<string>; forms: Set<string>; qualified: number; paid: number; }>();
  events.forEach((event, index) => {
    const [source, medium, campaign] = campaignKey(event).split('|');
    const key = [source, medium, campaign].join('|');
    const current = campaigns.get(key) || { source, medium, campaign, access: new Set(), checklist: new Set(), engaged: new Set(), requests: new Set(), forms: new Set(), qualified: 0, paid: 0 };
    const session = sessionOrRecord(event, index);
    if (event.event === 'robotics_access_view') current.access.add(session);
    if (event.event === 'checklist_view') current.checklist.add(session);
    if (event.event === 'checklist_item_checked') current.engaged.add(session);
    if (event.event === 'request_verification') current.requests.add(session);
    if (event.event === 'robotics_form_submit') current.forms.add(session);
    campaigns.set(key, current);
  });
  opportunities.forEach((opportunity) => {
    const source = opportunity.source || 'Manual / unclassified';
    const key = [source, '—', '—'].join('|');
    const current = campaigns.get(key) || { source, medium: '—', campaign: '—', access: new Set(), checklist: new Set(), engaged: new Set(), requests: new Set(), forms: new Set(), qualified: 0, paid: 0 };
    current.qualified += 1;
    if (opportunity.stage === 'paid') current.paid += 1;
    campaigns.set(key, current);
  });

  const campaignRows = Array.from(campaigns.values())
    .map((row) => ({
      source: row.source,
      medium: row.medium,
      campaign: row.campaign,
      robotics_access_visitors: row.access.size,
      buyer_checklist_opens: row.checklist.size,
      checklist_engagement: row.engaged.size,
      request_verification_clicks: row.requests.size,
      form_submits: row.forms.size,
      qualified_leads: row.qualified,
      paid_projects: row.paid,
    }))
    .sort((a, b) => (b.form_submits + b.request_verification_clicks + b.buyer_checklist_opens + b.robotics_access_visitors) - (a.form_submits + a.request_verification_clicks + a.buyer_checklist_opens + a.robotics_access_visitors));

  const rate = (numerator: number, denominator: number) => denominator ? Math.round((numerator / denominator) * 1000) / 10 : null;
  return {
    days,
    generated_at: new Date().toISOString(),
    metrics,
    rates: {
      checklist_open_rate: rate(metrics.buyer_checklist_opens, metrics.robotics_access_visitors),
      verification_request_rate: rate(metrics.request_verification_clicks, metrics.buyer_checklist_opens),
      qualified_lead_rate: rate(metrics.qualified_leads, metrics.form_submits),
    },
    campaigns: campaignRows,
    opportunities: opportunities.slice(0, 20),
  };
};

const createOrUpdateOpportunity = async (body: Record<string, unknown>) => {
  const label = cleanString(body.label, 90);
  const source = cleanString(body.source, 80);
  const stage = cleanString(body.stage, 20) as Opportunity['stage'];
  const signals = Array.isArray(body.signals)
    ? body.signals.map((signal) => cleanString(signal, 30)).filter((signal) => opportunitySignals.has(signal))
    : [];
  if (label.length < 2 || !opportunityStages.has(stage)) return response({ error: 'Use a non-identifying opportunity label and a valid stage.' }, 400);

  const requestedId = cleanString(body.id, 80);
  const id = /^[a-zA-Z0-9-]{12,80}$/.test(requestedId) ? requestedId : crypto.randomUUID();
  const existing = await store().get(opportunityKey(id), { type: 'json' }) as Opportunity | null;
  const now = new Date().toISOString();
  const opportunity: Opportunity = {
    id,
    label,
    source,
    stage,
    signals,
    created_at: existing?.created_at || now,
    updated_at: now,
  };
  await store().setJSON(opportunityKey(id), opportunity);
  return response({ opportunity }, existing ? 200 : 201);
};

export default async (request: Request) => {
  try {
    if (request.method === 'GET') {
      if (!expectedToken()) return response({ error: 'ROBOTICS_ADMIN_TOKEN is not configured.' }, 503);
      if (!hasAdminAccess(request)) return response({ error: 'Internal access token required.' }, 401);
      return response(await buildSummary(request));
    }

    if (request.method !== 'POST') return response({ error: 'Method not allowed.' }, 405);
    const body = await request.json() as Record<string, unknown>;
    if (body.type === 'event') {
      if (!hasSameSiteOrigin(request)) return response({ error: 'Same-site event origin required.' }, 403);
      const event = cleanString(body.event, 50);
      if (!eventNames.has(event)) return response({ error: 'Unsupported event.' }, 400);
      const record: EventRecord = { event, at: new Date().toISOString(), ...safeAttribution(body.attribution) };
      await store().setJSON(eventKey(), record, { onlyIfNew: true });
      return response({ accepted: true }, 202);
    }

    if (body.type === 'opportunity') {
      if (!expectedToken()) return response({ error: 'ROBOTICS_ADMIN_TOKEN is not configured.' }, 503);
      if (!hasAdminAccess(request)) return response({ error: 'Internal access token required.' }, 401);
      return createOrUpdateOpportunity(body);
    }

    return response({ error: 'Unsupported request.' }, 400);
  } catch (error) {
    console.error('Robotics analytics request failed', error);
    return response({ error: 'Unable to process the analytics request.' }, 500);
  }
};
