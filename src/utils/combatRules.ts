import { PossessionCard, SkillType } from '../types';

export type CombatHandType = 'weapon' | 'spell';
export type CardBonusMode = 'passive' | 'once-per-round' | 'discard';

export interface CardBonusDetail {
  card: PossessionCard;
  skill: SkillType;
  amount: number;
  sourceType: 'stat' | 'combat' | 'once-per-round' | 'discard';
  description: string;
}

export interface BonusCalculationOptions {
  activePossessions: PossessionCard[];
  selectedSkill: SkillType;
  isCombat: boolean;
  preferredHand?: CombatHandType;
  activeMode?: CardBonusMode;
  selectedOncePerRoundCardId?: string;
  selectedDiscardCardId?: string;
  customDiscardBonus?: number;
  customOncePerRoundBonus?: number;
}

export interface BonusCalculationResult {
  // Available candidates
  weaponBonuses: CardBonusDetail[];
  spellBonuses: CardBonusDetail[];
  oncePerRoundCards: CardBonusDetail[];
  discardCards: CardBonusDetail[];

  // Highest values per category (No stacking)
  highestWeaponBonus: number;
  bestWeaponCard?: PossessionCard;

  highestSpellBonus: number;
  bestSpellCard?: PossessionCard;

  highestPassiveStatBonus: number;
  bestPassiveStatCard?: PossessionCard;

  highestOncePerRoundBonus: number;
  bestOncePerRoundCard?: PossessionCard;

  highestDiscardBonus: number;
  bestDiscardCard?: PossessionCard;

  // Selected Hand (Weapon vs Spell - CANNOT COMBINE)
  activeHand: CombatHandType;

  // Active Mode (Passive vs Once-per-Round vs Discard - Discard & Once-per-Round supersede Passive)
  activeMode: CardBonusMode;

  // Final resulting card bonus applied to the test dice pool
  finalBonus: number;
  bonusSourceDescription: string;
  supersededDescription?: string;

  // Ruling explanatory notes for UI transparency
  rulingNotes: string[];
}

/**
 * Checks if a card has a discard-to-gain effect.
 * Detected via isDiscardToGain property, discardBonus property, or text keywords.
 */
export function isDiscardToGainCard(card: PossessionCard): boolean {
  if (card.isDiscardToGain || card.discardBonus) return true;
  const text = (card.effectText || '').toLowerCase();
  return (
    text.includes('discard this card') ||
    text.includes('discard during combat') ||
    text.includes('discard to gain') ||
    text.includes('discard to deal')
  );
}

/**
 * Checks if a card has a once-per-round effect.
 * Detected via isOncePerRound property, oncePerRoundBonus property, or text keywords.
 */
export function isOncePerRoundCard(card: PossessionCard): boolean {
  if (card.isOncePerRound || card.oncePerRoundBonus) return true;
  const text = (card.effectText || '').toLowerCase();
  return text.includes('once per round') || text.includes('once each round');
}

/**
 * Resolves test and combat card bonuses strictly adhering to Eldritch Horror rulings:
 * 1. Non-Stacking (Highest Gain Rule): An investigator receives a bonus from only ONE card.
 *    If multiple cards provide bonuses, only the highest single bonus applies (no stacking to +20).
 * 2. Hand Limit (Weapon vs Spell): In combat, physical weapons/items and spells CANNOT combine.
 *    The investigator fights with either their Weapon/Item hand OR their Spell hand.
 * 3. Supersede Hierarchy:
 *    - Discard-to-gain effects SUPERSEDE pure static passive bonuses.
 *    - Once-per-round card effects SUPERSEDE pure static passive bonuses.
 */
