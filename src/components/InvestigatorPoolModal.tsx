import React, { useState } from 'react';
import { X, Users, UserPlus, Shield, Heart, Brain, Search, Skull } from 'lucide-react';
import { InvestigatorStatic, InvestigatorState, ExpansionCode } from '../types';
import { InvestigatorPortrait } from './InvestigatorPortrait';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  allInvestigators: InvestigatorStatic[];
  partyInvestigatorIds: string[];
  activeInvestigatorId: string;
  investigatorStates: Record<string, InvestigatorState>;
  enabledExpansions?: ExpansionCode[];
  onSelectActive: (id: string) => void;
  onAddToParty: (id: string) => void;
  onSetStatus: (id: string, status: 'active' | 'in_pool' | 'defeated' | 'devoured') => void;
}

export const InvestigatorPoolModal: React.FC<Props> = ({
  isOpen,
  onClose,
  allInvestigators,
  partyInvestigatorIds,
  activeInvestigatorId,
  investigatorStates,
  enabledExpansions,
  onSelectActive,
  onAddToParty,
  onSetStatus,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'pool' | 'party' | 'defeated'>('all');

  if (!isOpen) return null;

  const expansionFiltered = React.useMemo(() => {
    const list = enabledExpansions
      ? allInvestigators.filter((inv) => enabledExpansions.includes(inv.expansion || 'core'))
      : allInvestigators;
    const seen = new Set<string>();
    return list.filter((inv) => {
      if (seen.has(inv.id)) return false;
      seen.add(inv.id);
      return true;
    });
  }, [allInvestigators, enabledExpansions]);

  const totalInvestigators = expansionFiltered.length;
  const activePartyCount = expansionFiltered.filter((inv) =>
    partyInvestigatorIds.includes(inv.id)
  ).length;

  const defeatedCount = expansionFiltered.filter((inv) => {
    const s = investigatorStates[inv.id];
    return s?.status === 'defeated' || s?.status === 'devoured';
  }).length;

  const remainingInPool = Math.max(0, totalInvestigators - activePartyCount - defeatedCount);

  const filteredInvestigators = expansionFiltered.filter((inv) => {
    const matchesSearch =
      inv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.startingLocation.toLowerCase().includes(searchQuery.toLowerCase());

    const isParty = partyInvestigatorIds.includes(inv.id);
    const state = investigatorStates[inv.id];
    const isDefeated = state?.status === 'defeated' || state?.status === 'devoured';

    if (!matchesSearch) return false;

    if (filterTab === 'party') return isParty;
    if (filterTab === 'pool') return !isParty && !isDefeated;
    if (filterTab === 'defeated') return isDefeated;
    return true;
  });

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#111827] border-2 border-slate-700/80 rounded-2xl max-w-4xl w-full p-5 sm:p-6 shadow-2xl space-y-5 text-slate-200 my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-950 text-amber-400 border border-amber-800">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-amber-100">
                Investigator Roster &amp; Pool
              </h2>
              <p className="text-xs text-slate-400">
                Manage party members, select active character, or draft replacements from the reserve pool.
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

        {/* Pool Summary Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-850 border border-slate-750 p-3 rounded-xl">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Total In Game
            </span>
            <span className="font-serif text-2xl font-bold text-slate-200">
              {totalInvestigators}
            </span>
          </div>

          <div className="bg-blue-950/40 border border-blue-800/60 p-3 rounded-xl">
            <span className="text-[11px] font-semibold text-blue-300 uppercase tracking-wider block">
              Active Party
            </span>
            <span className="font-serif text-2xl font-bold text-blue-200">
              {activePartyCount}
            </span>
          </div>

          <div className="bg-amber-950/40 border border-amber-700/60 p-3 rounded-xl">
            <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider block">
              Remaining in Pool
            </span>
            <span className="font-serif text-2xl font-bold text-amber-200">
              {remainingInPool} Left
            </span>
          </div>

          <div className="bg-rose-950/40 border border-rose-800/60 p-3 rounded-xl">
            <span className="text-[11px] font-semibold text-rose-300 uppercase tracking-wider block">
              Fallen / Devoured
            </span>
            <span className="font-serif text-2xl font-bold text-rose-300">
              {defeatedCount}
            </span>
          </div>
        </div>

        {/* Search & Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            {(
              [
                { key: 'all', label: `All (${totalInvestigators})` },
                { key: 'party', label: `Active (${activePartyCount})` },
                { key: 'pool', label: `In Pool (${remainingInPool})` },
                { key: 'defeated', label: `Fallen (${defeatedCount})` },
              ] as const
            ).map((t) => (
              <button
                key={t.key}
                onClick={() => setFilterTab(t.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  filterTab === t.key
                    ? 'bg-amber-600 text-white shadow'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-750'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search investigator..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Investigators List Grid */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-3 max-h-[50vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredInvestigators.map((inv) => {
              const isParty = partyInvestigatorIds.includes(inv.id);
              const isActive = inv.id === activeInvestigatorId;
              const state = investigatorStates[inv.id];
              const isDefeated = state?.status === 'defeated' || state?.status === 'devoured';

              return (
                <div
                  key={inv.id}
                  className={`flex gap-3.5 p-3.5 rounded-xl border transition-all ${
                    isActive
                      ? 'bg-amber-950/30 border-amber-500 ring-1 ring-amber-500'
                      : isParty
                      ? 'bg-blue-950/20 border-blue-700/80'
                      : isDefeated
                      ? 'bg-rose-950/20 border-rose-900/60 opacity-70'
                      : 'bg-slate-850/70 border-slate-750 hover:border-slate-650'
                  }`}
                >
                  {/* Portrait Thumbnail */}
                  <div className="w-20 h-24 rounded-lg overflow-hidden flex-shrink-0 border border-slate-700 relative">
                    <InvestigatorPortrait
                      investigatorId={inv.id}
                      name={inv.name}
                      className="w-full h-full"
                    />
                    {isActive && (
                      <span className="absolute top-1 left-1 bg-amber-500 text-slate-950 text-[9px] font-black uppercase px-1 rounded shadow">
                        Active
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <h3 className="font-serif font-bold text-base text-slate-100 leading-tight">
                            {inv.name}
                          </h3>
                          <span className="text-xs text-slate-400 italic block">
                            {inv.title}
                          </span>
                        </div>

                        {/* Status Badge */}
                        <div>
                          {isActive && (
                            <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500 text-amber-300 text-[10px] font-bold">
                              Current Tracker
                            </span>
                          )}
                          {!isActive && isParty && (
                            <span className="px-2 py-0.5 rounded bg-blue-500/20 border border-blue-500 text-blue-300 text-[10px] font-bold">
                              In Party
                            </span>
                          )}
                          {!isParty && !isDefeated && (
                            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 text-[10px] font-semibold">
                              In Pool
                            </span>
                          )}
                          {isDefeated && (
                            <span className="px-2 py-0.5 rounded bg-rose-950 border border-rose-800 text-rose-300 text-[10px] font-bold">
                              Fallen
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Stat summary */}
                      <div className="flex items-center gap-3 mt-1.5 text-xs">
                        <span className="flex items-center gap-1 text-rose-400 font-semibold">
                          <Heart className="w-3 h-3 fill-rose-500" />
                          {inv.health}
                        </span>
                        <span className="flex items-center gap-1 text-sky-400 font-semibold">
                          <Brain className="w-3 h-3 text-sky-400" />
                          {inv.sanity}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          L{inv.skills.lore} • I{inv.skills.influence} • O{inv.skills.observation} • S{inv.skills.strength} • W{inv.skills.will}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-1">
                        {inv.action.title}: {inv.action.description}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2 mt-2 pt-2 border-t border-slate-800">
                      {isParty ? (
                        <>
                          {!isActive && (
                            <button
                              onClick={() => {
                                onSelectActive(inv.id);
                                onClose();
                              }}
                              className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded text-xs font-bold transition-colors"
                            >
                              Switch To
                            </button>
                          )}
                          <button
                            onClick={() => onSetStatus(inv.id, 'defeated')}
                            className="px-2 py-1 bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-300 rounded text-xs transition-colors flex items-center gap-1"
                            title="Mark as Defeated/Devoured"
                          >
                            <Skull className="w-3 h-3" />
                            <span>Defeated</span>
                          </button>
                        </>
                      ) : isDefeated ? (
                        <button
                          onClick={() => onSetStatus(inv.id, 'in_pool')}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-semibold"
                        >
                          Return to Pool
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            onAddToParty(inv.id);
                            onSelectActive(inv.id);
                            onClose();
                          }}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold transition-colors flex items-center gap-1"
                        >
                          <UserPlus className="w-3.5 h-3.5" />
                          <span>Draft to Party</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
