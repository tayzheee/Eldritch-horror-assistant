import React, { useState } from 'react';
import {
  Dices,
  RotateCcw,
  Swords,
  Sparkles,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  Flame,
  HelpCircle,
  Plus,
  Zap,
  Activity
} from 'lucide-react';
import { InvestigatorStatic, InvestigatorState, SkillType } from '../types';
import { SkillHighlightedText } from '../utils/textHighlight';
import {
  LoreIcon,
  InfluenceIcon,
  ObservationIcon,
  StrengthIcon,
  WillIcon,
  FocusTokenIcon,
} from './GameIcons';

interface Props {
  investigator: InvestigatorStatic;
  state: InvestigatorState;
  onSpendReroll: () => void;
  onResetRerolls: () => void;
  onUpdateToken: (tokenType: keyof InvestigatorState['tokens'], delta: number) => void;
  onToggleSituational?: (key: 'sameTileAsLeoAnderson' | 'isBlessed' | 'isCursed' | 'isPoisoned' | 'hasLegInjury') => void;
}

interface DieResult {
  id: number;
  value: number;
  isSuccess: boolean;
  rerolled: boolean;
}

export const RerollAndTestSection: React.FC<Props> = ({
  investigator,
  state,
  onSpendReroll,
  onResetRerolls,
  onUpdateToken,
  onToggleSituational,
}) => {
  const [selectedSkill, setSelectedSkill] = useState<SkillType>('strength');
  const [isCombatTest, setIsCombatTest] = useState(true);
  const [diceResults, setDiceResults] = useState<DieResult[]>([]);
  const [hasRolled, setHasRolled] = useState(false);
  const [manualBonusDice, setManualBonusDice] = useState(0);

  // Calculate equipped bonuses
  const activePossessions = state.possessions.filter((p) => !p.isExhausted);

  // Reroll abilities granted
  const itemRerolls: { source: string; amount: number; skill?: SkillType; isCombatOnly?: boolean }[] = [];
  activePossessions.forEach((item) => {
    if (item.rerollsGranted) {
      itemRerolls.push({
        source: item.name,
        amount: item.rerollsGranted.amount,
        skill: item.rerollsGranted.skill,
        isCombatOnly: item.rerollsGranted.isCombatOnly,
      });
    }
  });

  // Investigator passive rerolls
  const passiveRerolls: { source: string; amount: number; skill: SkillType; isCombatOnly?: boolean }[] = [];
  if (investigator.id === 'daisy-walker') {
    passiveRerolls.push({ source: 'Fast Reader', amount: 1, skill: 'lore' });
  } else if (investigator.id === 'trish-scarborough') {
    passiveRerolls.push({ source: 'Eagle Eye', amount: 1, skill: 'observation' });
  } else if (investigator.id === 'silas-marsh') {
    passiveRerolls.push({ source: 'Sea Dog', amount: 1, skill: 'strength', isCombatOnly: true });
  } else if (investigator.id === 'diana-stanley') {
    passiveRerolls.push({ source: 'Cult Insider', amount: 1, skill: 'will' });
  }

  // Calculate total rerolls available specifically for the current selected skill & combat mode
  const applicableItemRerolls = itemRerolls.filter((r) => {
    if (r.isCombatOnly && !isCombatTest) return false;
    if (r.skill && r.skill !== selectedSkill) return false;
    return true;
  });

  const applicablePassiveRerolls = passiveRerolls.filter((r) => {
    if (r.isCombatOnly && !isCombatTest) return false;
    if (r.skill !== selectedSkill) return false;
    return true;
  });

  const cardRerollCount = applicableItemRerolls.reduce((acc, r) => acc + r.amount, 0) +
    applicablePassiveRerolls.reduce((acc, r) => acc + r.amount, 0);

  const focusRerollCount = state.tokens.focus;
  const totalRerollsForTest = cardRerollCount + focusRerollCount;
  const remainingRerolls = Math.max(0, totalRerollsForTest - state.rerollsUsedThisTurn);

  // Calculate dice to roll
  const baseStat = investigator.skills[selectedSkill] || 1;
  const tokenMod = state.skillModifiers[selectedSkill] || 0;

  // Passive stat bonus from items
  let itemPassiveBonus = 0;
  activePossessions.forEach((item) => {
    if (item.statBonus && item.statBonus.skill === selectedSkill) {
      itemPassiveBonus += item.statBonus.amount;
    }
  });

  // Combat bonus from weapons
  let combatBonus = 0;
  if (isCombatTest) {
    activePossessions.forEach((item) => {
      if (item.combatBonus && item.combatBonus.skill === selectedSkill) {
        combatBonus += item.combatBonus.amount;
      }
    });
  }

  // Situational bonuses (e.g. Leo Anderson on Wilderness space)
  const leoWildernessBonus = state.sameTileAsLeoAnderson ? 1 : 0;

  const totalDice = Math.max(1, baseStat + tokenMod + itemPassiveBonus + combatBonus + leoWildernessBonus + manualBonusDice);

  // Success threshold
  const isSuccessValue = (val: number): boolean => {
    if (state.isCursed) return val === 6;
    if (state.isBlessed) return val >= 4;
    return val >= 5;
  };

  const handleRollDice = () => {
    const results: DieResult[] = [];
    for (let i = 0; i < totalDice; i++) {
      const val = Math.floor(Math.random() * 6) + 1;
      results.push({
        id: i,
        value: val,
        isSuccess: isSuccessValue(val),
        rerolled: false,
      });
    }
    setDiceResults(results);
    setHasRolled(true);
  };

  const handleRerollSingleDie = (dieIndex: number) => {
    if (remainingRerolls <= 0) return;

    // Use a reroll
    onSpendReroll();

    // If using focus tokens when card rerolls are exhausted, optionally update focus token
    if (state.rerollsUsedThisTurn >= cardRerollCount && state.tokens.focus > 0) {
      onUpdateToken('focus', -1);
    }

    const newVal = Math.floor(Math.random() * 6) + 1;
    setDiceResults((prev) =>
      prev.map((d, idx) =>
        idx === dieIndex
          ? {
              ...d,
              value: newVal,
              isSuccess: isSuccessValue(newVal),
              rerolled: true,
            }
          : d
      )
    );
  };

  const totalSuccesses = diceResults.filter((d) => d.isSuccess).length;

  const skillOptions: { key: SkillType; label: string; icon: React.ReactNode; color: string }[] = [
    { key: 'lore', label: 'Lore', icon: <LoreIcon className="w-4 h-4 text-purple-300" />, color: 'purple' },
    { key: 'influence', label: 'Influence', icon: <InfluenceIcon className="w-4 h-4 text-orange-300" />, color: 'orange' },
    { key: 'observation', label: 'Observation', icon: <ObservationIcon className="w-4 h-4 text-emerald-300" />, color: 'emerald' },
    { key: 'strength', label: 'Strength', icon: <StrengthIcon className="w-4 h-4 text-red-300" />, color: 'red' },
    { key: 'will', label: 'Will', icon: <WillIcon className="w-4 h-4 text-blue-300" />, color: 'blue' },
  ];

  return (
    <div id="rerolls-and-tests-section" className="w-full bg-[#131b2e] border border-slate-700/70 rounded-2xl shadow-2xl p-5 text-slate-200 space-y-5">
      {/* Header: Title & Turn Rerolls Summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-700/60">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-red-950/80 border border-red-700/80 text-amber-300">
              <Dices className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-2xl font-bold tracking-wide text-slate-100">
              Rerolls &amp; Tests Console
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Test dice pool calculator and real-time rerolls tracking synced to equipped items &amp; tokens.
          </p>
        </div>

        {/* Reroll Counter & Reset Controls */}
        <div className="flex items-center gap-2.5 bg-slate-900/90 border border-slate-700/80 px-3.5 py-2 rounded-xl shadow-inner">
          <div className="text-right">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
              Rerolls Remaining
            </span>
            <div className="flex items-baseline justify-end gap-1.5">
              <span className={`font-mono text-xl font-bold ${remainingRerolls > 0 ? 'text-amber-300' : 'text-slate-400'}`}>
                {remainingRerolls}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                / {totalRerollsForTest} total
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 border-l border-slate-700 pl-2">
            <button
              onClick={onSpendReroll}
              disabled={remainingRerolls <= 0}
              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-750 text-xs font-bold text-amber-300 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Use 1 Reroll"
            >
              Use 1
            </button>
            <button
              onClick={onResetRerolls}
              title="Reset Turn Rerolls (New Turn)"
              className="p-1.5 rounded bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-amber-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Reroll Sources Breakdown Pills */}
      <div className="bg-slate-850/70 border border-slate-750 rounded-xl p-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
          Active Reroll Sources for {investigator.name}
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {/* Focus Tokens Reroll */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-950/70 border border-blue-800/80 text-xs text-blue-200">
            <FocusTokenIcon className="w-4 h-4" />
            <span>Focus Tokens:</span>
            <strong className="font-mono text-amber-300">{state.tokens.focus}</strong>
            <span className="text-[10px] text-blue-300/80">(any test)</span>
          </div>

          {/* Equipped items rerolls */}
          {itemRerolls.map((r, idx) => (
            <div
              key={`item-reroll-${idx}`}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs border ${
                r.skill === selectedSkill || !r.skill
                  ? 'bg-amber-950/60 border-amber-600/80 text-amber-200'
                  : 'bg-slate-900/60 border-slate-700/60 text-slate-400 opacity-60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{r.source}:</span>
              <strong className="font-mono text-amber-300">{r.amount}</strong>
              <span className="text-[10px] capitalize">
                ({r.skill ? `${r.skill}` : 'any'}{r.isCombatOnly ? ' combat' : ''})
              </span>
            </div>
          ))}

          {/* Investigator passive rerolls */}
          {passiveRerolls.map((r, idx) => (
            <div
              key={`passive-reroll-${idx}`}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs border ${
                r.skill === selectedSkill
                  ? 'bg-emerald-950/60 border-emerald-600/80 text-emerald-200'
                  : 'bg-slate-900/60 border-slate-700/60 text-slate-400 opacity-60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{r.source}:</span>
              <strong className="font-mono text-emerald-300">{r.amount}</strong>
              <span className="text-[10px] capitalize">({r.skill})</span>
            </div>
          ))}

          {itemRerolls.length === 0 && passiveRerolls.length === 0 && state.tokens.focus === 0 && (
            <span className="text-xs text-slate-500 italic">
              No active reroll sources. Equip items (like Hired Muscle, Lucky Cigarette Case) or acquire Focus tokens to gain rerolls!
            </span>
          )}
        </div>
      </div>

      {/* Interactive Statuses & Situational Modifiers */}
      <div className="bg-slate-900/80 border border-slate-750 rounded-xl p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-serif font-bold uppercase tracking-wider text-slate-300">
            <Activity className="w-4 h-4 text-amber-400" />
            <span>Active Statuses &amp; Test Modifiers</span>
          </div>
          <span className="text-[11px] text-slate-400 font-sans">
            Tap to toggle conditions affecting test results &amp; dice pools
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {/* Blessed */}
          <button
            type="button"
            onClick={() => onToggleSituational?.('isBlessed')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-bold border transition-all ${
              state.isBlessed
                ? 'bg-amber-500/25 border-amber-400 text-amber-200 ring-2 ring-amber-500/30 shadow'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-750'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${state.isBlessed ? 'text-amber-300 animate-pulse' : 'text-slate-500'}`} />
            <span>Blessed</span>
            <span className="text-[10px] font-sans font-normal opacity-80">(4, 5, 6 Pass)</span>
          </button>

          {/* Cursed */}
          <button
            type="button"
            onClick={() => onToggleSituational?.('isCursed')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-bold border transition-all ${
              state.isCursed
                ? 'bg-purple-950/90 border-purple-500 text-purple-200 ring-2 ring-purple-500/30 shadow'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-750'
            }`}
          >
            <ShieldAlert className={`w-3.5 h-3.5 ${state.isCursed ? 'text-purple-400 animate-bounce' : 'text-slate-500'}`} />
            <span>Cursed</span>
            <span className="text-[10px] font-sans font-normal opacity-80">(6 only Pass)</span>
          </button>

          {/* Leo Anderson Wilderness Guide */}
          <button
            type="button"
            onClick={() => onToggleSituational?.('sameTileAsLeoAnderson')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-bold border transition-all ${
              state.sameTileAsLeoAnderson
                ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/30 shadow'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-750'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${state.sameTileAsLeoAnderson ? 'text-emerald-400' : 'text-slate-500'}`} />
            <span>With Leo Anderson</span>
            <span className="text-[10px] font-sans font-normal opacity-80">(+1 Die Wilderness)</span>
          </button>

          {/* Poisoned */}
          <button
            type="button"
            onClick={() => onToggleSituational?.('isPoisoned')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-bold border transition-all ${
              state.isPoisoned
                ? 'bg-lime-950/90 border-lime-500 text-lime-200 ring-2 ring-lime-500/30 shadow'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-750'
            }`}
          >
            <Flame className={`w-3.5 h-3.5 ${state.isPoisoned ? 'text-lime-400' : 'text-slate-500'}`} />
            <span>Poisoned</span>
          </button>

          {/* Leg Injury */}
          <button
            type="button"
            onClick={() => onToggleSituational?.('hasLegInjury')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-bold border transition-all ${
              state.hasLegInjury
                ? 'bg-rose-950/90 border-rose-500 text-rose-200 ring-2 ring-rose-500/30 shadow'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-750'
            }`}
          >
            <ShieldAlert className={`w-3.5 h-3.5 ${state.hasLegInjury ? 'text-rose-400' : 'text-slate-500'}`} />
            <span>Leg Injury</span>
          </button>
        </div>
      </div>

      {/* Test Skill Selector & Combat Toggle */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Skill Buttons with Bold & Enlarged Text */}
        <div className="md:col-span-8 flex flex-wrap gap-2">
          {skillOptions.map((s) => {
            const isSelected = selectedSkill === s.key;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => {
                  setSelectedSkill(s.key);
                  setHasRolled(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-serif transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-slate-950 shadow-lg scale-105 border-2 border-amber-300'
                    : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700'
                }`}
              >
                {s.icon}
                <span className="font-black text-[1.14em] uppercase tracking-wider">{s.label}</span>
                <span className="font-mono text-xs opacity-80">({investigator.skills[s.key]})</span>
              </button>
            );
          })}
        </div>

        {/* Combat Encounter Toggle & Bonus Die Adjuster */}
        <div className="md:col-span-4 flex items-center justify-between md:justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              setIsCombatTest(!isCombatTest);
              setHasRolled(false);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors border ${
              isCombatTest
                ? 'bg-red-900/80 border-red-600 text-white shadow-lg'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Swords className="w-4 h-4 text-red-400" />
            <span>{isCombatTest ? 'Combat Encounter (On)' : 'Non-Combat Test'}</span>
          </button>
        </div>
      </div>

      {/* Mathematical Breakdown of Dice Pool */}
      <div className="bg-slate-900/80 border border-slate-750 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 uppercase font-semibold">Formula:</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">
            Base: {baseStat}
          </span>
          {tokenMod !== 0 && (
            <span className={`px-2 py-0.5 rounded font-mono font-bold ${tokenMod > 0 ? 'bg-slate-700 text-amber-300' : 'bg-rose-950 text-rose-300'}`}>
              Token: {tokenMod > 0 ? `+${tokenMod}` : tokenMod}
            </span>
          )}
          {itemPassiveBonus > 0 && (
            <span className="px-2 py-0.5 rounded bg-amber-950/70 border border-amber-800 text-amber-300 font-mono font-bold">
              Item: +{itemPassiveBonus}
            </span>
          )}
          {combatBonus > 0 && isCombatTest && (
            <span className="px-2 py-0.5 rounded bg-red-950/80 border border-red-700 text-red-300 font-mono font-bold">
              ⚔️ Weapon: +{combatBonus}
            </span>
          )}
          {leoWildernessBonus > 0 && (
            <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-700 text-emerald-300 font-mono font-bold">
              Leo Guide: +1
            </span>
          )}
          {manualBonusDice !== 0 && (
            <span className="px-2 py-0.5 rounded bg-indigo-950/80 border border-indigo-700 text-indigo-300 font-mono font-bold">
              Extra: {manualBonusDice > 0 ? `+${manualBonusDice}` : manualBonusDice}
            </span>
          )}

          {/* Condition modifier badge */}
          {state.isBlessed && (
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-bold">
              ✨ Blessed (4, 5, 6 win)
            </span>
          )}
          {state.isCursed && (
            <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-700 text-[11px] font-bold">
              ⚠️ Cursed (6 only win)
            </span>
          )}
        </div>

        {/* Big Roll Dice Action */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-lg border border-slate-700">
            <span className="text-[11px] text-slate-400 font-mono">Mod:</span>
            <button
              onClick={() => setManualBonusDice((b) => Math.max(-5, b - 1))}
              className="w-5 h-5 rounded bg-slate-700 hover:bg-slate-650 text-xs font-bold text-slate-300"
            >
              -
            </button>
            <span className="w-5 text-center font-mono font-bold text-xs text-amber-300">
              {manualBonusDice >= 0 ? `+${manualBonusDice}` : manualBonusDice}
            </span>
            <button
              onClick={() => setManualBonusDice((b) => Math.min(10, b + 1))}
              className="w-5 h-5 rounded bg-slate-700 hover:bg-slate-650 text-xs font-bold text-slate-300"
            >
              +
            </button>
          </div>

          <button
            onClick={handleRollDice}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:scale-95 text-white font-serif font-bold text-base shadow-xl transition-all"
          >
            <Dices className="w-5 h-5 text-amber-300" />
            <span>Roll {totalDice} Dice</span>
          </button>
        </div>
      </div>

      {/* Results Area */}
      {hasRolled && (
        <div className="bg-slate-900/90 border border-slate-750 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold text-slate-400">Roll Outcome:</span>
              <span className={`text-base font-serif font-bold flex items-center gap-1.5 ${
                totalSuccesses > 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {totalSuccesses > 0 ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{totalSuccesses} Success{totalSuccesses === 1 ? '' : 'es'}!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5" />
                    <span>0 Successes (Test Failed)</span>
                  </>
                )}
              </span>
            </div>

            <div className="text-xs text-slate-400">
              {state.isBlessed ? 'Success on 4, 5, 6' : state.isCursed ? 'Success on 6 only' : 'Success on 5, 6'}
            </div>
          </div>

          {/* Dice Grid with Reroll Triggers */}
          <div className="flex flex-wrap items-center gap-3">
            {diceResults.map((die, idx) => {
              const canReroll = !die.isSuccess && remainingRerolls > 0;
              return (
                <div key={die.id} className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-black font-mono shadow-xl border-2 transition-transform ${
                      die.isSuccess
                        ? state.isBlessed
                          ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 border-amber-200 ring-2 ring-amber-400/50'
                          : 'bg-gradient-to-br from-emerald-500 to-emerald-700 text-white border-emerald-300 ring-2 ring-emerald-500/50'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    } ${die.rerolled ? 'animate-bounce' : ''}`}
                  >
                    {die.value}
                  </div>

                  {/* Individual Reroll Button */}
                  {!die.isSuccess && (
                    <button
                      onClick={() => handleRerollSingleDie(idx)}
                      disabled={remainingRerolls <= 0}
                      className="px-2 py-0.5 rounded bg-indigo-950 hover:bg-indigo-900 border border-indigo-700 text-[10px] font-bold text-indigo-300 disabled:opacity-20 disabled:pointer-events-none transition-colors"
                      title="Reroll this individual die"
                    >
                      Reroll
                    </button>
                  )}
                  {die.isSuccess && (
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                      Pass
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {remainingRerolls > 0 && diceResults.some((d) => !d.isSuccess) && (
            <p className="text-xs text-amber-300/80 italic">
              💡 Tip: Click &quot;Reroll&quot; beneath any failed die to use one of your {remainingRerolls} remaining reroll{remainingRerolls === 1 ? '' : 's'}!
            </p>
          )}
        </div>
      )}
    </div>
  );
};
