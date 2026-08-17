import React, { useRef, useState } from 'react';
import { trackEvent } from '../src/lib/analytics';
import SubmissionNotice from './SubmissionNotice';

const formName = 'robotics-requirement';
const requiredFields = ['work_email', 'contact_name', 'organization_role', 'organization_type', 'destination_country', 'achieve_objective', 'required_platform_type', 'intended_application', 'quantity', 'purchase_timeframe'];

const encode = (data: FormData) => new URLSearchParams(Array.from(data.entries()).map(([key, value]) => [key, String(value)])).toString();

const RoboticsRequestForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [error, setError] = useState('');
  const hasTrackedStart = useRef(false);

  const trackStart = () => {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    trackEvent('robotics_form_start');
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const hasMissingField = requiredFields.some((name) => !String(data.get(name) ?? '').trim());

    if (hasMissingField || !form.checkValidity()) {
      setError('Complete every required field before submitting your robotics requirement.');
      form.reportValidity();
      return;
    }

    setIsSubmitting(true);
    setError('');
    try {
      if (import.meta.env.DEV) {
        await new Promise((resolve) => setTimeout(resolve, 300));
      } else {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encode(data),
        });
        if (!response.ok) throw new Error('Submission failed');
      }

      trackEvent('robotics_form_submit');
      form.reset();
      hasTrackedStart.current = false;
      setNoticeOpen(true);
    } catch {
      setError('Your robotics requirement could not be submitted. Please try again or email business@voltchina.net.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return <>
    <form name={formName} method="POST" action="/" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={submit} onFocus={trackStart} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/50 md:p-8">
      <input type="hidden" name="form-name" value={formName} />
      <p className="hidden"><label>Do not fill this out if you are human: <input name="bot-field" /></label></p>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Work email" name="work_email" type="email" placeholder="you@organization.com" required />
        <Input label="Name" name="contact_name" placeholder="Your name" required />
        <div className="sm:col-span-2"><Input label="Organization and role" name="organization_role" placeholder="Laboratory, university, company, and your role" required /></div>
        <SelectField label="Organization type" name="organization_type" required options={['University or academic research lab', 'Embodied-AI or robotics R&D team', 'Qualified robotics integrator', 'Other qualified technical team']} />
        <Input label="Destination country" name="destination_country" placeholder="Country where the platform will be used" required />
        <div className="sm:col-span-2"><TextArea label="What are you trying to achieve?" name="achieve_objective" placeholder="Describe the research, integration, testing, or project outcome you are working toward." rows={4} required /></div>
        <Input label="Required robot/platform type" name="required_platform_type" placeholder="e.g. mobile manipulator, humanoid, legged platform, arm, or component" required />
        <Input label="Intended application" name="intended_application" placeholder="e.g. embodied-AI research, lab evaluation, integration, or testing" required />
        <Input label="Quantity" name="quantity" placeholder="e.g. 1 research platform or 4 units" required />
        <Input label="Purchase timeline" name="purchase_timeframe" placeholder="e.g. Within 3 months" required />
        <Input label="Expected budget range" name="expected_budget" placeholder="Optional" />
        <div className="sm:col-span-2"><TextArea label="Technical environment / requirements" name="technical_environment" placeholder="Optional: ROS, ROS2, Python SDK, Isaac Sim, MuJoCo, Gazebo, VLA, teleoperation, interfaces, sensors, compute, or other requirements." rows={3} /></div>
        <div className="sm:col-span-2"><TextArea label="Current robotics platforms / equipment" name="current_platforms" placeholder="Optional: include existing platforms or equipment only if relevant." rows={3} /></div>
        <Input label="Internal integration capability" name="integration_capability" placeholder="Optional: software, controls, mechanical, or systems capability" />
        <Input label="Local support expectations" name="local_support_expectations" placeholder="Optional: describe any support expectation" />
        <div className="sm:col-span-2"><TextArea label="Relevant documents or links" name="relevant_documents" placeholder="Optional: paste requirement documents, technical references, or public links." rows={3} /></div>
      </div>
      {error && <p className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200" role="alert">{error}</p>}
      <button type="submit" disabled={isSubmitting} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-volt px-5 py-3.5 font-bold text-white shadow-lg shadow-volt/20 transition-all hover:bg-volt-hover hover:shadow-volt/40 disabled:cursor-not-allowed disabled:opacity-70">{isSubmitting ? 'Submitting…' : <>Submit My Robotics Requirement <i className="fa-solid fa-arrow-right text-xs" /></>}</button>
      <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">Submitting a request does not create a purchase obligation. VoltChina will review the requirement and reply in writing, normally within 1–2 business days.</p>
    </form>
    <SubmissionNotice isOpen={noticeOpen} onClose={() => setNoticeOpen(false)} title="Robotics requirement received" message="Your robotics requirement has been received. VoltChina will review the request and reply by email. No call or video meeting is required." />
  </>;
};

const Input: React.FC<{ label: string; name: string; placeholder: string; type?: string; required?: boolean }> = ({ label, name, placeholder, type = 'text', required = false }) => <div><label htmlFor={name} className="mb-2 block text-sm font-medium text-slate-200">{label}{required && <span className="text-volt"> *</span>}</label><input id={name} name={name} type={type} placeholder={placeholder} required={required} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-3 text-white outline-none transition-colors placeholder:text-slate-500 focus:border-volt focus:ring-1 focus:ring-volt" /></div>;

const TextArea: React.FC<{ label: string; name: string; placeholder: string; rows: number; required?: boolean }> = ({ label, name, placeholder, rows, required = false }) => <div><label htmlFor={name} className="mb-2 block text-sm font-medium text-slate-200">{label}{required && <span className="text-volt"> *</span>}</label><textarea id={name} name={name} rows={rows} placeholder={placeholder} required={required} className="w-full resize-y rounded-lg border border-slate-700 bg-slate-900 px-3 py-3 text-white outline-none transition-colors placeholder:text-slate-500 focus:border-volt focus:ring-1 focus:ring-volt" /></div>;

const SelectField: React.FC<{ label: string; name: string; options: string[]; required?: boolean }> = ({ label, name, options, required = false }) => <div><label htmlFor={name} className="mb-2 block text-sm font-medium text-slate-200">{label}{required && <span className="text-volt"> *</span>}</label><select id={name} name={name} required={required} defaultValue="" className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-3 text-white outline-none transition-colors focus:border-volt focus:ring-1 focus:ring-volt"><option value="" disabled>{required ? 'Select one' : 'Optional — select one'}</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></div>;

export default RoboticsRequestForm;