import React, { useState, useMemo } from 'react';
import {
  Users,
  Plus,
  Trash2,
  Check,
  Sparkles,
  Heart,
  Brain,
  Layers,
  ChevronRight,
  Shuffle,
  ArrowLeft,
  BookOpen
} from 'lucide-react';
import {
  ExpansionCode,
  ALL_EXPANSIONS,
  PlayerSlot,
  InvestigatorStatic
} from '../types';
import { StrengthIcon, LoreIcon, ObservationIcon, InfluenceIcon, WillIcon } from './GameIcons';
import { SkillHighlightedText } from '../utils/textHighlight';

interface Props {
  players: PlayerSlot[];
  enabledExpansions: ExpansionCode[];
  allInvestigators: InvestigatorStatic[];
  allowExpansionProxies?: boolean;
  enablePersonalStories?: boolean;
  onToggleExpansion: (code: ExpansionCode) => void;
  onSetEnabledExpansions: (codes: ExpansionCode[]) => void;
  onToggleAllowExpansionProxies?: () => void;
  onTogglePersonalStories?: () => void;
  onAddPlayer: (customName?: string) => void;
  onRemovePlayer: (playerId: string) => void;
  onUpdatePlayer: (playerId: string, updates: Partial<PlayerSlot>) => void;
  onStartGame: () => void;
  onBackToGame?: () => void;
}

