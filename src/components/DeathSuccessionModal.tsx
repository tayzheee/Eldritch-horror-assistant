import React, { useState, useEffect, useMemo } from 'react';
import {
  Skull,
  Heart,
  Brain,
  Sparkles,
  Package,
  Check,
  X,
  AlertTriangle,
  ArrowDownCircle,
  HelpCircle,
  UserPlus
} from 'lucide-react';
import {
  InvestigatorStatic,
  InvestigatorState,
  FallenInvestigator,
  PlayerSlot
} from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activeInvestigator: InvestigatorStatic;
  activeState: InvestigatorState;
  activePlayer?: PlayerSlot;
  availableInvestigators: InvestigatorStatic[];
  fallenInvestigators: FallenInvestigator[];
  onMarkDefeated: (cause: 'health' | 'sanity' | 'devoured', replacementId?: string) => void;
  onCollectInheritance: (fallenId: string, cardId?: string) => void;
}

export const DeathSuccessionModal: React.FC<Props> = ({
  isOpen,
  onClose,
  activeInvestigator,
  activeState,
  activePlayer,
  availableInvestigators,
  fallenInvestigators,
  onMarkDefeated,
  onCollectInheritance,
}) => {
  const [cause, setCause] = useState<'health' | 'sanity' | 'devoured'>('health');
  const [replacementId, setReplacementId] = useState<string>('');
  const [viewMode, setViewMode] = useState<'declare' | 'fallen_list'>('declare');

  // Strictly deduplicate replacement candidates and exclude the active investigator
  const candidateInvestigators = useMemo(() => {
    const seen = new Set<string>();
    return (availableInvestigators || []).filter((inv) => {
      if (!inv || !inv.id) return false;
      if (inv.id === activeInvestigator.id) return false;
      if (seen.has(inv.id)) return false;
      seen.add(inv.id);
      return true;
    });
  }, [availableInvestigators, activeInvestigator.id]);

  // Sync replacementId when modal opens or candidates change
  useEffect(() => {
    if (isOpen) {
      if (candidateInvestigators.length > 0) {
        setReplacementId((prev) => {
          if (prev && candidateInvestigators.some((c) => c.id === prev)) {
            return prev;
          }
          return candidateInvestigators[0].id;
        });
      } else {
        setReplacementId('');
      }
      setCause('health');
    }
  }, [isOpen, candidateInvestigators]);

  const replacementPreview = useMemo(() => {
    return candidateInvestigators.find((c) => c.id === replacementId) || null;
  }, [candidateInvestigators, replacementId]);

  if (!isOpen) return null;

  const currentEncounterText =
    cause === 'health'
      ? activeInvestigator.defeatEncounter?.healthDefeat ||
        `${activeInvestigator.name} has succumbed to physical trauma. Place their investigator token and possessions on this space. Any investigator on this space may encounter them to collect their belongings.`
      : cause === 'sanity'
      ? activeInvestigator.defeatEncounter?.sanityDefeat ||
        `${activeInvestigator.name} has been overwhelmed by cosmic madness. Place their investigator token and possessions on this space. Any investigator on this space may calm them and collect their belongings.`
      : `${activeInvestigator.name} was devoured by the Ancient One. Their mind and body are consumed by the void; all their possessions are lost forever.`;

  const uncollectedFallen = fallenInvestigators.filter(
    (f) => !f.collected && (f.possessions.length > 0 || Object.values(f.tokens).some((v) => v > 0))
  );

  const handleConfirmDefeat = () => {
    onMarkDefeated(cause, replacementId || undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#0c1220] border-2 border-red-900/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-red-950/80 via-slate-900 to-slate-900 border-b border-red-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-950 text-red-400 border border-red-800">
              <Skull className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-slate-100">
                Death, Defeat &amp; Possession Succession
              </h2>
              <p className="text-xs text-slate-400">
                Official rules for defeated investigators and surviving companions
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 text-xs font-serif font-bold">
          <button
            onClick={() => setViewMode('declare')}
            className={`flex-1 py-2.5 px-4 text-center transition-colors ${
              viewMode === 'declare'
                ? 'bg-red-950/40 text-red-300 border-b-2 border-red-500'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Declare Defeat ({activeInvestigator.name})
          </button>
          <button
            onClick={() => setViewMode('fallen_list')}
            className={`flex-1 py-2.5 px-4 text-center transition-colors flex items-center justify-center gap-1.5 ${
              viewMode === 'fallen_list'
                ? 'bg-amber-950/40 text-amber-300 border-b-2 border-amber-500'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Fallen Possessions on Board</span>
            {uncollectedFallen.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-mono flex items-center justify-center font-bold">
                {uncollectedFallen.length}
              </span>
            )}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {viewMode === 'declare' ? (
            <>
              {/* Active Investigator Defeat Header */}
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-serif font-black text-lg shadow-inner flex-shrink-0"
                    style={{ backgroundColor: activeInvestigator.avatarColor }}
                  >
                    {activeInvestigator.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-slate-100">
                      {activeInvestigator.name}
                    </h3>
                    <p className="text-xs text-amber-400/90 font-serif">
                      {activePlayer?.name || 'Player'} • {activeInvestigator.title}
                    </p>
                  </div>
                </div>

                <div className="text-right text-xs font-mono">
                  <span className="block text-emerald-400 font-bold">
                    {activeState.currentHealth} / {activeState.maxHealth} Health
                  </span>
                  <span className="block text-blue-400 font-bold">
                    {activeState.currentSanity} / {activeState.maxSanity} Sanity
                  </span>
                </div>
              </div>

              {/* Cause Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-serif font-bold uppercase tracking-wider text-slate-300">
                  Cause of Defeat
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setCause('health')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      cause === 'health'
                        ? 'bg-red-950/70 border-red-600 text-red-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-serif font-bold text-xs">
                      <Heart className="w-3.5 h-3.5 text-red-400 fill-red-500/20" />
                      <span>Crippled / Dead</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Health drops to 0</p>
                  </button>

                  <button
                    onClick={() => setCause('sanity')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      cause === 'sanity'
                        ? 'bg-blue-950/70 border-blue-600 text-blue-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-serif font-bold text-xs">
                      <Brain className="w-3.5 h-3.5 text-blue-400 fill-blue-500/20" />
                      <span>Insane / Comatose</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Sanity drops to 0</p>
                  </button>

                  <button
                    onClick={() => setCause('devoured')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      cause === 'devoured'
                        ? 'bg-purple-950/70 border-purple-600 text-purple-200'
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

              {/* Official Defeat Encounter Instructions */}
              <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-800/60 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-amber-300">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Official Defeat Encounter Rule for {activeInvestigator.name}:</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-serif">
                  {currentEncounterText}
                </p>
              </div>

              {/* Dropped Belongings Preview */}
              <div className="space-y-2">
                <label className="block text-xs font-serif font-bold uppercase tracking-wider text-slate-300">
                  Belongings Dropped on Space ({activeState.possessions.length} Items &amp; Clues)
                </label>
                {activeState.possessions.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No possessions currently equipped.</p>
                ) : (
                  <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">
                    {activeState.possessions.map((card) => (
                      <span
                        key={card.id}
                        className="px-2 py-1 rounded-lg bg-slate-900 text-slate-200 text-xs border border-slate-700 font-serif"
                      >
                        {card.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Successor Investigator Draft */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-serif font-bold uppercase tracking-wider text-slate-300">
                    Select Replacement Investigator for {activePlayer?.name || 'Player'}
                  </label>
                  <span className="text-[11px] text-amber-400 font-mono font-semibold">
                    {candidateInvestigators.length} Available in Reserve Pool
                  </span>
                </div>

                <select
                  value={replacementId}
                  onChange={(e) => setReplacementId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs font-serif font-semibold focus:outline-none focus:border-amber-500"
                >
                  <option value="">-- No replacement immediately (Observe game) --</option>
                  {candidateInvestigators.map((inv) => (
                    <option key={inv.id} value={inv.id}>
                      {inv.name} — {inv.title} ({inv.expansion?.toUpperCase() || 'CORE'})
                    </option>
                  ))}
                </select>

                {/* Replacement Preview Cardlet */}
                {replacementPreview && (
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-serif font-bold text-xs shadow-inner flex-shrink-0"
                        style={{ backgroundColor: replacementPreview.avatarColor }}
                      >
                        {replacementPreview.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-serif font-bold text-slate-200 block truncate">
                            {replacementPreview.name}
                          </span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono uppercase">
                            {replacementPreview.expansion?.toUpperCase() || 'CORE'}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 block truncate">
                          Starts on: <strong className="text-amber-400">{replacementPreview.startingLocation}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="flex items-center gap-1.5 font-semibold text-xs">
                        <span className="flex items-center gap-0.5 text-rose-400">
                          <Heart className="w-3 h-3 fill-rose-500" />
                          {replacementPreview.health}
                        </span>
                        <span className="flex items-center gap-0.5 text-sky-400">
                          <Brain className="w-3 h-3 text-sky-400" />
                          {replacementPreview.sanity}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* TAB 2: UNCOLLECTED FALLEN POSSESSIONS ON BOARD */
            <div className="space-y-4">
              <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                When an investigator travels to a space containing a fallen companion, they can resolve the Defeat Encounter to collect the fallen investigator&apos;s dropped equipment and tokens.
              </div>

              {fallenInvestigators.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs font-serif italic">
                  No investigators have fallen yet in this campaign.
                </div>
              ) : (
                <div className="space-y-3">
                  {fallenInvestigators.map((fallen) => (
                    <div
                      key={fallen.id}
                      className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-serif font-bold text-sm text-slate-100">
                              {fallen.playerName}&apos;s Investigator
                            </span>
                            <span
                              className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold uppercase ${
                                fallen.cause === 'health'
                                  ? 'bg-red-950 text-red-300 border border-red-800'
                                  : fallen.cause === 'sanity'
                                  ? 'bg-blue-950 text-blue-300 border border-blue-800'
                                  : 'bg-purple-950 text-purple-300 border border-purple-800'
                              }`}
                            >
                              {fallen.cause}
                            </span>
                          </div>
                          <p className="text-xs text-amber-400 font-serif mt-0.5">
                            Fell on: {fallen.location || 'Unknown Space'}
                          </p>
                        </div>

                        {!fallen.collected && fallen.possessions.length > 0 && (
                          <button
                            onClick={() => onCollectInheritance(fallen.id)}
                            className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-serif font-bold text-xs shadow transition-all flex items-center gap-1"
                          >
                            <ArrowDownCircle className="w-3.5 h-3.5" />
                            <span>Inherit All ({activeInvestigator.name})</span>
                          </button>
                        )}
                      </div>

                      {/* Defeat encounter text */}
                      <p className="text-xs text-slate-400 font-serif italic bg-slate-950/60 p-2.5 rounded-lg border border-slate-850">
                        &quot;{fallen.defeatText}&quot;
                      </p>

                      {/* Dropped items */}
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                          Belongings on Space ({fallen.possessions.length} items):
                        </span>
                        {fallen.possessions.length === 0 ? (
                          <p className="text-xs text-slate-500 italic">
                            All possessions have been collected.
                          </p>
                        ) : (
                          <div className="flex flex-wrap gap-1.5">
                            {fallen.possessions.map((card) => (
                              <button
                                key={card.id}
                                onClick={() => onCollectInheritance(fallen.id, card.id)}
                                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700 font-serif flex items-center gap-1 transition-colors"
                                title="Click to take this specific item"
                              >
                                <span>{card.name}</span>
                                <span className="text-[9px] text-amber-400 uppercase">({card.type})</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {viewMode === 'declare' && (
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-serif text-xs font-semibold"
            >
              Cancel
            </button>

            <button
              onClick={handleConfirmDefeat}
              className="px-5 py-2 rounded-xl bg-red-700 hover:bg-red-600 text-white font-serif font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 transition-all"
            >
              <Skull className="w-4 h-4" />
              <span>Confirm Defeat &amp; Drop Possessions</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
