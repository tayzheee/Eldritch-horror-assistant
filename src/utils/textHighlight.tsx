import React from 'react';

/**
 * Regex matching skill keywords: Will, Influence, Strength, Lore, Observation
 * with word boundaries, case-insensitive.
 */
const SKILL_REGEX = /\b(Will|Influence|Strength|Lore|Observation)\b/gi;

interface HighlightProps {
  text: string;
  className?: string;
}

export const getSkillColorClass = (skillName: string): string => {
  const lower = skillName.toLowerCase();
  switch (lower) {
    case 'lore':
      return 'text-purple-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]';
    case 'influence':
      return 'text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]';
    case 'observation':
      return 'text-emerald-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]';
    case 'strength':
      return 'text-rose-300 drop-shadow-[0_0_8px_rgba(244,63,94,0.3)]';
    case 'will':
      return 'text-sky-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]';
    default:
      return 'text-amber-200';
  }
};

/**
 * Highlights and enlarges all occurrences of skill names (Will, Influence, Strength, Lore, Observation)
 * in any string for high visibility during tests and defeat encounters.
 */
export const SkillHighlightedText: React.FC<HighlightProps> = ({ text, className = '' }) => {
  if (!text) return null;

  const parts = text.split(SKILL_REGEX);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        const isSkill = /^(Will|Influence|Strength|Lore|Observation)$/i.test(part);
        if (isSkill) {
          const colorClass = getSkillColorClass(part);
          return (
            <strong
              key={index}
              className={`font-black text-[1.12em] tracking-wide uppercase font-serif inline-block px-1 py-0.5 mx-0.5 rounded bg-slate-900/90 border border-slate-700/80 shadow-sm ${colorClass}`}
            >
              {part}
            </strong>
          );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
};
