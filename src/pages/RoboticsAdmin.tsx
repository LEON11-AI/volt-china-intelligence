import React, { FormEvent, useEffect, useMemo, useState } from 'react';

type MetricKey = 'robotics_access_visitors' | 'buyer_checklist_opens' | 'checklist_engagement' | 'po_gate_started' | 'po_gate_completed' | 'request_verification_clicks' | 'form_submits' | 'qualified_leads' | 'proposals_sent' | 'paid_projects';
type OpportunityStage = 'qualified' | 'proposal' | 'paid';

type Opportunity = {
  id: string;
  label: string;
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
  rates: { checklist_open_rate: number | null; verification_request_rate: number | null; qualified_lead_rate: number | null };
  campaigns: Array<{
    source: string;
    medium: string;
    campaign: string;
    robotics_access_visitors: number;
    buyer_checklist_opens: number;
    checklist_engagement: number;
    request_verification_clicks: number;
    form_submits: number;
    qualified_leads: number;
    paid_projects: number;
  }>;
  opportunities: Opportunity[];
};

const tokenStorageKey = 'voltchina_robotics_admin_token';
const metricCards: Array<{ key: MetricKey; label: string; note: string; icon: string }> = [
  { key: 'robotics_access_visitors', label: 'Robotics Access Visitors', note: 'Observed sessions with a page-view event', icon: 'fa-robot' },
  { key: 'buyer_checklist_opens', label: 'Buyer Checklist Opens', note: 'Observed checklist sessions', icon: 'fa-list-check' },
  { key: 'checklist_engagement', label: 'Checklist Engagement', note: 'At least one checklist-item interaction', icon: 'fa-check' },
  { key: 'po_gate_started', label: 'PO Gate Started', note: 'At least one Pre-Purchase Gate interaction', icon: 'fa-flag' },
  { key: 'po_gate_completed', label: 'PO Gate Completed', note: 'All PO Gate items completed in a session', icon: 'fa-circle-check' },
  { key: 'request_verification_clicks', label: 'Request Verification Clicks', note: 'Checklist CTA clicked', icon: 'fa-arrow-up-right-from-square' },
  { key: 'form_submits', label: 'Form Submits', note: 'Successful Robotics Requirement submissions', icon: 'fa-paper-plane' },
  { key: 'qualified_leads', label: 'Qualified Leads', note: 'Manual stage: qualified, proposal, or paid', icon: 'fa-filter-circle-dollar' },
  { key: 'proposals_sent', label: 'Proposals Sent', note: 'Manual stage: proposal or paid', icon: 'fa-file-signature' },
  { key: 'paid_projects', label: 'Paid Projects', note: 'Manual stage: paid', icon: 'fa-circle-dollar-to-slot' },
];

const eventRows = [
  ['robotics_access_view', 'Robotics Access page view', 'Robotics Access Visitors'],
  ['checklist_view', 'Buyer Checklist opened', 'Buyer Checklist Opens'],
  ['checklist_item_checked', 'Checklist-item interaction', 'Checklist Engagement'],
  ['po_gate_started', 'First PO Gate interaction', 'PO Gate Started'],
  ['po_gate_completed', 'Every PO Gate item checked', 'PO Gate Completed'],
  ['worksheet_started', 'Worksheet first used', 'Context only in V1'],
  ['robotics_form_start', 'Robotics form first focused', 'Context only in V1'],
  ['request_verification', 'Checklist CTA clicked', 'Request Verification Clicks'],
  ['robotics_form_submit', 'Robotics form successfully submitted', 'Form Submits'],
];

const stageLabel: Record<OpportunityStage, string> = {
  qualified: 'Qualified lead',
  proposal: 'Proposal sent',
  paid: 'Paid project',
};

const sourceOptions = ['Manual / unclassified', 'YouTube', 'LinkedIn', 'Organic search', 'Referral', 'Direct / untagged', 'Other'];
const signalOptions = [
  ['organization', 'Organization / lab identified'],
  ['defined_use', 'Defined use case'],
  ['timeframe', 'Real timing window'],
  ['commercial_detail', 'Quantity, budget, or candidate configuration'],
] as const;

