import React, { useState, useMemo } from 'react';
import { X, Users, UserPlus, Heart, Brain, Search, Skull, CheckCircle2, Layers } from 'lucide-react';
import { InvestigatorStatic, InvestigatorState, ExpansionCode, FallenInvestigator } from '../types';
import { InvestigatorPortrait } from './InvestigatorPortrait';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  allInvestigators: InvestigatorStatic[];
  partyInvestigatorIds: string[];
  activeInvestigatorId: string;
  investigatorStates: Record<string, InvestigatorState>;
  enabledExpansions?: ExpansionCode[];
  fallenInvestigators?: FallenInvestigator[];
  onSelectActive: (id: string) => void;
  onAddToParty: (id: string) => void;
  onSetStatus: (id: string, status: 'active' | 'in_pool' | 'defeated' | 'devoured') => void;
}

const EXPANSION_LABELS: Record<string, { label: string; badgeColor: string }> = {
  core: { label: 'Core Game', badgeColor: 'bg-slate-800 text-slate-300 border-slate-700' },
  fl: { label: 'Forsaken Lore', badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800' },
  mom: { label: 'Mountains of Madness', badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800' },
  sr: { label: 'Strange Remnants', badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-800' },
  utp: { label: 'Under the Pyramids', badgeColor: 'bg-amber-950 text-amber-300 border-amber-800' },
  soc: { label: 'Signs of Carcosa', badgeColor: 'bg-yellow-950 text-yellow-300 border-yellow-800' },
  td: { label: 'The Dreamlands', badgeColor: 'bg-teal-950 text-teal-300 border-teal-800' },
  cir: { label: 'Cities in Ruin', badgeColor: 'bg-rose-950 text-rose-300 border-rose-800' },
  mon: { label: 'Masks of Nyarlathotep', badgeColor: 'bg-purple-950 text-purple-300 border-purple-800' },
  custom: { label: 'Custom', badgeColor: 'bg-pink-950 text-pink-300 border-pink-800' },
};

export const InvestigatorPoolModal: React.FC<Props> = ({
  isOpen,
  onClose,
  allInvestigators = [],
  partyInvestigatorIds = [],
  activeInvestigatorId,
  investigatorStates = {},
  enabledExpansions,
  fallenInvestigators = [],
  onSelectActive,
  onAddToParty,
  onSetStatus,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'pool' | 'party' | 'defeated'>('all');
  const [selectedExpansionFilter, setSelectedExpansionFilter] = useState<string>('all');

  // 1. Strict deduplicated list of investigators accounting for selected DLCs
  const expansionFiltered = useMemo(() => {
    const list = enabledExpansions && enabledExpansions.length > 0
      ? allInvestigators.filter((inv) =>
          enabledExpansions.includes(inv.expansion || 'core') || inv.isAdHoc
        )
      : allInvestigators;

    const seen = new Set<string>();
    return list.filter((inv) => {
      if (!inv || !inv.id) return false;
      if (seen.has(inv.id)) return false;
      seen.add(inv.id);
      return true;
    });
  }, [allInvestigators, enabledExpansions]);

  // Set of fallen/defeated investigator IDs
  const fallenIdsSet = useMemo(() => {
    const set = new Set<string>();
    (fallenInvestigators || []).forEach((f) => {
      if (f?.investigatorId) set.add(f.investigatorId);
    });
    Object.entries(investigatorStates || {}).forEach(([id, state]) => {
      if (state?.status === 'defeated' || state?.status === 'devoured') {
        set.add(id);
      }
    });
    return set;
  }, [fallenInvestigators, investigatorStates]);

  const partySet = useMemo(() => {
    return new Set(partyInvestigatorIds || []);
  }, [partyInvestigatorIds]);

  const totalInvestigators = expansionFiltered.length;
  const activePartyCount = expansionFiltered.filter((inv) => partySet.has(inv.id)).length;
  const defeatedCount = expansionFiltered.filter((inv) => fallenIdsSet.has(inv.id)).length;
  const remainingInPool = Math.max(0, totalInvestigators - activePartyCount - defeatedCount);

  // Available expansions present in current filtered deck
  const availableExpansionCodes = useMemo(() => {
    const codes = new Set<string>();
    expansionFiltered.forEach((inv) => {
      codes.add(inv.expansion || 'core');
    });
    return Array.from(codes);
  }, [expansionFiltered]);

  // Final filtered list for display
  const filteredInvestigators = useMemo(() => {
    const q = (searchQuery || '').trim().toLowerCase();

    return expansionFiltered.filter((inv) => {
      const isParty = partySet.has(inv.id);
      const isDefeated = fallenIdsSet.has(inv.id);
      const expCode = inv.expansion || 'core';

      // Expansion sub-filter
      if (selectedExpansionFilter !== 'all' && expCode !== selectedExpansionFilter) {
        return false;
      }

      // Tab filter
      if (filterTab === 'party' && !isParty) return false;
      if (filterTab === 'pool' && (isParty || isDefeated)) return false;
      if (filterTab === 'defeated' && !isDefeated) return false;

      // Text search
      if (q) {
        const nameMatch = (inv.name || '').toLowerCase().includes(q);
        const titleMatch = (inv.title || '').toLowerCase().includes(q);
        const roleMatch = (inv.role || '').toLowerCase().includes(q);
        const occMatch = (inv.occupation || '').toLowerCase().includes(q);
        const locMatch = (inv.startingLocation || '').toLowerCase().includes(q);
        const expMatch = expCode.toLowerCase().includes(q);
        if (!nameMatch && !titleMatch && !roleMatch && !occMatch && !locMatch && !expMatch) {
          return false;
        }
      }

      return true;
    });
  }, [expansionFiltered, partySet, fallenIdsSet, filterTab, selectedExpansionFilter, searchQuery]);

  // DO NOT EARLY RETURN BEFORE HOOKS — React Rules of Hooks!
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#111827] border-2 border-slate-700/80 rounded-2xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl space-y-4 text-slate-200 my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-950 text-amber-400 border border-amber-800">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-amber-100">
                  Investigator Reserve Pool &amp; Roster
                </h2>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-700 font-mono font-bold">
                  {remainingInPool} in Reserve
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Dynamic pool reflecting {enabledExpansions?.length || 'all'} active DLCs. Draft replacements, switch active character, or return investigators to the reserve.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close Pool"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Pool Summary Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
              Total Active in DLCs
            </span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-slate-100">
              {totalInvestigators}
            </span>
            <span className="text-[10px] text-slate-500 block">
              {enabledExpansions?.length || 0} Expansions Enabled
            </span>
          </div>

          <div className="bg-blue-950/40 border border-blue-800/60 p-3 rounded-xl">
            <span className="text-[10px] font-semibold text-blue-300 uppercase tracking-wider block">
              Active Party
            </span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-blue-200">
              {activePartyCount}
            </span>
            <span className="text-[10px] text-blue-400/80 block">Current expedition</span>
          </div>

          <div className="bg-amber-950/40 border border-amber-700/60 p-3 rounded-xl">
            <span className="text-[10px] font-semibold text-amber-300 uppercase tracking-wider block">
              Remaining in Reserve Pool
            </span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-amber-300">
              {remainingInPool} Available
            </span>
            <span className="text-[10px] text-amber-400/80 block">Ready for draft</span>
          </div>

          <div className="bg-rose-950/40 border border-rose-800/60 p-3 rounded-xl">
            <span className="text-[10px] font-semibold text-rose-300 uppercase tracking-wider block">
              Fallen / Devoured
            </span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-rose-300">
              {defeatedCount}
            </span>
            <span className="text-[10px] text-rose-400/80 block">Uncollected/lost</span>
          </div>
        </div>

        {/* DLC Quick Filter Bar */}
        {availableExpansionCodes.length > 1 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] font-serif font-bold text-slate-400 flex items-center gap-1 flex-shrink-0 mr-1">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>DLC Filter:</span>
            </span>
            <button
              onClick={() => setSelectedExpansionFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border ${
                selectedExpansionFilter === 'all'
                  ? 'bg-amber-600 text-slate-950 border-amber-500 font-bold shadow'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              All DLCs ({expansionFiltered.length})
            </button>
            {availableExpansionCodes.map((code) => {
              const count = expansionFiltered.filter((i) => (i.expansion || 'core') === code).length;
              const info = EXPANSION_LABELS[code] || { label: code.toUpperCase(), badgeColor: 'bg-slate-800 text-slate-300' };
              const isSelected = selectedExpansionFilter === code;
              return (
                <button
                  key={code}
                  onClick={() => setSelectedExpansionFilter(code)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border ${
                    isSelected
                      ? 'bg-amber-600 text-slate-950 border-amber-500 font-bold shadow'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {info.label} ({count})
                </button>
              );
            })}
          </div>
        )}

        {/* Search & Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
            {(
              [
                { key: 'all', label: `All (${totalInvestigators})` },
                { key: 'pool', label: `In Reserve Pool (${remainingInPool})` },
                { key: 'party', label: `Active Party (${activePartyCount})` },
                { key: 'defeated', label: `Fallen (${defeatedCount})` },
              ] as const
            ).map((t) => (
              <button
                key={t.key}
                onClick={() => setFilterTab(t.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
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
              placeholder="Search by name, location, DLC..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-850 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Investigators List Grid */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-3 max-h-[50vh]">
          {filteredInvestigators.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs font-serif italic">
              No investigators match the current filter or search criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredInvestigators.map((inv) => {
                const isParty = partySet.has(inv.id);
                const isActive = inv.id === activeInvestigatorId;
                const isDefeated = fallenIdsSet.has(inv.id);
                const expInfo = EXPANSION_LABELS[inv.expansion || 'core'] || {
                  label: (inv.expansion || 'core').toUpperCase(),
                  badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
                };

                return (
                  <div
                    key={inv.id}
                    className={`flex gap-3 p-3 rounded-xl border transition-all ${
                      isActive
                        ? 'bg-amber-950/30 border-amber-500 ring-1 ring-amber-500/50'
                        : isParty
                        ? 'bg-blue-950/20 border-blue-700/80'
                        : isDefeated
                        ? 'bg-rose-950/20 border-rose-900/60 opacity-70'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Portrait Thumbnail */}
                    <div className="w-18 sm:w-20 h-24 rounded-lg overflow-hidden flex-shrink-0 border border-slate-700 relative">
                      <InvestigatorPortrait
                        investigatorId={inv.id}
                        name={inv.name}
                        imageUrl={inv.imageUrl}
                        className="w-full h-full"
                      />
                      {isActive && (
                        <span className="absolute top-1 left-1 bg-amber-500 text-slate-950 text-[9px] font-black uppercase px-1 rounded shadow">
                          Active
                        </span>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h3 className="font-serif font-bold text-sm sm:text-base text-slate-100 truncate">
                                {inv.name}
                              </h3>
                              <span
                                className={`text-[9px] px-1.5 py-0.2 rounded border font-mono font-bold uppercase ${expInfo.badgeColor}`}
                              >
                                {inv.expansion?.toUpperCase() || 'CORE'}
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-400 italic block truncate">
                              {inv.title}
                            </span>
                          </div>

                          {/* Status Badge */}
                          <div className="flex-shrink-0">
                            {isActive && (
                              <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500 text-amber-300 text-[10px] font-bold">
                                Current
                              </span>
                            )}
                            {!isActive && isParty && (
                              <span className="px-2 py-0.5 rounded bg-blue-500/20 border border-blue-500 text-blue-300 text-[10px] font-bold">
                                In Party
                              </span>
                            )}
                            {!isParty && !isDefeated && (
                              <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-[10px] font-semibold">
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
                        <div className="flex items-center gap-2.5 mt-1 text-xs">
                          <span className="flex items-center gap-1 text-rose-400 font-semibold">
                            <Heart className="w-3 h-3 fill-rose-500" />
                            {inv.health}
                          </span>
                          <span className="flex items-center gap-1 text-sky-400 font-semibold">
                            <Brain className="w-3 h-3 text-sky-400" />
                            {inv.sanity}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            L{inv.skills?.lore ?? 0}•I{inv.skills?.influence ?? 0}•O{inv.skills?.observation ?? 0}•S{inv.skills?.strength ?? 0}•W{inv.skills?.will ?? 0}
                          </span>
                        </div>

                        {/* Location & Role */}
                        <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between gap-1 flex-wrap">
                          <span className="truncate">Starts at: <strong className="text-slate-300 font-medium">{inv.startingLocation || 'Any Space'}</strong></span>
                          {inv.role && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-950/60 border border-amber-600/30 text-amber-300 font-medium flex-shrink-0">
                              {inv.role}
                            </span>
                          )}
                        </div>

                        {inv.action?.title && (
                          <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                            <strong className="text-slate-300">{inv.action.title}:</strong> {inv.action.description}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-end gap-2 mt-2 pt-2 border-t border-slate-800/80">
                        {isParty ? (
                          <>
                            {!isActive && (
                              <button
                                onClick={() => {
                                  onSelectActive(inv.id);
                                  onClose();
                                }}
                                className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-slate-950 rounded text-xs font-serif font-bold transition-colors shadow"
                              >
                                Switch To
                              </button>
                            )}
                            <button
                              onClick={() => onSetStatus(inv.id, 'defeated')}
                              className="px-2 py-1 bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-300 rounded text-xs transition-colors flex items-center gap-1"
                              title="Retire/Defeat investigator"
                            >
                              <Skull className="w-3 h-3" />
                              <span>Defeated</span>
                            </button>
                          </>
                        ) : isDefeated ? (
                          <button
                            onClick={() => onSetStatus(inv.id, 'in_pool')}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-semibold"
                          >
                            Return to Reserve Pool
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              onAddToParty(inv.id);
                              onSelectActive(inv.id);
                              onClose();
                            }}
                            className="px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg text-xs font-serif font-bold transition-all shadow flex items-center gap-1.5"
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
          )}
        </div>
      </div>
    </div>
  );
};