export const GameSetupScreen: React.FC<Props> = ({
  players,
  enabledExpansions,
  allInvestigators,
  allowExpansionProxies = false,
  enablePersonalStories = false,
  onToggleExpansion,
  onSetEnabledExpansions,
  onToggleAllowExpansionProxies,
  onTogglePersonalStories,
  onAddPlayer,
  onRemovePlayer,
  onUpdatePlayer,
  onStartGame,
  onBackToGame,
}) => {
  const [activeTab, setActiveTab] = useState<'players' | 'expansions'>('players');

  // Available investigators for player selection:
  // If allowExpansionProxies is ON, all investigators are selectable (with proxy labels).
  // Otherwise, only investigators matching enabledExpansions are selectable.
  const selectableInvestigators = useMemo(() => {
    const list = allInvestigators.filter((inv) => {
      if (allowExpansionProxies) return true;
      return enabledExpansions.includes(inv.expansion || 'core');
    });
    const seen = new Set<string>();
    return list.filter((inv) => {
      if (seen.has(inv.id)) return false;
      seen.add(inv.id);
      return true;
    });
  }, [allInvestigators, allowExpansionProxies, enabledExpansions]);

  const handleSelectAllExpansions = () => {
    onSetEnabledExpansions(ALL_EXPANSIONS.map((e) => e.code));
  };

  const handleCoreOnlyExpansions = () => {
    onSetEnabledExpansions(['core']);
  };

  const handleRandomizeAll = () => {
    const pool = selectableInvestigators.length > 0 ? selectableInvestigators : allInvestigators;
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const assignedIds = new Set<string>();

    players.forEach((player) => {
      const chosen = shuffled.find((inv) => !assignedIds.has(inv.id)) || pool[0];
      if (chosen) {
        assignedIds.add(chosen.id);
        onUpdatePlayer(player.id, { investigatorId: chosen.id });
      }
    });
  };

  const getExpansionBadge = (inv: InvestigatorStatic) => {
    const expCode = inv.expansion || 'core';
    const isOwned = enabledExpansions.includes(expCode);

    if (!isOwned && allowExpansionProxies) {
      return (
        <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-600 font-mono font-bold shadow-sm">
          PROXY ({expCode.toUpperCase()})
        </span>
      );
    }

    switch (expCode) {
      case 'core':
        return <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono font-medium">Core</span>;
      case 'fl':
        return <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">FL</span>;
      case 'mom':
        return <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">MoM</span>;
      case 'sr':
        return <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono">SR</span>;
      case 'utp':
        return <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono">UtP</span>;
      case 'soc':
        return <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-950 text-yellow-300 border border-yellow-800 font-mono">SoC</span>;
      case 'td':
        return <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800 font-mono">TD</span>;
      case 'cir':
        return <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono">CiR</span>;
      case 'mon':
        return <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-mono">MoN</span>;
      default:
        return <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">Core</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#070b16] text-slate-100 flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col space-y-6">
        {/* Top Return to Game Bar (if returning to an in-progress game) */}
        {onBackToGame && (
          <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-xl shadow-lg">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>An active expedition is currently underway.</span>
            </div>
            <button
              onClick={onBackToGame}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-serif font-bold transition-all shadow"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Active Game</span>
            </button>
          </div>
        )}

        {/* Header Branding */}
        <div className="text-center space-y-2 pt-2 sm:pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-700/60 text-amber-300 text-xs font-serif font-bold uppercase tracking-widest shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Campaign Initiation &amp; Roster Setup</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-wide text-slate-100 drop-shadow-md">
            Eldritch Horror Expedition Setup
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Configure your player party, toggle physical DLC card pools to filter card search decks, or enable Expansion Proxy Mode to play investigators from unowned expansions.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-center gap-2.5 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('players')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-serif text-sm font-bold tracking-wide transition-all ${
              activeTab === 'players'
                ? 'bg-amber-600 text-slate-950 shadow-lg'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Player Party ({players.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('expansions')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-serif text-sm font-bold tracking-wide transition-all ${
              activeTab === 'expansions'
                ? 'bg-amber-600 text-slate-950 shadow-lg'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Expansions &amp; DLCs ({enabledExpansions.length})</span>
          </button>
        </div>

        {/* TAB 1: PLAYER SETUP */}
        {activeTab === 'players' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Action Bar: Add Player + Randomize + Proxy Mode Pill */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-serif font-bold text-sm text-slate-200">
                  Party Roster ({players.length} / 8)
                </span>
                <span className="text-xs text-slate-400">
                  • {selectableInvestigators.length} investigators selectable
                  {allowExpansionProxies ? ' (Proxy Mode Active)' : ''}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Personal Stories Toggle Button */}
                {onTogglePersonalStories && (
                  <button
                    type="button"
                    onClick={onTogglePersonalStories}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-serif font-bold transition-all border ${
                      enablePersonalStories
                        ? 'bg-amber-950/90 border-amber-500 text-amber-200 shadow-sm ring-1 ring-amber-500/40'
                        : 'bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-slate-200 border-slate-700'
                    }`}
                    title="Enable investigator-specific Personal Stories quest cards with rewards and consequences"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>Personal Stories: {enablePersonalStories ? 'ENABLED' : 'OFF'}</span>
                  </button>
                )}

                {/* Proxy Mode Toggle Button */}
                {onToggleAllowExpansionProxies && (
                  <button
                    type="button"
                    onClick={onToggleAllowExpansionProxies}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-serif font-bold transition-all border ${
                      allowExpansionProxies
                        ? 'bg-purple-950/80 border-purple-500 text-purple-200 shadow-sm ring-1 ring-purple-500/40'
                        : 'bg-slate-800 hover:bg-slate-750 text-slate-400 border-slate-700'
                    }`}
                    title="Allow selecting investigators from unowned expansions as proxies"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>Expansion Proxy Mode: {allowExpansionProxies ? 'ENABLED' : 'OFF'}</span>
                  </button>
                )}

                <button
                  onClick={handleRandomizeAll}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                  title="Randomly assign investigators to each player"
                >
                  <Shuffle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Randomize Party</span>
                </button>

                {players.length < 8 && (
                  <button
                    onClick={() => onAddPlayer()}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-bold transition-all shadow"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Player</span>
                  </button>
                )}
              </div>
            </div>

            {/* Explanatory banner if Personal Stories are active */}
            {enablePersonalStories && (
              <div className="p-3 bg-amber-950/40 border border-amber-800/70 rounded-xl text-xs text-amber-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>
                    <strong>Personal Stories Enabled:</strong> Each investigator has a unique quest card with specific pass/fail objectives, custom rewards, and consequences accessible on their investigator profile.
                  </span>
                </div>
              </div>
            )}

            {/* Explanatory banner if Proxy Mode is active */}
            {allowExpansionProxies && (
              <div className="p-3 bg-purple-950/40 border border-purple-800/70 rounded-xl text-xs text-purple-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>
                    <strong>Proxy Mode Enabled:</strong> You can select investigators from any expansion (e.g., Strange Remnants, Mountains of Madness, Masks of Nyarlathotep) even if the expansion cards are disabled from the card pool.
                  </span>
                </div>
              </div>
            )}

            {/* Players Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {players.map((player, idx) => {
                const investigator =
                  allInvestigators.find((i) => i.id === player.investigatorId) ||
                  selectableInvestigators[0] ||
                  allInvestigators[0];

                return (
                  <div
                    key={player.id}
                    className="bg-[#101726] border border-slate-750 rounded-2xl p-4 shadow-xl flex flex-col justify-between gap-3 hover:border-slate-600 transition-all relative group"
                  >
                    {/* Header: Player Index, Editable Player Name, Remove button */}
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="w-6 h-6 rounded-full bg-slate-800 text-amber-400 font-serif font-black text-xs flex items-center justify-center border border-slate-700">
                          {idx + 1}
                        </span>
                        <input
                          type="text"
                          value={player.name}
                          onChange={(e) => onUpdatePlayer(player.id, { name: e.target.value })}
                          placeholder={`Player ${idx + 1}`}
                          className="bg-transparent font-serif font-bold text-slate-100 text-sm focus:outline-none focus:bg-slate-850 px-2 py-0.5 rounded border border-transparent focus:border-amber-600/60 w-44"
                        />
                      </div>

                      {players.length > 1 && (
                        <button
                          onClick={() => onRemovePlayer(player.id)}
                          className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
                          title="Remove player slot"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Investigator Card Preview & Selection */}
                    <div className="space-y-2.5">
                      {/* Dropdown Selector */}
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                          Assigned Investigator
                        </label>
                        <select
                          value={player.investigatorId}
                          onChange={(e) => onUpdatePlayer(player.id, { investigatorId: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs font-serif font-semibold focus:outline-none focus:border-amber-500"
                        >
                          {selectableInvestigators.map((inv) => {
                            const otherPlayer = players.find(
                              (p) => p.id !== player.id && p.investigatorId === inv.id
                            );
                            const isProxy =
                              !enabledExpansions.includes(inv.expansion || 'core') &&
                              inv.expansion !== 'custom';
                            return (
                              <option key={inv.id} value={inv.id} disabled={!!otherPlayer}>
                                {inv.name} — {inv.title}{' '}
                                {otherPlayer
                                  ? `(CHOSEN BY ${otherPlayer.name.toUpperCase()})`
                                  : isProxy
                                  ? `(PROXY - ${inv.expansion?.toUpperCase()})`
                                  : `(${inv.expansion?.toUpperCase() || 'CORE'})`}
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      {/* Investigator Card Cardlet */}
                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-serif font-black text-lg shadow-inner flex-shrink-0"
                          style={{ backgroundColor: investigator.avatarColor }}
                        >
                          {investigator.name.substring(0, 2).toUpperCase()}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="font-serif font-bold text-sm text-slate-100 truncate">
                              {investigator.name}
                            </h4>
                            {getExpansionBadge(investigator)}
                          </div>
                          <p className="text-[11px] text-amber-400 font-serif truncate">
                            {investigator.title}
                          </p>

                          {/* Health & Sanity Bar */}
                          <div className="flex items-center gap-3 mt-1.5 text-xs font-mono">
                            <span className="flex items-center gap-1 text-emerald-400">
                              <Heart className="w-3.5 h-3.5 fill-emerald-500/20 text-emerald-400" />
                              <span>{investigator.health} Health</span>
                            </span>
                            <span className="flex items-center gap-1 text-blue-400">
                              <Brain className="w-3.5 h-3.5 fill-blue-500/20 text-blue-400" />
                              <span>{investigator.sanity} Sanity</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Skills Strip with Bold & Enlarged Text */}
                      <div className="grid grid-cols-5 gap-1 pt-1">
                        <div className="p-1 rounded bg-slate-900 text-center border border-slate-800" title="Lore">
                          <LoreIcon className="w-3 h-3 text-purple-400 mx-auto" />
                          <span className="font-serif text-[11px] font-black uppercase text-purple-200 block">
                            Lore
                          </span>
                          <span className="font-mono text-xs font-bold text-purple-300">{investigator.skills.lore}</span>
                        </div>
                        <div className="p-1 rounded bg-slate-900 text-center border border-slate-800" title="Influence">
                          <InfluenceIcon className="w-3 h-3 text-orange-400 mx-auto" />
                          <span className="font-serif text-[11px] font-black uppercase text-orange-200 block">
                            Infl
                          </span>
                          <span className="font-mono text-xs font-bold text-orange-300">{investigator.skills.influence}</span>
                        </div>
                        <div className="p-1 rounded bg-slate-900 text-center border border-slate-800" title="Observation">
                          <ObservationIcon className="w-3 h-3 text-emerald-400 mx-auto" />
                          <span className="font-serif text-[11px] font-black uppercase text-emerald-200 block">
                            Obs
                          </span>
                          <span className="font-mono text-xs font-bold text-emerald-300">{investigator.skills.observation}</span>
                        </div>
                        <div className="p-1 rounded bg-slate-900 text-center border border-slate-800" title="Strength">
                          <StrengthIcon className="w-3 h-3 text-red-400 mx-auto" />
                          <span className="font-serif text-[11px] font-black uppercase text-red-200 block">
                            Str
                          </span>
                          <span className="font-mono text-xs font-bold text-red-300">{investigator.skills.strength}</span>
                        </div>
                        <div className="p-1 rounded bg-slate-900 text-center border border-slate-800" title="Will">
                          <WillIcon className="w-3 h-3 text-blue-400 mx-auto" />
                          <span className="font-serif text-[11px] font-black uppercase text-blue-200 block">
                            Will
                          </span>
                          <span className="font-mono text-xs font-bold text-blue-300">{investigator.skills.will}</span>
                        </div>
                      </div>

                      {/* Passive Rule */}
                      <div className="text-[11px] text-slate-300 bg-slate-950/70 p-2 rounded-lg border border-slate-850">
                        <span className="font-serif font-bold text-amber-300">{investigator.passive.title}: </span>
                        <span className="line-clamp-2">
                          <SkillHighlightedText text={investigator.passive.description} />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: EXPANSIONS & DLCS SELECTOR */}
        {activeTab === 'expansions' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Quick Filter Buttons & Proxy Explanation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 shadow-md">
              <div>
                <span className="text-xs text-slate-300 font-medium block">
                  Disabling an expansion removes its encounter, mystery, and asset cards from the card pool.
                </span>
                <span className="text-[11px] text-slate-400 font-sans">
                  Want to play an investigator from an unowned expansion? Enable <strong>Expansion Proxy Mode</strong> in the Players tab.
                </span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={handleSelectAllExpansions}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-amber-300 text-xs font-bold border border-slate-700 transition-colors"
                >
                  Enable All (9 DLCs)
                </button>
                <button
                  onClick={handleCoreOnlyExpansions}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  Core Game Only
                </button>
              </div>
            </div>

            {/* Expansions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {ALL_EXPANSIONS.map((exp) => {
                const isEnabled = enabledExpansions.includes(exp.code);
                const invCount = allInvestigators.filter((i) => (i.expansion || 'core') === exp.code).length;

                return (
                  <div
                    key={exp.code}
                    onClick={() => onToggleExpansion(exp.code)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                      isEnabled
                        ? 'bg-gradient-to-b from-[#131c31] to-[#0d1424] border-amber-600/80 shadow-lg shadow-amber-950/20'
                        : 'bg-slate-900/50 border-slate-800 opacity-60 hover:opacity-85'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                              isEnabled
                                ? 'bg-amber-600 border-amber-500 text-slate-950 font-bold'
                                : 'bg-slate-800 border-slate-700 text-transparent'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <h3 className="font-serif font-bold text-base text-slate-100 leading-tight">
                            {exp.name}
                          </h3>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono font-bold">
                          {exp.code.toUpperCase()}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono">
                      <span>{invCount} Investigators</span>
                      <span className={isEnabled ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                        {isEnabled ? 'Active in Deck' : 'Disabled'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Launch Bar */}
      <div className="w-full max-w-5xl mx-auto pt-6 border-t border-slate-800 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-400">
          <span className="font-bold text-slate-200">{players.length} Players</span> configured •{' '}
          <span className="font-bold text-amber-400">{enabledExpansions.length} DLCs</span> enabled •{' '}
          {allowExpansionProxies ? (
            <span className="font-bold text-purple-400">Proxy Mode Enabled</span>
          ) : (
            <span>Standard Mode</span>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {onBackToGame && (
            <button
              onClick={onBackToGame}
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-serif font-bold text-sm border border-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Game</span>
            </button>
          )}

          <button
            onClick={onStartGame}
            className="flex-1 sm:flex-none px-8 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 active:scale-95 text-slate-950 font-serif font-black text-sm uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <span>Begin Investigation</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
