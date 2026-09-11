import React, { FormEvent, useEffect, useMemo, useState } from 'react';

type MetricKey = 'robotics_access_visitors' | 'robotics_to_checklist_clicks' | 'buyer_checklist_opens' | 'checklist_engagement' | 'checklist_leads' | 'po_gate_started' | 'po_gate_completed' | 'request_verification_clicks' | 'form_submits' | 'qualified_leads' | 'proposals_sent' | 'paid_projects';
type OpportunityStage = 'new' | 'qualified' | 'verification_proposed' | 'procurement_proposed' | 'proposal' | 'negotiation' | 'paid' | 'closed_lost';
type OpportunityOrigin = 'checklist_lead' | 'website_form' | 'manual_outbound';

type Opportunity = {
  id: string;
  label: string;
  origin: OpportunityOrigin;
  source: string;
  stage: OpportunityStage;
  signals: string[];
  created_at: string;
  updated_at: string;
};

type Summary = {
  days: number;
  generated_at: string;
  metrics: Record<MetricKey, number>;
  rates: { robotics_to_checklist_ctr: number | null; checklist_lead_capture_rate: number | null; verification_request_rate: number | null; qualified_lead_rate: number | null; paid_project_conversion: number | null };
  campaigns: Array<{
    source: string;
    medium: string;
    campaign: string;
    robotics_access_visitors: number;
    robotics_to_checklist_clicks: number;
    buyer_checklist_opens: number;
    checklist_engagement: number;
    checklist_leads: number;
    request_verification_clicks: number;
    form_submits: number;
    qualified_leads: number;
    paid_projects: number;
  }>;
  opportunities: Opportunity[];
};

const sessionTokenStorageKey = 'voltchina_robotics_admin_token';
const rememberedTokenStorageKey = 'voltchina_robotics_admin_token_remembered';
const metricCards: Array<{ key: MetricKey; label: string; note: string; icon: string }> = [
  { key: 'robotics_access_visitors', label: 'Robotics Access Visitors', note: 'Sessions with a Robotics Access view', icon: 'fa-robot' },
  { key: 'robotics_to_checklist_clicks', label: 'Robotics → Checklist Clicks', note: 'Sessions clicking the Checklist from Robotics Access', icon: 'fa-arrow-right' },
  { key: 'buyer_checklist_opens', label: 'Checklist Sessions', note: 'All sessions opening the Checklist, including direct landings', icon: 'fa-list-check' },
  { key: 'checklist_engagement', label: 'Checklist Engagement', note: 'At least one checklist item checked in a session', icon: 'fa-check' },
  { key: 'checklist_leads', label: 'Checklist Leads', note: 'Successful printable-checklist lead submissions', icon: 'fa-address-card' },
  { key: 'po_gate_started', label: 'PO Gate Started', note: 'At least one Pre-Purchase Gate interaction', icon: 'fa-flag' },
  { key: 'po_gate_completed', label: 'PO Gate Completed', note: 'Every PO Gate item checked in a session', icon: 'fa-circle-check' },
  { key: 'request_verification_clicks', label: 'Request Verification Clicks', note: 'Checklist CTA clicks', icon: 'fa-arrow-up-right-from-square' },
  { key: 'form_submits', label: 'Form Submits', note: 'Successful Robotics Requirement submissions', icon: 'fa-paper-plane' },
  { key: 'qualified_leads', label: 'Qualified Leads', note: 'Website form opportunities marked qualified, proposal, or paid', icon: 'fa-filter-circle-dollar' },
  { key: 'proposals_sent', label: 'Proposals Sent', note: 'Website form opportunities marked proposal or paid', icon: 'fa-file-signature' },
  { key: 'paid_projects', label: 'Paid Projects', note: 'Website form opportunities marked paid', icon: 'fa-circle-dollar-to-slot' },
];

