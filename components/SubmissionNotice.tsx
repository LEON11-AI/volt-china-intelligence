import React from 'react';

type SubmissionNoticeProps = {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
};

const SubmissionNotice: React.FC<SubmissionNoticeProps> = ({ isOpen, title, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm" role="presentation">
      <div role="dialog" aria-modal="true" aria-labelledby="submission-notice-title" className="w-full max-w-md rounded-2xl border border-volt/35 bg-slate-900 p-6 text-center shadow-2xl shadow-black/50 sm:p-8">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-volt text-white"><i className="fa-solid fa-check" /></div>
        <h2 id="submission-notice-title" className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
        <p className="mt-3 leading-relaxed text-slate-300">{message}</p>
        <button type="button" onClick={onClose} className="mt-6 rounded-lg bg-volt px-5 py-2.5 font-bold text-white transition-colors hover:bg-volt-hover">Close</button>
      </div>
    </div>
  );
};

export default SubmissionNotice;
