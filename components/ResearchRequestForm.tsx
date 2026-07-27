import React from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent } from '../src/lib/analytics';
import SubmissionNotice from './SubmissionNotice';

const encode = (data: Record<string, string>) => Object.keys(data).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&');

const serviceOptions = [
  'Rapid Claim Verification - $500',
  'China Evidence Brief - $1,000',
  'Strategic Intelligence Program - from $10,000',
  'Not sure',
];

const serviceFromSearch = (search: string) => {
  const selected = new URLSearchParams(search).get('service');
  if (selected === 'rapid') return serviceOptions[0];
  if (selected === 'evidence') return serviceOptions[1];
  if (selected === 'strategic') return serviceOptions[2];
  return serviceOptions[3];
};

const ResearchRequestForm: React.FC = () => {
  const location = useLocation();
  const [noticeOpen, setNoticeOpen] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [started, setStarted] = React.useState(false);
  const [serviceNeeded, setServiceNeeded] = React.useState(() => serviceFromSearch(location.search));

  React.useEffect(() => setServiceNeeded(serviceFromSearch(location.search)), [location.search]);

  const trackStart = () => {
    if (started) return;
    setStarted(true);
    trackEvent('research_form_start');
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setError(false);
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    try {
      const response = import.meta.env.DEV
        ? new Response(null, { status: 200 })
        : await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: encode(data) });
      if (!response.ok) throw new Error('Form submission failed');
      setNoticeOpen(true);
      trackEvent('research_form_submit', { service_needed: serviceNeeded });
      form.reset();
      setServiceNeeded(serviceFromSearch(location.search));
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return <>
    <form name="research-request" method="POST" action="/" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={submit} onFocus={trackStart} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/50 md:p-8">
      <input type="hidden" name="form-name" value="research-request" />
      <p className="hidden"><label>Do not fill this out if you are human: <input name="bot-field" /></label></p>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Work email" name="work_email" type="email" placeholder="you@company.com" required />
        <Input label="Name" name="contact_name" placeholder="Your name" required />
        <Input label="Role and organization" name="role_organization" placeholder="Principal, automotive research firm" required />
        <Select label="Service needed" name="service_needed" required options={serviceOptions} value={serviceNeeded} onChange={(event) => setServiceNeeded(event.target.value)} />
        <Select label="Deadline" name="deadline" required options={['Within 3 business days', 'Within 5 business days', 'Within 2 weeks', 'Flexible', 'Other']} />
        <div className="sm:col-span-2"><TextArea label="What exact question do you need answered?" name="research_question" placeholder="Example: What do Chinese public sources support regarding Company X's claimed mass-production timeline?" required rows={4} /></div>
        <div className="sm:col-span-2"><TextArea label="What decision will this research support?" name="decision_context" placeholder="Example: decide whether deeper technical diligence is warranted" required rows={3} /></div>
        <div className="sm:col-span-2"><TextArea label="Relevant companies, claims, documents, or links" name="relevant_links" placeholder="Paste any relevant company names, claims, documents, or public links." rows={3} /></div>
        <div className="sm:col-span-2"><Select label="Additional budget context" name="budget_range" options={['$500', '$1,000', '$10,000+', 'Not sure yet']} /></div>
      </div>
      {error && <p className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200" role="alert">Your request could not be sent. Please try again, or email business@voltchina.net.</p>}
      <button type="submit" disabled={sending} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-volt px-5 py-3.5 font-bold text-white shadow-lg shadow-volt/20 transition-all hover:bg-volt-hover hover:shadow-volt/40 disabled:cursor-not-allowed disabled:opacity-70">{sending ? 'Submitting...' : 'Submit My Research Question'} <i className="fa-solid fa-arrow-right text-xs" /></button>
      <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">Submitting a request does not create a purchase obligation. VoltChina will confirm suitability, scope, fixed price, delivery date, exclusions, and payment terms in writing before work begins.</p>
    </form>
    <SubmissionNotice isOpen={noticeOpen} onClose={() => setNoticeOpen(false)} title="Research request received" message="Thank you. Your information has been received. Please wait for a written email reply, normally within one business day. No call is required." />
  </>;
};

const Input: React.FC<{ label: string; name: string; placeholder: string; type?: string; required?: boolean }> = ({ label, name, placeholder, type = 'text', required }) => <div><label htmlFor={name} className="mb-2 block text-sm font-medium text-slate-200">{label}</label><input id={name} name={name} type={type} placeholder={placeholder} required={required} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-3 text-white outline-none transition-colors placeholder:text-slate-500 focus:border-volt focus:ring-1 focus:ring-volt" /></div>;
const TextArea: React.FC<{ label: string; name: string; placeholder: string; rows: number; required?: boolean }> = ({ label, name, placeholder, rows, required }) => <div><label htmlFor={name} className="mb-2 block text-sm font-medium text-slate-200">{label}</label><textarea id={name} name={name} placeholder={placeholder} required={required} rows={rows} className="w-full resize-y rounded-lg border border-slate-700 bg-slate-900 px-3 py-3 text-white outline-none transition-colors placeholder:text-slate-500 focus:border-volt focus:ring-1 focus:ring-volt" /></div>;
const Select: React.FC<{ label: string; name: string; options: string[]; required?: boolean; value?: string; onChange?: React.ChangeEventHandler<HTMLSelectElement> }> = ({ label, name, options, required, value, onChange }) => { const control = value === undefined ? { defaultValue: '' } : { value, onChange }; return <div><label htmlFor={name} className="mb-2 block text-sm font-medium text-slate-200">{label}</label><select id={name} name={name} required={required} {...control} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-3 text-white outline-none transition-colors focus:border-volt focus:ring-1 focus:ring-volt">{value === undefined && <option value="" disabled>{required ? 'Select one' : 'Optional - select one'}</option>}{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></div>; };

export default ResearchRequestForm;