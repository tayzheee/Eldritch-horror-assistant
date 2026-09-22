import React, { useState } from 'react';
import {
  Heart,
  Brain,
  Plus,
  Minus,
  Swords,
  Dices,
  Sparkles,
  RotateCcw,
  Skull
} from 'lucide-react';
import { InvestigatorState, InvestigatorStatic, SkillType } from '../types';
import { InvestigatorPortrait } from './InvestigatorPortrait';
import {
  HealthIcon,
  SanityIcon,
  LoreIcon,
  InfluenceIcon,
  ObservationIcon,
  StrengthIcon,
  WillIcon,
  FocusTokenIcon,
  ResourcesTokenIcon,
  ClueTokenIcon,
  TrainTicketIcon,
  ShipTicketIcon,
  EldritchTokenIcon,
} from './GameIcons';

interface Props {
  investigator: InvestigatorStatic;
  state: InvestigatorState;
  onUpdateHealth: (delta: number) => void;
  onSetHealth: (val: number) => void;
  onUpdateSanity: (delta: number) => void;
  onSetSanity: (val: number) => void;
  onUpdateSkillModifier: (skill: SkillType, delta: number) => void;
  onUpdateToken: (tokenType: keyof InvestigatorState['tokens'], delta: number) => void;
  onOpenTestCalculator?: (skill?: SkillType) => void;
  onResetInvestigator: () => void;
  onResolveDefeat?: () => void;
  onOpenDeathModal?: () => void;
}

