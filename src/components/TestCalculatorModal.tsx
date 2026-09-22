import React, { useState, useEffect } from 'react';
import {
  X,
  Dices,
  Swords,
  TreePine,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  Wand2,
  Shield,
  Flame,
  Trash2,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { SkillType, InvestigatorStatic, InvestigatorState, PossessionCard } from '../types';
import { LoreIcon, InfluenceIcon, ObservationIcon, StrengthIcon, WillIcon } from './GameIcons';
import {
  calculateCardBonuses,
  CombatHandType,
  CardBonusMode,
} from '../utils/combatRules';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialSkill?: SkillType;
  investigator: InvestigatorStatic;
  state: InvestigatorState;
  onSpendReroll: () => void;
  onResetRerolls: () => void;
  onUpdateToken: (tokenType: keyof InvestigatorState['tokens'], delta: number) => void;
  onRemovePossession?: (cardId: string) => void;
}

interface DieResult {
  id: number;
  value: number;
  isSuccess: boolean;
  rerolled: boolean;
}

export const TestCalculatorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialSkill = 'strength',
  investigator,
  state,
  onSpendReroll,
  onResetRerolls,
  onUpdateToken,
  onRemovePossession,
}) => {
  const [selectedSkill, setSelectedSkill] = useState<SkillType>(initialSkill);
  const [isCombatEncounter, setIsCombatEncounter] = useState(false);
  const [sharesSpaceWithLeoOnWilderness, setSharesSpaceWithLeoOnWilderness] = useState(false);
  const [extraCustomDice, setExtraCustomDice] = useState(0);

  // New Rulings Controls
  const [preferredHand, setPreferredHand] = useState<CombatHandType | undefined>(undefined);
  const [activeMode, setActiveMode] = useState<CardBonusMode>('passive');
  const [selectedOncePerRoundCardId, setSelectedOncePerRoundCardId] = useState<string | undefined>(undefined);
  const [selectedDiscardCardId, setSelectedDiscardCardId] = useState<string | undefined>(undefined);
  const [customOncePerRoundBonus, setCustomOncePerRoundBonus] = useState(2);
  const [customDiscardBonus, setCustomDiscardBonus] = useState(3);
  const [discardCardOnRoll, setDiscardCardOnRoll] = useState(true);
  const [showRulingsGuide, setShowRulingsGuide] = useState(false);

  // Dice rolling state
  const [diceResults, setDiceResults] = useState<DieResult[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [hasRolled, setHasRolled] = useState(false);
  const [discardNotice, setDiscardNotice] = useState<string | null>(null);

  // Auto-update selected skill when initialSkill changes
  useEffect(() => {
    if (initialSkill) {
      setSelectedSkill(initialSkill);
      setHasRolled(false);
    }
  }, [initialSkill]);

  if (!isOpen) return null;

  // 1. Base skill
  const baseStat = investigator.skills[selectedSkill];

  // 2. Skill modifier (token improvement + or impairment -)
  const skillModifier = state.skillModifiers[selectedSkill] || 0;

  // 3. Card bonus calculation according to the new Eldritch rulings:
  // - Highest Gain Only (items do NOT stack)
  // - Weapons and Spells CANNOT combine in combat
  // - Discard-to-gain supersedes passive bonuses
  // - Once-per-round supersedes pure static passive bonuses
  const bonusResult = calculateCardBonuses({
    activePossessions: state.possessions,
    selectedSkill,
    isCombat: isCombatEncounter,
    preferredHand,
    activeMode,
    selectedOncePerRoundCardId,
    selectedDiscardCardId,
    customOncePerRoundBonus,
    customDiscardBonus,
  });

  const cardBonus = bonusResult.finalBonus;

  // 4. Investigator-specific combat traits (e.g. Mark Harrigan passive soldier trait)
  let markCombatBonus = 0;
  if (isCombatEncounter && investigator.id === 'mark-harrigan') {
    markCombatBonus = 1;
  }

  // 5. Leo Anderson wilderness ally aura bonus
  let leoWildernessBonus = 0;
  if (sharesSpaceWithLeoOnWilderness) {
    leoWildernessBonus = 1;
  }

  // Calculate total dice pool
  const totalDicePool = Math.max(
    1,
    baseStat + skillModifier + cardBonus + markCombatBonus + leoWildernessBonus + extraCustomDice
  );

  // 6. Rerolls tracking
  const activePossessions = state.possessions.filter((p) => !p.isExhausted);
  const cardRerollsList: { source: string; amount: number }[] = [];
  activePossessions.forEach((p) => {
    if (p.rerollsGranted) {
      const matchSkill = !p.rerollsGranted.skill || p.rerollsGranted.skill === selectedSkill;
      const matchCombat = !p.rerollsGranted.isCombatOnly || isCombatEncounter;
      if (matchSkill && matchCombat) {
        cardRerollsList.push({
          source: p.name,
          amount: p.rerollsGranted.amount,
        });
      }
    }
  });

  // Investigator inherent free rerolls
  if (investigator.id === 'daisy-walker' && selectedSkill === 'lore') {
    cardRerollsList.push({ source: 'Daisy: Fast Reader', amount: 1 });
  } else if (investigator.id === 'trish-scarborough' && selectedSkill === 'observation') {
    cardRerollsList.push({ source: 'Trish: Eagle Eye', amount: 1 });
  } else if (investigator.id === 'silas-marsh' && (isCombatEncounter || state.tileType === 'sea')) {
    cardRerollsList.push({ source: 'Silas: Sea Dog', amount: 1 });
  } else if (investigator.id === 'diana-stanley' && selectedSkill === 'will') {
    cardRerollsList.push({ source: 'Diana: Cult Insider', amount: 1 });
  }

  const freeCardRerollsTotal = cardRerollsList.reduce((acc, c) => acc + c.amount, 0);
  const cluesAvailable = state.tokens.clues;
  const focusAvailable = state.tokens.focus;
  const totalPotentialRerolls = freeCardRerollsTotal + cluesAvailable + focusAvailable;
  const remainingRerollsThisTurn = Math.max(0, totalPotentialRerolls - state.rerollsUsedThisTurn);

  // Success criteria
  const isBlessed = state.isBlessed;
  const isCursed = state.isCursed;

  const checkSuccess = (val: number) => {
    if (isBlessed) return val >= 4;
    if (isCursed) return val === 6;
    return val >= 5;
  };

  // Roll dice pool
  const handleRollDice = () => {
    setIsRolling(true);
    setDiscardNotice(null);

    // If Discard Mode was used and user confirmed discard on roll:
    if (
      activeMode === 'discard' &&
      discardCardOnRoll &&
      selectedDiscardCardId &&
      onRemovePossession
    ) {
      const cardToDiscard = state.possessions.find((p) => p.id === selectedDiscardCardId);
      if (cardToDiscard) {
        onRemovePossession(selectedDiscardCardId);
        setDiscardNotice(`Discarded "${cardToDiscard.name}" from inventory for combat effect.`);
        setSelectedDiscardCardId(undefined);
      }
    }

    setTimeout(() => {
      const newResults: DieResult[] = [];
      for (let i = 0; i < totalDicePool; i++) {
        const val = Math.floor(Math.random() * 6) + 1;
        newResults.push({
          id: i,
          value: val,
          isSuccess: checkSuccess(val),
          rerolled: false,
        });
      }
      setDiceResults(newResults);
      setIsRolling(false);
      setHasRolled(true);
    }, 300);
  };

  // Reroll single die
  const handleRerollSingleDie = (index: number) => {
    if (remainingRerollsThisTurn <= 0) return;

    onSpendReroll();

    // Deduct token if free card rerolls are exhausted
    if (state.rerollsUsedThisTurn >= freeCardRerollsTotal) {
      if (state.tokens.clues > 0) {
        onUpdateToken('clues', -1);
      } else if (state.tokens.focus > 0) {
        onUpdateToken('focus', -1);
      }
    }

    const newVal = Math.floor(Math.random() * 6) + 1;
    setDiceResults((prev) =>
      prev.map((die, idx) =>
        idx === index
          ? {
              ...die,
              value: newVal,
              isSuccess: checkSuccess(newVal),
              rerolled: true,
            }
          : die
      )
    );
  };

  const totalSuccesses = diceResults.filter((d) => d.isSuccess).length;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#111827] border-2 border-slate-700/80 rounded-2xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl space-y-4 text-slate-200 my-auto max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-950 text-red-400 border border-red-800">
              <Dices className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-amber-100">
                Combat &amp; Test Dice Calculator
              </h2>
              <p className="text-xs text-slate-400">
                Investigator: <span className="text-amber-300 font-semibold">{investigator.name}</span>
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

        {/* Skill Selection Tabs */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Select Test Skill:
          </label>
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {(
              [
                { key: 'lore', label: 'Lore', icon: <LoreIcon className="w-3.5 h-3.5" />, color: 'bg-purple-700' },
                { key: 'influence', label: 'Influence', icon: <InfluenceIcon className="w-3.5 h-3.5" />, color: 'bg-orange-600' },
                { key: 'observation', label: 'Observation', icon: <ObservationIcon className="w-3.5 h-3.5" />, color: 'bg-emerald-600' },
                { key: 'strength', label: 'Strength', icon: <StrengthIcon className="w-3.5 h-3.5" />, color: 'bg-red-600' },
                { key: 'will', label: 'Will', icon: <WillIcon className="w-3.5 h-3.5" />, color: 'bg-blue-600' },
              ] as const
            ).map((s) => (
              <button
                key={s.key}
                onClick={() => {
                  setSelectedSkill(s.key);
                  setHasRolled(false);
                }}
                className={`py-2 px-1 rounded-xl text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  selectedSkill === s.key
                    ? `${s.color} text-white shadow-lg ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900 scale-102`
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-750'
                }`}
              >
                {s.icon}
                <span className="truncate">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Context Toggles (Combat Encounter & Leo Anderson Wilderness Aura) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-850 p-3 rounded-xl border border-slate-750">
          {/* Combat Encounter Toggle */}
          <button
            type="button"
            onClick={() => {
              setIsCombatEncounter(!isCombatEncounter);
              setHasRolled(false);
            }}
            className={`flex items-center justify-between p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
              isCombatEncounter
                ? 'bg-red-950/70 border-red-500 text-red-100 shadow-md'
                : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <Swords className={`w-5 h-5 ${isCombatEncounter ? 'text-red-400' : 'text-slate-400'}`} />
              <div>
                <span className="text-xs font-bold block">Combat Encounter</span>
                <span className="text-[10px] text-slate-400">Activates combat weapons &amp; combat spells</span>
              </div>
            </div>
            <div
              className={`w-5 h-5 rounded-md flex items-center justify-center border font-bold text-xs ${
                isCombatEncounter ? 'bg-red-600 border-red-400 text-white' : 'border-slate-600'
              }`}
            >
              {isCombatEncounter ? '✓' : ''}
            </div>
          </button>

          {/* Leo Anderson Wilderness Tile Aura Toggle */}
          <button
            type="button"
            onClick={() => {
              setSharesSpaceWithLeoOnWilderness(!sharesSpaceWithLeoOnWilderness);
              setHasRolled(false);
            }}
            className={`flex items-center justify-between p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
              sharesSpaceWithLeoOnWilderness
                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-100 shadow-md'
                : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <TreePine className={`w-5 h-5 ${sharesSpaceWithLeoOnWilderness ? 'text-emerald-400' : 'text-slate-400'}`} />
              <div>
                <span className="text-xs font-bold block">Leo Anderson Wilderness Tile</span>
                <span className="text-[10px] text-slate-400">+1 extra die on Wilderness encounter</span>
              </div>
            </div>
            <div
              className={`w-5 h-5 rounded-md flex items-center justify-center border font-bold text-xs ${
                sharesSpaceWithLeoOnWilderness ? 'bg-emerald-600 border-emerald-400 text-white' : 'border-slate-600'
              }`}
            >
              {sharesSpaceWithLeoOnWilderness ? '✓' : ''}
            </div>
          </button>
        </div>

        {/* Hand Limit & Ruling Controls (Weapon vs Spell & Superseding Modes) */}
        <div className="bg-slate-850 p-3.5 rounded-xl border border-slate-750 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-amber-400" />
              Combat Hand &amp; Effect Selection
            </span>
            <button
              type="button"
              onClick={() => setShowRulingsGuide(!showRulingsGuide)}
              className="text-[11px] text-slate-400 hover:text-amber-300 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Info className="w-3.5 h-3.5" />
              <span>{showRulingsGuide ? 'Hide Rulings' : 'View Rulings'}</span>
              {showRulingsGuide ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>

          {/* Rulings Guide Callout */}
          {showRulingsGuide && (
            <div className="bg-slate-900/90 p-3 rounded-lg border border-amber-600/30 text-xs space-y-1.5 text-slate-300">
              <div className="font-bold text-amber-300">Official Rulings Enforced:</div>
              <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px] leading-relaxed">
                <li>
                  <strong className="text-slate-200">Highest Gain Only:</strong> Users must always use the highest single card gain. Card bonuses do not stack (e.g. multiple weapons cannot combine to +20).
                </li>
                <li>
                  <strong className="text-slate-200">Hand Limit (Weapon vs. Spell):</strong> Spells and Weapons cannot combine together in combat. You fight using either your Weapon/Item hand OR your Spell hand.
                </li>
                <li>
                  <strong className="text-slate-200">Discard-to-Gain Supersedes:</strong> If you choose to discard a card for its effect, it supersedes passive bonuses.
                </li>
                <li>
                  <strong className="text-slate-200">Once-per-Round Supersedes:</strong> Once-per-round card effects supersede pure static passive bonuses.
                </li>
              </ul>
            </div>
          )}

          {/* Hand Selector: Weapon/Item vs Spell */}
          {isCombatEncounter && (
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Active Combat Hand (Weapon and Spell cannot stack):
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setPreferredHand('weapon');
                    setHasRolled(false);
                  }}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                    bonusResult.activeHand === 'weapon'
                      ? 'bg-amber-950/70 border-amber-500 text-amber-100 shadow-md ring-1 ring-amber-400'
                      : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold flex items-center gap-1.5">
                      <Swords className="w-4 h-4 text-amber-400" />
                      Weapon / Item Hand
                    </span>
                    <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-amber-900/60 text-amber-300 border border-amber-600/40">
                      +{bonusResult.highestWeaponBonus}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-1">
                    {bonusResult.bestWeaponCard
                      ? `Using: ${bonusResult.bestWeaponCard.name}`
                      : 'No weapon with combat bonus'}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPreferredHand('spell');
                    setHasRolled(false);
                  }}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                    bonusResult.activeHand === 'spell'
                      ? 'bg-purple-950/70 border-purple-500 text-purple-100 shadow-md ring-1 ring-purple-400'
                      : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold flex items-center gap-1.5">
                      <Wand2 className="w-4 h-4 text-purple-400" />
                      Spell Hand
                    </span>
                    <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-purple-900/60 text-purple-300 border border-purple-600/40">
                      +{bonusResult.highestSpellBonus}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-1">
                    {bonusResult.bestSpellCard
                      ? `Using: ${bonusResult.bestSpellCard.name}`
                      : 'No spell with combat bonus'}
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Effect Mode Selector (Passive vs Once-per-Round vs Discard) */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Active Card Effect Mode:
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setActiveMode('passive');
                  setHasRolled(false);
                }}
                className={`py-2 px-2 rounded-lg text-xs font-bold flex flex-col items-center justify-center gap-1 border transition-all cursor-pointer ${
                  activeMode === 'passive'
                    ? 'bg-slate-700 border-amber-400 text-amber-200 shadow'
                    : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Static Passive</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveMode('once-per-round');
                  setHasRolled(false);
                }}
                className={`py-2 px-2 rounded-lg text-xs font-bold flex flex-col items-center justify-center gap-1 border transition-all cursor-pointer ${
                  activeMode === 'once-per-round'
                    ? 'bg-indigo-950 border-indigo-400 text-indigo-200 shadow ring-1 ring-indigo-400'
                    : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Once per Round</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveMode('discard');
                  setHasRolled(false);
                }}
                className={`py-2 px-2 rounded-lg text-xs font-bold flex flex-col items-center justify-center gap-1 border transition-all cursor-pointer ${
                  activeMode === 'discard'
                    ? 'bg-rose-950 border-rose-400 text-rose-200 shadow ring-1 ring-rose-400'
                    : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                <span>Discard to Gain</span>
              </button>
            </div>
          </div>

          {/* Once-per-Round Sub-controls */}
          {activeMode === 'once-per-round' && (
            <div className="bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-700/50 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-indigo-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Once-per-Round Card Ability:
                </span>
                <span className="text-[10px] text-indigo-300/80">Supersedes passive bonus</span>
              </div>

              {bonusResult.oncePerRoundCards.length > 0 ? (
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">Select Card:</label>
                  <select
                    value={selectedOncePerRoundCardId || bonusResult.oncePerRoundCards[0]?.card.id}
                    onChange={(e) => {
                      setSelectedOncePerRoundCardId(e.target.value);
                      setHasRolled(false);
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-slate-200"
                  >
                    {bonusResult.oncePerRoundCards.map((c) => (
                      <option key={c.card.id} value={c.card.id}>
                        {c.card.name} (+{c.amount} {c.skill})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="text-slate-400">Once-per-round bonus:</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCustomOncePerRoundBonus((prev) => Math.max(1, prev - 1))}
                      className="w-5 h-5 rounded bg-slate-800 text-xs font-bold text-slate-300"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold text-indigo-300">+{customOncePerRoundBonus}</span>
                    <button
                      type="button"
                      onClick={() => setCustomOncePerRoundBonus((prev) => prev + 1)}
                      className="w-5 h-5 rounded bg-slate-800 text-xs font-bold text-slate-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Discard-to-Gain Sub-controls */}
          {activeMode === 'discard' && (
            <div className="bg-rose-950/40 p-2.5 rounded-lg border border-rose-700/50 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-rose-300 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" />
                  Discard-to-Gain Effect:
                </span>
                <span className="text-[10px] text-rose-300/80">Supersedes passive bonus</span>
              </div>

              {/* Inventory items available to discard */}
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">Card to Discard from Inventory:</label>
                {state.possessions.length > 0 ? (
                  <select
                    value={selectedDiscardCardId || state.possessions[0]?.id}
                    onChange={(e) => {
                      setSelectedDiscardCardId(e.target.value);
                      setHasRolled(false);
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-slate-200"
                  >
                    {state.possessions.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.type})
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="text-[11px] text-rose-400 italic">No inventory cards to discard</div>
                )}
              </div>

              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="text-slate-400">Discard bonus amount:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCustomDiscardBonus((prev) => Math.max(1, prev - 1))}
                    className="w-5 h-5 rounded bg-slate-800 text-xs font-bold text-slate-300"
                  >
                    -
                  </button>
                  <span className="font-mono font-bold text-rose-300">+{customDiscardBonus}</span>
                  <button
                    type="button"
                    onClick={() => setCustomDiscardBonus((prev) => prev + 1)}
                    className="w-5 h-5 rounded bg-slate-800 text-xs font-bold text-slate-300"
                  >
                    +
                  </button>
                </div>
              </div>

              {selectedDiscardCardId && onRemovePossession && (
                <label className="flex items-center gap-2 text-xs text-slate-300 pt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={discardCardOnRoll}
                    onChange={(e) => setDiscardCardOnRoll(e.target.checked)}
                    className="rounded border-slate-600 text-rose-600 focus:ring-rose-500"
                  />
                  <span>Remove selected card from inventory upon rolling</span>
                </label>
              )}
            </div>
          )}

          {/* Superseded Notification Banner */}
          {bonusResult.supersededDescription && (
            <div className="bg-amber-950/40 p-2 rounded-lg border border-amber-600/40 text-xs text-amber-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>
                <strong>Ruling Superseded:</strong> {bonusResult.supersededDescription}.
              </span>
            </div>
          )}

          {/* Rulings Notes List */}
          {bonusResult.rulingNotes.length > 0 && (
            <div className="text-[11px] text-slate-400 italic space-y-0.5">
              {bonusResult.rulingNotes.map((note, idx) => (
                <div key={idx}>• {note}</div>
              ))}
            </div>
          )}
        </div>

        {/* Dice Pool Calculation Breakdown */}
        <div className="bg-slate-900/90 rounded-xl border border-slate-750 p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Dice Calculation Breakdown:
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Custom Mod:</span>
              <button
                type="button"
                onClick={() => setExtraCustomDice((prev) => prev - 1)}
                className="w-5 h-5 rounded bg-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-700"
              >
                -
              </button>
              <span className="font-mono text-xs font-bold">{extraCustomDice >= 0 ? `+${extraCustomDice}` : extraCustomDice}</span>
              <button
                type="button"
                onClick={() => setExtraCustomDice((prev) => prev + 1)}
                className="w-5 h-5 rounded bg-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-700"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="bg-slate-800 px-2.5 py-1 rounded text-slate-200 border border-slate-700">
              Base {baseStat}
            </span>

            {skillModifier !== 0 && (
              <span
                className={`px-2.5 py-1 rounded border font-bold ${
                  skillModifier > 0 ? 'bg-slate-700 text-amber-300 border-slate-600' : 'bg-rose-950 text-rose-300 border-rose-800'
                }`}
              >
                {skillModifier > 0 ? `+${skillModifier}` : skillModifier} Token
              </span>
            )}

            {/* Active Card Bonus Badge */}
            {cardBonus > 0 && (
              <span
                className={`px-2.5 py-1 rounded border font-bold flex items-center gap-1 ${
                  activeMode === 'discard'
                    ? 'bg-rose-950 text-rose-200 border-rose-600'
                    : activeMode === 'once-per-round'
                    ? 'bg-indigo-950 text-indigo-200 border-indigo-600'
                    : bonusResult.activeHand === 'spell'
                    ? 'bg-purple-950 text-purple-200 border-purple-600'
                    : 'bg-red-950 text-red-200 border-red-600'
                }`}
                title={bonusResult.bonusSourceDescription}
              >
                {activeMode === 'discard' ? (
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                ) : activeMode === 'once-per-round' ? (
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                ) : bonusResult.activeHand === 'spell' ? (
                  <Wand2 className="w-3.5 h-3.5 text-purple-400" />
                ) : (
                  <Swords className="w-3.5 h-3.5 text-red-400" />
                )}
                +{cardBonus} {bonusResult.bonusSourceDescription}
              </span>
            )}

            {markCombatBonus > 0 && (
              <span className="bg-slate-800 px-2.5 py-1 rounded text-amber-300 border border-amber-600/50 font-bold">
                +1 Soldier (Mark)
              </span>
            )}

            {leoWildernessBonus > 0 && (
              <span className="bg-emerald-950 px-2.5 py-1 rounded text-emerald-200 border border-emerald-600 font-bold flex items-center gap-1">
                <TreePine className="w-3.5 h-3.5 text-emerald-400" />
                +1 Leo Guide
              </span>
            )}

            {extraCustomDice !== 0 && (
              <span className="bg-slate-800 px-2 py-1 rounded text-slate-300">
                {extraCustomDice > 0 ? `+${extraCustomDice}` : extraCustomDice} Mod
              </span>
            )}

            <span className="text-slate-400 font-bold text-sm mx-1">=</span>

            <span className="bg-amber-500/20 text-amber-300 border-2 border-amber-500/60 px-3 py-1 rounded-lg text-base font-bold shadow">
              {totalDicePool} DICE TOTAL
            </span>
          </div>

          {/* Rerolls Tracker */}
          <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-1">
              <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <Dices className="w-4 h-4 text-indigo-400" />
                Rerolls Remaining This Turn:
                <span className="font-mono text-sm font-black text-amber-300 ml-1">
                  {remainingRerollsThisTurn}
                </span>
              </span>

              <div className="text-[11px] text-slate-400 flex flex-wrap gap-2">
                {cardRerollsList.map((r, i) => (
                  <span key={i} className="text-amber-200">
                    • {r.source} (+{r.amount})
                  </span>
                ))}
                {cluesAvailable > 0 && <span className="text-emerald-300">• Clues: {cluesAvailable}</span>}
                {focusAvailable > 0 && <span className="text-sky-300">• Focus: {focusAvailable}</span>}
              </div>
            </div>

            <button
              onClick={onResetRerolls}
              title="Reset Turn Rerolls"
              className="self-start sm:self-auto px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Rerolls</span>
            </button>
          </div>
        </div>

        {/* Discard Confirmation Notice */}
        {discardNotice && (
          <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-600/50 text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{discardNotice}</span>
          </div>
        )}

        {/* Action Button: Roll Dice */}
        <div className="flex items-center justify-center">
          <button
            onClick={handleRollDice}
            disabled={isRolling}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 active:scale-98 text-white font-serif font-bold text-lg shadow-xl flex items-center justify-center gap-2.5 tracking-wide transition-all disabled:opacity-50 cursor-pointer"
          >
            <Dices className="w-6 h-6 animate-bounce" />
            <span>{isRolling ? 'Rolling Dice Pool...' : `Roll ${totalDicePool} Dice`}</span>
          </button>
        </div>

        {/* Dice Results Area */}
        {hasRolled && (
          <div className="bg-slate-850 p-4 rounded-xl border border-slate-750 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-750 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Results:
                </span>
                <span
                  className={`text-base font-bold font-serif ${
                    totalSuccesses > 0 ? 'text-amber-300' : 'text-rose-400'
                  }`}
                >
                  {totalSuccesses} Success{totalSuccesses === 1 ? '' : 'es'}
                </span>
                {totalSuccesses > 0 ? (
                  <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-700 px-2 py-0.5 rounded font-bold">
                    PASSED
                  </span>
                ) : (
                  <span className="text-xs bg-rose-950 text-rose-300 border border-rose-700 px-2 py-0.5 rounded font-bold">
                    FAILED
                  </span>
                )}
              </div>

              <div className="text-xs text-slate-400">
                {isBlessed ? '(Blessed: 4, 5, 6)' : isCursed ? '(Cursed: 6 only)' : '(Standard: 5, 6)'}
              </div>
            </div>

            {/* Render Each Die with Individual Reroll Ability */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
              {diceResults.map((die, idx) => (
                <div key={die.id} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono text-2xl font-black shadow-lg border-2 select-none transition-transform ${
                      die.isSuccess
                        ? 'bg-gradient-to-br from-amber-400 to-amber-600 border-amber-200 text-slate-950 shadow-amber-500/30 scale-105'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    {die.value}
                  </div>

                  {/* Reroll button for non-successes */}
                  {!die.isSuccess && (
                    <button
                      onClick={() => handleRerollSingleDie(idx)}
                      disabled={remainingRerollsThisTurn <= 0}
                      title="Click to reroll this die using available rerolls"
                      className="px-1.5 py-0.5 rounded bg-indigo-950 hover:bg-indigo-900 border border-indigo-700 text-[10px] font-bold text-indigo-200 disabled:opacity-20 cursor-pointer transition-colors"
                    >
                      Reroll
                    </button>
                  )}

                  {die.rerolled && (
                    <span className="text-[9px] text-amber-400 font-semibold">rerolled</span>
                  )}
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-400 text-center font-serif italic pt-1">
              Click &quot;Reroll&quot; beneath any failed die to spend an available reroll from cards, Clues, or Focus tokens.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
