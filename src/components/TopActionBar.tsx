import React, { useState } from 'react';
import {
  Users,
  Dices,
  BookOpen,
  Sparkles,
  ShieldAlert,
  PackageCheck,
  Skull,
  Package,
  ArrowLeft,
  RotateCcw,
  AlertTriangle,
  X
} from 'lucide-react';
import {
  InvestigatorState,
  InvestigatorStatic,
  PlayerSlot,
  FallenInvestigator,
  ExpansionCode
} from '../types';

interface Props {
  activeInvestigator: InvestigatorStatic;
  activeState: InvestigatorState;
  activePlayer?: PlayerSlot;
  players: PlayerSlot[];
  investigatorStates: Record<string, InvestigatorState>;
  fallenInvestigators: FallenInvestigator[];
  enabledExpansions: ExpansionCode[];
  poolRemainingCount: number;
  totalInvestigatorsCount: number;
  partyInvestigatorIds: string[];
  allInvestigators: InvestigatorStatic[];
  onSwitchInvestigator: (id: string) => void;
  onSwitchPlayer: (playerId: string) => void;
  onOpenPoolModal: () => void;
  onOpenSetupScreen: () => void;
  onOpenDeathModal: () => void;
  onHardReset: () => void;
  onScrollToTests?: () => void;
  onScrollToDeath?: () => void;
  onScrollToActionsRef?: () => void;
  onScrollToPossessions?: () => void;
}

