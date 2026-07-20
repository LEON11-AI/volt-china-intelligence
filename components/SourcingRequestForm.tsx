import React, { useRef, useState } from 'react';
import { trackEvent } from '../src/lib/analytics';
import SubmissionNotice from './SubmissionNotice';

const formName = 'sourcing-requirement';

const encode = (data: FormData) => new URLSearchParams(
  Array.from(data.entries()).map(([key, value]) => [key, String(value)]),
).toString();

const SourcingRequestForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [error, setError] = useState('');
  const hasTrackedStart = useRef(false);

  const trackStart = () => {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    trackEvent('sourcing_form_start');
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setIsSubmitting(true);
    setError('');

    try {
      if (import.meta.env.DEV) {
        await new Promise((resolve) => setTimeout(resolve, 300));
      } else {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encode(new FormData(form)),
        });
        if (!response.ok) throw new Error('Submission failed');
      }
      trackEvent('sourcing_form_submit');
      form.reset();
      setNoticeOpen(true);
    } catch {
      setError('Your requirement could not be submitted. Please try again or email business@voltchina.net.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return <><form name={formName} method="POST" action="/" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={submit} onFocus={trackStart} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/50 md:p-8">
    <input type="hidden" name="form-name" value={formName} />
    <p className="hidden"><label>Do not fill this out if you are human: <input name="bot-field" /></label></p>
    <div className="grid gap-5 sm:grid-cols-2">
      <Input label="Work email" name="work_email" type="email" placeholder="you@company.com" required />
      <Input label="Name" name="contact_name" placeholder="Your name" required />
      <Input label="Role and organization" name="role_organization" placeholder="Sourcing lead, company name" required />
      <SelectField label="Buyer type" name="buyer_type" required options={['Importer', 'Distributor', 'System integrator', 'Manufacturer', 'Technical or sourcing team', 'Other']} />
      <div className="sm:col-span-2"><Input label="Product or component required" name="product_requirement" placeholder="Specific EV or robotics product, component, or system" required /></div>
      <div className="sm:col-span-2"><TextArea label="Technical specifications or intended use" name="technical_specifications" placeholder="Key specifications, standards, materials, dimensions, or intended use" rows={4} required /></div>
      <Input label="Estimated first-order quantity" name="first_order_quantity" placeholder="e.g. 500 units or 2,000 sets" required />
      <Input label="Destination country" name="destination_country" placeholder="Country of delivery" required />
      <div className="sm:col-span-2"><Input label="Required certifications or standards" name="required_certifications" placeholder="e.g. CE, UN38.3, ISO, IEC, or market-specific requirements" required /></div>
      <SelectField label="When do you need supplier quotations?" name="quotation_timeline" required options={['Within 2 weeks', 'Within 1 month', 'Within 3 months', 'Flexible']} />
      <SelectField label="Sample requirement" name="sample_requirement" options={['Sample required', 'Sample preferred', 'No sample required', 'Not sure']} />
      <div className="sm:col-span-2"><TextArea label="What sourcing problem are you currently facing?" name="sourcing_problem" placeholder="Describe the supplier, quotation, documentation, certification, or comparison issue you need resolved." rows={4} required /></div>
      <div className="sm:col-span-2"><TextArea label="Relevant product links, drawings, or document links" name="relevant_links" placeholder="Optional: paste public links or document links that help define the requirement." rows={3} /></div>
      <Input label="Target price or budget" name="target_price" placeholder="Optional" />
      <SelectField label="Expected budget for supplier-verification work" name="verification_budget" options={['$300–$800', '$800–$1,500', '$1,500+', 'Not sure yet']} />
    </div>
    <div className="mt-6 space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-sm leading-relaxed text-slate-300">
      <Confirmation name="authorized_buyer" required>I am authorized to make or support purchasing decisions for the organization stated above.</Confirmation>
      <Confirmation name="commercial_limits" required>I understand that VoltChina does not receive goods payments or take responsibility for shipping, inspection, customs clearance, or supplier performance.</Confirmation>
      <Confirmation name="supplier_contact_consent" required>I consent to VoltChina contacting potential suppliers about this requirement only after written scope approval.</Confirmation>
    </div>
    {error && <p className="mt-4 text-sm text-red-300" role="alert">{error}</p>}
    <button type="submit" disabled={isSubmitting} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-volt px-5 py-3.5 font-bold text-white shadow-lg shadow-volt/20 transition-all hover:bg-volt-hover hover:shadow-volt/40 disabled:cursor-not-allowed disabled:opacity-70">{isSubmitting ? 'Submitting…' : <>Submit My Sourcing Requirement <i className="fa-solid fa-arrow-right text-xs" /></>}</button>
    <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">Submitting a requirement does not create a purchase obligation. VoltChina will confirm suitability, scope, exclusions, fixed service fee, any applicable success-fee terms, and delivery date in writing before work begins.</p>
  </form><SubmissionNotice isOpen={noticeOpen} onClose={() => setNoticeOpen(false)} title="Sourcing requirement received" message="Thank you. Your information has been received. Please wait for a written email reply, normally within two business days. No call is required." /></>;
};

const Input: React.FC<{ label: string; name: string; placeholder: string; type?: string; required?: boolean }> = ({ label, name, placeholder, type = 'text', required = false }) => <div><label htmlFor={name} className="mb-2 block text-sm font-medium text-slate-200">{label}{required && <span className="text-volt"> *</span>}</label><input id={name} name={name} type={type} placeholder={placeholder} required={required} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-3 text-white outline-none transition-colors placeholder:text-slate-500 focus:border-volt focus:ring-1 focus:ring-volt" /></div>;

const TextArea: React.FC<{ label: string; name: string; placeholder: string; rows: number; required?: boolean }> = ({ label, name, placeholder, rows, required = false }) => <div><label htmlFor={name} className="mb-2 block text-sm font-medium text-slate-200">{label}{required && <span className="text-volt"> *</span>}</label><textarea id={name} name={name} rows={rows} placeholder={placeholder} required={required} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-3 text-white outline-none transition-colors placeholder:text-slate-500 focus:border-volt focus:ring-1 focus:ring-volt" /></div>;

const SelectField: React.FC<{ label: string; name: string; options: string[]; required?: boolean }> = ({ label, name, options, required = false }) => <div><label htmlFor={name} className="mb-2 block text-sm font-medium text-slate-200">{label}{required && <span className="text-volt"> *</span>}</label><select id={name} name={name} required={required} defaultValue="" className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-3 text-white outline-none transition-colors focus:border-volt focus:ring-1 focus:ring-volt"><option value="" disabled>{required ? 'Select one' : 'Optional — select one'}</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></div>;

const Confirmation: React.FC<{ name: string; children: React.ReactNode; required?: boolean }> = ({ name, children, required = false }) => <label className="flex cursor-pointer items-start gap-3"><input name={name} type="checkbox" required={required} className="mt-1 h-4 w-4 shrink-0 rounded border-slate-600 bg-slate-950 text-volt focus:ring-volt" /><span>{children}</span></label>;

export default SourcingRequestForm;
