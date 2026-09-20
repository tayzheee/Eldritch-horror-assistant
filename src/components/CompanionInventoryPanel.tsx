import React, { useRef } from 'react';
import {
  Users,
  ChevronLeft,
  ChevronRight,
  Heart,
  Brain,
  Shield,
  ArrowRightLeft,
  Eye,
  Sparkles,
  Package
} from 'lucide-react';
import {
  PlayerSlot,
  InvestigatorStatic,
  InvestigatorState,
  PossessionCard
} from '../types';

interface Props {
  activeInvestigatorId: string;
  players: PlayerSlot[];
  partyInvestigatorIds: string[];
  allInvestigators: InvestigatorStatic[];
  investigatorStates: Record<string, InvestigatorState>;
  onSwitchInvestigator: (id: string) => void;
  onTradeItem?: (cardId: string, targetInvestigatorId: string) => void;
}

export const CompanionInventoryPanel: React.FC<Props> = ({
  activeInvestigatorId,
  players,
  partyInvestigatorIds,
  allInvestigators,
  investigatorStates,
  onSwitchInvestigator,
  onTradeItem,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -360 : 360;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Companions (party members)
  const companions = partyInvestigatorIds.map((id) => {
    const inv = allInvestigators.find((i) => i.id === id) || allInvestigators[0];
    const state = investigatorStates[id];
    const player = players.find((p) => p.investigatorId === id);
    return {
      id,
      inv,
      state,
      player,
      isActive: id === activeInvestigatorId,
    };
  });

  return (
    <div className="w-full bg-[#111827] border border-slate-700/80 rounded-2xl shadow-2xl p-5 text-slate-200 space-y-3">
      {/* Header with Side-to-Side scroll controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700/60">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-slate-800 text-amber-400 border border-slate-700">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-xl font-bold tracking-wide text-slate-100">
                Party Companions &amp; Inventory
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 font-mono text-xs font-bold border border-slate-700">
                {companions.length} Investigators
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Scroll side-to-side to view your companions&apos; health, tokens, and held possessions.
            </p>
          </div>
        </div>

        {/* Scroll arrows */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <span className="text-[11px] text-slate-400 font-mono mr-1">↔ Scroll</span>
          <button
            onClick={() => scroll('left')}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Side-to-Side Horizontal Track */}
      <div
        ref={scrollRef}
        className="flex flex-row gap-4 overflow-x-auto pb-3 pt-1 px-1 scroll-smooth snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#475569 #0f172a',
        }}
      >
        {companions.map(({ id, inv, state, player, isActive }) => {
          if (!state) return null;
          const possessions = state.possessions || [];

          return (
            <div
              key={id}
              className={`w-80 sm:w-96 flex-shrink-0 snap-start rounded-2xl border-2 transition-all flex flex-col justify-between overflow-hidden shadow-xl ${
                isActive
                  ? 'bg-gradient-to-b from-[#17223b] to-[#0f172a] border-amber-500 shadow-amber-950/30 ring-1 ring-amber-500/50'
                  : 'bg-[#101726] border-slate-750 hover:border-slate-600'
              }`}
            >
              {/* Companion Card Header */}
              <div className="p-3.5 border-b border-slate-850 bg-slate-900/60 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-serif font-black text-lg shadow-inner flex-shrink-0"
                    style={{ backgroundColor: inv.avatarColor }}
                  >
                    {inv.name.substring(0, 2).toUpperCase()}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-serif font-bold text-sm text-slate-100 leading-tight">
                        {inv.name}
                      </h4>
                      {isActive && (
                        <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.2 rounded font-bold uppercase">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-amber-400/90 font-serif">
                      {player?.name || 'Player'} • {inv.title}
                    </p>
                  </div>
                </div>

                {!isActive && (
                  <button
                    onClick={() => onSwitchInvestigator(id)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-serif font-semibold border border-slate-700 transition-colors flex items-center gap-1"
                    title="Switch to this companion"
                  >
                    <span>Switch</span>
                  </button>
                )}
              </div>

              {/* Stats & Tokens Strip */}
              <div className="p-3 bg-slate-950/40 border-b border-slate-800/80 space-y-2 text-xs">
                {/* Health & Sanity */}
                <div className="flex items-center justify-between font-mono">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <Heart className="w-4 h-4 fill-emerald-500/20 text-emerald-400" />
                    <span>
                      {state.currentHealth} / {state.maxHealth} Health
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-blue-400">
                    <Brain className="w-4 h-4 fill-blue-500/20 text-blue-400" />
                    <span>
                      {state.currentSanity} / {state.maxSanity} Sanity
                    </span>
                  </div>
                </div>

                {/* Tokens Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800/60 font-semibold">
                    🎯 {state.tokens.focus} Focus
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-semibold">
                    💰 {state.tokens.resources} Res
                  </span>
                  <span className="px-2 py-0.5 rounded bg-green-950/80 text-green-300 border border-green-800/60 font-semibold">
                    🔍 {state.tokens.clues} Clues
                  </span>
                  {(state.tokens.trainTickets > 0 || state.tokens.shipTickets > 0) && (
                    <span className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/60 font-semibold">
                      🎫 {state.tokens.trainTickets}T / {state.tokens.shipTickets}S
                    </span>
                  )}
                </div>
              </div>

              {/* Held Possessions Inventory */}
              <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-800">
                  <span className="font-serif font-bold text-slate-300 flex items-center gap-1">
                    <Package className="w-3.5 h-3.5 text-amber-400" />
                    <span>Equipped Possessions ({possessions.length})</span>
                  </span>
                </div>

                {possessions.length === 0 ? (
                  <div className="text-center py-6 text-slate-500 text-xs font-serif italic">
                    No possessions equipped
                  </div>
                ) : (
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {possessions.map((card) => (
                      <div
                        key={card.id}
                        className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 flex items-start justify-between gap-2 text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-serif font-bold text-slate-200">
                              {card.name}
                            </span>
                            <span className="text-[9px] uppercase font-semibold px-1 rounded bg-slate-800 text-amber-400">
                              {card.type}
                            </span>
                            {card.cost !== undefined && (
                              <span className="text-[10px] text-slate-400 font-mono">
                                Cost: {card.cost}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                            {card.effectText}
                          </p>
                        </div>

                        {card.combatBonus && (
                          <span className="text-[10px] bg-red-950 text-red-300 border border-red-800 px-1 py-0.2 rounded font-mono font-bold flex-shrink-0">
                            +{card.combatBonus.amount} Combat
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
