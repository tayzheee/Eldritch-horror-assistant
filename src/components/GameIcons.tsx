import React from 'react';

// Health anatomical heart icon
export const HealthIcon: React.FC<{ active?: boolean; className?: string }> = ({
  active = true,
  className = 'w-6 h-6',
}) => (
  <svg
    viewBox="0 0 48 48"
    className={`${className} transition-transform duration-150 active:scale-90`}
    fill="currentColor"
  >
    <path
      d="M24 44 C22 42 10 32 6 22 C2 12 8 4 18 6 C21 6.6 23 8.5 24 10.5 C25 8.5 27 6.6 30 6 C40 4 46 12 42 22 C38 32 26 42 24 44 Z"
      fill={active ? '#ef4444' : '#334155'}
      stroke={active ? '#b91c1c' : '#1e293b'}
      strokeWidth="1.5"
    />
    {active && (
      <>
        {/* Aorta / Ventricle highlights */}
        <path d="M22 6 L22 2 L26 2 L26 6" fill="#dc2626" />
        <path d="M18 6 C12 6 8 13 11 20" stroke="#fca5a5" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
      </>
    )}
  </svg>
);

// Sanity brain icon
export const SanityIcon: React.FC<{ active?: boolean; className?: string }> = ({
  active = true,
  className = 'w-6 h-6',
}) => (
  <svg
    viewBox="0 0 48 48"
    className={`${className} transition-transform duration-150 active:scale-90`}
    fill="currentColor"
  >
    <g fill={active ? '#60a5fa' : '#334155'} stroke={active ? '#2563eb' : '#1e293b'} strokeWidth="1.5">
      {/* Brain lobes */}
      <path d="M24 12 C20 8 14 8 10 12 C6 16 6 22 10 26 C8 28 8 34 12 36 C16 38 20 36 22 32 C23 35 25 35 26 32 C28 36 32 38 36 36 C40 34 40 28 38 26 C42 22 42 16 38 12 C34 8 28 8 24 12 Z" />
      {/* Brain gyri folds */}
      {active && (
        <g stroke="#93c5fd" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.75">
          <path d="M14 16 Q 18 18 16 24 Q 13 28 17 32" />
          <path d="M34 16 Q 30 18 32 24 Q 35 28 31 32" />
          <path d="M24 14 L 24 30" stroke="#1d4ed8" />
        </g>
      )}
    </g>
  </svg>
);

// Skill Icons
export const LoreIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" fill="currentColor" fillOpacity="0.2" />
    <path d="M6 6h10M6 10h10M6 14h6" strokeLinecap="round" />
  </svg>
);

export const InfluenceIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.6-4.6a2 2 0 0 0 0-2.8l-1.4-1.4a2 2 0 0 0-2.8 0L13 12" />
    <path d="m7 7 2-2a2 2 0 0 1 2.8 0l1.4 1.4a2 2 0 0 1 0 2.8L11 11" />
    <path d="m3 11 5 5" />
    <path d="m13 21 8-8" />
  </svg>
);

export const ObservationIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="7" fill="currentColor" fillOpacity="0.2" />
    <path d="m21 21-4.3-4.3" strokeLinecap="round" />
    <circle cx="11" cy="11" r="2.5" fill="currentColor" />
  </svg>
);

export const StrengthIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    {/* Clenched fist silhouette */}
    <path d="M8 5a2 2 0 0 1 4 0v1h1a2 2 0 0 1 4 0v1h1a2 2 0 0 1 4 0v5a7 7 0 0 1-7 7H11a6 6 0 0 1-6-6v-5a2 2 0 0 1 3-1.7V5Z" opacity="0.9" />
    <path d="M7 10h10M7 13h9" stroke="#fff" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
  </svg>
);

export const WillIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.2" />
    <circle cx="12" cy="11" r="2" fill="currentColor" />
  </svg>
);