const eventRows = [
  ['robotics_access_view', 'Robotics Access page view', 'Robotics Access Visitors'],
  ['robotics_checklist_click', 'Checklist clicked from Robotics Access', 'Robotics → Checklist Clicks and CTR'],
  ['checklist_view', 'Buyer Checklist opened', 'Checklist Sessions'],
  ['checklist_item_checked', 'Checklist-item interaction', 'Checklist Engagement'],
  ['po_gate_started', 'First PO Gate interaction', 'PO Gate Started'],
  ['po_gate_completed', 'Every PO Gate item checked', 'PO Gate Completed'],
  ['worksheet_started', 'Worksheet first used', 'Context only in V1'],
  ['checklist_lead_form_view', 'Optional Checklist Lead form shown after 3 review items', 'Lead-capture interest'],
  ['checklist_lead_form_submit', 'Checklist lead successfully submitted', 'Checklist Leads and a new anonymous RBT ID'],
  ['download_printable_checklist', 'PDF-ready checklist download requested', 'Buyer-tool usage context'],
  ['pricing_section_view', 'Engagement Options section viewed', 'Commercial-interest context'],
  ['verification_pricing_cta_click', 'Buyer-Side Verification Review CTA clicked', 'Verification-service intent'],
  ['procurement_pricing_cta_click', 'Procurement Coordination CTA clicked', 'Procurement-service intent'],
  ['robotics_form_start', 'Robotics form first focused', 'Context only in V1'],
  ['request_verification', 'Checklist CTA clicked', 'Request Verification Clicks'],
  ['robotics_form_submit', 'Robotics form successfully submitted', 'Form Submits and a new anonymous RBT ID'],
];

const stageLabel: Record<OpportunityStage, string> = {
  new: 'New lead',
  qualified: 'Qualified lead',
  verification_proposed: 'Verification proposed',
  procurement_proposed: 'Procurement proposed',
  proposal: 'Proposal sent',
  negotiation: 'Negotiation',
  paid: 'Paid project',
  closed_lost: 'Closed / lost',
};

const manualSourceOptions = ['Cold email / outbound', 'LinkedIn outreach', 'Referral', 'Event or conference', 'Other manual / outbound'];
const signalOptions = [
  ['organization', 'Organization / lab identified'],
  ['defined_use', 'Defined use case'],
  ['timeframe', 'Real timing window'],
  ['commercial_detail', 'Quantity, budget, or candidate configuration'],
] as const;

const number = (value: number | undefined) => new Intl.NumberFormat('en-US').format(value || 0);
const rate = (value: number | null | undefined) => typeof value === 'number' && Number.isFinite(value) ? `${value}%` : '—';
const originLabel = (origin: OpportunityOrigin) => origin === 'checklist_lead' ? 'Checklist lead' : origin === 'website_form' ? 'Website form' : 'Manual / Outbound';

const fetchSummary = async (token: string, days: number) => {
  const response = await fetch(`/api/robotics-analytics?days=${days}`, { headers: { Authorization: `Bearer ${token}` } });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || 'Could not load the Robotics monitor.');
  return body as Summary;
};

