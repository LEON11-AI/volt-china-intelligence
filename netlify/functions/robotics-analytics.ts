import { getStore } from '@netlify/blobs';

const eventNames = new Set([
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
]);

const opportunityStages = new Set(['new', 'qualified', 'proposal', 'paid']);
const opportunitySignals = new Set(['organization', 'defined_use', 'timeframe', 'commercial_detail']);
const store = () => getStore({ name: 'robotics-analytics', consistency: 'strong' });

type Attribution = {
  anonymous_session: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  landing_path: string;
  referrer_domain: string;
};

type EventRecord = Attribution & {
  event: string;
  event_id: string;
  at: string;
};

type OpportunityStage = 'new' | 'qualified' | 'proposal' | 'paid';
type OpportunityOrigin = 'website_form' | 'manual_outbound';

type Opportunity = {
  id: string;
  label: string;
  origin: OpportunityOrigin;
  source: string;
  attribution?: Pick<Attribution, 'utm_source' | 'utm_medium' | 'utm_campaign' | 'landing_path' | 'referrer_domain'>;
  stage: OpportunityStage;
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

const validToken = (value: unknown, limit = 100) => {
  const token = cleanString(value, limit);
  return /^[a-zA-Z0-9-]{12,100}$/.test(token) ? token : '';
};

const validSession = (value: unknown) => validToken(value, 80);

const safeAttribution = (value: unknown): Attribution => {
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

const eventKey = (record: EventRecord) => `events/${record.at.slice(0, 10)}/${record.event_id}.json`;
const opportunityKey = (id: string) => `opportunities/${id}.json`;
const opportunityCounterKey = (prefix: 'RBT' | 'MAN', year: number) => `counters/${prefix}-${year}.json`;

const readJsonList = async <T>(prefix: string) => {
  const { blobs } = await store().list({ prefix });
  const records = await Promise.all(blobs.map(async ({ key }) => {
    try { return await store().get(key, { type: 'json' }) as T; } catch { return null; }
  }));
  return records.filter(Boolean) as T[];
};

const sessionOrRecord = (record: EventRecord, index: number) => record.anonymous_session || `${record.at}-${index}`;
const campaignParts = (record: Pick<Attribution, 'utm_source' | 'utm_medium' | 'utm_campaign' | 'referrer_domain'>) => [
  record.utm_source || (record.referrer_domain ? `Referral: ${record.referrer_domain}` : 'Direct / untagged'),
  record.utm_medium || '—',
  record.utm_campaign || '—',
];
const campaignKey = (record: Pick<Attribution, 'utm_source' | 'utm_medium' | 'utm_campaign' | 'referrer_domain'>) => campaignParts(record).join('|');

const daysFromRequest = (request: Request) => {
  const value = Number(new URL(request.url).searchParams.get('days') || 30);
  return [7, 30, 90].includes(value) ? value : 30;
};

const nextOpportunityId = async (prefix: 'RBT' | 'MAN', year: number) => {
  const key = opportunityCounterKey(prefix, year);
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const current = await store().getWithMetadata(key, { type: 'json' }) as { data: { value?: unknown }; etag: string } | null;
    const previous = Number(current?.data?.value || 0);
    const value = Number.isSafeInteger(previous) && previous >= 0 ? previous + 1 : 1;
    const write = current
      ? await store().setJSON(key, { value }, { onlyIfMatch: current.etag })
      : await store().setJSON(key, { value }, { onlyIfNew: true });
    if (write.modified) return `${prefix}-${year}-${String(value).padStart(5, '0')}`;
  }
  throw new Error('Could not reserve an opportunity ID.');
};

const websiteOpportunityFromEvent = async (record: EventRecord) => {
  const year = new Date(record.at).getUTCFullYear();
  const id = await nextOpportunityId('RBT', year);
  const now = new Date().toISOString();
  const opportunity: Opportunity = {
    id,
    label: 'Robotics form submission',
    origin: 'website_form',
    source: 'Website form',
    attribution: {
      utm_source: record.utm_source,
      utm_medium: record.utm_medium,
      utm_campaign: record.utm_campaign,
      landing_path: record.landing_path,
      referrer_domain: record.referrer_domain,
    },
    stage: 'new',
    signals: [],
    created_at: now,
    updated_at: now,
  };
  await store().setJSON(opportunityKey(id), opportunity, { onlyIfNew: true });
  return opportunity;
};

const buildSummary = async (request: Request) => {
  const days = daysFromRequest(request);
  const after = Date.now() - (days * 24 * 60 * 60 * 1000);
  const events = (await readJsonList<EventRecord>('events/'))
    .filter((event) => eventNames.has(event.event) && Date.parse(event.at) >= after)
    .sort((a, b) => Date.parse(b.at) - Date.parse(a.at));
  const allOpportunities = (await readJsonList<Opportunity>('opportunities/'))
    .filter((item) => opportunityStages.has(item.stage))
    .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at));
  const windowOpportunities = allOpportunities.filter((item) => Date.parse(item.created_at) >= after);
  const websiteOpportunities = windowOpportunities.filter((item) => item.origin === 'website_form');

  const sessionsFor = (event: string, filter?: (record: EventRecord) => boolean) => new Set(
    events.reduce<string[]>((sessions, record, index) => {
      if (record.event === event && (!filter || filter(record))) sessions.push(sessionOrRecord(record, index));
      return sessions;
    }, []),
  ).size;
  const eventsFor = (event: string, filter?: (record: EventRecord) => boolean) => events.filter((record) => record.event === event && (!filter || filter(record))).length;

  const metrics = {
    robotics_access_visitors: sessionsFor('robotics_access_view'),
    robotics_to_checklist_clicks: sessionsFor('robotics_checklist_click'),
    buyer_checklist_opens: sessionsFor('checklist_view'),
    checklist_engagement: sessionsFor('checklist_item_checked'),
    po_gate_started: sessionsFor('po_gate_started'),
    po_gate_completed: sessionsFor('po_gate_completed'),
    request_verification_clicks: eventsFor('request_verification'),
    form_submits: eventsFor('robotics_form_submit'),
    qualified_leads: websiteOpportunities.filter((item) => ['qualified', 'proposal', 'paid'].includes(item.stage)).length,
    proposals_sent: websiteOpportunities.filter((item) => ['proposal', 'paid'].includes(item.stage)).length,
    paid_projects: websiteOpportunities.filter((item) => item.stage === 'paid').length,
  };

  type Campaign = { source: string; medium: string; campaign: string; access: Set<string>; checklistClicks: Set<string>; checklist: Set<string>; engaged: Set<string>; requests: number; forms: number; qualified: number; paid: number; };
  const campaigns = new Map<string, Campaign>();
  const getCampaign = (attribution: Pick<Attribution, 'utm_source' | 'utm_medium' | 'utm_campaign' | 'referrer_domain'>) => {
    const [source, medium, campaign] = campaignParts(attribution);
    const key = campaignKey(attribution);
    const current = campaigns.get(key) || { source, medium, campaign, access: new Set(), checklistClicks: new Set(), checklist: new Set(), engaged: new Set(), requests: 0, forms: 0, qualified: 0, paid: 0 };
    campaigns.set(key, current);
    return current;
  };

  events.forEach((event, index) => {
    const current = getCampaign(event);
    const session = sessionOrRecord(event, index);
    if (event.event === 'robotics_access_view') current.access.add(session);
    if (event.event === 'robotics_checklist_click') current.checklistClicks.add(session);
    if (event.event === 'checklist_view') current.checklist.add(session);
    if (event.event === 'checklist_item_checked') current.engaged.add(session);
    if (event.event === 'request_verification') current.requests += 1;
    if (event.event === 'robotics_form_submit') current.forms += 1;
  });
  websiteOpportunities.forEach((opportunity) => {
    const current = getCampaign(opportunity.attribution || { utm_source: '', utm_medium: '', utm_campaign: '', referrer_domain: '' });
    if (['qualified', 'proposal', 'paid'].includes(opportunity.stage)) current.qualified += 1;
    if (opportunity.stage === 'paid') current.paid += 1;
  });

  const campaignRows = Array.from(campaigns.values())
    .map((row) => ({
      source: row.source,
      medium: row.medium,
      campaign: row.campaign,
      robotics_access_visitors: row.access.size,
      robotics_to_checklist_clicks: row.checklistClicks.size,
      buyer_checklist_opens: row.checklist.size,
      checklist_engagement: row.engaged.size,
      request_verification_clicks: row.requests,
      form_submits: row.forms,
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
      robotics_to_checklist_ctr: rate(metrics.robotics_to_checklist_clicks, metrics.robotics_access_visitors),
      verification_request_rate: rate(metrics.request_verification_clicks, metrics.buyer_checklist_opens),
      qualified_lead_rate: rate(metrics.qualified_leads, metrics.form_submits),
    },
    campaigns: campaignRows,
    opportunities: allOpportunities.slice(0, 20),
  };
};

