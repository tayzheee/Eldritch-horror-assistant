import React, { useState, useEffect, useMemo } from 'react';
import {
  Skull,
  Heart,
  Brain,
  Package,
  ArrowRight,
  Search,
  Sparkles,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Coins,
  Ticket,
  Focus,
  BookOpen,
  X,
  UserCheck,
  ShieldAlert,
  ArrowDownCircle
} from 'lucide-react';
import {
  InvestigatorStatic,
  InvestigatorState,
  FallenInvestigator,
  ExpansionCode,
  PlayerSlot
} from '../types';
import { SkillHighlightedText } from '../utils/textHighlight';

interface Props {
  activeInvestigator: InvestigatorStatic;
  activeState: InvestigatorState;
  activePlayer?: PlayerSlot;
  allInvestigators: InvestigatorStatic[];
  enabledExpansions: ExpansionCode[];
  fallenInvestigators: FallenInvestigator[];
  availablePoolInvestigators?: InvestigatorStatic[];
  onCollectInheritance: (fallenId: string, itemIds?: string | string[], takeTokens?: boolean) => void;
  onMarkDefeated: (cause: 'health' | 'sanity' | 'devoured', replacementId?: string, location?: string) => void;
  onSelectActiveInvestigator?: (id: string) => void;
}

export const DeathAndSuccessionSection: React.FC<Props> = ({
  activeInvestigator,
  activeState,
  activePlayer,
  allInvestigators,
  enabledExpansions,
  fallenInvestigators,
  availablePoolInvestigators = [],
  onCollectInheritance,
  onMarkDefeated,
  onSelectActiveInvestigator,
}) => {
  const [selectedInvestigatorId, setSelectedInvestigatorId] = useState(activeInvestigator.id);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'inheritance' | 'rules'>('inheritance');

  // Defeat Resolution State
  const isPendingDefeat = activeState.currentHealth <= 0 || activeState.currentSanity <= 0;
  const [isManualDeclareOpen, setIsManualDeclareOpen] = useState(false);
  const showDefeatResolver = isPendingDefeat || isManualDeclareOpen;

  const [defeatCause, setDefeatCause] = useState<'health' | 'sanity' | 'devoured'>('health');
  const [dropLocation, setDropLocation] = useState(
    activeState.location || activeInvestigator.startingLocation || 'Current Space'
  );
  const [selectedReplacementId, setSelectedReplacementId] = useState<string>('');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Automatically synchronize defeat cause when health/sanity depletes
  useEffect(() => {
    if (activeState.currentHealth <= 0) {
      setDefeatCause('health');
    } else if (activeState.currentSanity <= 0) {
      setDefeatCause('sanity');
    }
  }, [activeState.currentHealth, activeState.currentSanity]);

  // Synchronize drop location when active investigator changes
  useEffect(() => {
    setDropLocation(activeState.location || activeInvestigator.startingLocation || 'Current Space');
  }, [activeInvestigator.id, activeState.location, activeInvestigator.startingLocation]);

  const uncollectedFallen = fallenInvestigators.filter((f) => !f.collected);

  // Filtered investigator pool for death encounter rules reference
  const displayedInvestigators = useMemo(() => {
    const list = allInvestigators
      .filter((inv) => inv.isAdHoc || enabledExpansions.includes(inv.expansion || 'core'))
      .filter(
        (inv) =>
          inv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          inv.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const seen = new Set<string>();
    return list.filter((inv) => {
      if (seen.has(inv.id)) return false;
      seen.add(inv.id);
      return true;
    });
  }, [allInvestigators, enabledExpansions, searchQuery]);

  const viewedInvestigator =
    allInvestigators.find((i) => i.id === selectedInvestigatorId) || activeInvestigator;

  // Replacement choices: strictly unique, available pool without active character
  const replacementCandidates = useMemo(() => {
    const list = availablePoolInvestigators.filter((inv) => inv.id !== activeInvestigator.id);
    const seen = new Set<string>();
    return list.filter((inv) => {
      if (seen.has(inv.id)) return false;
      seen.add(inv.id);
      return true;
    });
  }, [availablePoolInvestigators, activeInvestigator.id]);

  const replacementPreview = useMemo(() => {
    return allInvestigators.find((inv) => inv.id === selectedReplacementId);
  }, [allInvestigators, selectedReplacementId]);

  // Auto-select first replacement candidate if none selected or currently selected is invalid
  useEffect(() => {
    if (replacementCandidates.length > 0) {
      if (!selectedReplacementId || !replacementCandidates.some((c) => c.id === selectedReplacementId)) {
        setSelectedReplacementId(replacementCandidates[0].id);
      }
    } else {
      setSelectedReplacementId('');
    }
  }, [replacementCandidates, selectedReplacementId]);

  // Current active encounter text based on selected cause
  const currentEncounterText = useMemo(() => {
    if (defeatCause === 'health') {
      return (
        activeInvestigator.defeatEncounter?.healthDefeat ||
        `${activeInvestigator.name} has suffered fatal physical trauma. Any investigator on this space may test Strength or Will to recover their equipment.`
      );
    }
    if (defeatCause === 'sanity') {
      return (
        activeInvestigator.defeatEncounter?.sanityDefeat ||
        `${activeInvestigator.name}'s mind has collapsed into complete delirium. Any investigator on this space may test Will or Influence to calm their trance and recover their belongings.`
      );
    }
    return `${activeInvestigator.name} was devoured by the cosmic abyss. Their physical form and consciousness were erased from this dimension. All possessions are lost forever.`;
  }, [defeatCause, activeInvestigator]);

  const handleConfirmDefeat = () => {
    const finalLocation = dropLocation.trim() || activeState.location || activeInvestigator.startingLocation || 'Current Space';
    onMarkDefeated(defeatCause, selectedReplacementId || undefined, finalLocation);
    setIsManualDeclareOpen(false);
    setSelectedReplacementId('');
    setFeedbackMessage(
      `Defeat resolved! ${activeInvestigator.name}'s possessions have been placed on ${finalLocation}.`
    );
    setTimeout(() => setFeedbackMessage(null), 6000);
  };

  return (
    <div id="death-and-succession-section" className="w-full bg-[#101726] border border-red-950/80 rounded-2xl shadow-2xl p-5 text-slate-200 space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-950 text-red-400 border border-red-800/80 shadow-md">
            <Skull className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-serif text-xl font-bold tracking-wide text-red-100">
                Death, Defeat &amp; Gear Succession
              </h3>
              {isPendingDefeat && (
                <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-xs font-mono font-bold animate-pulse shadow-sm">
                  Defeat Pending Resolution!
                </span>
              )}
              {uncollectedFallen.length > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-600/90 text-slate-950 text-xs font-mono font-bold">
                  {uncollectedFallen.length} Dropped Gear on Board
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Recover dropped possessions from fallen investigators and resolve death tests (<strong className="text-amber-300 font-bold">Lore</strong>, <strong className="text-amber-300 font-bold">Influence</strong>, <strong className="text-amber-300 font-bold">Observation</strong>, <strong className="text-amber-300 font-bold">Strength</strong>, <strong className="text-amber-300 font-bold">Will</strong>).
            </p>
          </div>
        </div>

        {/* Action buttons & View switcher */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800">
            <button
              onClick={() => setActiveTab('inheritance')}
              className={`px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'inheritance'
                  ? 'bg-red-700 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Inherit Gear ({uncollectedFallen.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'rules'
                  ? 'bg-amber-600 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Encounter Rules</span>
            </button>
          </div>

          {!showDefeatResolver && (
            <button
              onClick={() => setIsManualDeclareOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-red-900/90 hover:bg-red-800 text-red-200 hover:text-white border border-red-600 text-xs font-serif font-bold transition-all shadow flex items-center gap-1.5"
            >
              <Skull className="w-3.5 h-3.5" />
              <span>Declare Defeat</span>
            </button>
          )}
        </div>
      </div>

      {/* SUCCESS / ACTION FEEDBACK BANNER */}
      {feedbackMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/80 text-emerald-200 text-xs flex items-center gap-2.5 shadow-lg animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span className="font-serif font-medium">{feedbackMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* INLINE DEFEAT & GEAR RESOLUTION CONSOLE (REPLACING MODAL POPUP) */}
      {/* ========================================================================= */}
      {showDefeatResolver && (
        <div className="rounded-2xl border-2 border-red-600/90 bg-[#0c1322] shadow-2xl p-4 sm:p-5 space-y-4 ring-1 ring-red-500/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-red-900/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-950 border border-red-600 flex items-center justify-center text-red-400 shadow">
                <Skull className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-serif font-bold text-base text-red-100">
                    Resolve Defeat &amp; Drop Possessions
                  </h4>
                  {isPendingDefeat ? (
                    <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                      {activeState.currentHealth <= 0 && activeState.currentSanity <= 0
                        ? 'Health & Sanity 0'
                        : activeState.currentHealth <= 0
                        ? 'Crippled (0 HP)'
                        : 'Insane (0 SAN)'}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-amber-600 text-slate-950 text-[10px] font-mono font-bold uppercase tracking-wider">
                      Manual Declaration
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400">
                  {activePlayer?.name || 'Active Player'} • {activeInvestigator.name} ({activeInvestigator.title})
                </p>
              </div>
            </div>

            {isManualDeclareOpen && !isPendingDefeat && (
              <button
                onClick={() => setIsManualDeclareOpen(false)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-serif flex items-center gap-1 self-start sm:self-auto"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>
            )}
          </div>

          {/* Active Investigator Stats & Avatar Strip */}
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-serif font-black text-base shadow-inner flex-shrink-0"
                style={{ backgroundColor: activeInvestigator.avatarColor }}
              >
                {activeInvestigator.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <span className="font-serif font-bold text-sm text-slate-100 block">
                  {activeInvestigator.name}
                </span>
                <span className="text-xs text-slate-400">
                  Starting Board Space: <strong className="text-amber-400">{activeInvestigator.startingLocation}</strong>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className={`font-bold ${activeState.currentHealth <= 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                {activeState.currentHealth} / {activeState.maxHealth} Health
              </span>
              <span className={`font-bold ${activeState.currentSanity <= 0 ? 'text-red-400' : 'text-blue-400'}`}>
                {activeState.currentSanity} / {activeState.maxSanity} Sanity
              </span>
            </div>
          </div>

          {/* Grid: Cause Selection & Drop Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cause Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-slate-300">
                Cause of Defeat
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setDefeatCause('health')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    defeatCause === 'health'
                      ? 'bg-red-950/80 border-red-500 text-red-100 shadow-md ring-1 ring-red-500'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-serif font-bold text-xs">
                    <Heart className="w-3.5 h-3.5 text-red-400 fill-red-500/20" />
                    <span>Crippled</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Health drops to 0</p>
                </button>

                <button
                  type="button"
                  onClick={() => setDefeatCause('sanity')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    defeatCause === 'sanity'
                      ? 'bg-blue-950/80 border-blue-500 text-blue-100 shadow-md ring-1 ring-blue-500'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-serif font-bold text-xs">
                    <Brain className="w-3.5 h-3.5 text-blue-400 fill-blue-500/20" />
                    <span>Insane</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Sanity drops to 0</p>
                </button>

                <button
                  type="button"
                  onClick={() => setDefeatCause('devoured')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    defeatCause === 'devoured'
                      ? 'bg-purple-950/80 border-purple-500 text-purple-100 shadow-md ring-1 ring-purple-500'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-serif font-bold text-xs">
                    <Skull className="w-3.5 h-3.5 text-purple-400" />
                    <span>Devoured</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Cosmic void (No gear drops)</p>
                </button>
              </div>
            </div>

            {/* Drop Location on Board */}
            <div className="space-y-2">
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-slate-300">
                Board Space Where Defeated
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-red-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={dropLocation}
                  onChange={(e) => setDropLocation(e.target.value)}
                  placeholder="e.g. Buenos Aires, San Francisco, Space 14..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 font-serif focus:outline-none focus:border-red-500"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Possessions will be dropped here for surviving investigators to encounter and claim.
              </p>
            </div>
          </div>

          {/* Official Defeat Encounter Test Rules Preview */}
          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/60 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Official Defeat Encounter Text on Board Space:</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-serif italic">
              &quot;<SkillHighlightedText text={currentEncounterText} />&quot;
            </p>
          </div>

          {/* Possessions & Tokens to be Dropped */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-serif font-bold uppercase tracking-wider text-slate-300">
              <span>
                Possessions Dropped on Space ({activeState.possessions.length} Items &amp; Clues)
              </span>
              {defeatCause === 'devoured' && (
                <span className="text-purple-400 text-[11px] normal-case italic font-sans font-normal">
                  All items will be lost to the cosmic abyss
                </span>
              )}
            </div>

            {activeState.possessions.length === 0 ? (
              <p className="text-xs text-slate-500 italic p-2 rounded-lg bg-slate-900/50 border border-slate-800">
                No possessions currently equipped in inventory.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto p-2 bg-slate-900/60 rounded-xl border border-slate-800">
                {activeState.possessions.map((card) => (
                  <span
                    key={card.id}
                    className={`px-2.5 py-1 rounded-lg text-xs font-serif border flex items-center gap-1.5 ${
                      defeatCause === 'devoured'
                        ? 'bg-purple-950/40 border-purple-800/60 text-purple-300 line-through opacity-70'
                        : 'bg-slate-900 border-slate-700 text-slate-200'
                    }`}
                  >
                    <Package className="w-3 h-3 text-amber-400" />
                    <span>{card.name}</span>
                    <span className="text-[10px] text-amber-400 uppercase">({card.type})</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Replacement Investigator Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-slate-300">
                Select Replacement Investigator for {activePlayer?.name || 'Player'}
              </label>
              <span className="text-[11px] text-amber-400 font-mono">
                {replacementCandidates.length} Available in Pool
              </span>
            </div>

            <select
              value={selectedReplacementId}
              onChange={(e) => setSelectedReplacementId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs font-serif font-semibold focus:outline-none focus:border-amber-500"
            >
              <option value="">-- No replacement immediately (Observe game) --</option>
              {replacementCandidates.map((inv) => (
                <option key={inv.id} value={inv.id}>
                  {inv.name} — {inv.title} ({inv.expansion?.toUpperCase() || 'CORE'})
                </option>
              ))}
            </select>

            {/* Replacement Preview Cardlet */}
            {replacementPreview && (
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-750 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-serif font-bold text-xs shadow-inner"
                    style={{ backgroundColor: replacementPreview.avatarColor }}
                  >
                    {replacementPreview.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <span className="font-serif font-bold text-slate-200 block">
                      {replacementPreview.name}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Enters game on: <strong className="text-amber-400">{replacementPreview.startingLocation}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 font-mono text-[11px]">
                  <span className="text-emerald-400 font-bold">{replacementPreview.health} HP</span>
                  <span className="text-blue-400 font-bold">{replacementPreview.sanity} SAN</span>
                </div>
              </div>
            )}
          </div>

          {/* Action Confirm Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={handleConfirmDefeat}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-600 text-white font-serif font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <Skull className="w-4 h-4" />
              <span>
                Confirm Defeat &amp; Drop Possessions on {dropLocation.trim() || 'Current Space'}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: INHERITANCE / DROPPED GEAR ON BOARD */}
      {/* ========================================================================= */}
      {activeTab === 'inheritance' && (
        <div className="space-y-4">
          {fallenInvestigators.length === 0 ? (
            <div className="p-6 rounded-2xl bg-[#0b101c] border border-slate-800/80 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-slate-500 mx-auto border border-slate-800">
                <Skull className="w-6 h-6 text-slate-500" />
              </div>
              <div className="max-w-md mx-auto">
                <h4 className="font-serif font-bold text-slate-200 text-base">
                  No Fallen Investigators Yet
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                  When an investigator is defeated (0 Health or 0 Sanity), their investigator token and possessions stay on their current space. Any companion on that space can resolve their Defeat Encounter to collect their weapons, items, spells, and tokens.
                </p>
              </div>
              {!showDefeatResolver && (
                <button
                  onClick={() => setIsManualDeclareOpen(true)}
                  className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-red-300 hover:text-white border border-slate-700 text-xs font-serif font-semibold transition-colors"
                >
                  Declare Defeat Manually
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <span className="text-xs font-serif font-bold uppercase tracking-wider text-slate-400 block">
                Fallen Investigators on the World Map (Possessions Available to Claim)
              </span>

              <div className="grid grid-cols-1 gap-4">
                {fallenInvestigators.map((fallen) => {
                  const inv = allInvestigators.find((i) => i.id === fallen.investigatorId) || allInvestigators[0];
                  const hasGear = fallen.possessions.length > 0;
                  const hasTokens = Object.values(fallen.tokens).some((v) => v > 0);

                  return (
                    <div
                      key={fallen.id}
                      className={`rounded-2xl border p-4 transition-all ${
                        fallen.collected
                          ? 'bg-slate-900/40 border-slate-800 opacity-60'
                          : 'bg-[#0d1424] border-red-900/70 shadow-xl ring-1 ring-red-500/20'
                      }`}
                    >
                      {/* Top info */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-serif font-black text-base shadow-inner flex-shrink-0"
                            style={{ backgroundColor: inv.avatarColor }}
                          >
                            {inv.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-serif font-bold text-base text-slate-100">
                                {inv.name}
                              </h4>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-amber-300 border border-slate-700 font-mono">
                                {fallen.playerName}
                              </span>
                              {fallen.cause === 'devoured' ? (
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800 font-bold uppercase">
                                  Devoured
                                </span>
                              ) : fallen.cause === 'health' ? (
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold uppercase">
                                  Crippled (0 HP)
                                </span>
                              ) : (
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-950 text-blue-300 border border-blue-800 font-bold uppercase">
                                  Insane (0 SAN)
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                              <MapPin className="w-3.5 h-3.5 text-red-400" />
                              <span>Fell at: <strong className="text-slate-200">{fallen.location}</strong></span>
                            </div>
                          </div>
                        </div>

                        {/* Action status */}
                        <div>
                          {fallen.collected ? (
                            <span className="flex items-center gap-1 text-xs text-emerald-400 font-serif font-bold">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Possessions Recovered</span>
                            </span>
                          ) : fallen.cause === 'devoured' ? (
                            <span className="text-xs text-purple-400 italic">
                              Devoured: belongings lost to the abyss
                            </span>
                          ) : (
                            <button
                              onClick={() => onCollectInheritance(fallen.id)}
                              className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-serif font-bold text-xs shadow-md hover:scale-[1.02] transition-all flex items-center gap-1.5"
                            >
                              <Package className="w-3.5 h-3.5" />
                              <span>Inherit All to {activeInvestigator.name}</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Defeat Encounter Rule with Bold & Enlarged Skill Keywords */}
                      <div className="py-3 px-3.5 my-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                        <span className="text-[11px] font-serif font-bold text-amber-300 uppercase tracking-wider block mb-1">
                          Official Defeat Encounter Text:
                        </span>
                        <p className="text-xs text-slate-300 font-serif leading-relaxed italic">
                          &quot;<SkillHighlightedText text={fallen.defeatText} />&quot;
                        </p>
                      </div>

                      {/* Dropped Possessions Cards & Tokens */}
                      {!fallen.collected && (hasGear || hasTokens) && (
                        <div className="space-y-2 pt-1">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                            Possessions Dropped on {fallen.location}:
                          </span>

                          <div className="flex flex-wrap gap-2">
                            {/* Dropped Items */}
                            {fallen.possessions.map((card) => (
                              <div
                                key={card.id}
                                className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs"
                              >
                                <div>
                                  <span className="font-serif font-bold text-slate-100">{card.name}</span>
                                  <span className="text-[10px] text-amber-400 uppercase ml-1">({card.type})</span>
                                </div>
                                <button
                                  onClick={() => onCollectInheritance(fallen.id, [card.id], false)}
                                  className="text-[10px] px-2 py-0.5 rounded bg-amber-600/80 hover:bg-amber-500 text-slate-950 font-bold transition-colors"
                                  title={`Take ${card.name} only`}
                                >
                                  Take
                                </button>
                              </div>
                            ))}

                            {/* Dropped Tokens */}
                            {hasTokens && (
                              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono flex-wrap">
                                <span className="text-slate-400">Tokens:</span>
                                {fallen.tokens.focus > 0 && <span className="text-cyan-300">{fallen.tokens.focus} Focus</span>}
                                {fallen.tokens.clues > 0 && <span className="text-emerald-300">{fallen.tokens.clues} Clues</span>}
                                {fallen.tokens.trainTickets > 0 && <span className="text-blue-300">{fallen.tokens.trainTickets} Train</span>}
                                {fallen.tokens.shipTickets > 0 && <span className="text-indigo-300">{fallen.tokens.shipTickets} Ship</span>}
                                {fallen.tokens.resources > 0 && <span className="text-amber-300">{fallen.tokens.resources} Res</span>}
                                <button
                                  onClick={() => onCollectInheritance(fallen.id, [], true)}
                                  className="text-[10px] px-2 py-0.5 rounded bg-cyan-700 hover:bg-cyan-600 text-white font-bold ml-1 transition-colors"
                                  title="Take all dropped tokens"
                                >
                                  Take Tokens
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: OFFICIAL ENCOUNTER RULES CATALOG */}
      {/* ========================================================================= */}
      {activeTab === 'rules' && (
        <div className="space-y-4">
          {/* Search & Investigator Picker */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search investigator death encounter rules..."
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
            </div>

            <select
              value={viewedInvestigator.id}
              onChange={(e) => setSelectedInvestigatorId(e.target.value)}
              className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs font-serif font-semibold focus:outline-none focus:border-red-500"
            >
              {displayedInvestigators.map((inv) => (
                <option key={inv.id} value={inv.id}>
                  {inv.name} ({inv.isAdHoc ? 'CUSTOM' : inv.expansion?.toUpperCase() || 'CORE'})
                </option>
              ))}
            </select>
          </div>

          {/* Selected Investigator Card */}
          <div className="p-4 rounded-2xl bg-[#0d1424] border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-3 flex-wrap">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-serif font-black text-lg shadow-inner flex-shrink-0"
                  style={{ backgroundColor: viewedInvestigator.avatarColor }}
                >
                  {viewedInvestigator.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-slate-100">
                    {viewedInvestigator.name}
                  </h4>
                  <p className="text-xs text-amber-400 font-serif">
                    {viewedInvestigator.title} • {viewedInvestigator.isAdHoc ? 'AD-HOC CUSTOM' : `${viewedInvestigator.expansion?.toUpperCase() || 'CORE'} EXPANSION`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1 text-emerald-400 font-bold">
                  <Heart className="w-3.5 h-3.5 fill-emerald-500/20" />
                  <span>{viewedInvestigator.health} HP</span>
                </span>
                <span className="flex items-center gap-1 text-blue-400 font-bold">
                  <Brain className="w-3.5 h-3.5 fill-blue-500/20" />
                  <span>{viewedInvestigator.sanity} SAN</span>
                </span>
              </div>
            </div>

            {/* Health Defeat Encounter */}
            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-900/60 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-red-300">
                <Heart className="w-3.5 h-3.5 text-red-400 fill-red-500/20" />
                <span>Physical Defeat Encounter (Health Drops to 0 / Crippled):</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-serif">
                &quot;
                <SkillHighlightedText
                  text={
                    viewedInvestigator.defeatEncounter?.healthDefeat ||
                    `${viewedInvestigator.name} is incapacitated by physical wounds. Any companion on their space may test Observation or Strength to search their gear and claim their possessions.`
                  }
                />
                &quot;
              </p>
            </div>

            {/* Sanity Defeat Encounter */}
            <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-900/60 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-blue-300">
                <Brain className="w-3.5 h-3.5 text-blue-400 fill-blue-500/20" />
                <span>Insane Encounter (Sanity Drops to 0 / Madness):</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-serif">
                &quot;
                <SkillHighlightedText
                  text={
                    viewedInvestigator.defeatEncounter?.sanityDefeat ||
                    `${viewedInvestigator.name} has retreated into catatonic hysteria. Any companion on their space may test Lore or Will or Influence to calm their delirium and retrieve their equipment.`
                  }
                />
                &quot;
              </p>
            </div>

            {/* Devoured Rule */}
            <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-900/60 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-purple-300">
                <Skull className="w-3.5 h-3.5 text-purple-400" />
                <span>Devoured Rule:</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-serif italic">
                &quot;If {viewedInvestigator.name} is devoured, their body and mind are obliterated by the Ancient One. Their token and all possessions are returned to the game box; companions cannot recover any gear.&quot;
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