const saveOpportunity = async (token: string, data: Pick<Opportunity, 'stage'> & Partial<Opportunity>) => {
  const response = await fetch('/api/robotics-analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ type: 'opportunity', ...data }),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || 'Could not save the opportunity.');
  return body.opportunity as Opportunity;
};

const RoboticsAdmin: React.FC = () => {
  const [token, setToken] = useState('');
  const [draftToken, setDraftToken] = useState('');
  const [rememberDevice, setRememberDevice] = useState(true);
  const [days, setDays] = useState(30);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [label, setLabel] = useState('');
  const [source, setSource] = useState(manualSourceOptions[0]);
  const [stage, setStage] = useState<OpportunityStage>('qualified');
  const [signals, setSignals] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');

  const load = async (currentToken = token, currentDays = days) => {
    if (!currentToken) return;
    setLoading(true);
    setError('');
    try {
      setSummary(await fetchSummary(currentToken, currentDays));
    } catch (loadError) {
      setSummary(null);
      setError(loadError instanceof Error ? loadError.message : 'Could not load the Robotics monitor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      const remembered = localStorage.getItem(rememberedTokenStorageKey) || '';
      const saved = remembered || sessionStorage.getItem(sessionTokenStorageKey) || '';
      setToken(saved);
      setDraftToken(saved);
      setRememberDevice(Boolean(remembered));
      if (saved) void load(saved, days);
    } catch {
      // The monitor can still be opened with a token if session storage is unavailable.
    }
  // Load once on mount; later refreshes are explicit so the token is never persisted unexpectedly.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totals = useMemo(() => summary?.metrics, [summary]);
  const setRange = (nextDays: number) => {
    setDays(nextDays);
    void load(token, nextDays);
  };

  const connect = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = draftToken.trim();
    if (!next) {
      setError('Enter the dashboard password to open the monitor.');
      return;
    }
    try {
      if (rememberDevice) {
        localStorage.setItem(rememberedTokenStorageKey, next);
        sessionStorage.removeItem(sessionTokenStorageKey);
      } else {
        sessionStorage.setItem(sessionTokenStorageKey, next);
        localStorage.removeItem(rememberedTokenStorageKey);
      }
    } catch {
      // The monitor remains usable in memory if browser storage is unavailable.
    }
    setToken(next);
    void load(next, days);
  };

  const forgetDevice = () => {
    try {
      localStorage.removeItem(rememberedTokenStorageKey);
      sessionStorage.removeItem(sessionTokenStorageKey);
    } catch {
      // Clearing browser storage is optional; in-memory access is still cleared below.
    }
    setToken('');
    setDraftToken('');
    setSummary(null);
    setError('');
    setNotice('');
    setRememberDevice(true);
  };

  const addManualOpportunity = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setNotice('');
    setError('');
    try {
      const saved = await saveOpportunity(token, { label, source, stage, signals });
      setLabel('');
      setSource(manualSourceOptions[0]);
      setStage('qualified');
      setSignals([]);
      setNotice(`Manual / Outbound opportunity ${saved.id} saved. It remains separate from website conversion rates.`);
      await load();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save the opportunity.');
    } finally {
      setSaving(false);
    }
  };

  const updateStage = async (opportunity: Opportunity, nextStage: OpportunityStage) => {
    setError('');
    setNotice('');
    try {
      const saved = await saveOpportunity(token, { id: opportunity.id, stage: nextStage });
      setNotice(`${saved.id} updated to ${stageLabel[nextStage]}.`);
      await load();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not update the opportunity.');
    }
  };

  if (!token || (!summary && !loading && !error)) {
    return <div className="min-h-screen bg-slate-950 px-4 py-8 font-sans text-slate-200 sm:px-6 lg:px-8">
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-xl items-center" data-scroll-motion-skip>
        <section className="w-full rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
          <a href="/robotics" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-volt focus-visible:outline-none focus-visible:text-volt"><i className="fa-solid fa-arrow-left" aria-hidden="true" /> Back to Robotics Access</a>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-volt">Internal operations</p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Robotics Analytics Monitor</h1>
          <p className="mt-4 leading-relaxed text-slate-400">This unlisted dashboard aggregates anonymous behavior and separately maintained opportunity stages. It never displays form answers, names, emails, budgets, or technical requirements.</p>
          <form onSubmit={connect} className="mt-7 space-y-4">
            <div><label htmlFor="admin-token" className="mb-2 block text-sm font-semibold text-slate-200">Dashboard password</label><input id="admin-token" name="dashboard-password" type="password" autoComplete="current-password" value={draftToken} onChange={(event) => setDraftToken(event.target.value)} className="min-h-11 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-white outline-none transition-colors focus:border-volt focus:ring-1 focus:ring-volt" /></div>
            <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/70 px-3 text-sm leading-relaxed text-slate-300"><input type="checkbox" checked={rememberDevice} onChange={(event) => setRememberDevice(event.target.checked)} className="h-4 w-4 accent-[#CF0404]" /> Keep me signed in on this device</label>
            {error && <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200" role="alert">{error}</p>}
            <button type="submit" className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-volt px-5 py-3 font-bold text-white shadow-lg shadow-volt/20 transition-colors hover:bg-volt-hover"><i className="fa-solid fa-lock" aria-hidden="true" /> Open monitor</button>
          </form>
          <p className="mt-5 text-xs leading-relaxed text-slate-500">The dashboard password is the private <code className="rounded bg-slate-800 px-1 py-0.5 text-slate-300">ROBOTICS_ADMIN_TOKEN</code> configured in Netlify. When the checkbox is selected, it is stored only in this browser until you sign out. Do not select it on a shared computer.</p>
        </section>
      </main>
    </div>;
  }

  return <div className="min-h-screen bg-slate-950 font-sans text-slate-200">
    <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8" data-scroll-motion-skip>
      <header className="flex flex-col gap-5 border-b border-slate-800 pb-6 md:flex-row md:items-end md:justify-between">
        <div><a href="/robotics" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-volt focus-visible:outline-none focus-visible:text-volt"><i className="fa-solid fa-arrow-left" aria-hidden="true" /> Robotics Access</a><p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-volt">Internal operations · no PII</p><h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Robotics Analytics Monitor</h1><p className="mt-3 max-w-3xl leading-relaxed text-slate-400">Anonymous acquisition and checklist behavior, followed by an anonymous opportunity ID and human-maintained stages. This is an operational lens, not a CRM.</p></div>
        <div className="flex flex-wrap items-center gap-2" aria-label="Reporting period">{[7, 30, 90].map((value) => <button key={value} type="button" onClick={() => setRange(value)} className={`min-h-11 rounded-lg border px-4 text-sm font-bold transition-colors ${days === value ? 'border-volt bg-volt text-white' : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500 hover:text-white'}`}>{value} days</button>)}<button type="button" onClick={() => void load()} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 text-sm font-bold text-white transition-colors hover:border-volt/70 hover:bg-slate-800"><i className={`fa-solid fa-rotate ${loading ? 'animate-spin' : ''}`} aria-hidden="true" /> Refresh</button><button type="button" onClick={forgetDevice} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 text-sm font-bold text-slate-300 transition-colors hover:border-red-400/70 hover:bg-red-500/10 hover:text-white"><i className="fa-solid fa-right-from-bracket" aria-hidden="true" /> Sign out</button></div>
      </header>

      {error && <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100" role="alert"><p className="font-bold">Monitor unavailable</p><p className="mt-1 leading-relaxed">{error}</p></div>}
      {notice && <div className="mt-6 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-100" role="status">{notice}</div>}

      <section className="mt-7" aria-label="Funnel KPI cards"><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{metricCards.map((card) => <article key={card.key} className="rounded-xl border border-slate-800 bg-slate-900/75 p-5 shadow-lg shadow-black/10"><div className="flex items-start justify-between gap-3"><p className="text-sm font-semibold leading-snug text-slate-300">{card.label}</p><i className={`fa-solid ${card.icon} text-volt`} aria-hidden="true" /></div><p className="mt-5 font-mono text-3xl font-bold tabular-nums text-white">{loading ? '…' : number(totals?.[card.key])}</p><p className="mt-3 text-xs leading-relaxed text-slate-500">{card.note}</p></article>)}</div></section>

      <section className="mt-8 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"><p className="text-xs font-bold uppercase tracking-[0.18em] text-volt">Core conversion rates</p><h2 className="mt-2 text-2xl font-bold text-white">The three signals to watch</h2><div className="mt-6 grid gap-3 sm:grid-cols-3">{[
          ['Robotics → Checklist CTR', summary?.rates.robotics_to_checklist_ctr, 'Checklist-click sessions from Robotics Access ÷ Robotics Access visitors'],
          ['Checklist Lead Capture Rate', summary?.rates.checklist_lead_capture_rate, 'Successful Checklist Lead submissions ÷ all Checklist Sessions'],
          ['Verification Request Rate', summary?.rates.verification_request_rate, 'Verification CTA clicks ÷ all Checklist Sessions'],
          ['Qualified Lead Rate', summary?.rates.qualified_lead_rate, 'Qualified website opportunities ÷ all Checklist Leads and Robotics Form Submits'],
          ['Paid Project Conversion', summary?.rates.paid_project_conversion, 'Paid website opportunities ÷ all Checklist Leads and Robotics Form Submits'],
        ].map(([labelText, value, definition]) => <div key={String(labelText)} className="rounded-xl border border-slate-800 bg-slate-950/80 p-4"><p className="text-sm font-semibold text-slate-300">{labelText}</p><p className="mt-3 font-mono text-3xl font-bold tabular-nums text-white">{loading ? '…' : rate(value as number | null)}</p><p className="mt-2 text-xs leading-relaxed text-slate-500">{definition}</p></div>)}</div><p className="mt-5 text-xs leading-relaxed text-slate-500">Checklist Sessions includes visitors who land directly from Google, YouTube, LinkedIn, or another source. This keeps the CTR tied only to clicks from Robotics Access.</p></article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"><p className="text-xs font-bold uppercase tracking-[0.18em] text-volt">Funnel definition</p><h2 className="mt-2 text-2xl font-bold text-white">Behavior first, commercial state second</h2><ol className="mt-5 space-y-3">{[
          ['1', 'Traffic source', 'UTM, landing path, and referrer domain only'],
          ['2', 'Robotics → Checklist', 'A distinct click event keeps the CTA rate separate from direct Checklist visits'],
          ['3', 'Engagement → request', 'Checklist interaction, PO Gate, and verification CTA'],
          ['4', 'Form → anonymous ID', 'Each successful Checklist Lead or Robotics Requirement submission receives an RBT-YYYY-##### record'],
          ['5', 'Human stage update', 'Move that ID through qualified, proposal, and paid without bringing form content into the monitor'],
        ].map(([step, title, description]) => <li key={step} className="flex gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-volt/50 bg-volt/10 text-xs font-bold text-volt">{step}</span><div><p className="font-semibold text-slate-200">{title}</p><p className="mt-1 text-sm leading-relaxed text-slate-500">{description}</p></div></li>)}</ol></article>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-volt">Acquisition detail</p><h2 className="mt-2 text-2xl font-bold text-white">Website traffic source and campaign</h2><p className="mt-2 text-sm text-slate-500">UTM fields are retained when present; otherwise the referrer domain or direct visit is shown. Manual / Outbound records are intentionally excluded.</p></div><div className="mt-6 overflow-x-auto rounded-xl border border-slate-800"><table className="w-full min-w-[1320px] text-left text-sm"><thead className="bg-slate-950 text-xs uppercase tracking-[0.12em] text-slate-500"><tr>{['Source', 'Medium', 'Campaign', 'Access', 'Checklist CTA', 'Checklist Sessions', 'Engaged', 'Leads', 'Verify', 'Forms', 'Qualified', 'Paid'].map((heading) => <th key={heading} scope="col" className="px-4 py-3 font-semibold">{heading}</th>)}</tr></thead><tbody className="divide-y divide-slate-800">{summary?.campaigns.length ? summary.campaigns.map((row, index) => <tr key={`${row.source}-${row.medium}-${row.campaign}-${index}`} className="text-slate-300"><td className="px-4 py-4 font-semibold text-white">{row.source}</td><td className="px-4 py-4">{row.medium}</td><td className="max-w-48 truncate px-4 py-4" title={row.campaign}>{row.campaign}</td><td className="px-4 py-4 font-mono tabular-nums">{number(row.robotics_access_visitors)}</td><td className="px-4 py-4 font-mono tabular-nums">{number(row.robotics_to_checklist_clicks)}</td><td className="px-4 py-4 font-mono tabular-nums">{number(row.buyer_checklist_opens)}</td><td className="px-4 py-4 font-mono tabular-nums">{number(row.checklist_engagement)}</td><td className="px-4 py-4 font-mono tabular-nums">{number(row.checklist_leads)}</td><td className="px-4 py-4 font-mono tabular-nums">{number(row.request_verification_clicks)}</td><td className="px-4 py-4 font-mono tabular-nums">{number(row.form_submits)}</td><td className="px-4 py-4 font-mono tabular-nums">{number(row.qualified_leads)}</td><td className="px-4 py-4 font-mono tabular-nums">{number(row.paid_projects)}</td></tr>) : <tr><td colSpan={12} className="px-4 py-10 text-center text-slate-500">{loading ? 'Loading anonymous event totals…' : 'No website events in this reporting period yet.'}</td></tr>}</tbody></table></div></section>

      <section className="mt-8 grid gap-5 lg:grid-cols-5">
        <article className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 lg:col-span-2"><p className="text-xs font-bold uppercase tracking-[0.18em] text-volt">Manual / Outbound opportunity</p><h2 className="mt-2 text-2xl font-bold text-white">Keep external opportunities separate</h2><p className="mt-3 text-sm leading-relaxed text-slate-400">Use this only for cold email, LinkedIn outreach, referrals, or events. It creates a separate <span className="font-mono text-slate-200">MAN-YYYY-#####</span> ID and never changes website funnel rates. Do not enter names, emails, contact details, budgets, or form text.</p><form onSubmit={addManualOpportunity} className="mt-6 space-y-4"><div><label htmlFor="opportunity-label" className="mb-2 block text-sm font-semibold text-slate-200">Non-identifying internal label</label><input id="opportunity-label" value={label} onChange={(event) => setLabel(event.target.value)} maxLength={90} required placeholder="e.g. University humanoid research inquiry" className="min-h-11 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-white outline-none transition-colors placeholder:text-slate-600 focus:border-volt focus:ring-1 focus:ring-volt" /></div><div className="grid gap-4 sm:grid-cols-2"><div><label htmlFor="opportunity-source" className="mb-2 block text-sm font-semibold text-slate-200">External channel</label><select id="opportunity-source" value={source} onChange={(event) => setSource(event.target.value)} className="min-h-11 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-white outline-none focus:border-volt focus:ring-1 focus:ring-volt">{manualSourceOptions.map((option) => <option key={option}>{option}</option>)}</select></div><div><label htmlFor="opportunity-stage" className="mb-2 block text-sm font-semibold text-slate-200">Current stage</label><select id="opportunity-stage" value={stage} onChange={(event) => setStage(event.target.value as OpportunityStage)} className="min-h-11 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-white outline-none focus:border-volt focus:ring-1 focus:ring-volt">{Object.entries(stageLabel).filter(([value]) => value !== 'new').map(([value, display]) => <option key={value} value={value}>{display}</option>)}</select></div></div><fieldset><legend className="mb-3 text-sm font-semibold text-slate-200">Qualification signals</legend><div className="grid gap-2">{signalOptions.map(([value, text]) => <label key={value} className="flex min-h-11 items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/70 px-3 text-sm text-slate-300"><input type="checkbox" checked={signals.includes(value)} onChange={(event) => setSignals((current) => event.target.checked ? [...current, value] : current.filter((signal) => signal !== value))} className="h-4 w-4 accent-[#CF0404]" /> {text}</label>)}</div></fieldset><button type="submit" disabled={saving} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-volt px-5 py-3 font-bold text-white transition-colors hover:bg-volt-hover disabled:cursor-not-allowed disabled:opacity-60"><i className="fa-solid fa-plus" aria-hidden="true" /> {saving ? 'Saving…' : 'Save Manual / Outbound opportunity'}</button></form></article>
        <article className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 lg:col-span-3"><p className="text-xs font-bold uppercase tracking-[0.18em] text-volt">Recent opportunities</p><h2 className="mt-2 text-2xl font-bold text-white">Update stages by anonymous ID</h2><p className="mt-3 text-sm leading-relaxed text-slate-400">Each website Lead produces an anonymous RBT ID. Move that same ID through its status here; no form answers are shown or copied into this table.</p><div className="mt-6 overflow-x-auto rounded-xl border border-slate-800"><table className="w-full min-w-[940px] text-left text-sm"><thead className="bg-slate-950 text-xs uppercase tracking-[0.12em] text-slate-500"><tr><th scope="col" className="px-4 py-3">Opportunity ID</th><th scope="col" className="px-4 py-3">Origin</th><th scope="col" className="px-4 py-3">Source</th><th scope="col" className="px-4 py-3">Signals</th><th scope="col" className="px-4 py-3">Stage</th><th scope="col" className="px-4 py-3">Updated</th></tr></thead><tbody className="divide-y divide-slate-800">{summary?.opportunities.length ? summary.opportunities.map((opportunity) => <tr key={opportunity.id} className="text-slate-300"><td className="px-4 py-4 font-mono text-xs font-semibold text-white">{opportunity.id}</td><td className="px-4 py-4"><span className={`inline-flex rounded-full border px-2 py-1 text-xs font-semibold ${opportunity.origin !== 'manual_outbound' ? 'border-volt/40 bg-volt/10 text-volt-light' : 'border-slate-700 bg-slate-950 text-slate-300'}`}>{originLabel(opportunity.origin)}</span></td><td className="max-w-44 truncate px-4 py-4" title={opportunity.source}>{opportunity.source}</td><td className="px-4 py-4 text-xs text-slate-400">{opportunity.origin !== 'manual_outbound' ? (opportunity.signals.length ? `${opportunity.signals.length} of ${signalOptions.length}` : 'Not assessed') : (opportunity.signals.length ? `${opportunity.signals.length} of ${signalOptions.length}` : '—')}</td><td className="px-4 py-4"><label className="sr-only" htmlFor={`stage-${opportunity.id}`}>Stage for {opportunity.id}</label><select id={`stage-${opportunity.id}`} value={opportunity.stage} onChange={(event) => void updateStage(opportunity, event.target.value as OpportunityStage)} className="min-h-10 rounded-md border border-slate-700 bg-slate-950 px-2 text-sm font-semibold text-white outline-none focus:border-volt">{Object.entries(stageLabel).map(([value, display]) => <option key={value} value={value}>{display}</option>)}</select></td><td className="px-4 py-4 text-xs text-slate-500">{new Date(opportunity.updated_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td></tr>) : <tr><td colSpan={6} className="px-4 py-10 text-center text-slate-500">No anonymous opportunities recorded yet.</td></tr>}</tbody></table></div></article>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6"><div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-volt">Method and freshness</p><h2 className="mt-2 text-2xl font-bold text-white">Event mapping and data boundary</h2></div><p className="text-sm text-slate-500">{summary ? `Last refreshed ${new Date(summary.generated_at).toLocaleString('en-GB')}` : 'Waiting for data'}</p></div><div className="mt-6 overflow-x-auto rounded-xl border border-slate-800"><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-slate-950 text-xs uppercase tracking-[0.12em] text-slate-500"><tr><th scope="col" className="px-4 py-3">Event</th><th scope="col" className="px-4 py-3">Meaning</th><th scope="col" className="px-4 py-3">Monitor use</th></tr></thead><tbody className="divide-y divide-slate-800">{eventRows.map(([event, meaning, use]) => <tr key={event} className="text-slate-300"><td className="px-4 py-3 font-mono text-xs text-volt-light">{event}</td><td className="px-4 py-3">{meaning}</td><td className="px-4 py-3 text-slate-400">{use}</td></tr>)}</tbody></table></div><div className="mt-5 grid gap-3 text-sm leading-relaxed text-slate-400 md:grid-cols-2"><p className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"><strong className="text-slate-200">Anonymous behavior only.</strong> The event store accepts event name, a random event ID, UTM source/medium/campaign/content/term, landing page, referrer hostname, timestamp, and a session-only random token. It rejects form fields and free-form event properties.</p><p className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"><strong className="text-slate-200">Commercial state is manual.</strong> A successful Buyer Checklist Lead or Robotics Requirement form creates only an anonymous RBT ID. Qualified, proposal, and paid states are updated here. Manual / Outbound opportunities use separate MAN IDs and are excluded from website conversion rates.</p></div></section>
    </main>
  </div>;
};

export default RoboticsAdmin;
