import React, { useState, useEffect } from 'react';

interface Props {
  investigatorId: string;
  name: string;
  imageUrl?: string;
  className?: string;
}

export const InvestigatorPortrait: React.FC<Props> = ({ investigatorId, name, imageUrl, className = '' }) => {
  const [resolvedSrc, setResolvedSrc] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
    if (imageUrl) {
      setResolvedSrc(imageUrl);
    } else {
      setResolvedSrc(`/investigators/${investigatorId}.png`);
    }
  }, [investigatorId, imageUrl]);

  // If an image source is active and hasn't errored out, render the real photograph/artwork
  if (resolvedSrc && !hasError) {
    return (
      <div className={`relative overflow-hidden bg-slate-950 select-none group ${className}`}>
        <img
          src={resolvedSrc}
          alt={name}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          onError={() => {
            // Cascade through .png -> .jpg -> .webp before falling back to SVG
            if (resolvedSrc.endsWith('.png')) {
              setResolvedSrc(`/investigators/${investigatorId}.jpg`);
            } else if (resolvedSrc.endsWith('.jpg')) {
              setResolvedSrc(`/investigators/${investigatorId}.webp`);
            } else {
              setHasError(true);
            }
          }}
        />
        {/* Subtle horror vignette overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />
      </div>
    );
  }

  // If Leo Anderson, draw the exact atmospheric expedition leader with jungle backdrop, weathered hat/jacket
  if (investigatorId === 'leo-anderson') {
    return (
      <div className={`relative overflow-hidden bg-slate-900 select-none ${className}`}>
        <svg viewBox="0 0 320 280" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="jungle-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1e3a1e" />
              <stop offset="50%" stopColor="#2d4a27" />
              <stop offset="100%" stopColor="#122512" />
            </linearGradient>
            <radialGradient id="vignette" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="transparent" />
              <stop offset="100%" stopColor="rgba(8, 14, 26, 0.85)" />
            </radialGradient>
            <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c59877" />
              <stop offset="100%" stopColor="#9a6e50" />
            </linearGradient>
            <linearGradient id="jacket" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#68543f" />
              <stop offset="100%" stopColor="#453424" />
            </linearGradient>
            <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="2" dy="4" stdDeviation="4" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Jungle background foliage */}
          <rect width="320" height="280" fill="url(#jungle-bg)" />
          
          {/* Ferns and tropical jungle leaves */}
          <g fill="#214022" opacity="0.8">
            <path d="M-20 60 Q 40 40 80 90 Q 30 110 -20 60 Z" />
            <path d="M-10 120 Q 60 90 90 160 Q 30 170 -10 120 Z" />
            <path d="M260 20 Q 220 80 340 120 Q 280 70 260 20 Z" />
            <path d="M220 140 Q 280 160 330 220 Q 260 220 220 140 Z" />
            <path d="M120 -10 Q 140 60 170 20 Q 150 -10 120 -10 Z" />
          </g>
          <g fill="#375d31" opacity="0.7">
            <path d="M10 20 Q 60 10 100 50 Q 50 60 10 20 Z" />
            <path d="M240 70 Q 290 80 320 40 Q 280 40 240 70 Z" />
            <path d="M270 120 Q 310 160 300 210 Q 260 170 270 120 Z" />
          </g>

          {/* Leo Anderson Torso & Leather Jacket */}
          <g filter="url(#shadow)">
            {/* Dark inner shirt */}
            <path d="M110 200 L160 220 L210 200 L225 280 L95 280 Z" fill="#2d3748" />
            {/* Khaki button-up collar */}
            <polygon points="120,200 160,230 140,280 110,240" fill="#a48c6f" />
            <polygon points="200,200 160,230 180,280 210,240" fill="#8f775c" />
            {/* Heavy brown expedition leather jacket */}
            <path d="M50 280 L75 195 Q 120 170 160 185 Q 200 170 245 195 L270 280 Z" fill="url(#jacket)" />
            {/* Jacket lapels */}
            <path d="M75 195 L125 225 L105 280 L50 280 Z" fill="#58432f" />
            <path d="M245 195 L195 225 L215 280 L270 280 Z" fill="#3f2f21" />
            {/* Collar details */}
            <path d="M125 195 L160 215 L145 235 Z" fill="#755e47" />
            <path d="M195 195 L160 215 L175 235 Z" fill="#5a4532" />
          </g>

          {/* Neck & Chin */}
          <path d="M135 155 L185 155 L180 205 L140 205 Z" fill="#9a6e50" />
          <path d="M135 165 L185 165 L175 195 L145 195 Z" fill="#825a3d" opacity="0.6" />

          {/* Head & Weathered Face */}
          <g filter="url(#shadow)">
            {/* Ears */}
            <ellipse cx="115" cy="125" rx="9" ry="16" fill="#aa7c5c" />
            <ellipse cx="205" cy="125" rx="9" ry="16" fill="#946749" />
            {/* Face base */}
            <path d="M120 95 C120 65 200 65 200 95 C200 135 190 170 160 175 C130 170 120 135 120 95 Z" fill="url(#skin)" />
            
            {/* Rugged facial structure, stubble & jaw */}
            <path d="M132 140 Q 160 148 188 140 L 175 170 Q 160 174 145 170 Z" fill="#785338" opacity="0.4" />
            
            {/* Eyebrows - stern, furrowed */}
            <path d="M132 102 Q 146 100 154 105" stroke="#2c221b" strokeWidth="4" strokeLinecap="round" />
            <path d="M188 102 Q 174 100 166 105" stroke="#2c221b" strokeWidth="4" strokeLinecap="round" />

            {/* Eyes - intense, tired gaze */}
            <ellipse cx="144" cy="112" rx="6" ry="3.5" fill="#f0ebe1" />
            <circle cx="145" cy="112" r="2.5" fill="#322214" />
            <circle cx="146" cy="111" r="0.8" fill="#ffffff" />
            
            <ellipse cx="176" cy="112" rx="6" ry="3.5" fill="#f0ebe1" />
            <circle cx="175" cy="112" r="2.5" fill="#322214" />
            <circle cx="176" cy="111" r="0.8" fill="#ffffff" />

            {/* Eye wrinkles & deep brow lines */}
            <path d="M130 115 Q 136 117 138 120" stroke="#754e33" strokeWidth="1.5" fill="none" />
            <path d="M190 115 Q 184 117 182 120" stroke="#633f26" strokeWidth="1.5" fill="none" />
            <path d="M156 104 L 157 114" stroke="#754e33" strokeWidth="1.2" />
            <path d="M164 104 L 163 114" stroke="#754e33" strokeWidth="1.2" />

            {/* Strong aquiline nose */}
            <path d="M159 107 L157 133 L150 137 L160 140 L170 137 L163 133 Z" fill="#a47758" />
            <path d="M152 137 Q 160 142 168 137" stroke="#633f26" strokeWidth="1.5" fill="none" />

            {/* Mouth - determined straight line */}
            <path d="M145 152 Q 160 150 175 152" stroke="#4a2e1d" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M150 158 Q 160 162 170 158" stroke="#754e33" strokeWidth="1.5" fill="none" />

            {/* Dark slicked/disheveled expedition hair */}
            <path d="M116 95 C114 60 140 45 160 45 C185 45 206 60 204 95 C198 80 185 75 160 75 C135 75 122 80 116 95 Z" fill="#261d17" />
            {/* Hair strands */}
            <path d="M125 75 Q 140 85 135 95" stroke="#3d2f24" strokeWidth="3" fill="none" />
            <path d="M185 70 Q 170 82 175 92" stroke="#3d2f24" strokeWidth="3" fill="none" />
            <path d="M150 60 Q 158 75 155 88" stroke="#1d1510" strokeWidth="3" fill="none" />
          </g>

          {/* Outer Vignette for atmospheric horror feel */}
          <rect width="320" height="280" fill="url(#vignette)" />
        </svg>
      </div>
    );
  }

  // Generic stylized portrait for other investigators with custom atmospheric backgrounds and silhouette accents
  const colors: Record<string, { bg1: string; bg2: string; accent: string }> = {
    'akachi-onyele': { bg1: '#4a148c', bg2: '#311b92', accent: '#ffb74d' },
    'charlie-kane': { bg1: '#263238', bg2: '#37474f', accent: '#90a4ae' },
    'daisy-walker': { bg1: '#1a237e', bg2: '#283593', accent: '#ce93d8' },
    'mark-harrigan': { bg1: '#3e2723', bg2: '#4e342e', accent: '#ef5350' },
    'silas-marsh': { bg1: '#004d40', bg2: '#00695c', accent: '#4dd0e1' },
    'trish-scarborough': { bg1: '#1b5e20', bg2: '#2e7d32', accent: '#a5d6a7' },
    'jacqueline-fine': { bg1: '#311b92', bg2: '#4a148c', accent: '#ba68c8' },
    'diana-stanley': { bg1: '#880e4f', bg2: '#ad1457', accent: '#f48fb1' },
    'jim-culver': { bg1: '#e65100', bg2: '#f57c00', accent: '#ffe082' },
    'lola-hayes': { bg1: '#4a148c', bg2: '#880e4f', accent: '#f06292' },
    'norman-withers': { bg1: '#0d47a1', bg2: '#1565c0', accent: '#80d8ff' },
  };

  const scheme = colors[investigatorId] || { bg1: '#1e293b', bg2: '#0f172a', accent: '#cbd5e1' };

  return (
    <div className={`relative overflow-hidden bg-slate-900 select-none ${className}`}>
      <svg viewBox="0 0 320 280" className="w-full h-full object-cover">
        <defs>
          <linearGradient id={`bg-${investigatorId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={scheme.bg1} />
            <stop offset="100%" stopColor={scheme.bg2} />
          </linearGradient>
          <radialGradient id={`vig-${investigatorId}`} cx="50%" cy="50%" r="50%">
            <stop offset="50%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(8, 14, 26, 0.9)" />
          </radialGradient>
        </defs>

        <rect width="320" height="280" fill={`url(#bg-${investigatorId})`} />

        {/* Ambient occult occult circle / cosmic backdrop */}
        <circle cx="160" cy="130" r="85" fill="none" stroke={scheme.accent} strokeWidth="1.5" opacity="0.25" strokeDasharray="6 4" />
        <circle cx="160" cy="130" r="70" fill="none" stroke={scheme.accent} strokeWidth="0.8" opacity="0.2" />

        {/* Investigator Silhouette & Persona */}
        <g opacity="0.85">
          <ellipse cx="160" cy="115" rx="35" ry="42" fill="#d1b89d" />
          <path d="M100 280 L120 185 Q 160 170 200 185 L220 280 Z" fill="#2d3748" />
          {/* Collar/Lapel accent */}
          <polygon points="140,185 160,225 180,185" fill={scheme.accent} opacity="0.6" />
        </g>

        {/* Investigator Initials Crest */}
        <text
          x="160"
          y="125"
          textAnchor="middle"
          fill="#1e293b"
          fontSize="36"
          fontWeight="bold"
          fontFamily="Cinzel, serif"
          opacity="0.85"
        >
          {(name || '')
            .replace(/[^a-zA-Z\s]/g, '')
            .trim()
            .split(/\s+/)
            .map((n) => n[0] || '')
            .join('')
            .slice(0, 3)
            .toUpperCase() || '??'}
        </text>

        {/* Name Banner at bottom of portrait */}
        <rect x="0" y="245" width="320" height="35" fill="rgba(15, 23, 42, 0.85)" />
        <text
          x="160"
          y="268"
          textAnchor="middle"
          fill={scheme.accent}
          fontSize="14"
          fontWeight="600"
          fontFamily="Cinzel, serif"
          letterSpacing="2"
        >
          {(name || 'INVESTIGATOR').toUpperCase()}
        </text>

        {/* Vignette */}
        <rect width="320" height="280" fill={`url(#vig-${investigatorId})`} />
      </svg>
    </div>
  );
};
