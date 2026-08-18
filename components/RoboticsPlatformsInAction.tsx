import React, { useMemo, useState } from 'react';
import { trackEvent } from '../src/lib/analytics';

type PlatformInformation = string | string[];

export type RoboticsPlatform = {
  manufacturer: string;
  model: string;
  category: string;
  officialVideoUrl: string;
  officialChannelUrl?: string;
  videoTitle?: string;
  contextLine?: string;
  sourceLabel: string;
  whatItShows: PlatformInformation;
  whatItDoesNotConfirm: PlatformInformation;
  whatVoltChinaCanClarify: PlatformInformation;
};

export const roboticsPlatforms: RoboticsPlatform[] = [
  {
    manufacturer: 'LimX Dynamics',
    model: 'TRON 2',
    category: 'Multi-form research platform',
    officialVideoUrl: 'https://www.youtube.com/watch?v=qfRnieKeQzM',
    officialChannelUrl: 'https://www.youtube.com/@LimXDynamics',
    videoTitle: 'TRON 2 in Action: Autonomous Utility Tunnel Inspection',
    contextLine: 'Autonomous utility-tunnel inspection demonstration.',
    sourceLabel: 'Official manufacturer demonstration',
    whatItShows: [
      'TRON 2 operating in a utility-tunnel inspection scenario',
      'Platform mobility and autonomous task execution in a constrained industrial environment',
      'A concrete application context beyond a generic laboratory demo',
    ],
    whatItDoesNotConfirm: [
      'Export eligibility or availability in the buyer’s country',
      'The exact hardware, sensor, compute, software, autonomy stack, or API configuration included',
      'Institutional pricing, delivery terms, warranty, technical support, or certification status',
      'That VoltChina has independently tested the platform',
    ],
    whatVoltChinaCanClarify: [
      'Project-specific configuration and software-access questions',
      'Availability, quotation, support scope, and unresolved requirements through written manufacturer confirmation',
    ],
  },
  {
    manufacturer: 'Unitree Robotics',
    model: 'G1',
    category: 'Humanoid research platform',
    officialVideoUrl: 'https://www.youtube.com/watch?v=GzX1qOIO1bE',
    officialChannelUrl: 'https://www.youtube.com/@unitreerobotics',
    videoTitle: 'Unitree G1 official product introduction',
    contextLine: 'Official product introduction of a humanoid platform.',
    sourceLabel: 'Official manufacturer demonstration',
    whatItShows: [
      'Unitree’s public presentation of the G1 humanoid platform',
      'Manufacturer-stated form factor and intended platform context',
      'A starting point for a lab or technical team evaluating humanoid-platform options',
    ],
    whatItDoesNotConfirm: [
      'Current institutional pricing, configuration, export eligibility, or availability in the buyer’s country',
      'Included sensors, compute, battery, SDK/API/software-access terms, warranty, certification, technical support, or delivery terms',
      'That VoltChina has independently tested, benchmarked, or verified every claim shown in the video',
    ],
    whatVoltChinaCanClarify: [
      'Project-specific configuration and technical-access questions',
      'Current availability, quotation, support scope, manufacturer responses, and unresolved requirements in writing',
    ],
  },
  {
    manufacturer: 'DEEP Robotics',
    model: 'Quadruped Platform',
    category: 'Quadruped research and field platform',
    officialVideoUrl: 'https://www.youtube.com/watch?v=9LGUjRgb_KQ',
    officialChannelUrl: 'https://www.youtube.com/@deeprobotics8601',
    videoTitle: 'DEEP Robotics | Robot Dog Extinguishes Fires',
    contextLine: 'Official demonstration of a quadruped robot in a fire-response scenario.',
    sourceLabel: 'Official manufacturer demonstration',
    whatItShows: [
      'A DEEP Robotics quadruped robot operating in a fire-response scenario',
      'A manufacturer-presented example of field-oriented mobility and task context',
      'A concrete indication that Chinese quadruped platforms extend beyond indoor laboratory demos',
    ],
    whatItDoesNotConfirm: [
      'Exact model designation',
      'Current hardware/sensor/compute configuration, export eligibility, or availability',
      'Software/API access, certification, institutional pricing, delivery terms, warranty, or technical support',
      'That VoltChina has independently tested or verified the platform’s fire-response capabilities',
    ],
    whatVoltChinaCanClarify: [
      'Which specific DEEP Robotics model is appropriate for a defined project',
      'Project-specific configuration, availability, manufacturer responses, and unresolved requirements in writing',
    ],
  },
];

