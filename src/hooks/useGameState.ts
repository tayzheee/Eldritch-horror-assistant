import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  GameState,
  InvestigatorState,
  SkillType,
  TileType,
  PossessionCard,
  ExpansionCode,
  PlayerSlot,
  FallenInvestigator,
  InvestigatorStatic,
} from '../types';
import { INVESTIGATORS } from '../data/investigators';
import { PRESET_POSSESSIONS } from '../data/possessionsCatalog';

const STORAGE_KEY = 'eldritch_horror_tracker_state_v3';

const ALL_EXPANSION_CODES: ExpansionCode[] = [
  'core',
  'fl',
  'mom',
  'sr',
  'utp',
  'soc',
  'td',
  'cir',
  'mon',
];

function createInitialInvestigatorState(invId: string, customList: InvestigatorStatic[] = []): InvestigatorState {
  const combined = [...INVESTIGATORS, ...customList];
  const inv = combined.find((i) => i.id === invId) || combined[0] || INVESTIGATORS[0];
  const possessions = [...inv.startingPossessions];

  return {
    investigatorId: inv.id,
    currentHealth: inv.health,
    maxHealth: inv.health,
    currentSanity: inv.sanity,
    maxSanity: inv.sanity,
    location: inv.startingLocation,
    tileType: inv.startingTileType,
    actionsTaken: 0,
    maxActions: 2,
    skillModifiers: {
      lore: 0,
      influence: 0,
      observation: 0,
      strength: 0,
      will: 0,
    },
    tokens: {
      focus: inv.startingTokens?.focus ?? 0,
      resources: inv.startingTokens?.resources ?? 0,
      clues: inv.startingTokens?.clues ?? 0,
      trainTickets: inv.startingTokens?.trainTickets ?? 0,
      shipTickets: inv.startingTokens?.shipTickets ?? 0,
      eldritch: inv.startingTokens?.eldritch ?? 0,
    },
    possessions,
    rerollsUsedThisTurn: 0,
    status: 'active',
    sameTileAsLeoAnderson: false,
    isBlessed: false,
    isCursed: false,
    isPoisoned: false,
    hasLegInjury: false,
  };
}