export const TopActionBar: React.FC<Props> = ({
  activeInvestigator,
  activeState,
  activePlayer,
  players,
  investigatorStates,
  fallenInvestigators,
  enabledExpansions,
  poolRemainingCount,
  partyInvestigatorIds,
  allInvestigators,
  onSwitchInvestigator,
  onSwitchPlayer,
  onOpenPoolModal,
  onOpenSetupScreen,
  onOpenDeathModal,
  onHardReset,
  onScrollToTests,
  onScrollToDeath,
  onScrollToActionsRef,
  onScrollToPossessions,
}) => {
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const uncollectedFallen = fallenInvestigators.filter(
    (f) => !f.collected && (f.possessions.length > 0 || Object.values(f.tokens).some((v) => v > 0))
  );

  const handleConfirmReset = () => {
    setIsResetConfirmOpen(false);
    onHardReset();
  };

  return (
    <header className="w-full bg-[#090e1a] border-b border-slate-800 text-slate-100 select-none sticky top-0 z-30 shadow-xl">
      {/* Top Player Switcher Bar */}
      <div className="bg-[#0f172a] border-b border-slate-850 px-4 py-1.5 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 min-w-max">
          {/* Back to Setup Button + Active Players Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSetupScreen}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-550/20 hover:bg-amber-500/30 text-amber-300 hover:text-amber-100 border border-amber-500/50 text-xs font-serif font-bold transition-all shadow-sm"
              title="Return to Campaign & DLC Setup Screen"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Setup</span>
            </button>

            <div className="h-4 w-px bg-slate-700 mx-1" />

            <span className="text-[11px] font-serif font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Players:</span>
            </span>

            {players.map((p, idx) => {
              const inv = allInvestigators.find((i) => i.id === p.investigatorId) || allInvestigators[0];
              const pState = investigatorStates[p.investigatorId];
              const isCurrent = p.investigatorId === activeInvestigator.id;

              return (
                <button
                  key={p.id}
                  onClick={() => onSwitchPlayer(p.id)}
                  className={`flex items-center gap-2 px-3 py-1 rounded-xl text-xs transition-all font-serif ${
                    isCurrent
                      ? 'bg-amber-600 text-slate-950 font-bold shadow-md ring-1 ring-amber-400/80 scale-[1.02]'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-750'
                  }`}
                  title={`Switch to ${p.name} (${inv.name})`}
                >
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-mono font-bold text-white shadow-inner flex-shrink-0"
                    style={{ backgroundColor: inv.avatarColor }}
                  >
                    {idx + 1}
                  </div>
                  <span className="truncate max-w-[110px]">{p.name}</span>
                  <span className={`text-[10px] truncate max-w-[90px] ${isCurrent ? 'text-slate-900 font-semibold' : 'text-amber-400'}`}>
                    ({inv.name})
                  </span>
                  {pState && (
                    <span className={`text-[10px] font-mono ml-0.5 ${isCurrent ? 'text-slate-950 font-bold' : 'text-slate-400'}`}>
                      {pState.currentHealth}H/{pState.currentSanity}S
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Death & Succession + Hard Reset */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenDeathModal}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-serif font-bold transition-all ${
                uncollectedFallen.length > 0
                  ? 'bg-red-900/80 hover:bg-red-800 text-red-200 border border-red-600 animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 text-red-300 border border-slate-700'
              }`}
              title="Death, Defeat & Succession"
            >
              <Skull className="w-3.5 h-3.5 text-red-400" />
              <span>Death &amp; Succession</span>
              {uncollectedFallen.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-mono flex items-center justify-center font-bold">
                  {uncollectedFallen.length}
                </span>
              )}
            </button>

            {/* Hard Reset Button */}
            <button
              onClick={() => setIsResetConfirmOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-950/70 hover:bg-red-900 text-red-300 hover:text-red-100 text-xs font-serif font-bold border border-red-700/80 transition-all shadow-sm"
              title="Hard reset the expedition and return to fresh setup"
            >
              <RotateCcw className="w-3.5 h-3.5 text-red-400" />
              <span>Hard Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar: Current Investigator, Statuses, Jump Tools */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left: Active Investigator Title & Status Badges */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2.5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-serif font-black text-base shadow-inner flex-shrink-0"
              style={{ backgroundColor: activeInvestigator.avatarColor }}
            >
              {activeInvestigator.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold tracking-wide text-amber-200 block leading-tight">
                  {activeInvestigator.name}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-amber-400 border border-slate-700 font-mono">
                  {activePlayer?.name || 'Player'}
                </span>
              </div>
              <span className="text-xs text-slate-400 block font-sans">
                {activeInvestigator.title} • {activeInvestigator.expansion?.toUpperCase() || 'CORE'}
              </span>
            </div>
          </div>

          {/* Active status tags */}
          <div className="flex items-center gap-1.5">
            {activeState.isBlessed && (
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Blessed
              </span>
            )}
            {activeState.isCursed && (
              <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-700 text-xs font-bold flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" />
                Cursed
              </span>
            )}
            <span className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/70 text-xs font-medium hidden md:inline-flex items-center gap-1">
              <PackageCheck className="w-3.5 h-3.5 text-amber-400" />
              {activeState.possessions.length} Item{activeState.possessions.length === 1 ? '' : 's'}
            </span>
          </div>
        </div>

        {/* Right: Jump Navigation */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {onScrollToPossessions && (
            <button
              onClick={onScrollToPossessions}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 text-xs font-serif font-semibold transition-colors"
              title="Scroll to Possessions Inventory"
            >
              <Package className="w-3.5 h-3.5 text-amber-400" />
              <span>Possessions</span>
            </button>
          )}

          {onScrollToTests && (
            <button
              onClick={onScrollToTests}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-900/80 hover:bg-red-800 border border-red-600/60 text-white text-xs font-serif font-bold shadow transition-colors"
              title="Jump to Reroll &amp; Tests Console"
            >
              <Dices className="w-3.5 h-3.5 text-amber-300" />
              <span>Rerolls &amp; Tests</span>
            </button>
          )}

          {onScrollToDeath && (
            <button
              onClick={onScrollToDeath}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/80 hover:bg-red-900/90 border border-red-700/70 text-red-200 text-xs font-serif font-bold transition-colors"
              title="Scroll to Death &amp; Succession (Inherit Gear)"
            >
              <Skull className="w-3.5 h-3.5 text-red-400" />
              <span>Death &amp; Succession</span>
            </button>
          )}

          {onScrollToActionsRef && (
            <button
              onClick={onScrollToActionsRef}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 text-xs font-serif font-semibold transition-colors"
              title="Scroll to Actions Reference Guide"
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-400" />
              <span>Actions Guide</span>
            </button>
          )}

          <button
            onClick={onOpenPoolModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-950/70 hover:bg-amber-900/80 border border-amber-600/60 text-amber-200 text-xs font-serif font-medium transition-colors"
            title="Manage Investigator Pool &amp; Draft"
          >
            <span>Pool: {poolRemainingCount}</span>
          </button>
        </div>
      </div>

      {/* Hard Reset Confirmation Modal */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-red-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-red-950 text-red-400 border border-red-800 flex-shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-lg font-bold text-slate-100">
                  Perform Hard Reset?
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Are you sure you want to reset the expedition? This will wipe all current health, sanity, inventory items, clues, tokens, and fallen investigator records, returning you to the campaign setup screen.
                </p>
              </div>
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="text-slate-500 hover:text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-800">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-serif font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-serif font-bold transition-colors shadow-lg"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Confirm Hard Reset</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
