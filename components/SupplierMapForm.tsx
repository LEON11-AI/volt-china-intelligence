import React, { useState } from 'react';
import SubmissionNotice from './SubmissionNotice';

const formName = 'supplier-map-beta';

const encode = (data: FormData) => new URLSearchParams(
  Array.from(data.entries()).map(([key, value]) => [key, String(value)]),
).toString();

const SupplierMapForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setIsSubmitting(true);
    setError('');

    try {
      if (import.meta.env.DEV) {
        await new Promise((resolve) => setTimeout(resolve, 250));
      } else {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encode(new FormData(form)),
        });
        if (!response.ok) throw new Error('Submission failed');
      }
      form.reset();
      setNoticeOpen(true);
    } catch {
      setError('Your map requirement could not be submitted. Please try again or email business@voltchina.net.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return <><form name={formName} method="POST" action="/" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={submit} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 md:p-7">
    <input type="hidden" name="form-name" value={formName} />
    <p className="hidden"><label>Do not fill this out if you are human: <input name="bot-field" /></label></p>
    <div className="grid gap-5 sm:grid-cols-2">
      <Input label="Your role and company" name="role_company" placeholder="e.g. Principal, Northstar Capital" required />
      <Input label="Work email" name="work_email" type="email" placeholder="you@company.com" required />
      <Input label="Supplier category needed" name="supplier_category" placeholder="e.g. China EMB suppliers" required />
      <SelectField label="How soon do you need it?" name="timeline" required options={['Within 2 weeks', '2-6 weeks', 'This quarter', 'Exploring for later']} />
      <SelectField label="Preferred format" name="preferred_format" required options={['Verified PDF / map', 'Searchable spreadsheet', 'Short written brief', 'Interactive database']} />
      <SelectField label="Would you pay for a verified version?" name="paid_interest" required options={['Yes - for the right coverage', 'Maybe - depends on scope', 'No - research only']} />
      <div className="sm:col-span-2"><SelectField label="Acceptable price range for one verified category" name="budget_range" required options={['Under $250', '$250-$500', '$500-$1,000', '$1,000+', 'Need to discuss']} /></div>
      <div className="sm:col-span-2"><TextArea label="What decision will this map support?" name="decision" placeholder="e.g. decide whether to begin deeper diligence on China traction suppliers for an investment thesis" required rows={4} /></div>
    </div>
    {error && <p className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200" role="alert">{error}</p>}
    <button type="submit" disabled={isSubmitting} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-volt px-5 py-3 font-bold text-white shadow-lg shadow-volt/20 transition-all hover:bg-volt-hover hover:shadow-volt/40 disabled:cursor-not-allowed disabled:opacity-70">{isSubmitting ? 'Submitting...' : <>Share My Map Requirement <i className="fa-solid fa-arrow-right text-xs" /></>}</button>
    <p className="mt-3 text-center text-xs leading-relaxed text-slate-500">Your answers qualify a possible paid founding edition; they do not create a purchase obligation.</p>
  </form><SubmissionNotice isOpen={noticeOpen} onClose={() => setNoticeOpen(false)} title="Supplier map requirement received" message="Thank you. Please wait for a written follow-up if your requirement matches a planned verified supplier map." /></>;
};

const Input: React.FC<{ label: string; name: string; placeholder: string; type?: string; required?: boolean }> = ({ label, name, placeholder, type = 'text', required = false }) => <div><label htmlFor={name} className="mb-2 block text-sm font-medium text-slate-200">{label}</label><input id={name} name={name} type={type} placeholder={placeholder} required={required} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-3 text-white outline-none transition-colors placeholder:text-slate-500 focus:border-volt focus:ring-1 focus:ring-volt" /></div>;
const TextArea: React.FC<{ label: string; name: string; placeholder: string; required?: boolean; rows: number }> = ({ label, name, placeholder, required = false, rows }) => <div><label htmlFor={name} className="mb-2 block text-sm font-medium text-slate-200">{label}</label><textarea id={name} name={name} required={required} rows={rows} placeholder={placeholder} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-3 text-white outline-none transition-colors placeholder:text-slate-500 focus:border-volt focus:ring-1 focus:ring-volt" /></div>;
const SelectField: React.FC<{ label: string; name: string; options: string[]; required?: boolean }> = ({ label, name, options, required = false }) => <div><label htmlFor={name} className="mb-2 block text-sm font-medium text-slate-200">{label}</label><select id={name} name={name} required={required} defaultValue="" className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-3 text-white outline-none transition-colors focus:border-volt focus:ring-1 focus:ring-volt"><option value="" disabled>Select one</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></div>;

export default SupplierMapForm;