export function calculateCardBonuses(options: BonusCalculationOptions): BonusCalculationResult {
  const {
    activePossessions,
    selectedSkill,
    isCombat,
    preferredHand,
    activeMode: requestedMode = 'passive',
    selectedOncePerRoundCardId,
    selectedDiscardCardId,
    customDiscardBonus = 0,
    customOncePerRoundBonus = 0,
  } = options;

  const nonExhausted = activePossessions.filter((p) => !p.isExhausted);

  const weaponBonuses: CardBonusDetail[] = [];
  const spellBonuses: CardBonusDetail[] = [];
  const oncePerRoundCards: CardBonusDetail[] = [];
  const discardCards: CardBonusDetail[] = [];

  let highestPassiveStatBonus = 0;
  let bestPassiveStatCard: PossessionCard | undefined;

  // 1. Scan and categorize non-exhausted possessions
  nonExhausted.forEach((card) => {
    const isSpell = card.type === 'spell';

    // A. Passive Stat Bonus (e.g. Hired Muscle +1 Strength, Ancient Tome +2 Lore)
    if (card.statBonus && card.statBonus.skill === selectedSkill) {
      const bonus = card.statBonus.amount;
      if (bonus > highestPassiveStatBonus) {
        highestPassiveStatBonus = bonus;
        bestPassiveStatCard = card;
      }
    }

    // B. Combat / Test bonus calculation
    if (isCombat) {
      let cardCombatTotal = 0;
      if (card.combatBonus && card.combatBonus.skill === selectedSkill) {
        cardCombatTotal += card.combatBonus.amount;
      }
      // Also add passive stat bonus if applicable to this skill
      if (card.statBonus && card.statBonus.skill === selectedSkill) {
        cardCombatTotal += card.statBonus.amount;
      }

      if (cardCombatTotal > 0) {
        const detail: CardBonusDetail = {
          card,
          skill: selectedSkill,
          amount: cardCombatTotal,
          sourceType: 'combat',
          description: `${card.name} (+${cardCombatTotal} ${selectedSkill})`,
        };

        if (isSpell) {
          spellBonuses.push(detail);
        } else {
          weaponBonuses.push(detail);
        }
      }
    } else {
      // Non-combat test: items granting passive stat bonuses
      if (card.statBonus && card.statBonus.skill === selectedSkill) {
        const detail: CardBonusDetail = {
          card,
          skill: selectedSkill,
          amount: card.statBonus.amount,
          sourceType: 'stat',
          description: `${card.name} (+${card.statBonus.amount} ${selectedSkill})`,
        };
        if (isSpell) {
          spellBonuses.push(detail);
        } else {
          weaponBonuses.push(detail);
        }
      }
    }

    // C. Once-per-round card candidates
    if (card.oncePerRoundBonus && (!card.oncePerRoundBonus.skill || card.oncePerRoundBonus.skill === selectedSkill)) {
      if (!card.oncePerRoundBonus.isCombatOnly || isCombat) {
        oncePerRoundCards.push({
          card,
          skill: selectedSkill,
          amount: card.oncePerRoundBonus.amount,
          sourceType: 'once-per-round',
          description: card.oncePerRoundBonus.description || `${card.name} (Once per Round +${card.oncePerRoundBonus.amount})`,
        });
      }
    } else if (isOncePerRoundCard(card)) {
      // Generic once-per-round detected from text: default to +2 if not specified
      oncePerRoundCards.push({
        card,
        skill: selectedSkill,
        amount: card.combatBonus?.amount || card.statBonus?.amount || 2,
        sourceType: 'once-per-round',
        description: `${card.name} (Once per Round ability)`,
      });
    }

    // D. Discard-to-gain candidates
    if (card.discardBonus && (!card.discardBonus.skill || card.discardBonus.skill === selectedSkill)) {
      if (!card.discardBonus.isCombatOnly || isCombat) {
        discardCards.push({
          card,
          skill: selectedSkill,
          amount: card.discardBonus.amount,
          sourceType: 'discard',
          description: card.discardBonus.description || `Discard ${card.name} (+${card.discardBonus.amount} ${selectedSkill})`,
        });
      }
    } else if (isDiscardToGainCard(card)) {
      // Card has discard effect (e.g. Kerosene, Dynamite)
      const inferredAmount = card.combatBonus?.amount || (selectedSkill === 'strength' ? 3 : 2);
      discardCards.push({
        card,
        skill: selectedSkill,
        amount: inferredAmount,
        sourceType: 'discard',
        description: `Discard ${card.name} for effect (+${inferredAmount})`,
      });
    }
  });

  // Sort candidates by highest bonus first (Highest Gain rule)
  weaponBonuses.sort((a, b) => b.amount - a.amount);
  spellBonuses.sort((a, b) => b.amount - a.amount);
  oncePerRoundCards.sort((a, b) => b.amount - a.amount);
  discardCards.sort((a, b) => b.amount - a.amount);

  const highestWeaponBonus = weaponBonuses[0]?.amount || 0;
  const bestWeaponCard = weaponBonuses[0]?.card;

  const highestSpellBonus = spellBonuses[0]?.amount || 0;
  const bestSpellCard = spellBonuses[0]?.card;

  // Determine active hand: Default to user preference if valid, else pick the higher one
  let activeHand: CombatHandType = 'weapon';
  if (preferredHand) {
    activeHand = preferredHand;
  } else {
    // Auto-select the hand with the higher bonus
    if (highestSpellBonus > highestWeaponBonus) {
      activeHand = 'spell';
    } else {
      activeHand = 'weapon';
    }
  }

  // Calculate highest Once-per-round bonus
  let highestOncePerRoundBonus = customOncePerRoundBonus;
  let bestOncePerRoundCard: PossessionCard | undefined;
  if (selectedOncePerRoundCardId) {
    const found = oncePerRoundCards.find((c) => c.card.id === selectedOncePerRoundCardId);
    if (found) {
      highestOncePerRoundBonus = Math.max(highestOncePerRoundBonus, found.amount);
      bestOncePerRoundCard = found.card;
    }
  } else if (oncePerRoundCards.length > 0) {
    highestOncePerRoundBonus = Math.max(highestOncePerRoundBonus, oncePerRoundCards[0].amount);
    bestOncePerRoundCard = oncePerRoundCards[0].card;
  }

  // Calculate highest Discard bonus
  let highestDiscardBonus = customDiscardBonus;
  let bestDiscardCard: PossessionCard | undefined;
  if (selectedDiscardCardId) {
    const found = discardCards.find((c) => c.card.id === selectedDiscardCardId);
    if (found) {
      highestDiscardBonus = Math.max(highestDiscardBonus, found.amount);
      bestDiscardCard = found.card;
    }
  } else if (discardCards.length > 0) {
    highestDiscardBonus = Math.max(highestDiscardBonus, discardCards[0].amount);
    bestDiscardCard = discardCards[0].card;
  }

  // 2. Base static passive bonus from active hand (highest single card only)
  let staticPassiveBonus = 0;
  let staticPassiveSource = '';
  if (activeHand === 'weapon') {
    staticPassiveBonus = highestWeaponBonus;
    staticPassiveSource = bestWeaponCard
      ? `${bestWeaponCard.name} (+${highestWeaponBonus})`
      : 'No active weapon/item bonus';
  } else {
    staticPassiveBonus = highestSpellBonus;
    staticPassiveSource = bestSpellCard
      ? `${bestSpellCard.name} (+${highestSpellBonus})`
      : 'No active spell bonus';
  }

  // 3. Resolve Active Mode & Supersede Hierarchy
  // Discard > Once-per-round > Static Passive
  let activeMode: CardBonusMode = requestedMode;
  let finalBonus = 0;
  let bonusSourceDescription = '';
  let supersededDescription: string | undefined;
  const rulingNotes: string[] = [];

  // Notes on Hand Limitation
  if (isCombat) {
    if (weaponBonuses.length > 0 && spellBonuses.length > 0) {
      rulingNotes.push(
        `Ruling: Weapons and Spells cannot combine in combat. Using ${
          activeHand === 'weapon' ? 'Weapon/Item hand' : 'Spell hand'
        } (Weapon: +${highestWeaponBonus} vs Spell: +${highestSpellBonus}).`
      );
    }
    if (weaponBonuses.length > 1 && activeHand === 'weapon') {
      rulingNotes.push(
        `Highest Gain Rule: Using highest single weapon (${bestWeaponCard?.name} +${highestWeaponBonus}). Weapons do not stack.`
      );
    }
    if (spellBonuses.length > 1 && activeHand === 'spell') {
      rulingNotes.push(
        `Highest Gain Rule: Using highest single spell (${bestSpellCard?.name} +${highestSpellBonus}). Spells do not stack.`
      );
    }
  }

  if (activeMode === 'discard' && highestDiscardBonus > 0) {
    finalBonus = highestDiscardBonus;
    bonusSourceDescription = bestDiscardCard
      ? `Discard ${bestDiscardCard.name} (+${highestDiscardBonus})`
      : `Discard Effect (+${highestDiscardBonus})`;

    if (staticPassiveBonus > 0) {
      supersededDescription = `Supersedes passive bonus of +${staticPassiveBonus} from ${staticPassiveSource}`;
      rulingNotes.push(
        `Supersede Rule: Discard-to-gain effect (+${highestDiscardBonus}) supersedes passive bonus (+${staticPassiveBonus}).`
      );
    }
  } else if (activeMode === 'once-per-round' && highestOncePerRoundBonus > 0) {
    finalBonus = highestOncePerRoundBonus;
    bonusSourceDescription = bestOncePerRoundCard
      ? `${bestOncePerRoundCard.name} Once-per-Round (+${highestOncePerRoundBonus})`
      : `Once-per-Round Effect (+${highestOncePerRoundBonus})`;

    if (staticPassiveBonus > 0) {
      supersededDescription = `Supersedes passive bonus of +${staticPassiveBonus} from ${staticPassiveSource}`;
      rulingNotes.push(
        `Supersede Rule: Once-per-round card effect (+${highestOncePerRoundBonus}) supersedes pure static passive bonus (+${staticPassiveBonus}).`
      );
    }
  } else {
    // Pure Static Passive Mode
    activeMode = 'passive';
    finalBonus = staticPassiveBonus;
    bonusSourceDescription = staticPassiveSource;
  }

  return {
    weaponBonuses,
    spellBonuses,
    oncePerRoundCards,
    discardCards,
    highestWeaponBonus,
    bestWeaponCard,
    highestSpellBonus,
    bestSpellCard,
    highestPassiveStatBonus,
    bestPassiveStatCard,
    highestOncePerRoundBonus,
    bestOncePerRoundCard,
    highestDiscardBonus,
    bestDiscardCard,
    activeHand,
    activeMode,
    finalBonus,
    bonusSourceDescription,
    supersededDescription,
    rulingNotes,
  };
}
