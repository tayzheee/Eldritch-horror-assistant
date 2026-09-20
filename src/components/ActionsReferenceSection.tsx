import React from 'react';
import {
  BookOpen,
  Compass,
  Moon,
  ShoppingBag,
  ArrowLeftRight,
  Focus,
  Ticket,
  Sparkles,
  Info
} from 'lucide-react';
import { InvestigatorStatic, InvestigatorState } from '../types';
import { SkillHighlightedText } from '../utils/textHighlight';

interface Props {
  activeInvestigator: InvestigatorStatic;
  activeState: InvestigatorState;
}

export const ActionsReferenceSection: React.FC<Props> = ({
  activeInvestigator,
  activeState,
}) => {
  const standardActions = [
    {
      name: 'Travel',
      icon: <Compass className="w-4 h-4 text-emerald-400" />,
      rule: 'Move your investigator to any adjacent connected space. You may also spend 1 Train Ticket to move 1 additional space along a train path, or 1 Ship Ticket to move 1 additional space along a ship path.',
    },
    {
      name: 'Rest',
      icon: <Moon className="w-4 h-4 text-blue-400" />,
      rule: 'Recover 1 Health and 1 Sanity. An investigator cannot perform the Rest action if there are any Monsters on their current space.',
    },
    {
      name: 'Acquire Assets',
      icon: <ShoppingBag className="w-4 h-4 text-amber-400" />,
      rule: 'If you are on a City space, test your Influence. For each success rolled, you may acquire Asset cards from the reserve with total cost equal to or less than your successes.',
    },
    {
      name: 'Trade',
      icon: <ArrowLeftRight className="w-4 h-4 text-purple-400" />,
      rule: 'Trade any number of Items, Trinkets, Weapons, Clue tokens, or Travel Tickets with another investigator on your current space.',
    },
    {
      name: 'Focus',
      icon: <Focus className="w-4 h-4 text-cyan-400" />,
      rule: 'Gain 1 Focus token (maximum 2). You may discard 1 Focus token to reroll 1 die when resolving any test.',
    },
    {
      name: 'Prepare for Travel',
      icon: <Ticket className="w-4 h-4 text-indigo-400" />,
      rule: 'If you are on a City space connected to a train line, gain 1 Train Ticket. If connected to a ship line, gain 1 Ship Ticket (maximum 2 of each).',
    },
    {
      name: 'Component / Card Action',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      rule: 'Perform an Action printed on one of your Item, Spell, Ally, or Investigator cards marked with "Action:". Each specific action can only be performed once per turn.',
    },
  ];

  return (
    <div id="actions-reference-section" className="w-full bg-[#111827] border border-slate-700/80 rounded-2xl shadow-2xl p-5 text-slate-200 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-slate-700/60">
        <div className="p-2 rounded-xl bg-slate-800 text-amber-400 border border-slate-700">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-bold tracking-wide text-slate-100">
            Actions &amp; Rules Reference Guide
          </h3>
          <p className="text-xs text-slate-400">
            Official Eldritch Horror action timings, travel rules, and asset acquisition constraints.
          </p>
        </div>
      </div>

      {/* Grid of Standard Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {standardActions.map((act, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors space-y-1.5"
          >
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-slate-800 border border-slate-700">
                {act.icon}
              </div>
              <h4 className="font-serif font-bold text-sm text-slate-100">
                {act.name}
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              <SkillHighlightedText text={act.rule} />
            </p>
          </div>
        ))}
      </div>

      {/* Action Phase Rules Callout */}
      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-slate-200 font-serif">Action Phase Timing:</strong> During the Action Phase, each investigator may perform up to <strong className="text-amber-300">2 actions</strong>. An investigator cannot perform the same action more than once per round (for example, you cannot Travel twice, Rest twice, or execute the exact same card action twice).
        </div>
      </div>
    </div>
  );
};
