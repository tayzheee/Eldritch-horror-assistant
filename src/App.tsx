import React, { useState } from 'react';
import { useGameState } from './hooks/useGameState';
import { TopActionBar } from './components/TopActionBar';
import { InvestigatorProfile } from './components/InvestigatorProfile';
import { PossessionsPanel } from './components/PossessionsPanel';
import { RerollAndTestSection } from './components/RerollAndTestSection';
import { DeathAndSuccessionSection } from './components/DeathAndSuccessionSection';
import { ActionsReferenceSection } from './components/ActionsReferenceSection';
import { GameSetupScreen } from './components/GameSetupScreen';
import { DeathSuccessionModal } from './components/DeathSuccessionModal';
import { InvestigatorPoolModal } from './components/InvestigatorPoolModal';
import { TestCalculatorModal } from './components/TestCalculatorModal';
import { SkillType } from './types';
import { applyStoryReward, applyStoryConsequence } from './data/personalStoryEffects';

export default function App() {
  const {
    gameState,
    activeInvestigator,
    activeState,
    activePlayer,
    allInvestigators,
    enabledInvestigators,
    availablePoolInvestigators,
    totalInvestigatorsCount,
    poolRemainingCount,
    // Expansion & Setup
    toggleExpansion,
    setEnabledExpansions,
    toggleAllowExpansionProxies,
    finishGameSetup,
    reopenGameSetup,
    // Personal stories
    togglePersonalStories,
    updatePersonalStoryStatus,
    updatePersonalStoryCount,
    setPersonalStoryCount,
    // Player slots
    addPlayerSlot,
    removePlayerSlot,
    updatePlayerSlot,
    switchPlayer,
    // Party & Investigator selection
    setActiveInvestigator,
    addInvestigatorToParty,
    setInvestigatorStatus,
    // Health & Sanity
    updateHealth,
    setHealthDirect,
    updateSanity,
    setSanityDirect,
    updateSkillModifier,
    updateToken,
    // Possessions & Trading
    addPossession,
    removePossession,
    toggleExhaustPossession,
    // Death & Succession
    markInvestigatorDefeated,
    collectInheritance,
    // Rerolls & Reset
    toggleSituational,
    spendReroll,
    resetRerolls,
    resetCurrentInvestigator,
    hardResetGame,
  } = useGameState();

  // Modals state
  const [isDeathModalOpen, setIsDeathModalOpen] = useState(false);
  const [isTestCalculatorOpen, setIsTestCalculatorOpen] = useState(false);
  const [selectedTestSkill, setSelectedTestSkill] = useState<SkillType>('strength');
  const [isPoolModalOpen, setIsPoolModalOpen] = useState(false);

  const handleOpenTestCalculator = (skill?: SkillType) => {
    if (skill) {
      setSelectedTestSkill(skill);
    }
    setIsTestCalculatorOpen(true);
  };

  const scrollToTests = () => {
    document.getElementById('rerolls-and-tests-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDeath = () => {
    document.getElementById('death-and-succession-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToActionsRef = () => {
    document.getElementById('actions-reference-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPossessions = () => {
    document.getElementById('possessions-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // 1. Initial Campaign & DLC Setup Screen
  if (!gameState.isGameSetupComplete) {
    return (
      <GameSetupScreen
        players={gameState.players}
        enabledExpansions={gameState.enabledExpansions}
        allInvestigators={allInvestigators}
        allowExpansionProxies={gameState.allowExpansionProxies}
        enablePersonalStories={gameState.enablePersonalStories}
        onToggleExpansion={toggleExpansion}
        onSetEnabledExpansions={setEnabledExpansions}
        onToggleAllowExpansionProxies={toggleAllowExpansionProxies}
        onTogglePersonalStories={togglePersonalStories}
        onAddPlayer={addPlayerSlot}
        onRemovePlayer={removePlayerSlot}
        onUpdatePlayer={updatePlayerSlot}
        onStartGame={finishGameSetup}
        onBackToGame={gameState.isGameSetupComplete ? finishGameSetup : undefined}
      />
    );
  }

  // 2. Active Game Tracker Dashboard
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-amber-600 selection:text-white">
      {/* Top Header: Active player tabs, quick player switcher, setup & death controls */}
      <TopActionBar
        activeInvestigator={activeInvestigator}
        activeState={activeState}
        activePlayer={activePlayer}
        players={gameState.players}
        investigatorStates={gameState.investigatorStates}
        fallenInvestigators={gameState.fallenInvestigators}
        enabledExpansions={gameState.enabledExpansions}
        poolRemainingCount={poolRemainingCount}
        totalInvestigatorsCount={totalInvestigatorsCount}
        partyInvestigatorIds={gameState.partyInvestigatorIds}
        allInvestigators={allInvestigators}
        onSwitchInvestigator={setActiveInvestigator}
        onSwitchPlayer={switchPlayer}
        onOpenPoolModal={() => setIsPoolModalOpen(true)}
        onOpenSetupScreen={reopenGameSetup}
        onOpenDeathModal={() => setIsDeathModalOpen(true)}
        onHardReset={hardResetGame}
        onScrollToTests={scrollToTests}
        onScrollToDeath={scrollToDeath}
        onScrollToActionsRef={scrollToActionsRef}
        onScrollToPossessions={scrollToPossessions}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 lg:p-6 space-y-6">
        {/* Upper Grid: Investigator Profile & Active Possessions Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Active Investigator Profile (Health, Sanity, Skills, Tokens) */}
          <section className="lg:col-span-5 w-full">
            <InvestigatorProfile
              investigator={activeInvestigator}
              state={activeState}
              onUpdateHealth={updateHealth}
              onSetHealth={setHealthDirect}
              onUpdateSanity={updateSanity}
              onSetSanity={setSanityDirect}
              onUpdateSkillModifier={updateSkillModifier}
              onUpdateToken={updateToken}
              onOpenTestCalculator={handleOpenTestCalculator}
              onResetInvestigator={resetCurrentInvestigator}
              onOpenDeathModal={() => setIsDeathModalOpen(true)}
              onUpdateStoryStatus={(status) => updatePersonalStoryStatus(status)}
              onUpdateStoryCount={(delta) => updatePersonalStoryCount(delta)}
              onSetStoryCount={(count) => setPersonalStoryCount(count)}
              enablePersonalStories={gameState.enablePersonalStories}
              onApplyStoryReward={() => {
                applyStoryReward({
                  investigatorId: activeInvestigator.id,
                  updateHealth,
                  updateSanity,
                  updateSkillModifier,
                  updateToken,
                });
              }}
              onApplyStoryConsequence={() => {
                applyStoryConsequence({
                  investigatorId: activeInvestigator.id,
                  updateHealth,
                  updateSanity,
                  updateSkillModifier,
                  updateToken,
                });
              }}
            />
          </section>

          {/* Right Column: Possessions Panel (Horizontal Side-to-Side Scrolling & Search) */}
          <section id="possessions-section" className="lg:col-span-7 w-full">
            <PossessionsPanel
              possessions={activeState.possessions}
              enabledExpansions={gameState.enabledExpansions}
              onAddPossession={addPossession}
              onRemovePossession={removePossession}
              onToggleExhaust={toggleExhaustPossession}
            />
          </section>
        </div>

        {/* Directly Under Possessions: Reroll Counter and Tests Console with Status Modifiers */}
        <section id="rerolls-and-tests-section" className="w-full">
          <RerollAndTestSection
            investigator={activeInvestigator}
            state={activeState}
            onSpendReroll={spendReroll}
            onResetRerolls={resetRerolls}
            onUpdateToken={updateToken}
            onToggleSituational={toggleSituational}
          />
        </section>

        {/* Directly Above Actions: Death & Succession Section with Inheritance Workflow */}
        <section id="death-and-succession-section" className="w-full">
          <DeathAndSuccessionSection
            activeInvestigator={activeInvestigator}
            activeState={activeState}
            activePlayer={activePlayer}
            allInvestigators={allInvestigators}
            enabledExpansions={gameState.enabledExpansions}
            fallenInvestigators={gameState.fallenInvestigators}
            availablePoolInvestigators={availablePoolInvestigators}
            onMarkDefeated={markInvestigatorDefeated}
            onCollectInheritance={collectInheritance}
            onSelectActiveInvestigator={setActiveInvestigator}
          />
        </section>

        {/* Below All Counters: Official Actions & Rules Reference Guide */}
        <section id="actions-reference-section" className="w-full">
          <ActionsReferenceSection
            activeInvestigator={activeInvestigator}
            activeState={activeState}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#060a12] border-t border-slate-800/80 py-4 px-4 text-center text-xs text-slate-500 font-serif">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Eldritch Horror Companion • Party Tracker, Tokens, Possessions &amp; Combat Rerolls
          </span>
          <div className="flex items-center gap-3 text-[11px] text-slate-400 font-sans">
            <span>
              {gameState.players.length} Players Active
            </span>
            <span>•</span>
            <span>
              {gameState.enabledExpansions.length} DLCs Enabled
            </span>
            <span>•</span>
            <span>
              {poolRemainingCount} / {totalInvestigatorsCount} In Pool
            </span>
          </div>
        </div>
      </footer>

      {/* Death, Defeat & Succession Modal */}
      <DeathSuccessionModal
        isOpen={isDeathModalOpen}
        onClose={() => setIsDeathModalOpen(false)}
        activeInvestigator={activeInvestigator}
        activeState={activeState}
        activePlayer={activePlayer}
        availableInvestigators={availablePoolInvestigators}
        fallenInvestigators={gameState.fallenInvestigators}
        onMarkDefeated={markInvestigatorDefeated}
        onCollectInheritance={collectInheritance}
      />

      {/* Investigator Roster Pool & Draft Modal */}
      <InvestigatorPoolModal
        isOpen={isPoolModalOpen}
        onClose={() => setIsPoolModalOpen(false)}
        allInvestigators={allInvestigators}
        partyInvestigatorIds={gameState.partyInvestigatorIds}
        activeInvestigatorId={activeInvestigator.id}
        investigatorStates={gameState.investigatorStates}
        enabledExpansions={gameState.enabledExpansions}
        fallenInvestigators={gameState.fallenInvestigators}
        onSelectActive={setActiveInvestigator}
        onAddToParty={addInvestigatorToParty}
        onSetStatus={setInvestigatorStatus}
      />

      {/* Quick Test Modal */}
      <TestCalculatorModal
        isOpen={isTestCalculatorOpen}
        onClose={() => setIsTestCalculatorOpen(false)}
        initialSkill={selectedTestSkill}
        investigator={activeInvestigator}
        state={activeState}
        onSpendReroll={spendReroll}
        onResetRerolls={resetRerolls}
        onUpdateToken={updateToken}
        onRemovePossession={removePossession}
      />
    </div>
  );
}