export const InvestigatorProfile: React.FC<Props> = ({
  investigator,
  state,
  onUpdateHealth,
  onSetHealth,
  onUpdateSanity,
  onSetSanity,
  onUpdateSkillModifier,
  onUpdateToken,
  onOpenTestCalculator,
  onResetInvestigator,
  onResolveDefeat,
  onOpenDeathModal,
}) => {
  const [activeTab, setActiveTab] = useState<'front' | 'back'>('front');

  // Auto-scroll to Death & Succession table once defeat is detected
  const isDefeated = state.currentHealth <= 0 || state.currentSanity <= 0;
  React.useEffect(() => {
    if (isDefeated) {
      const timer = setTimeout(() => {
        const target = document.getElementById('death-and-succession-section');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isDefeated]);

  const handleResolveDefeatClick = () => {
    if (onResolveDefeat) {
      onResolveDefeat();
    } else {
      const target = document.getElementById('death-and-succession-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Calculate bonuses from equipped / unexhausted possessions
  const activePossessions = state.possessions.filter((p) => !p.isExhausted);

  // Combat bonuses by skill (Highest Gain Rule: items/spells do NOT stack; only highest applies)
  const combatBonusDetails: Record<SkillType, { amount: number; source: string; isSpell: boolean }> = {
    lore: { amount: 0, source: '', isSpell: false },
    influence: { amount: 0, source: '', isSpell: false },
    observation: { amount: 0, source: '', isSpell: false },
    strength: { amount: 0, source: '', isSpell: false },
    will: { amount: 0, source: '', isSpell: false },
  };

  // Passive stat bonuses (Highest Gain Rule: highest single passive bonus applies, no stacking)
  const passiveStatBonusDetails: Record<SkillType, { amount: number; source: string }> = {
    lore: { amount: 0, source: '' },
    influence: { amount: 0, source: '' },
    observation: { amount: 0, source: '' },
    strength: { amount: 0, source: '' },
    will: { amount: 0, source: '' },
  };

  // Reroll abilities granted by items / assets (e.g. Hired Muscle grants 1 reroll on Strength test)
  const rerollsBySkill: Record<SkillType, { amount: number; source: string }[]> = {
    lore: [],
    influence: [],
    observation: [],
    strength: [],
    will: [],
  };

  activePossessions.forEach((item) => {
    // Passive stat bonus: highest gain
    if (item.statBonus) {
      const skill = item.statBonus.skill;
      if (item.statBonus.amount > passiveStatBonusDetails[skill].amount) {
        passiveStatBonusDetails[skill] = {
          amount: item.statBonus.amount,
          source: item.name,
        };
      }
    }

    // Combat bonus: highest gain
    if (item.combatBonus) {
      const skill = item.combatBonus.skill;
      if (item.combatBonus.amount > combatBonusDetails[skill].amount) {
        combatBonusDetails[skill] = {
          amount: item.combatBonus.amount,
          source: item.name,
          isSpell: item.type === 'spell',
        };
      }
    }

    if (item.rerollsGranted) {
      if (item.rerollsGranted.skill) {
        rerollsBySkill[item.rerollsGranted.skill].push({
          amount: item.rerollsGranted.amount,
          source: item.name,
        });
      } else {
        // Grants reroll to any skill
        (Object.keys(rerollsBySkill) as SkillType[]).forEach((s) => {
          rerollsBySkill[s].push({
            amount: item.rerollsGranted!.amount,
            source: item.name,
          });
        });
      }
    }
  });

  const combatBonuses: Record<SkillType, number> = {
    lore: combatBonusDetails.lore.amount,
    influence: combatBonusDetails.influence.amount,
    observation: combatBonusDetails.observation.amount,
    strength: combatBonusDetails.strength.amount,
    will: combatBonusDetails.will.amount,
  };

  const passiveStatBonuses: Record<SkillType, number> = {
    lore: passiveStatBonusDetails.lore.amount,
    influence: passiveStatBonusDetails.influence.amount,
    observation: passiveStatBonusDetails.observation.amount,
    strength: passiveStatBonusDetails.strength.amount,
    will: passiveStatBonusDetails.will.amount,
  };

  // Investigator passive rerolls:
  if (investigator.id === 'daisy-walker') {
    rerollsBySkill.lore.push({ amount: 1, source: 'Fast Reader' });
  } else if (investigator.id === 'trish-scarborough') {
    rerollsBySkill.observation.push({ amount: 1, source: 'Eagle Eye' });
  } else if (investigator.id === 'silas-marsh') {
    rerollsBySkill.strength.push({ amount: 1, source: 'Sea Dog (Combat)' });
  } else if (investigator.id === 'diana-stanley') {
    rerollsBySkill.will.push({ amount: 1, source: 'Cult Insider' });
  }

  const skillsConfig: {
    key: SkillType;
    label: string;
    bgClass: string;
    borderClass: string;
    icon: React.ReactNode;
  }[] = [
    {
      key: 'lore',
      label: 'Lore',
      bgClass: 'bg-purple-700',
      borderClass: 'border-purple-500',
      icon: <LoreIcon className="w-4 h-4 text-purple-200" />,
    },
    {
      key: 'influence',
      label: 'Influence',
      bgClass: 'bg-orange-600',
      borderClass: 'border-orange-500',
      icon: <InfluenceIcon className="w-4 h-4 text-orange-200" />,
    },
    {
      key: 'observation',
      label: 'Observation',
      bgClass: 'bg-emerald-600',
      borderClass: 'border-emerald-500',
      icon: <ObservationIcon className="w-4 h-4 text-emerald-200" />,
    },
    {
      key: 'strength',
      label: 'Strength',
      bgClass: 'bg-red-600',
      borderClass: 'border-red-500',
      icon: <StrengthIcon className="w-4 h-4 text-red-200" />,
    },
    {
      key: 'will',
      label: 'Will',
      bgClass: 'bg-blue-600',
      borderClass: 'border-blue-500',
      icon: <WillIcon className="w-4 h-4 text-blue-200" />,
    },
  ];

  return (
    <div className="w-full bg-[#131b2e] border border-slate-700/70 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-200">
      {/* Upper Section: Profile Header & Portrait */}
      <div className="p-5 border-b border-slate-700/60 bg-gradient-to-b from-[#18223a] to-[#131b2e]">
        <div className="flex flex-col sm:flex-row gap-5 items-start">
          {/* Portrait Container with Frame */}
          <div className="w-full sm:w-48 sm:h-44 h-56 rounded-xl overflow-hidden border-2 border-amber-900/60 shadow-xl flex-shrink-0 relative group">
            <InvestigatorPortrait
              investigatorId={investigator.id}
              name={investigator.name}
              className="w-full h-full"
            />
            <div className="absolute inset-0 border-2 border-amber-500/20 rounded-xl pointer-events-none" />
          </div>

          {/* Name, Title, and Quote */}
          <div className="flex-1 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-amber-100">
                  {investigator.name}
                </h1>
                <button
                  onClick={onResetInvestigator}
                  title="Reset investigator stats and tokens to initial starting state"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2 flex-wrap mt-0.5">
                <h2 className="font-serif text-base sm:text-lg text-slate-400 font-medium tracking-wide italic">
                  {investigator.title}
                </h2>
                {investigator.role && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-950/60 border border-amber-600/40 text-amber-300">
                    Role: {investigator.role}
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs sm:text-sm text-slate-300/80 font-serif italic border-l-2 border-amber-600/60 pl-2.5 py-0.5">
                {investigator.quote}
              </p>
            </div>

            {/* CARD FRONT / CARD BACK Toggle Buttons */}
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => setActiveTab('front')}
                className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-sm ${
                  activeTab === 'front'
                    ? 'bg-blue-600 text-white shadow-blue-900/40'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                Card Front
              </button>
              <button
                onClick={() => setActiveTab('back')}
                className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-sm ${
                  activeTab === 'back'
                    ? 'bg-blue-600 text-white shadow-blue-900/40'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                Card Back
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'front' ? (
        <div className="p-5 space-y-5">
          {/* Defeat / Death Warning Banner */}
          {(state.currentHealth <= 0 || state.currentSanity <= 0) && (
            <div className="p-3 bg-red-950/90 border border-red-500 rounded-xl flex items-center justify-between gap-3 text-red-200 shadow-lg">
              <div className="flex items-center gap-2">
                <Skull className="w-5 h-5 text-red-400 flex-shrink-0 animate-bounce" />
                <span className="text-xs font-serif font-bold">
                  {state.currentHealth <= 0 ? 'Crippled (0 Health)!' : 'Insane (0 Sanity)!'} Investigator is defeated.
                </span>
              </div>
              {onOpenDeathModal && (
                <button
                  type="button"
                  onClick={onOpenDeathModal}
                  className="px-3 py-1.5 bg-red-750 hover:bg-red-650 active:scale-95 text-white rounded-lg font-serif text-xs font-bold shadow transition-all whitespace-nowrap"
                >
                  Resolve Defeat &amp; Gear
                </button>
              )}
            </div>
          )}

          {/* Health Tracker */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-rose-300">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                Health ({state.currentHealth} / {state.maxHealth})
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onUpdateHealth(-1)}
                  disabled={state.currentHealth <= 0}
                  className="w-5 h-5 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 text-rose-400 text-xs font-bold disabled:opacity-30"
                  title="Take 1 Damage"
                >
                  -
                </button>
                <button
                  onClick={() => onUpdateHealth(1)}
                  disabled={state.currentHealth >= state.maxHealth}
                  className="w-5 h-5 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold disabled:opacity-30"
                  title="Recover 1 Health"
                >
                  +
                </button>
              </div>
            </div>

            {/* Anatomical Hearts Row (Clickable) */}
            <div className="flex items-center gap-2 p-2 bg-slate-850/60 rounded-xl border border-slate-750">
              {Array.from({ length: state.maxHealth }).map((_, idx) => {
                const isActive = idx < state.currentHealth;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSetHealth(idx + 1 === state.currentHealth ? idx : idx + 1)}
                    title={`Click to set Health to ${idx + 1}`}
                    className="cursor-pointer hover:scale-110 transition-transform"
                  >
                    <HealthIcon active={isActive} className="w-7 h-7 sm:w-8 sm:h-8" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sanity Tracker */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-sky-300">
                <Brain className="w-3.5 h-3.5 text-sky-400" />
                Sanity ({state.currentSanity} / {state.maxSanity})
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onUpdateSanity(-1)}
                  disabled={state.currentSanity <= 0}
                  className="w-5 h-5 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 text-rose-400 text-xs font-bold disabled:opacity-30"
                  title="Lose 1 Sanity"
                >
                  -
                </button>
                <button
                  onClick={() => onUpdateSanity(1)}
                  disabled={state.currentSanity >= state.maxSanity}
                  className="w-5 h-5 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold disabled:opacity-30"
                  title="Recover 1 Sanity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Brain Icons Row (Clickable) */}
            <div className="flex items-center gap-2 p-2 bg-slate-850/60 rounded-xl border border-slate-750">
              {Array.from({ length: state.maxSanity }).map((_, idx) => {
                const isActive = idx < state.currentSanity;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSetSanity(idx + 1 === state.currentSanity ? idx : idx + 1)}
                    title={`Click to set Sanity to ${idx + 1}`}
                    className="cursor-pointer hover:scale-110 transition-transform"
                  >
                    <SanityIcon active={isActive} className="w-7 h-7 sm:w-8 sm:h-8" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Skills Section with Improvements, Impairments, Combat Badges, and Reroll Indicators */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span>Skills & Modifiers</span>
              <span className="text-[11px] text-slate-500 lowercase">click skill to test roll</span>
            </div>

            <div className="space-y-2">
              {skillsConfig.map(({ key, label, bgClass, borderClass, icon }) => {
                const baseStat = investigator.skills[key];
                const modifier = state.skillModifiers[key] || 0; // can be negative (impairment) or positive (improvement)
                const passiveBonus = passiveStatBonuses[key] || 0;
                const combatBonus = combatBonuses[key] || 0;
                const rerolls = rerollsBySkill[key] || [];

                return (
                  <div
                    key={key}
                    className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 transition-colors"
                  >
                    {/* Left: Skill Badge (Base) */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenTestCalculator?.(key)}
                        title={`Click to roll ${label} test`}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-white font-serif font-bold text-base shadow-sm ${bgClass} hover:brightness-110 active:scale-95 transition-all`}
                      >
                        {icon}
                        <span>{baseStat}</span>
                        <span className="text-xs font-sans font-normal opacity-85">{label}</span>
                      </button>

                      {/* Stat Improvement (+1, +2) or Impairment (-1, -2) Token Badge */}
                      {modifier !== 0 && (
                        <div
                          className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold shadow flex items-center gap-1 ${
                            modifier > 0
                              ? 'bg-slate-650 text-amber-200 border border-slate-500'
                              : 'bg-rose-950/80 text-rose-300 border border-rose-700/80'
                          }`}
                          title={modifier > 0 ? `Skill Improvement Token: +${modifier}` : `Skill Impairment: ${modifier}`}
                        >
                          {modifier > 0 ? `+${modifier}` : modifier}
                        </div>
                      )}

                      {/* Static Passive Asset Bonus Badge (e.g. Hired Muscle +1 Strength) */}
                      {passiveBonus !== 0 && (
                        <div
                          className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40"
                          title={`Passive Bonus: +${passiveBonus} (${passiveStatBonusDetails[key].source} - highest gain, non-stacking)`}
                        >
                          +{passiveBonus} Item
                        </div>
                      )}

                      {/* Combat Encounter Bonus Badge (e.g. .45 Automatic ⚔️ +3 Strength) */}
                      {combatBonus > 0 && (
                        <div
                          className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-red-700 text-white border border-red-500 shadow-md flex items-center gap-1 animate-pulse hover:animate-none"
                          title={`Combat Bonus: +${combatBonus} (${combatBonusDetails[key].source} - highest gain, weapon/spell do not stack)`}
                        >
                          <Swords className="w-3.5 h-3.5" />
                          <span>+{combatBonus}</span>
                        </div>
                      )}

                      {/* Reroll Indicator Badge (e.g. Hired Muscle reroll 1 die on Strength tests) */}
                      {rerolls.length > 0 && (
                        <div
                          className="px-2 py-0.5 rounded-md text-[11px] font-sans font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-700/70 flex items-center gap-1"
                          title={`Rerolls available: ${rerolls.map((r) => `${r.amount} (${r.source})`).join(', ')}`}
                        >
                          <Dices className="w-3 h-3 text-indigo-400" />
                          <span>
                            {rerolls.reduce((acc, r) => acc + r.amount, 0)} Reroll
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Right: Stat Adjuster (+ / - for improvement and impairment tokens) */}
                    <div className="flex items-center gap-1 bg-slate-900/80 px-2 py-1 rounded-lg border border-slate-750">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold mr-1">
                        Token:
                      </span>
                      <button
                        onClick={() => onUpdateSkillModifier(key, -1)}
                        disabled={modifier <= -2}
                        className="w-5 h-5 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 text-rose-400 text-xs font-bold disabled:opacity-20"
                        title="Reduce skill (Impairment token -1)"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-mono font-bold text-slate-200">
                        {modifier > 0 ? `+${modifier}` : modifier}
                      </span>
                      <button
                        onClick={() => onUpdateSkillModifier(key, 1)}
                        disabled={modifier >= 2}
                        className="w-5 h-5 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold disabled:opacity-20"
                        title="Improve skill (+1 Improvement token)"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tokens Row at Bottom (matching exact visual token layout in screenshot) */}
          <div className="pt-2 border-t border-slate-700/60">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Tokens Inventory
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {/* Focus */}
              <div className="flex flex-col items-center bg-slate-850/80 border border-slate-750 rounded-xl p-2 hover:border-amber-500/40 transition-colors group">
                <div className="relative">
                  <FocusTokenIcon className="w-10 h-10" />
                  <span className="absolute -bottom-1 -right-1 bg-blue-600 text-white font-mono text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-slate-900 shadow">
                    {state.tokens.focus}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-amber-200 mt-1">Focus</span>
                <div className="flex items-center gap-1 mt-1 opacity-80 group-hover:opacity-100">
                  <button
                    onClick={() => onUpdateToken('focus', -1)}
                    disabled={state.tokens.focus <= 0}
                    className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 disabled:opacity-20"
                  >
                    -
                  </button>
                  <button
                    onClick={() => onUpdateToken('focus', 1)}
                    className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-400"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Resources */}
              <div className="flex flex-col items-center bg-slate-850/80 border border-slate-750 rounded-xl p-2 hover:border-amber-600/40 transition-colors group">
                <div className="relative">
                  <ResourcesTokenIcon className="w-10 h-10" />
                  <span className="absolute -bottom-1 -right-1 bg-blue-600 text-white font-mono text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-slate-900 shadow">
                    {state.tokens.resources}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-amber-300 mt-1">Resource</span>
                <div className="flex items-center gap-1 mt-1 opacity-80 group-hover:opacity-100">
                  <button
                    onClick={() => onUpdateToken('resources', -1)}
                    disabled={state.tokens.resources <= 0}
                    className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 disabled:opacity-20"
                  >
                    -
                  </button>
                  <button
                    onClick={() => onUpdateToken('resources', 1)}
                    className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-400"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Clues */}
              <div className="flex flex-col items-center bg-slate-850/80 border border-slate-750 rounded-xl p-2 hover:border-emerald-500/40 transition-colors group">
                <div className="relative">
                  <ClueTokenIcon className="w-10 h-10" />
                  <span className="absolute -bottom-1 -right-1 bg-blue-600 text-white font-mono text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-slate-900 shadow">
                    {state.tokens.clues}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-300 mt-1">Clues</span>
                <div className="flex items-center gap-1 mt-1 opacity-80 group-hover:opacity-100">
                  <button
                    onClick={() => onUpdateToken('clues', -1)}
                    disabled={state.tokens.clues <= 0}
                    className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 disabled:opacity-20"
                  >
                    -
                  </button>
                  <button
                    onClick={() => onUpdateToken('clues', 1)}
                    className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-emerald-400"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Train Ticket */}
              <div className="flex flex-col items-center bg-slate-850/80 border border-slate-750 rounded-xl p-2 hover:border-rose-500/40 transition-colors group">
                <div className="relative">
                  <TrainTicketIcon className="w-10 h-10" />
                  <span className="absolute -bottom-1 -right-1 bg-blue-600 text-white font-mono text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-slate-900 shadow">
                    {state.tokens.trainTickets}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-rose-300 mt-1">Train</span>
                <div className="flex items-center gap-1 mt-1 opacity-80 group-hover:opacity-100">
                  <button
                    onClick={() => onUpdateToken('trainTickets', -1)}
                    disabled={state.tokens.trainTickets <= 0}
                    className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 disabled:opacity-20"
                  >
                    -
                  </button>
                  <button
                    onClick={() => onUpdateToken('trainTickets', 1)}
                    className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-rose-400"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Ship Ticket */}
              <div className="flex flex-col items-center bg-slate-850/80 border border-slate-750 rounded-xl p-2 hover:border-sky-500/40 transition-colors group">
                <div className="relative">
                  <ShipTicketIcon className="w-10 h-10" />
                  <span className="absolute -bottom-1 -right-1 bg-blue-600 text-white font-mono text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-slate-900 shadow">
                    {state.tokens.shipTickets}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-sky-300 mt-1">Ship</span>
                <div className="flex items-center gap-1 mt-1 opacity-80 group-hover:opacity-100">
                  <button
                    onClick={() => onUpdateToken('shipTickets', -1)}
                    disabled={state.tokens.shipTickets <= 0}
                    className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 disabled:opacity-20"
                  >
                    -
                  </button>
                  <button
                    onClick={() => onUpdateToken('shipTickets', 1)}
                    className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-sky-400"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Eldritch Token */}
              <div className="flex flex-col items-center bg-slate-850/80 border border-slate-750 rounded-xl p-2 hover:border-purple-500/40 transition-colors group">
                <div className="relative">
                  <EldritchTokenIcon className="w-10 h-10" />
                  <span className="absolute -bottom-1 -right-1 bg-blue-600 text-white font-mono text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-slate-900 shadow">
                    {state.tokens.eldritch}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-purple-300 mt-1">Eldritch</span>
                <div className="flex items-center gap-1 mt-1 opacity-80 group-hover:opacity-100">
                  <button
                    onClick={() => onUpdateToken('eldritch', -1)}
                    disabled={state.tokens.eldritch <= 0}
                    className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 disabled:opacity-20"
                  >
                    -
                  </button>
                  <button
                    onClick={() => onUpdateToken('eldritch', 1)}
                    className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-purple-400"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* CARD BACK: Lore, Starting Possessions, Backstory */
        <div className="p-6 space-y-5 bg-gradient-to-b from-[#162036] to-[#0f172a]">
          <div className="border-b border-slate-700/80 pb-4">
            <h3 className="font-serif text-xl font-bold text-amber-200">Investigator Dossier</h3>
            <p className="text-xs text-slate-400 font-serif">Miskatonic Archives Confidential Record</p>
          </div>

          {/* Backstory narrative */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Background & Lore</h4>
            <p className="font-serif text-sm leading-relaxed text-slate-300 bg-slate-900/50 p-4 rounded-xl border border-slate-800 italic">
              {investigator.backStory}
            </p>
          </div>

          {/* Starting Setup */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-850 p-3.5 rounded-xl border border-slate-750 space-y-2.5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  Starting Location
                </span>
                <p className="text-sm font-medium text-slate-200">{investigator.startingLocation}</p>
              </div>
              {investigator.role && (
                <div className="pt-2 border-t border-slate-750/70">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Archetype Role
                  </span>
                  <span className="inline-block text-xs font-medium px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30 text-amber-300">
                    {investigator.role}
                  </span>
                </div>
              )}
            </div>

            <div className="bg-slate-850 p-3.5 rounded-xl border border-slate-750">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                Starting Possessions
              </span>
              {investigator.startingPossessionsSummary && (
                <div className="mb-2 px-2.5 py-1 bg-amber-950/40 border border-amber-600/30 rounded-lg text-amber-200 text-xs font-serif font-semibold">
                  {investigator.startingPossessionsSummary}
                </div>
              )}
              <ul className="text-xs text-slate-300 space-y-1">
                {investigator.startingPossessions.map((p) => (
                  <li key={p.id} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="font-semibold">{p.name}</span> ({p.type})
                  </li>
                ))}
                {investigator.startingTokens?.clues ? (
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{investigator.startingTokens.clues} Clue{investigator.startingTokens.clues > 1 ? 's' : ''}</span>
                  </li>
                ) : null}
                {investigator.startingTokens?.resources ? (
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                    <span>{investigator.startingTokens.resources} Resource{investigator.startingTokens.resources > 1 ? 's' : ''}</span>
                  </li>
                ) : null}
                {investigator.startingTokens?.focus ? (
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span>{investigator.startingTokens.focus} Focus</span>
                  </li>
                ) : null}
                {investigator.startingTokens?.shipTickets ? (
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span>{investigator.startingTokens.shipTickets} Ship Ticket</span>
                  </li>
                ) : null}
                {investigator.startingTokens?.trainTickets ? (
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <span>{investigator.startingTokens.trainTickets} Train Ticket</span>
                  </li>
                ) : null}
                {investigator.startingSkillModifiers?.will ? (
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span className="text-purple-300 font-semibold">+1 Will Improvement</span>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>

          {/* Action & Passive Summary */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-750 space-y-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block">
                Investigator Action: {investigator.action.title}
              </span>
              <p className="text-xs text-slate-300 mt-0.5">{investigator.action.description}</p>
            </div>

            <div className="border-t border-slate-800 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                Passive Ability: {investigator.passive.title}
              </span>
              <p className="text-xs text-slate-300 mt-0.5">{investigator.passive.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