const createOrUpdateOpportunity = async (body: Record<string, unknown>) => {
  const requestedId = validToken(body.id, 80);
  const existing = requestedId
    ? await store().get(opportunityKey(requestedId), { type: 'json' }) as Opportunity | null
    : null;
  const stage = cleanString(body.stage, 20) as OpportunityStage;
  if (!opportunityStages.has(stage)) return response({ error: 'Choose a valid opportunity stage.' }, 400);

  const now = new Date().toISOString();
  if (existing) {
    const opportunity: Opportunity = { ...existing, stage, updated_at: now };
    await store().setJSON(opportunityKey(existing.id), opportunity);
    return response({ opportunity });
  }

  const label = cleanString(body.label, 90);
  const source = cleanString(body.source, 80) || 'Manual / Outbound';
  const signals = Array.isArray(body.signals)
    ? body.signals.map((signal) => cleanString(signal, 30)).filter((signal) => opportunitySignals.has(signal))
    : [];
  if (label.length < 2) return response({ error: 'Use a non-identifying opportunity label.' }, 400);

  const id = await nextOpportunityId('MAN', new Date().getUTCFullYear());
  const opportunity: Opportunity = {
    id,
    label,
    origin: 'manual_outbound',
    source,
    stage,
    signals,
    created_at: now,
    updated_at: now,
  };
  await store().setJSON(opportunityKey(id), opportunity, { onlyIfNew: true });
  return response({ opportunity }, 201);
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
      const eventId = validToken(body.event_id, 100) || crypto.randomUUID();
      const record: EventRecord = { event, event_id: eventId, at: new Date().toISOString(), ...safeAttribution(body.attribution) };
      const write = await store().setJSON(eventKey(record), record, { onlyIfNew: true });
      if (write.modified && event === 'robotics_form_submit') await websiteOpportunityFromEvent(record);
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