function getDefaultGameState(): GameState {
  const initialStates: Record<string, InvestigatorState> = {};
  INVESTIGATORS.forEach((inv) => {
    initialStates[inv.id] = createInitialInvestigatorState(inv.id);
  });

  const defaultPlayers: PlayerSlot[] = [
    { id: 'player-1', name: 'Player 1', investigatorId: 'leo-anderson' },
    { id: 'player-2', name: 'Player 2', investigatorId: 'daisy-walker' },
  ];

  return {
    activeInvestigatorId: 'leo-anderson',
    partyInvestigatorIds: ['leo-anderson', 'daisy-walker'],
    investigatorStates: initialStates,
    turnNumber: 1,
    enabledExpansions: ALL_EXPANSION_CODES,
    players: defaultPlayers,
    isGameSetupComplete: false, // Show setup screen first on fresh launch
    fallenInvestigators: [],
  };
}

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: GameState = JSON.parse(saved);
        // Ensure all investigators exist in state
        INVESTIGATORS.forEach((inv) => {
          if (!parsed.investigatorStates[inv.id]) {
            parsed.investigatorStates[inv.id] = createInitialInvestigatorState(inv.id);
          }
        });
        if (!parsed.enabledExpansions || parsed.enabledExpansions.length === 0) {
          parsed.enabledExpansions = ALL_EXPANSION_CODES;
        }
        if (!parsed.players || parsed.players.length === 0) {
          parsed.players = [
            { id: 'player-1', name: 'Player 1', investigatorId: parsed.activeInvestigatorId || 'leo-anderson' },
          ];
        }
        if (!parsed.fallenInvestigators) {
          parsed.fallenInvestigators = [];
        }
        if (!parsed.customInvestigators) {
          parsed.customInvestigators = [];
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to parse saved game state:', e);
    }
    return getDefaultGameState();
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch (e) {
      console.error('Failed to save game state to localStorage:', e);
    }
  }, [gameState]);

  const allInvestigators = useMemo(() => {
    const raw = [...INVESTIGATORS, ...(gameState.customInvestigators || [])];
    const seen = new Set<string>();
    return raw.filter((inv) => {
      if (seen.has(inv.id)) return false;
      seen.add(inv.id);
      return true;
    });
  }, [gameState.customInvestigators]);

  const activeInvestigator = useMemo(() => {
    return allInvestigators.find((i) => i.id === gameState.activeInvestigatorId) || allInvestigators[0];
  }, [allInvestigators, gameState.activeInvestigatorId]);

  const activeState = useMemo(() => {
    return (
      gameState.investigatorStates[gameState.activeInvestigatorId] ||
      createInitialInvestigatorState(gameState.activeInvestigatorId, gameState.customInvestigators)
    );
  }, [gameState.investigatorStates, gameState.activeInvestigatorId, gameState.customInvestigators]);

  // Available DLC filtered investigators & catalog (strictly deduplicated)
  const enabledInvestigators = useMemo(() => {
    const list = gameState.allowExpansionProxies
      ? allInvestigators
      : allInvestigators.filter((inv) =>
          gameState.enabledExpansions.includes(inv.expansion || 'core') || inv.isAdHoc
        );
    const seen = new Set<string>();
    return list.filter((inv) => {
      if (seen.has(inv.id)) return false;
      seen.add(inv.id);
      return true;
    });
  }, [allInvestigators, gameState.enabledExpansions, gameState.allowExpansionProxies]);

  const enabledCards = useMemo(() => {
    return PRESET_POSSESSIONS.filter((card) =>
      gameState.enabledExpansions.includes(card.expansion || 'core')
    );
  }, [gameState.enabledExpansions]);

  // Current active player slot
  const activePlayer = useMemo(() => {
    return (
      gameState.players.find((p) => p.investigatorId === gameState.activeInvestigatorId) ||
      gameState.players[0]
    );
  }, [gameState.players, gameState.activeInvestigatorId]);

  // ==========================================
  // EXPANSION / DLC MANAGEMENT
  // ==========================================
  const toggleExpansion = useCallback((code: ExpansionCode) => {
    setGameState((prev) => {
      const isCurrentlyEnabled = prev.enabledExpansions.includes(code);
      // Ensure at least one expansion (like 'core') remains enabled
      if (isCurrentlyEnabled && prev.enabledExpansions.length === 1) {
        return prev;
      }
      const newExpansions = isCurrentlyEnabled
        ? prev.enabledExpansions.filter((c) => c !== code)
        : [...prev.enabledExpansions, code];
      return {
        ...prev,
        enabledExpansions: newExpansions,
      };
    });
  }, []);

  const setEnabledExpansions = useCallback((codes: ExpansionCode[]) => {
    setGameState((prev) => ({
      ...prev,
      enabledExpansions: codes.length > 0 ? codes : ['core'],
    }));
  }, []);

  // ==========================================
  // SETUP SCREEN CONTROLS
  // ==========================================
  const finishGameSetup = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isGameSetupComplete: true,
    }));
  }, []);

  const reopenGameSetup = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isGameSetupComplete: false,
    }));
  }, []);

  // ==========================================
  // PLAYER SLOTS MANAGEMENT
  // ==========================================
  const addPlayerSlot = useCallback((customName?: string) => {
    setGameState((prev) => {
      const nextNum = prev.players.length + 1;
      const newPlayerId = `player-${Date.now()}`;
      const name = customName || `Player ${nextNum}`;

      // Pick an unused investigator from enabled expansions
      const takenInvIds = new Set(prev.players.map((p) => p.investigatorId));
      const pool = prev.allowExpansionProxies
        ? INVESTIGATORS
        : INVESTIGATORS.filter((inv) => prev.enabledExpansions.includes(inv.expansion || 'core'));

      const available = pool.filter((inv) => !takenInvIds.has(inv.id));
      const chosenInv = available[0] || pool[0] || INVESTIGATORS[0];

      const updatedPlayers = [
        ...prev.players,
        { id: newPlayerId, name, investigatorId: chosenInv.id },
      ];

      const uniqueParty = Array.from(new Set(updatedPlayers.map((p) => p.investigatorId)));

      return {
        ...prev,
        players: updatedPlayers,
        partyInvestigatorIds: uniqueParty,
      };
    });
  }, []);

  const removePlayerSlot = useCallback((playerId: string) => {
    setGameState((prev) => {
      if (prev.players.length <= 1) return prev; // Keep at least 1 player
      const updatedPlayers = prev.players.filter((p) => p.id !== playerId);
      const uniqueParty = Array.from(new Set(updatedPlayers.map((p) => p.investigatorId)));

      const nextActive = uniqueParty.includes(prev.activeInvestigatorId)
        ? prev.activeInvestigatorId
        : uniqueParty[0] || 'leo-anderson';

      return {
        ...prev,
        players: updatedPlayers,
        partyInvestigatorIds: uniqueParty.length > 0 ? uniqueParty : [nextActive],
        activeInvestigatorId: nextActive,
      };
    });
  }, []);

  const updatePlayerSlot = useCallback((playerId: string, updates: Partial<PlayerSlot>) => {
    setGameState((prev) => {
      const oldPlayer = prev.players.find((p) => p.id === playerId);
      const updatedPlayers = prev.players.map((p) =>
        p.id === playerId ? { ...p, ...updates } : p
      );

      // Recalculate party from all player slots to prevent stale/duplicate entries
      const uniqueParty = Array.from(new Set(updatedPlayers.map((p) => p.investigatorId)));

      const nextActive =
        prev.activeInvestigatorId === oldPlayer?.investigatorId && updates.investigatorId
          ? updates.investigatorId
          : uniqueParty.includes(prev.activeInvestigatorId)
          ? prev.activeInvestigatorId
          : uniqueParty[0] || 'leo-anderson';

      return {
        ...prev,
        players: updatedPlayers,
        partyInvestigatorIds: uniqueParty,
        activeInvestigatorId: nextActive,
      };
    });
  }, []);

  const switchPlayer = useCallback((playerId: string) => {
    setGameState((prev) => {
      const target = prev.players.find((p) => p.id === playerId);
      if (!target) return prev;
      return {
        ...prev,
        activeInvestigatorId: target.investigatorId,
      };
    });
  }, []);

  const setActiveInvestigator = useCallback((id: string) => {
    setGameState((prev) => {
      const party = prev.partyInvestigatorIds.includes(id)
        ? prev.partyInvestigatorIds
        : [...prev.partyInvestigatorIds, id];
      return {
        ...prev,
        activeInvestigatorId: id,
        partyInvestigatorIds: party,
      };
    });
  }, []);

  // Add investigator from pool to active party
  const addInvestigatorToParty = useCallback((id: string) => {
    setGameState((prev) => {
      if (prev.partyInvestigatorIds.includes(id)) return prev;
      return {
        ...prev,
        partyInvestigatorIds: [...prev.partyInvestigatorIds, id],
        activeInvestigatorId: id,
      };
    });
  }, []);

  // Remove or retire investigator from party back to pool
  const setInvestigatorStatus = useCallback(
    (id: string, status: 'active' | 'in_pool' | 'defeated' | 'devoured') => {
      setGameState((prev) => {
        const newParty =
          status === 'active'
            ? prev.partyInvestigatorIds.includes(id)
              ? prev.partyInvestigatorIds
              : [...prev.partyInvestigatorIds, id]
            : prev.partyInvestigatorIds.filter((pId) => pId !== id);

        const nextActive =
          prev.activeInvestigatorId === id ? newParty[0] || 'leo-anderson' : prev.activeInvestigatorId;

        return {
          ...prev,
          activeInvestigatorId: nextActive,
          partyInvestigatorIds: newParty.length > 0 ? newParty : [nextActive],
          investigatorStates: {
            ...prev.investigatorStates,
            [id]: {
              ...prev.investigatorStates[id],
              status,
            },
          },
        };
      });
    },
    []
  );

  // ==========================================
  // DEATH, DEFEAT & SUCCESSION ENGINE
  // ==========================================
  const markInvestigatorDefeated = useCallback(
    (
      cause: 'health' | 'sanity' | 'devoured',
      replacementInvestigatorId?: string,
      dropLocation?: string
    ) => {
      setGameState((prev) => {
        const currentInv = allInvestigators.find((i) => i.id === prev.activeInvestigatorId);
        const currentState = prev.investigatorStates[prev.activeInvestigatorId];
        const associatedPlayer = prev.players.find((p) => p.investigatorId === prev.activeInvestigatorId);

        if (!currentInv || !currentState) return prev;

        // Determine authentic defeat encounter instructions
        let defeatText = '';
        if (cause === 'health') {
          defeatText =
            currentInv.defeatEncounter?.healthDefeat ||
            `${currentInv.name} has suffered fatal physical trauma. Any investigator on this space may test Strength or Will to recover their equipment.`;
        } else if (cause === 'sanity') {
          defeatText =
            currentInv.defeatEncounter?.sanityDefeat ||
            `${currentInv.name}'s mind has collapsed into complete delirium. Any investigator on this space may test Will or Influence to calm their trance and recover their belongings.`;
        } else {
          defeatText = `${currentInv.name} was devoured by the cosmic abyss. Their physical form and consciousness were erased from this dimension.`;
        }

        const resolvedLocation =
          dropLocation?.trim() || currentState.location || currentInv.startingLocation || 'Current Space';

        const newFallenRecord: FallenInvestigator = {
          id: `fallen-${Date.now()}`,
          investigatorId: currentInv.id,
          playerName: associatedPlayer?.name || 'Player',
          cause,
          defeatText,
          location: resolvedLocation,
          possessions: [...currentState.possessions],
          tokens: { ...currentState.tokens },
          defeatedAtTimestamp: Date.now(),
          collected: cause === 'devoured', // Devoured gear is lost to abyss
        };

        // If replacement is selected, update player's slot
        const updatedPlayers = prev.players.map((p) => {
          if (p.investigatorId === currentInv.id && replacementInvestigatorId) {
            return { ...p, investigatorId: replacementInvestigatorId };
          }
          return p;
        });

        const newParty = prev.partyInvestigatorIds
          .filter((id) => id !== currentInv.id)
          .concat(replacementInvestigatorId ? [replacementInvestigatorId] : []);

        const nextActiveId = replacementInvestigatorId || newParty[0] || 'leo-anderson';

        const newStates = { ...prev.investigatorStates };
        if (replacementInvestigatorId && !newStates[replacementInvestigatorId]) {
          newStates[replacementInvestigatorId] = createInitialInvestigatorState(
            replacementInvestigatorId,
            prev.customInvestigators
          );
        }

        newStates[currentInv.id] = {
          ...currentState,
          status: cause === 'devoured' ? 'devoured' : 'defeated',
          currentHealth: 0,
          currentSanity: 0,
          possessions: [],
          tokens: { focus: 0, resources: 0, clues: 0, trainTickets: 0, shipTickets: 0, eldritch: 0 },
        };

        return {
          ...prev,
          activeInvestigatorId: nextActiveId,
          partyInvestigatorIds: newParty.length > 0 ? Array.from(new Set(newParty)) : [nextActiveId],
          players: updatedPlayers,
          fallenInvestigators: [newFallenRecord, ...prev.fallenInvestigators],
          investigatorStates: newStates,
        };
      });
    },
    [allInvestigators]
  );

  // Collect inheritance / possessions from a dead investigator
  const collectInheritance = useCallback(
    (fallenRecordId: string, cardIdOrIds?: string | string[], takeTokens?: boolean) => {
      setGameState((prev) => {
        const fallenIndex = prev.fallenInvestigators.findIndex((f) => f.id === fallenRecordId);
        if (fallenIndex === -1) return prev;

        const fallen = prev.fallenInvestigators[fallenIndex];
        const activeInvId = prev.activeInvestigatorId;
        const currentActiveState = prev.investigatorStates[activeInvId];
        if (!currentActiveState) return prev;

        const idsToTake: string[] = Array.isArray(cardIdOrIds)
          ? cardIdOrIds
          : typeof cardIdOrIds === 'string'
          ? [cardIdOrIds]
          : [];

        const isTakeAll = !cardIdOrIds && takeTokens === undefined;

        let cardsToTransfer: PossessionCard[] = [];
        let remainingFallenPossessions = [...fallen.possessions];

        if (isTakeAll) {
          cardsToTransfer = [...fallen.possessions];
          remainingFallenPossessions = [];
        } else if (idsToTake.length > 0) {
          cardsToTransfer = fallen.possessions.filter((c) => idsToTake.includes(c.id));
          remainingFallenPossessions = fallen.possessions.filter((c) => !idsToTake.includes(c.id));
        }

        const shouldTakeTokens = isTakeAll || takeTokens === true;
        const updatedActiveTokens = shouldTakeTokens
          ? {
              focus: currentActiveState.tokens.focus + fallen.tokens.focus,
              resources: currentActiveState.tokens.resources + fallen.tokens.resources,
              clues: currentActiveState.tokens.clues + fallen.tokens.clues,
              trainTickets: currentActiveState.tokens.trainTickets + fallen.tokens.trainTickets,
              shipTickets: currentActiveState.tokens.shipTickets + fallen.tokens.shipTickets,
              eldritch: currentActiveState.tokens.eldritch + fallen.tokens.eldritch,
            }
          : currentActiveState.tokens;

        const remainingFallenTokens = shouldTakeTokens
          ? { focus: 0, resources: 0, clues: 0, trainTickets: 0, shipTickets: 0, eldritch: 0 }
          : fallen.tokens;

        const isNowEmpty =
          remainingFallenPossessions.length === 0 &&
          Object.values(remainingFallenTokens).every((v) => v === 0);

        const updatedFallenList = [...prev.fallenInvestigators];
        updatedFallenList[fallenIndex] = {
          ...fallen,
          possessions: remainingFallenPossessions,
          tokens: remainingFallenTokens,
          collected: isNowEmpty,
        };

        return {
          ...prev,
          fallenInvestigators: updatedFallenList,
          investigatorStates: {
            ...prev.investigatorStates,
            [activeInvId]: {
              ...currentActiveState,
              possessions: [...currentActiveState.possessions, ...cardsToTransfer],
              tokens: updatedActiveTokens,
            },
          },
        };
      });
    },
    []
  );

  // Health and Sanity updates
  const updateHealth = useCallback((delta: number) => {
    setGameState((prev) => {
      const current = prev.investigatorStates[prev.activeInvestigatorId];
      if (!current) return prev;
      const newHealth = Math.max(0, Math.min(current.maxHealth, current.currentHealth + delta));
      return {
        ...prev,
        investigatorStates: {
          ...prev.investigatorStates,
          [prev.activeInvestigatorId]: {
            ...current,
            currentHealth: newHealth,
          },
        },
      };
    });
  }, []);

  const setHealthDirect = useCallback((val: number) => {
    setGameState((prev) => {
      const current = prev.investigatorStates[prev.activeInvestigatorId];
      if (!current) return prev;
      return {
        ...prev,
        investigatorStates: {
          ...prev.investigatorStates,
          [prev.activeInvestigatorId]: {
            ...current,
            currentHealth: Math.max(0, Math.min(current.maxHealth, val)),
          },
        },
      };
    });
  }, []);

  const updateSanity = useCallback((delta: number) => {
    setGameState((prev) => {
      const current = prev.investigatorStates[prev.activeInvestigatorId];
      if (!current) return prev;
      const newSanity = Math.max(0, Math.min(current.maxSanity, current.currentSanity + delta));
      return {
        ...prev,
        investigatorStates: {
          ...prev.investigatorStates,
          [prev.activeInvestigatorId]: {
            ...current,
            currentSanity: newSanity,
          },
        },
      };
    });
  }, []);

  const setSanityDirect = useCallback((val: number) => {
    setGameState((prev) => {
      const current = prev.investigatorStates[prev.activeInvestigatorId];
      if (!current) return prev;
      return {
        ...prev,
        investigatorStates: {
          ...prev.investigatorStates,
          [prev.activeInvestigatorId]: {
            ...current,
            currentSanity: Math.max(0, Math.min(current.maxSanity, val)),
          },
        },
      };
    });
  }, []);

  // Skill modifiers
  const updateSkillModifier = useCallback((skill: SkillType, delta: number) => {
    setGameState((prev) => {
      const current = prev.investigatorStates[prev.activeInvestigatorId];
      if (!current) return prev;
      const currentVal = current.skillModifiers[skill] || 0;
      const nextVal = Math.max(-2, Math.min(4, currentVal + delta));
      return {
        ...prev,
        investigatorStates: {
          ...prev.investigatorStates,
          [prev.activeInvestigatorId]: {
            ...current,
            skillModifiers: {
              ...current.skillModifiers,
              [skill]: nextVal,
            },
          },
        },
      };
    });
  }, []);

  // Token updates
  const updateToken = useCallback((tokenType: keyof InvestigatorState['tokens'], delta: number) => {
    setGameState((prev) => {
      const current = prev.investigatorStates[prev.activeInvestigatorId];
      if (!current) return prev;
      const currentTokens = current.tokens;
      const currentCount = currentTokens[tokenType] || 0;
      const nextCount = Math.max(0, currentCount + delta);

      return {
        ...prev,
        investigatorStates: {
          ...prev.investigatorStates,
          [prev.activeInvestigatorId]: {
            ...current,
            tokens: {
              ...currentTokens,
              [tokenType]: nextCount,
            },
          },
        },
      };
    });
  }, []);

  // Possessions
  const addPossession = useCallback((card: PossessionCard) => {
    setGameState((prev) => {
      const current = prev.investigatorStates[prev.activeInvestigatorId];
      if (!current) return prev;
      const newCard = { ...card, id: `${card.id}-${Date.now()}` };
      return {
        ...prev,
        investigatorStates: {
          ...prev.investigatorStates,
          [prev.activeInvestigatorId]: {
            ...current,
            possessions: [...current.possessions, newCard],
          },
        },
      };
    });
  }, []);

  const removePossession = useCallback((cardId: string) => {
    setGameState((prev) => {
      const current = prev.investigatorStates[prev.activeInvestigatorId];
      if (!current) return prev;
      return {
        ...prev,
        investigatorStates: {
          ...prev.investigatorStates,
          [prev.activeInvestigatorId]: {
            ...current,
            possessions: current.possessions.filter((p) => p.id !== cardId),
          },
        },
      };
    });
  }, []);

  const toggleExhaustPossession = useCallback((cardId: string) => {
    setGameState((prev) => {
      const current = prev.investigatorStates[prev.activeInvestigatorId];
      if (!current) return prev;
      return {
        ...prev,
        investigatorStates: {
          ...prev.investigatorStates,
          [prev.activeInvestigatorId]: {
            ...current,
            possessions: current.possessions.map((p) =>
              p.id === cardId ? { ...p, isExhausted: !p.isExhausted } : p
            ),
          },
        },
      };
    });
  }, []);

  // Transfer an item between living companions
  const transferPossessionToPlayer = useCallback(
    (cardId: string, targetInvestigatorId: string) => {
      setGameState((prev) => {
        const sourceState = prev.investigatorStates[prev.activeInvestigatorId];
        const targetState = prev.investigatorStates[targetInvestigatorId];
        if (!sourceState || !targetState) return prev;

        const cardToTransfer = sourceState.possessions.find((p) => p.id === cardId);
        if (!cardToTransfer) return prev;

        return {
          ...prev,
          investigatorStates: {
            ...prev.investigatorStates,
            [prev.activeInvestigatorId]: {
              ...sourceState,
              possessions: sourceState.possessions.filter((p) => p.id !== cardId),
            },
            [targetInvestigatorId]: {
              ...targetState,
              possessions: [...targetState.possessions, cardToTransfer],
            },
          },
        };
      });
    },
    []
  );

  // Situational state toggles
  const toggleSituational = useCallback(
    (key: 'sameTileAsLeoAnderson' | 'isBlessed' | 'isCursed' | 'isPoisoned' | 'hasLegInjury') => {
      setGameState((prev) => {
        const current = prev.investigatorStates[prev.activeInvestigatorId];
        if (!current) return prev;
        return {
          ...prev,
          investigatorStates: {
            ...prev.investigatorStates,
            [prev.activeInvestigatorId]: {
              ...current,
              [key]: !current[key],
            },
          },
        };
      });
    },
    []
  );

  // Rerolls
  const spendReroll = useCallback(() => {
    setGameState((prev) => {
      const current = prev.investigatorStates[prev.activeInvestigatorId];
      if (!current) return prev;
      return {
        ...prev,
        investigatorStates: {
          ...prev.investigatorStates,
          [prev.activeInvestigatorId]: {
            ...current,
            rerollsUsedThisTurn: current.rerollsUsedThisTurn + 1,
          },
        },
      };
    });
  }, []);

  const resetRerolls = useCallback(() => {
    setGameState((prev) => {
      const current = prev.investigatorStates[prev.activeInvestigatorId];
      if (!current) return prev;
      return {
        ...prev,
        investigatorStates: {
          ...prev.investigatorStates,
          [prev.activeInvestigatorId]: {
            ...current,
            rerollsUsedThisTurn: 0,
          },
        },
      };
    });
  }, []);

  const resetCurrentInvestigator = useCallback(() => {
    setGameState((prev) => {
      return {
        ...prev,
        investigatorStates: {
          ...prev.investigatorStates,
          [prev.activeInvestigatorId]: createInitialInvestigatorState(prev.activeInvestigatorId),
        },
      };
    });
  }, []);

  const hardResetGame = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage error
    }
    setGameState(getDefaultGameState());
  }, []);

  const toggleAllowExpansionProxies = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      allowExpansionProxies: !prev.allowExpansionProxies,
    }));
  }, []);

  const addCustomInvestigator = useCallback((newInv: InvestigatorStatic) => {
    setGameState((prev) => {
      const existingCustom = prev.customInvestigators || [];
      const updatedCustom = [...existingCustom.filter((c) => c.id !== newInv.id), newInv];
      const newState = createInitialInvestigatorState(newInv.id, updatedCustom);
      return {
        ...prev,
        customInvestigators: updatedCustom,
        investigatorStates: {
          ...prev.investigatorStates,
          [newInv.id]: prev.investigatorStates[newInv.id] || newState,
        },
      };
    });
  }, []);

  const deleteCustomInvestigator = useCallback((id: string) => {
    setGameState((prev) => {
      const existingCustom = prev.customInvestigators || [];
      const updatedCustom = existingCustom.filter((c) => c.id !== id);
      const newStates = { ...prev.investigatorStates };
      delete newStates[id];
      const newParty = prev.partyInvestigatorIds.filter((pid) => pid !== id);
      const newActiveId = prev.activeInvestigatorId === id ? (newParty[0] || 'leo-anderson') : prev.activeInvestigatorId;
      return {
        ...prev,
        customInvestigators: updatedCustom,
        investigatorStates: newStates,
        partyInvestigatorIds: newParty.length > 0 ? newParty : ['leo-anderson'],
        activeInvestigatorId: newActiveId,
      };
    });
  }, []);

  // Total counts and reserve pool strictly accounting for selected DLCs & active/fallen investigators
  const partyInvIdsSet = useMemo(() => {
    return new Set(gameState.partyInvestigatorIds);
  }, [gameState.partyInvestigatorIds]);

  const fallenInvIdsSet = useMemo(() => {
    return new Set(gameState.fallenInvestigators.map((f) => f.investigatorId));
  }, [gameState.fallenInvestigators]);

  // Available reserve pool investigators (unique, enabled by DLC, not in party, not fallen)
  const availablePoolInvestigators = useMemo(() => {
    return enabledInvestigators.filter(
      (inv) => !partyInvIdsSet.has(inv.id) && !fallenInvIdsSet.has(inv.id)
    );
  }, [enabledInvestigators, partyInvIdsSet, fallenInvIdsSet]);

  const totalInvestigatorsCount = enabledInvestigators.length;
  const activePartyCount = gameState.partyInvestigatorIds.length;
  const poolRemainingCount = availablePoolInvestigators.length;

  return {
    gameState,
    activeInvestigator,
    activeState,
    activePlayer,
    allInvestigators,
    enabledInvestigators,
    availablePoolInvestigators,
    enabledCards,
    presetPossessions: PRESET_POSSESSIONS,
    totalInvestigatorsCount,
    activePartyCount,
    poolRemainingCount,
    // Expansion & Proxy controls
    toggleExpansion,
    setEnabledExpansions,
    toggleAllowExpansionProxies,
    addCustomInvestigator,
    deleteCustomInvestigator,
    // Setup controls
    finishGameSetup,
    reopenGameSetup,
    // Player slots controls
    addPlayerSlot,
    removePlayerSlot,
    updatePlayerSlot,
    switchPlayer,
    // Party & Investigator controls
    setActiveInvestigator,
    addInvestigatorToParty,
    setInvestigatorStatus,
    // Stats & Tokens
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
    transferPossessionToPlayer,
    // Death & Succession
    markInvestigatorDefeated,
    collectInheritance,
    // Rerolls & Reset
    toggleSituational,
    spendReroll,
    resetRerolls,
    resetCurrentInvestigator,
    hardResetGame,
  };
}