// Tokens Icons (Focus, Resources, Clues, Train, Ship, Eldritch)
export const FocusTokenIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <div className={`relative rounded-full bg-gradient-to-br from-amber-400 to-amber-700 p-1 shadow-md border-2 border-amber-300/80 flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 32 32" className="w-4/5 h-4/5 text-amber-950" fill="currentColor">
      <path d="M16 4 C24 4 28 16 28 16 C28 16 24 28 16 28 C8 28 4 16 4 16 C4 16 8 4 16 4 Z" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="6" fill="#d97706" />
      <circle cx="16" cy="16" r="3" fill="#78350f" />
      <circle cx="17.5" cy="14.5" r="1.2" fill="#ffffff" />
    </svg>
  </div>
);

export const ResourcesTokenIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <div className={`relative rounded-full bg-gradient-to-br from-amber-700 to-yellow-900 p-1 shadow-md border-2 border-amber-500/80 flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 32 32" className="w-4/5 h-4/5 text-amber-100" fill="currentColor">
      {/* Wooden crate */}
      <rect x="5" y="7" width="22" height="18" rx="2" fill="#78350f" stroke="#fde68a" strokeWidth="1.5" />
      <line x1="5" y1="7" x2="27" y2="25" stroke="#fde68a" strokeWidth="1.2" />
      <line x1="27" y1="7" x2="5" y2="25" stroke="#fde68a" strokeWidth="1.2" />
      <rect x="7" y="9" width="18" height="14" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  </div>
);

export const ClueTokenIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <div className={`relative rounded-full bg-gradient-to-br from-emerald-600 to-emerald-950 p-1 shadow-md border-2 border-emerald-400/80 flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 32 32" className="w-4/5 h-4/5 text-emerald-100" fill="currentColor">
      <circle cx="13" cy="13" r="8" fill="#064e3b" stroke="#a7f3d0" strokeWidth="2" />
      <circle cx="13" cy="13" r="5" fill="#34d399" opacity="0.3" />
      <path d="M19 19 L27 27" stroke="#a7f3d0" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  </div>
);

export const TrainTicketIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <div className={`relative rounded-full bg-gradient-to-br from-rose-700 to-red-950 p-1 shadow-md border-2 border-rose-400/80 flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 32 32" className="w-4/5 h-4/5 text-rose-100" fill="currentColor">
      {/* Steam train engine front */}
      <circle cx="16" cy="16" r="9" fill="#991b1b" stroke="#fecdd3" strokeWidth="1.5" />
      <rect x="11" y="9" width="10" height="4" rx="1" fill="#fecdd3" />
      <circle cx="16" cy="16" r="4" fill="#fef2f2" />
      <circle cx="16" cy="16" r="2" fill="#991b1b" />
      {/* Cowcatcher bars */}
      <path d="M10 24 L16 27 L22 24" stroke="#fecdd3" strokeWidth="1.5" fill="none" />
    </svg>
  </div>
);

export const ShipTicketIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <div className={`relative rounded-full bg-gradient-to-br from-sky-700 to-blue-950 p-1 shadow-md border-2 border-sky-400/80 flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 32 32" className="w-4/5 h-4/5 text-sky-100" fill="currentColor">
      {/* Steamship ocean liner */}
      <path d="M6 20 Q16 26 26 20 L24 16 L8 16 Z" fill="#0369a1" stroke="#bae6fd" strokeWidth="1.5" />
      <rect x="12" y="11" width="8" height="5" fill="#bae6fd" />
      <rect x="14" y="8" width="2" height="3" fill="#e0f2fe" />
      {/* Waves */}
      <path d="M4 24 Q8 22 12 24 T20 24 T28 24" stroke="#bae6fd" strokeWidth="1.2" fill="none" />
    </svg>
  </div>
);

export const EldritchTokenIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <div className={`relative rounded-full bg-gradient-to-br from-purple-900 to-fuchsia-950 p-1 shadow-md border-2 border-purple-400/80 flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 32 32" className="w-4/5 h-4/5 text-purple-200" fill="currentColor">
      {/* Tentacles / Gate */}
      <path d="M16 6 C12 6 8 10 8 16 C8 22 12 26 16 26 C20 26 24 22 24 16" fill="none" stroke="#e9d5ff" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 16 C12 12 16 12 16 16 C16 20 20 20 20 16" fill="none" stroke="#d8b4fe" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="2" fill="#a855f7" />
    </svg>
  </div>
);