type VideoSource = {
  embedUrl?: string;
  thumbnailUrl?: string;
  externalUrl: string;
};

const getVideoSource = (officialVideoUrl: string): VideoSource | null => {
  if (!officialVideoUrl.trim()) return null;

  try {
    const url = new URL(officialVideoUrl);
    const hostname = url.hostname.replace(/^www\./, '');
    let youtubeId = '';

    if (hostname === 'youtu.be') youtubeId = url.pathname.split('/').filter(Boolean)[0] || '';
    if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
      youtubeId = url.searchParams.get('v') || url.pathname.match(/\/(?:embed|shorts)\/([^/?#]+)/)?.[1] || '';
    }

    if (youtubeId) {
      return {
        embedUrl: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}`,
        thumbnailUrl: `https://i.ytimg.com/vi/${encodeURIComponent(youtubeId)}/hqdefault.jpg`,
        externalUrl: officialVideoUrl,
      };
    }

    if (hostname === 'vimeo.com' || hostname === 'player.vimeo.com') {
      const vimeoId = url.pathname.split('/').filter(Boolean).find((segment) => /^\d+$/.test(segment));
      if (vimeoId) {
        return {
          embedUrl: `https://player.vimeo.com/video/${encodeURIComponent(vimeoId)}`,
          externalUrl: officialVideoUrl,
        };
      }
    }

    return { externalUrl: officialVideoUrl };
  } catch {
    return null;
  }
};

const PlatformVideo: React.FC<{ platform: RoboticsPlatform }> = ({ platform }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoSource = useMemo(() => getVideoSource(platform.officialVideoUrl), [platform.officialVideoUrl]);
  const eventProperties = { manufacturer: platform.manufacturer, model: platform.model };

  if (!videoSource) {
    return (
      <div className="relative flex aspect-video items-center justify-center overflow-hidden border-b border-slate-800 bg-[radial-gradient(circle_at_50%_35%,rgba(220,38,38,0.12),transparent_45%),linear-gradient(145deg,rgba(15,23,42,0.96),rgba(2,6,23,1))] p-6 text-center" aria-label={`Official manufacturer video placeholder for ${platform.manufacturer} ${platform.model}`}>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.035)_1px,transparent_1px)] bg-[size:28px_28px]" aria-hidden="true" />
        <div className="relative">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-slate-950/65 text-volt shadow-lg shadow-black/30" aria-hidden="true"><i className="fa-solid fa-play translate-x-px" /></span>
          <p className="mt-4 text-sm font-semibold text-slate-200">Official manufacturer video placeholder</p>
          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">Video coming soon</p>
        </div>
      </div>
    );
  }

  if (!videoSource.embedUrl) {
    return (
      <div className="flex aspect-video items-center justify-center border-b border-slate-800 bg-slate-950 p-6 text-center">
        <div>
          <p className="text-sm font-semibold text-slate-200">{platform.sourceLabel}</p>
          <a href={videoSource.externalUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('robotics_video_play', { ...eventProperties, action: 'official_video_link' })} className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:border-volt/70 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt">Watch on the manufacturer’s official channel <i className="fa-solid fa-arrow-up-right-from-square text-xs" aria-hidden="true" /></a>
        </div>
      </div>
    );
  }

  if (videoLoaded) {
    return <iframe src={videoSource.embedUrl} title={platform.videoTitle || `${platform.manufacturer} ${platform.model} official manufacturer demonstration`} loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="block aspect-video w-full border-0 border-b border-slate-800" />;
  }

  return (
    <button type="button" onClick={() => { setVideoLoaded(true); trackEvent('robotics_video_play', { ...eventProperties, action: 'load_embed' }); }} className="group relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden border-b border-slate-800 bg-slate-950 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-volt" aria-label={`Load ${platform.videoTitle || `official manufacturer video for ${platform.manufacturer} ${platform.model}`}`}>
      {videoSource.thumbnailUrl && <img src={videoSource.thumbnailUrl} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-55 transition-opacity group-hover:opacity-70" />}
      <span className="absolute inset-0 bg-slate-950/35" aria-hidden="true" />
      <span className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-slate-950/75 text-volt shadow-lg shadow-black/40" aria-hidden="true"><i className="fa-solid fa-play translate-x-px" /></span>
      <span className="relative mt-3 block text-sm font-semibold text-white">Load official manufacturer video</span>
      <span className="relative mt-1 block text-xs text-slate-300">{platform.sourceLabel}</span>
    </button>
  );
};

