import React, { useState, useRef } from 'react';
import {
  Plus,
  Trash2,
  Zap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Search,
  Check,
  X,
  SlidersHorizontal,
  Dices,
  Swords,
  BookOpen,
  Filter
} from 'lucide-react';
import { PossessionCard, CardType, SkillType } from '../types';
import { PRESET_POSSESSIONS } from '../data/possessionsCatalog';
import { StrengthIcon, LoreIcon, ObservationIcon, InfluenceIcon, WillIcon } from './GameIcons';
import { ExpansionCode, ALL_EXPANSIONS } from '../types';

interface Props {
  possessions: PossessionCard[];
  enabledExpansions?: ExpansionCode[];
  onAddPossession: (card: PossessionCard) => void;
  onRemovePossession: (id: string) => void;
  onToggleExhaust: (id: string) => void;
}

type FilterCategory = 'all' | 'items' | 'spells' | 'service' | 'ally' | 'conditions';

export const PossessionsPanel: React.FC<Props> = ({
  possessions,
  enabledExpansions,
  onAddPossession,
  onRemovePossession,
  onToggleExhaust,
}) => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [selectedExpansionFilter, setSelectedExpansionFilter] = useState<string>('all');

  // Custom card form state
  const [customName, setCustomName] = useState('');
  const [customType, setCustomType] = useState<CardType>('item');
  const [customCost, setCustomCost] = useState<number>(2);
  const [customEffect, setCustomEffect] = useState('');
  const [customStatSkill, setCustomStatSkill] = useState<SkillType | ''>('');
  const [customStatAmount, setCustomStatAmount] = useState<number>(1);
  const [customCombatSkill, setCustomCombatSkill] = useState<SkillType | ''>('');
  const [customCombatAmount, setCustomCombatAmount] = useState<number>(2);
  const [customRerollSkill, setCustomRerollSkill] = useState<SkillType | ''>('');
  const [customRerollAmount, setCustomRerollAmount] = useState<number>(1);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollSide = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getExpansionBadge = (expCode?: ExpansionCode) => {
    const code = expCode || 'core';
    switch (code) {
      case 'core':
        return <span className="text-[9px] px-1 py-0.2 rounded bg-slate-800 text-slate-300 font-mono font-bold">CORE</span>;
      case 'fl':
        return <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono font-bold">FL</span>;
      case 'mom':
        return <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono font-bold">MoM</span>;
      case 'sr':
        return <span className="text-[9px] px-1 py-0.2 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono font-bold">SR</span>;
      case 'utp':
        return <span className="text-[9px] px-1 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono font-bold">UtP</span>;
      case 'soc':
        return <span className="text-[9px] px-1 py-0.2 rounded bg-yellow-950 text-yellow-300 border border-yellow-800 font-mono font-bold">SoC</span>;
      case 'td':
        return <span className="text-[9px] px-1 py-0.2 rounded bg-teal-950 text-teal-300 border border-teal-800 font-mono font-bold">TD</span>;
      case 'cir':
        return <span className="text-[9px] px-1 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono font-bold">CiR</span>;
      case 'mon':
        return <span className="text-[9px] px-1 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800 font-mono font-bold">MoN</span>;
      default:
        return <span className="text-[9px] px-1 py-0.2 rounded bg-slate-800 text-slate-300 font-mono font-bold">CORE</span>;
    }
  };

  // Base pool filtered by enabled expansions from game state
  const poolCards = enabledExpansions
    ? PRESET_POSSESSIONS.filter((c) => enabledExpansions.includes(c.expansion || 'core'))
    : PRESET_POSSESSIONS;

  // Filter logic for full card database
  const filterCard = (card: PossessionCard): boolean => {
    // Check expansion filter inside modal
    if (selectedExpansionFilter !== 'all') {
      const cardExp = card.expansion || 'core';
      if (cardExp !== selectedExpansionFilter) return false;
    }

    // Category check
    if (selectedCategory === 'spells' && card.type !== 'spell') return false;
    if (selectedCategory === 'service' && card.type !== 'service') return false;
    if (selectedCategory === 'ally' && card.type !== 'ally') return false;
    if (selectedCategory === 'conditions' && card.type !== 'condition') return false;
    if (
      selectedCategory === 'items' &&
      !['item', 'weapon', 'trinket', 'artifact'].includes(card.type)
    ) {
      return false;
    }

    // Search query check
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = card.name.toLowerCase().includes(q);
      const matchEffect = card.effectText.toLowerCase().includes(q);
      const matchFlavor = card.flavorText?.toLowerCase().includes(q) || false;
      const matchType = card.type.toLowerCase().includes(q);
      if (!matchName && !matchEffect && !matchFlavor && !matchType) return false;
    }

    return true;
  };

  const filteredCatalog = poolCards.filter(filterCard);

  // Category counts based on poolCards
  const categoryCounts: Record<FilterCategory, number> = {
    all: poolCards.length,
    items: poolCards.filter((c) => ['item', 'weapon', 'trinket', 'artifact'].includes(c.type)).length,
    spells: poolCards.filter((c) => c.type === 'spell').length,
    service: poolCards.filter((c) => c.type === 'service').length,
    ally: poolCards.filter((c) => c.type === 'ally').length,
    conditions: poolCards.filter((c) => c.type === 'condition').length,
  };

  const handleSelectCard = (card: PossessionCard) => {
    onAddPossession(card);
  };

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const newCard: PossessionCard = {
      id: `custom-${Date.now()}`,
      name: customName,
      type: customType,
      cost: customCost,
      effectText: customEffect || 'Special item ability.',
      custom: true,
    };

    if (customStatSkill) {
      newCard.statBonus = {
        skill: customStatSkill,
        amount: customStatAmount,
      };
    }

    if (customCombatSkill) {
      newCard.combatBonus = {
        skill: customCombatSkill,
        amount: customCombatAmount,
      };
    }

    if (customRerollAmount > 0) {
      newCard.rerollsGranted = {
        skill: customRerollSkill ? customRerollSkill : undefined,
        amount: customRerollAmount,
        description: `Reroll ${customRerollAmount} die on ${customRerollSkill || 'any'} tests.`,
      };
    }

    onAddPossession(newCard);
    setIsCustomModalOpen(false);
    // Reset fields
    setCustomName('');
    setCustomEffect('');
    setCustomStatSkill('');
    setCustomCombatSkill('');
    setCustomRerollSkill('');
  };

  const getSkillIcon = (skill?: SkillType) => {
    switch (skill) {
      case 'strength':
        return <StrengthIcon className="w-3.5 h-3.5 text-red-500" />;
      case 'lore':
        return <LoreIcon className="w-3.5 h-3.5 text-purple-500" />;
      case 'observation':
        return <ObservationIcon className="w-3.5 h-3.5 text-emerald-500" />;
      case 'influence':
        return <InfluenceIcon className="w-3.5 h-3.5 text-orange-500" />;
      case 'will':
        return <WillIcon className="w-3.5 h-3.5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-[#131b2e] border border-slate-700/70 rounded-2xl shadow-2xl p-5 text-slate-200 space-y-4">
      {/* Top Header: Title, Controls, Search Catalog Trigger */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-700/60">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold tracking-wide text-slate-100">
              Possessions
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 font-mono text-xs font-bold border border-slate-700">
              {possessions.length} Equipped
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Cards equipped to active investigator. Scroll side-to-side to view all possessions.
          </p>
        </div>

        {/* Buttons: Browse Full Catalog & Add Custom */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Scroll left/right buttons for horizontal track */}
          {possessions.length > 2 && (
            <div className="hidden sm:flex items-center gap-1 mr-1">
              <button
                onClick={() => scrollSide('left')}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                title="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollSide('right')}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                title="Scroll Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          <button
            onClick={() => setIsCatalogOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-slate-950 font-serif font-bold text-xs uppercase tracking-wider shadow-lg transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Search &amp; Add Items</span>
          </button>

          <button
            onClick={() => setIsCustomModalOpen(true)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title="Create Custom Card"
          >
            <Plus className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>

      {/* Equipped Possessions: Side-to-Side Horizontal Scrolling Track */}
      {possessions.length === 0 ? (
        <div className="text-center py-10 px-4 border-2 border-dashed border-slate-700/60 rounded-xl bg-slate-850/40">
          <Sparkles className="w-8 h-8 text-slate-500 mx-auto mb-2" />
          <p className="text-sm text-slate-400 font-serif">No possessions equipped yet.</p>
          <p className="text-xs text-slate-500 mt-1">
            Click &quot;Search &amp; Add Items&quot; above to search spells, items, service, allies, and conditions!
          </p>
        </div>
      ) : (
        <div className="relative group">
          {/* Visual Side-to-Side Scroll Indicator */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 px-1">
            <span className="flex items-center gap-1">
              ↔ Scroll side to side
            </span>
            <span className="text-slate-500">
              {possessions.length} item{possessions.length === 1 ? '' : 's'} in inventory
            </span>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex flex-row gap-4 overflow-x-auto pb-4 pt-1 px-1 scroll-smooth snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#475569 #0f172a',
            }}
          >
            {possessions.map((card) => {
              const isExhausted = card.isExhausted;
              const hasCombatBonus = card.combatBonus !== undefined;
              const hasReroll = card.rerollsGranted !== undefined;

              return (
                <div
                  key={card.id}
                  className={`w-72 sm:w-80 flex-shrink-0 snap-start relative flex flex-col justify-between rounded-xl overflow-hidden shadow-2xl transition-all duration-200 border-2 ${
                    isExhausted
                      ? 'opacity-60 grayscale border-slate-700'
                      : hasCombatBonus
                      ? 'border-red-600/70 hover:border-red-500 shadow-red-950/30'
                      : 'border-amber-700/60 hover:border-amber-500 shadow-amber-950/30'
                  }`}
                  style={{
                    backgroundColor: '#e6d8c3',
                    color: '#2b2118',
                    minHeight: '340px',
                  }}
                >
                  {/* Card Header with Cost Badge and Title */}
                  <div className="p-3 pb-2 border-b border-[#c4b197] flex items-start justify-between relative bg-gradient-to-b from-[#f2e6d5] to-[#e6d8c3]">
                    <div className="flex items-center gap-2.5">
                      {card.cost !== undefined && (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 border-2 border-amber-900/60 text-slate-900 font-serif font-black text-sm flex items-center justify-center shadow-inner flex-shrink-0">
                          {card.cost}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-serif font-bold text-base leading-tight text-[#21150e]">
                            {card.name}
                          </h3>
                          {getExpansionBadge(card.expansion)}
                        </div>
                        <div className="font-serif italic text-xs font-semibold uppercase tracking-widest text-[#7c5e42]">
                          {card.type}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemovePossession(card.id)}
                      className="p-1 text-[#8c6f55] hover:text-red-700 hover:bg-[#d8c5ad] rounded transition-colors"
                      title="Discard Possession"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Card Body with Rules & Flavor */}
                  <div className="p-3 flex-1 flex flex-col justify-between space-y-2.5">
                    {/* Rules Effect */}
                    <div className="space-y-1 text-xs leading-relaxed font-sans font-medium text-[#1f1914]">
                      {card.effectText.split('\n').map((line, idx) => (
                        <p key={idx} className="font-serif">
                          {line}
                        </p>
                      ))}
                    </div>

                    {/* Flavor Text */}
                    {card.flavorText && (
                      <div className="border-t border-[#c4b197]/60 pt-2">
                        <p className="font-serif italic text-[11px] text-[#634e3a] leading-tight">
                          &quot;{card.flavorText}&quot;
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Badges & Ready/Exhaust Toggle */}
                  <div className="p-2 px-3 border-t border-[#c4b197] bg-[#dbcca8] flex items-center justify-between text-xs">
                    {/* Active Stat Modifiers Tags */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {card.statBonus && (
                        <span className="inline-flex items-center gap-1 bg-[#ccbba6] text-[#2b2118] px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono">
                          {getSkillIcon(card.statBonus.skill)}
                          {card.statBonus.amount > 0 ? `+${card.statBonus.amount}` : card.statBonus.amount} {card.statBonus.skill}
                        </span>
                      )}

                      {card.combatBonus && (
                        <span className="inline-flex items-center gap-1 bg-red-900/30 text-red-900 border border-red-800/40 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono">
                          <Swords className="w-3 h-3 text-red-700" />
                          +{card.combatBonus.amount} Combat
                        </span>
                      )}

                      {hasReroll && (
                        <span className="inline-flex items-center gap-1 bg-blue-900/30 text-blue-950 border border-blue-800/40 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono">
                          <Dices className="w-3 h-3 text-blue-800" />
                          Reroll {card.rerollsGranted?.amount}
                        </span>
                      )}
                    </div>

                    {/* Ready / Exhaust Action */}
                    <button
                      onClick={() => onToggleExhaust(card.id)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider transition-colors border ${
                        isExhausted
                          ? 'bg-red-800 text-white border-red-900'
                          : 'bg-[#bca68b] hover:bg-[#ae977b] text-[#2b2118] border-[#9c866b]'
                      }`}
                      title={isExhausted ? 'Card is Exhausted (Inactive)' : 'Card is Ready (Active)'}
                    >
                      {isExhausted ? 'Exhausted' : 'Ready'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FULL SEARCH & FILTER MODAL / BROWSER                                      */}
      {/* ========================================================================= */}
      {isCatalogOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-[#101726] border-2 border-slate-700/90 rounded-2xl max-w-4xl w-full p-5 shadow-2xl space-y-4 text-slate-200 my-auto max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-950 text-amber-400 border border-amber-800">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-amber-100">
                    Eldritch Horror Card Catalog
                  </h2>
                  <p className="text-xs text-slate-400">
                    Search and filter from the complete card database (Items, Spells, Services, Allies, Conditions).
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCatalogOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Live Search Input & Clear */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by card name, rules text, or trait (e.g. Hired Muscle, Shotgun, Wither, Blessed)..."
                className="w-full pl-10 pr-10 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-amber-500 shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-white text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category and Expansion Filter Tabs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
              <div className="flex flex-wrap items-center gap-1.5">
                {(
                  [
                    { id: 'all', label: 'All Cards' },
                    { id: 'items', label: 'Items & Weapons' },
                    { id: 'spells', label: 'Spells' },
                    { id: 'service', label: 'Service' },
                    { id: 'ally', label: 'Allies' },
                    { id: 'conditions', label: 'Conditions' },
                  ] as { id: FilterCategory; label: string }[]
                ).map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  const count = categoryCounts[cat.id];
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-amber-600 text-slate-950 shadow-md font-extrabold'
                          : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive ? 'bg-amber-800 text-amber-100' : 'bg-slate-900 text-slate-400'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Expansion / DLC Filter Dropdown */}
              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                <span className="text-[11px] font-mono text-slate-400">DLC:</span>
                <select
                  value={selectedExpansionFilter}
                  onChange={(e) => setSelectedExpansionFilter(e.target.value)}
                  className="px-2.5 py-1 bg-slate-900 border border-slate-700 rounded-lg text-xs text-amber-300 font-serif font-semibold focus:outline-none focus:border-amber-500"
                >
                  <option value="all">All Enabled DLCs</option>
                  <option value="core">Core Game</option>
                  <option value="fl">Forsaken Lore (FL)</option>
                  <option value="mom">Mountains of Madness (MoM)</option>
                  <option value="sr">Strange Remnants (SR)</option>
                  <option value="utp">Under the Pyramids (UtP)</option>
                  <option value="soc">Signs of Carcosa (SoC)</option>
                  <option value="td">The Dreamlands (TD)</option>
                  <option value="cir">Cities in Ruin (CiR)</option>
                  <option value="mon">Masks of Nyarlathotep (MoN)</option>
                </select>
              </div>
            </div>

            {/* Results Grid with Instant Add Button */}
            <div className="overflow-y-auto flex-1 pr-1 max-h-[55vh] space-y-3">
              <div className="text-xs text-slate-400 flex items-center justify-between pb-1">
                <span>Showing {filteredCatalog.length} matching cards</span>
                <button
                  onClick={() => {
                    setIsCatalogOpen(false);
                    setIsCustomModalOpen(true);
                  }}
                  className="text-amber-400 hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Create Custom Card</span>
                </button>
              </div>

              {filteredCatalog.length === 0 ? (
                <div className="text-center py-12 text-slate-400 font-serif">
                  No cards match your search criteria.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredCatalog.map((card) => {
                    const isAlreadyEquipped = possessions.some((p) => p.name === card.name);

                    return (
                      <div
                        key={card.id}
                        className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-750 hover:border-slate-600 flex flex-col justify-between gap-3 transition-colors shadow-sm"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              {card.cost !== undefined && (
                                <span className="w-6 h-6 rounded-full bg-amber-600 text-slate-950 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                                  {card.cost}
                                </span>
                              )}
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <h4 className="font-serif font-bold text-sm text-slate-100">
                                    {card.name}
                                  </h4>
                                  {getExpansionBadge(card.expansion)}
                                </div>
                                <span className="text-[10px] uppercase font-semibold tracking-wider text-amber-400">
                                  {card.type}
                                </span>
                              </div>
                            </div>

                            {/* Type Specific Tag */}
                            {card.combatBonus && (
                              <span className="text-[10px] bg-red-950 text-red-300 border border-red-800 px-1.5 py-0.5 rounded font-mono font-bold">
                                ⚔️ +{card.combatBonus.amount}
                              </span>
                            )}
                            {card.rerollsGranted && !card.combatBonus && (
                              <span className="text-[10px] bg-blue-950 text-blue-300 border border-blue-800 px-1.5 py-0.5 rounded font-mono font-bold">
                                🎲 Reroll
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                            {card.effectText}
                          </p>

                          {card.flavorText && (
                            <p className="text-[11px] font-serif italic text-slate-500 mt-1.5">
                              &quot;{card.flavorText}&quot;
                            </p>
                          )}
                        </div>

                        {/* Card Action: Equip / Add */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                          <span className="text-[11px] text-slate-500">
                            {isAlreadyEquipped ? 'Currently equipped' : 'Not equipped'}
                          </span>

                          <button
                            type="button"
                            onClick={() => handleSelectCard(card)}
                            className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 active:scale-95 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Equip to Investigator</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsCatalogOpen(false)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors"
              >
                Close Catalog
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CUSTOM CARD MODAL                                                         */}
      {/* ========================================================================= */}
      {isCustomModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#101726] border-2 border-slate-700 rounded-2xl max-w-lg w-full p-5 shadow-2xl space-y-4 text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-serif text-xl font-bold text-amber-100">
                Create Custom Possession Card
              </h3>
              <button
                onClick={() => setIsCustomModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustom} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Card Name *</label>
                <input
                  type="text"
                  required
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Occult Grimoire, Trench Gun, Blood Oath"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Type</label>
                  <select
                    value={customType}
                    onChange={(e) => setCustomType(e.target.value as CardType)}
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-slate-100"
                  >
                    <option value="item">Item</option>
                    <option value="weapon">Weapon</option>
                    <option value="spell">Spell</option>
                    <option value="service">Service</option>
                    <option value="ally">Ally</option>
                    <option value="trinket">Trinket</option>
                    <option value="condition">Condition</option>
                    <option value="artifact">Artifact</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Cost</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={customCost}
                    onChange={(e) => setCustomCost(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Rules &amp; Effect Text</label>
                <textarea
                  rows={3}
                  value={customEffect}
                  onChange={(e) => setCustomEffect(e.target.value)}
                  placeholder="e.g. Gain +2 Strength during Combat Encounters. You may reroll 1 die when resolving an Observation test."
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Combat Bonus</label>
                  <div className="flex gap-1.5">
                    <select
                      value={customCombatSkill}
                      onChange={(e) => setCustomCombatSkill(e.target.value as SkillType | '')}
                      className="w-2/3 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs"
                    >
                      <option value="">None</option>
                      <option value="strength">Strength</option>
                      <option value="lore">Lore</option>
                      <option value="will">Will</option>
                    </select>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={customCombatAmount}
                      onChange={(e) => setCustomCombatAmount(parseInt(e.target.value) || 1)}
                      className="w-1/3 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Rerolls Granted</label>
                  <div className="flex gap-1.5">
                    <select
                      value={customRerollSkill}
                      onChange={(e) => setCustomRerollSkill(e.target.value as SkillType | '')}
                      className="w-2/3 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs"
                    >
                      <option value="">Any Test</option>
                      <option value="strength">Strength</option>
                      <option value="lore">Lore</option>
                      <option value="observation">Observation</option>
                      <option value="influence">Influence</option>
                      <option value="will">Will</option>
                    </select>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      value={customRerollAmount}
                      onChange={(e) => setCustomRerollAmount(parseInt(e.target.value) || 0)}
                      className="w-1/3 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCustomModalOpen(false)}
                  className="px-3 py-1.5 rounded bg-slate-800 text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-amber-600 hover:bg-amber-500 font-bold text-slate-950"
                >
                  Create &amp; Equip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
