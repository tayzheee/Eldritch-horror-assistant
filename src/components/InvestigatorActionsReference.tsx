import React from 'react';
import {
  X,
  BookOpen,
  TreePine,
  Shield,
  Sparkles,
  Zap,
  Info,
  CheckCircle2,
  Users
} from 'lucide-react';
import { InvestigatorStatic, InvestigatorState } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activeInvestigator: InvestigatorStatic;
  activeState: InvestigatorState;
  partyInvestigators: InvestigatorStatic[];
  onToggleSituational: (key: 'sameTileAsLeoAnderson' | 'isBlessed' | 'isCursed' | 'isPoisoned' | 'hasLegInjury') => void;
}

export const InvestigatorActionsReference: React.FC<Props> = ({
  isOpen,
  onClose,
  activeInvestigator,
  activeState,
  partyInvestigators,
  onToggleSituational,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#111827] border-2 border-slate-700/80 rounded-2xl max-w-3xl w-full p-5 sm:p-6 shadow-2xl space-y-5 text-slate-200 my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-950 text-sky-400 border border-sky-800">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-amber-100">
                Investigator Actions &amp; Encounter Modifiers
              </h2>
              <p className="text-xs text-slate-400">
                Rules reference for investigator abilities, party auras, and roll bonus modifiers.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 pr-1 space-y-5">
          {/* Current Active Investigator Unique Abilities */}
          <div className="bg-slate-850 p-4 rounded-xl border border-slate-750 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Current Investigator:
                </span>
                <span className="font-serif font-bold text-base text-slate-100">
                  {activeInvestigator.name} ({activeInvestigator.title})
                </span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-semibold">
                Active
              </span>
            </div>

            <div className="space-y-2 pt-1 text-xs">
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="font-bold text-blue-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  Investigator Action: {activeInvestigator.action.title}
                </span>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  {activeInvestigator.action.description}
                </p>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Passive Encounter Ability: {activeInvestigator.passive.title}
                </span>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  {activeInvestigator.passive.description}
                </p>
                {activeInvestigator.passive.rulesEffect && (
                  <div className="mt-1.5 inline-block px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 font-mono text-[11px] border border-emerald-800">
                    Rule: {activeInvestigator.passive.rulesEffect}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Party Cross-Buffs & Encounter Modifiers (e.g. Leo Anderson's Wilderness Aura!) */}
          <div className="bg-gradient-to-br from-emerald-950/40 to-slate-900 p-4 rounded-xl border border-emerald-800/60 space-y-3">
            <div className="flex items-center gap-2">
              <TreePine className="w-5 h-5 text-emerald-400" />
              <h3 className="font-serif font-bold text-base text-emerald-200">
                Party Cross-Buff: Leo Anderson Wilderness Guide
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              When Leo Anderson is standing on a <strong className="text-emerald-300">Wilderness space</strong>, any other investigator on his space gains <strong className="text-amber-300">+1 additional die</strong> to all tests during encounters.
            </p>

            {/* Quick Interactive Toggle for the Party */}
            <div className="flex items-center justify-between bg-slate-900/90 p-3 rounded-lg border border-emerald-700/50">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="leo-wilderness-checkbox"
                  checked={activeState.sameTileAsLeoAnderson ?? false}
                  onChange={() => onToggleSituational('sameTileAsLeoAnderson')}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-700 bg-slate-800"
                />
                <label htmlFor="leo-wilderness-checkbox" className="text-xs font-semibold text-slate-200 cursor-pointer">
                  Investigator is currently on a Wilderness space with Leo Anderson
                </label>
              </div>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                activeState.sameTileAsLeoAnderson
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-400'
              }`}>
                {activeState.sameTileAsLeoAnderson ? '+1 Die Active' : 'Inactive'}
              </span>
            </div>
          </div>

          {/* Status Conditions Modifiers (Blessed / Cursed / Poisoned) */}
          <div className="bg-slate-850 p-4 rounded-xl border border-slate-750 space-y-3">
            <h3 className="font-serif font-bold text-base text-amber-200 flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" />
              Active Conditions &amp; Test Effects
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <button
                type="button"
                onClick={() => onToggleSituational('isBlessed')}
                className={`p-3 rounded-lg border text-left transition-all flex items-start justify-between ${
                  activeState.isBlessed
                    ? 'bg-amber-950/60 border-amber-500 text-amber-100 shadow'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-850'
                }`}
              >
                <div>
                  <span className="font-bold block text-sm">Blessed</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Success on 4, 5, or 6 (instead of only 5 or 6).
                  </span>
                </div>
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${activeState.isBlessed ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-500'}`}>
                  {activeState.isBlessed ? 'ON' : 'OFF'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => onToggleSituational('isCursed')}
                className={`p-3 rounded-lg border text-left transition-all flex items-start justify-between ${
                  activeState.isCursed
                    ? 'bg-purple-950/60 border-purple-500 text-purple-100 shadow'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-850'
                }`}
              >
                <div>
                  <span className="font-bold block text-sm">Cursed</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Success ONLY on a 6.
                  </span>
                </div>
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${activeState.isCursed ? 'bg-purple-500 text-slate-950' : 'bg-slate-800 text-slate-500'}`}>
                  {activeState.isCursed ? 'ON' : 'OFF'}
                </span>
              </button>
            </div>
          </div>

          {/* Standard Eldritch Horror Actions Quick Guide */}
          <div className="bg-slate-850 p-4 rounded-xl border border-slate-750 space-y-2.5">
            <h3 className="font-serif font-bold text-base text-slate-200">
              Standard Game Actions Reference
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                <strong className="text-blue-400 block">Travel</strong>
                <span className="text-slate-300">Move 1 space. May spend 1 ticket to move 1 additional space along a matching path.</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                <strong className="text-blue-400 block">Rest</strong>
                <span className="text-slate-300">Recover 1 Health and 1 Sanity (cannot rest if space contains a Monster).</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                <strong className="text-blue-400 block">Acquire Assets</strong>
                <span className="text-slate-300">Test Influence in a City to acquire Item, Weapon, or Ally cards up to successes.</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                <strong className="text-blue-400 block">Trade</strong>
                <span className="text-slate-300">Give or receive any number of Assets, Artifacts, Clues, or Tickets with an ally on your space.</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                <strong className="text-blue-400 block">Focus</strong>
                <span className="text-slate-300">Gain 1 Focus token (max 2). Spend 1 focus to reroll 1 die on any test.</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                <strong className="text-blue-400 block">Prepare for Travel</strong>
                <span className="text-slate-300">Gain 1 Train Ticket (if city has train path) or 1 Ship Ticket (if city has ship path) (max 2 each).</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