const InformationContent: React.FC<{ content: PlatformInformation }> = ({ content }) => Array.isArray(content) ? (
  <ul className="space-y-2">
    {content.map((item) => <li key={item} className="flex gap-2"><span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-volt" aria-hidden="true" /><span>{item}</span></li>)}
  </ul>
) : <>{content}</>;

const handlePlatformCta = (event: React.MouseEvent<HTMLAnchorElement>, platform: RoboticsPlatform) => {
  event.preventDefault();
  trackEvent('robotics_platform_cta', { manufacturer: platform.manufacturer, model: platform.model });
  window.history.pushState(null, '', '/robotics#robotics-requirement');
  document.getElementById('robotics-requirement')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};


const PlatformCard: React.FC<{ platform: RoboticsPlatform }> = ({ platform }) => {
  const cardTitle = platform.manufacturer === 'Manufacturer to be confirmed' ? platform.model : `${platform.manufacturer} — ${platform.model}`;

  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-xl shadow-black/15">
      <PlatformVideo platform={platform} />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-xl font-bold leading-tight text-white">{cardTitle}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400"><span className="font-semibold text-slate-300">Category:</span> {platform.category}</p>
        {platform.contextLine && <p className="mt-3 text-sm font-medium leading-relaxed text-slate-300">{platform.contextLine}</p>}

        {platform.officialVideoUrl && (
          <div className="mt-4 rounded-lg border border-slate-800 bg-slate-950/65 p-3 text-xs leading-relaxed">
            <p className="font-bold uppercase tracking-[0.12em] text-volt">{platform.sourceLabel}</p>
            <a href={platform.officialVideoUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('robotics_video_play', { manufacturer: platform.manufacturer, model: platform.model, action: 'official_video_link' })} className="mt-2 block font-semibold text-slate-200 underline decoration-slate-600 underline-offset-4 transition-colors hover:text-white">Watch official manufacturer video <i className="fa-solid fa-arrow-up-right-from-square ml-1 text-[0.65rem]" aria-hidden="true" /></a>
            {platform.officialChannelUrl && <a href={platform.officialChannelUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block text-slate-400 transition-colors hover:text-white">Official channel: {platform.manufacturer} <i className="fa-solid fa-arrow-up-right-from-square ml-1 text-[0.65rem]" aria-hidden="true" /></a>}
          </div>
        )}

        <dl className="mt-5 divide-y divide-slate-800 border-y border-slate-800">
          <div className="py-4">
            <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-300">What this demonstration shows</dt>
            <dd className="mt-2 text-sm leading-relaxed text-slate-400"><InformationContent content={platform.whatItShows} /></dd>
          </div>
          <div className="py-4">
            <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-300">What it does not confirm</dt>
            <dd className="mt-2 text-sm leading-relaxed text-slate-400"><InformationContent content={platform.whatItDoesNotConfirm} /></dd>
          </div>
          <div className="py-4">
            <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-300">What VoltChina can clarify</dt>
            <dd className="mt-2 text-sm leading-relaxed text-slate-400"><InformationContent content={platform.whatVoltChinaCanClarify} /></dd>
          </div>
        </dl>

        <a href="/robotics#robotics-requirement" onClick={(event) => handlePlatformCta(event, platform)} className="mt-5 inline-flex min-h-12 w-full items-center justify-between gap-3 rounded-lg border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm font-bold leading-snug text-white transition-colors hover:border-volt/70 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt">Ask Whether This Platform Fits Your Project <i className="fa-solid fa-arrow-right shrink-0 text-xs text-volt" aria-hidden="true" /></a>
      </div>
    </article>
  );
};

const RoboticsPlatformsInAction: React.FC = () => (
  <section className="border-b border-slate-800 bg-slate-950 py-16 md:py-20">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-volt">Platforms in Action</p>
        <h2 className="text-3xl font-bold text-white md:text-4xl">Research Platforms in Action</h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">Selected official manufacturer demonstrations, annotated with what they show—and what still requires written manufacturer confirmation.</p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-500">These videos help visitors understand the platform category. They are not independent VoltChina tests or proof of project suitability.</p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {roboticsPlatforms.map((platform) => <PlatformCard key={`${platform.manufacturer}-${platform.model}`} platform={platform} />)}
      </div>

      <p className="mt-8 rounded-xl border border-slate-800 bg-slate-900/55 p-5 text-sm leading-relaxed text-slate-400">Official manufacturer demonstrations. Not independently tested or verified by VoltChina. Inclusion does not imply endorsement, authorization, partnership, or distributorship. Product availability, configuration, pricing, export eligibility, software access, and support terms require project-specific written confirmation.</p>
    </div>
  </section>
);

export default RoboticsPlatformsInAction;