const number = (value: number | undefined) => new Intl.NumberFormat('en-US').format(value || 0);
const rate = (value: number | null) => value === null ? '—' : `${value}%`;

const fetchSummary = async (token: string, days: number) => {
  const response = await fetch(`/api/robotics-analytics?days=${days}`, { headers: { Authorization: `Bearer ${token}` } });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || 'Could not load the Robotics monitor.');
  return body as Summary;
};

const saveOpportunity = async (token: string, data: Partial<Opportunity> & Pick<Opportunity, 'label' | 'stage'>) => {
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
  const [days, setDays] = useState(30);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [label, setLabel] = useState('');
  const [source, setSource] = useState(sourceOptions[0]);
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
      const saved = sessionStorage.getItem(tokenStorageKey) || '';
      setToken(saved);
      setDraftToken(saved);
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
      setError('Enter the internal access token to open the monitor.');
      return;
    }
    try { sessionStorage.setItem(tokenStorageKey, next); } catch { /* Session-only persistence is optional. */ }
    setToken(next);
    void load(next, days);
  };

  const addOpportunity = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setNotice('');
    setError('');
    try {
      await saveOpportunity(token, { label, source, stage, signals });
      setLabel('');
      setSource(sourceOptions[0]);
      setStage('qualified');
      setSignals([]);
      setNotice('Opportunity saved. Dashboard counts are refreshed.');
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
      await saveOpportunity(token, { ...opportunity, stage: nextStage });
      setNotice('Opportunity stage updated.');
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
            <div><label htmlFor="admin-token" className="mb-2 block text-sm font-semibold text-slate-200">Internal access token</label><input id="admin-token" type="password" autoComplete="current-password" value={draftToken} onChange={(event) => setDraftToken(event.target.value)} className="min-h-11 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-white outline-none transition-colors focus:border-volt focus:ring-1 focus:ring-volt" /></div>
            {error && <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200" role="alert">{error}</p>}
            <button type="submit" className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-volt px-5 py-3 font-bold text-white shadow-lg shadow-volt/20 transition-colors hover:bg-volt-hover"><i className="fa-solid fa-lock" aria-hidden="true" /> Open monitor</button>
          </form>
          <p className="mt-5 text-xs leading-relaxed text-slate-500">The token is retained only in this browser session. Configure <code className="rounded bg-slate-800 px-1 py-0.5 text-slate-300">ROBOTICS_ADMIN_TOKEN</code> in Netlify before first use.</p>
        </section>
      </main>
    </div>;
  }

  return <div className="min-h-screen bg-slate-950 font-sans text-slate-200">
    <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8" data-scroll-motion-skip>
      <header className="flex flex-col gap-5 border-b border-slate-800 pb-6 md:flex-row md:items-end md:justify-between">
        <div><a href="/robotics" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-volt focus-visible:outline-none focus-visible:text-volt"><i className="fa-solid fa-arrow-left" aria-hidden="true" /> Robotics Access</a><p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-volt">Internal operations · no PII</p><h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Robotics Analytics Monitor</h1><p className="mt-3 max-w-3xl leading-relaxed text-slate-400">Anonymous acquisition and checklist behavior, followed by manually maintained opportunity stages. This is an operational lens, not a CRM.</p></div>
        <div className="flex flex-wrap items-center gap-2" aria-label="Reporting period">{[7, 30, 90].map((value) => <button key={value} type="button" onClick={() => setRange(value)} className={`min-h-11 rounded-lg border px-4 text-sm font-bold transition-colors ${days === value ? 'border-volt bg-volt text-white' : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500 hover:text-white'}`}>{value} days</button>)}<button type="button" onClick={() => void load()} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 text-sm font-bold text-white transition-colors hover:border-volt/70 hover:bg-slate-800"><i className={`fa-solid fa-rotate ${loading ? 'animate-spin' : ''}`} aria-hidden="true" /> Refresh</button></div>
      </header>

      {error && <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100" role="alert"><p className="font-bold">Monitor unavailable</p><p className="mt-1 leading-relaxed">{error}</p></div>}
      {notice && <div className="mt-6 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-100" role="status">{notice}</div>}

      <section className="mt-7" aria-label="Funnel KPI cards"><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{metricCards.map((card) => <article key={card.key} className="rounded-xl border border-slate-800 bg-slate-900/75 p-5 shadow-lg shadow-black/10"><div className="flex items-start justify-between gap-3"><p className="text-sm font-semibold leading-snug text-slate-300">{card.label}</p><i className={`fa-solid ${card.icon} text-volt`} aria-hidden="true" /></div><p className="mt-5 font-mono text-3xl font-bold tabular-nums text-white">{loading ? '…' : number(totals?.[card.key])}</p><p className="mt-3 text-xs leading-relaxed text-slate-500">{card.note}</p></article>)}</div></section>

      <section className="mt-8 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"><p className="text-xs font-bold uppercase tracking-[0.18em] text-volt">Core conversion rates</p><h2 className="mt-2 text-2xl font-bold text-white">The three signals to watch</h2><div className="mt-6 grid gap-3 sm:grid-cols-3">{[
          ['Checklist Open Rate', summary?.rates.checklist_open_rate, 'Checklist opens ÷ Robotics Access visitors'],
          ['Verification Request Rate', summary?.rates.verification_request_rate, 'Verification clicks ÷ checklist opens'],
          ['Qualified Lead Rate', summary?.rates.qualified_lead_rate, 'Manual qualified leads ÷ form submits'],
        ].map(([labelText, value, definition]) => <div key={String(labelText)} className="rounded-xl border border-slate-800 bg-slate-950/80 p-4"><p className="text-sm font-semibold text-slate-300">{labelText}</p><p className="mt-3 font-mono text-3xl font-bold tabular-nums text-white">{loading ? '…' : rate(value as number | null)}</p><p className="mt-2 text-xs leading-relaxed text-slate-500">{definition}</p></div>)}</div><p className="mt-5 text-xs leading-relaxed text-slate-500">Rates use short-lived anonymous sessions. Direct checklist visits can make the Checklist Open Rate exceed 100%; this is expected and visible in source rows.</p></article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"><p className="text-xs font-bold uppercase tracking-[0.18em] text-volt">Funnel definition</p><h2 className="mt-2 text-2xl font-bold text-white">Behavior first, commercial state second</h2><ol className="mt-5 space-y-3">{[
          ['1', 'Traffic source', 'UTM, landing path, and referrer domain only'],
          ['2', 'Robotics → Checklist', 'Observed anonymous session events'],
          ['3', 'Engagement → request', 'Checklist interaction, PO Gate, and verification CTA'],
          ['4', 'Form → opportunity', 'Successful submit, then human-maintained status'],
        ].map(([step, title, description]) => <li key={step} className="flex gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-volt/50 bg-volt/10 text-xs font-bold text-volt">{step}</span><div><p className="font-semibold text-slate-200">{title}</p><p className="mt-1 text-sm leading-relaxed text-slate-500">{description}</p></div></li>)}</ol></article>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6"><div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-volt">Acquisition detail</p><h2 className="mt-2 text-2xl font-bold text-white">Traffic source and campaign</h2><p className="mt-2 text-sm text-slate-500">UTM fields are retained when present; otherwise the referrer domain or direct visit is shown.</p></div></div><div className="mt-6 overflow-x-auto rounded-xl border border-slate-800"><table className="w-full min-w-[980px] text-left text-sm"><thead className="bg-slate-950 text-xs uppercase tracking-[0.12em] text-slate-500"><tr>{['Source', 'Medium', 'Campaign', 'Access', 'Checklist', 'Engaged', 'Verify', 'Forms', 'Qualified', 'Paid'].map((heading) => <th key={heading} scope="col" className="px-4 py-3 font-semibold">{heading}</th>)}</tr></thead><tbody className="divide-y divide-slate-800">{summary?.campaigns.length ? summary.campaigns.map((row, index) => <tr key={`${row.source}-${row.medium}-${row.campaign}-${index}`} className="text-slate-300"><td className="px-4 py-4 font-semibold text-white">{row.source}</td><td className="px-4 py-4">{row.medium}</td><td className="px-4 py-4 max-w-48 truncate" title={row.campaign}>{row.campaign}</td><td className="px-4 py-4 font-mono tabular-nums">{number(row.robotics_access_visitors)}</td><td className="px-4 py-4 font-mono tabular-nums">{number(row.buyer_checklist_opens)}</td><td className="px-4 py-4 font-mono tabular-nums">{number(row.checklist_engagement)}</td><td className="px-4 py-4 font-mono tabular-nums">{number(row.request_verification_clicks)}</td><td className="px-4 py-4 font-mono tabular-nums">{number(row.form_submits)}</td><td className="px-4 py-4 font-mono tabular-nums">{number(row.qualified_leads)}</td><td className="px-4 py-4 font-mono tabular-nums">{number(row.paid_projects)}</td></tr>) : <tr><td colSpan={10} className="px-4 py-10 text-center text-slate-500">{loading ? 'Loading anonymous event totals…' : 'No events in this reporting period yet.'}</td></tr>}</tbody></table></div></section>

      <section className="mt-8 grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"><p className="text-xs font-bold uppercase tracking-[0.18em] text-volt">Manual opportunity status</p><h2 className="mt-2 text-2xl font-bold text-white">Add a non-identifying opportunity</h2><p className="mt-3 text-sm leading-relaxed text-slate-400">Do not enter names, emails, company contact details, budgets, or form text here. Use a neutral internal label and the four qualifying signals instead.</p><form onSubmit={addOpportunity} className="mt-6 space-y-4"><div><label htmlFor="opportunity-label" className="mb-2 block text-sm font-semibold text-slate-200">Internal opportunity label</label><input id="opportunity-label" value={label} onChange={(event) => setLabel(event.target.value)} maxLength={90} required placeholder="e.g. University humanoid research inquiry" className="min-h-11 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-white outline-none transition-colors placeholder:text-slate-600 focus:border-volt focus:ring-1 focus:ring-volt" /></div><div className="grid gap-4 sm:grid-cols-2"><div><label htmlFor="opportunity-source" className="mb-2 block text-sm font-semibold text-slate-200">Attributed source</label><select id="opportunity-source" value={source} onChange={(event) => setSource(event.target.value)} className="min-h-11 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-white outline-none focus:border-volt focus:ring-1 focus:ring-volt">{sourceOptions.map((option) => <option key={option}>{option}</option>)}</select></div><div><label htmlFor="opportunity-stage" className="mb-2 block text-sm font-semibold text-slate-200">Current stage</label><select id="opportunity-stage" value={stage} onChange={(event) => setStage(event.target.value as OpportunityStage)} className="min-h-11 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-white outline-none focus:border-volt focus:ring-1 focus:ring-volt">{Object.entries(stageLabel).map(([value, display]) => <option key={value} value={value}>{display}</option>)}</select></div></div><fieldset><legend className="mb-3 text-sm font-semibold text-slate-200">Qualification signals</legend><div className="grid gap-2">{signalOptions.map(([value, text]) => <label key={value} className="flex min-h-11 items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/70 px-3 text-sm text-slate-300"><input type="checkbox" checked={signals.includes(value)} onChange={(event) => setSignals((current) => event.target.checked ? [...current, value] : current.filter((signal) => signal !== value))} className="h-4 w-4 accent-[#CF0404]" /> {text}</label>)}</div></fieldset><button type="submit" disabled={saving} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-volt px-5 py-3 font-bold text-white transition-colors hover:bg-volt-hover disabled:cursor-not-allowed disabled:opacity-60"><i className="fa-solid fa-plus" aria-hidden="true" /> {saving ? 'Saving…' : 'Save opportunity status'}</button></form></article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"><p className="text-xs font-bold uppercase tracking-[0.18em] text-volt">Recent opportunities</p><h2 className="mt-2 text-2xl font-bold text-white">Manually maintained stages</h2><div className="mt-6 overflow-x-auto rounded-xl border border-slate-800"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-slate-950 text-xs uppercase tracking-[0.12em] text-slate-500"><tr><th scope="col" className="px-4 py-3">Label</th><th scope="col" className="px-4 py-3">Source</th><th scope="col" className="px-4 py-3">Signals</th><th scope="col" className="px-4 py-3">Stage</th><th scope="col" className="px-4 py-3">Updated</th></tr></thead><tbody className="divide-y divide-slate-800">{summary?.opportunities.length ? summary.opportunities.map((opportunity) => <tr key={opportunity.id} className="text-slate-300"><td className="max-w-56 px-4 py-4 font-semibold text-white"><span className="block truncate" title={opportunity.label}>{opportunity.label}</span></td><td className="px-4 py-4">{opportunity.source || 'Manual / unclassified'}</td><td className="px-4 py-4 text-xs text-slate-400">{opportunity.signals.length ? `${opportunity.signals.length} of ${signalOptions.length}` : '—'}</td><td className="px-4 py-4"><label className="sr-only" htmlFor={`stage-${opportunity.id}`}>Stage for {opportunity.label}</label><select id={`stage-${opportunity.id}`} value={opportunity.stage} onChange={(event) => void updateStage(opportunity, event.target.value as OpportunityStage)} className="min-h-10 rounded-md border border-slate-700 bg-slate-950 px-2 text-sm font-semibold text-white outline-none focus:border-volt">{Object.entries(stageLabel).map(([value, display]) => <option key={value} value={value}>{display}</option>)}</select></td><td className="px-4 py-4 text-xs text-slate-500">{new Date(opportunity.updated_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td></tr>) : <tr><td colSpan={5} className="px-4 py-10 text-center text-slate-500">No manual opportunities recorded yet.</td></tr>}</tbody></table></div></article>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6"><div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-volt">Method and freshness</p><h2 className="mt-2 text-2xl font-bold text-white">Event mapping and data boundary</h2></div><p className="text-sm text-slate-500">{summary ? `Last refreshed ${new Date(summary.generated_at).toLocaleString('en-GB')}` : 'Waiting for data'}</p></div><div className="mt-6 overflow-x-auto rounded-xl border border-slate-800"><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-slate-950 text-xs uppercase tracking-[0.12em] text-slate-500"><tr><th scope="col" className="px-4 py-3">Event</th><th scope="col" className="px-4 py-3">Meaning</th><th scope="col" className="px-4 py-3">Monitor use</th></tr></thead><tbody className="divide-y divide-slate-800">{eventRows.map(([event, meaning, use]) => <tr key={event} className="text-slate-300"><td className="px-4 py-3 font-mono text-xs text-volt-light">{event}</td><td className="px-4 py-3">{meaning}</td><td className="px-4 py-3 text-slate-400">{use}</td></tr>)}</tbody></table></div><div className="mt-5 grid gap-3 text-sm leading-relaxed text-slate-400 md:grid-cols-2"><p className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"><strong className="text-slate-200">Anonymous behavior only.</strong> The event store accepts event name, UTM source/medium/campaign, landing path, referrer domain, timestamp, and a session-only random token. It rejects form fields and free-form event properties.</p><p className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"><strong className="text-slate-200">Commercial state is manual.</strong> Qualified, proposal, and paid counts come from the internal status table above. It deliberately does not read or copy Netlify form content into analytics.</p></div></section>
    </main>
  </div>;
};

export default RoboticsAdmin;
