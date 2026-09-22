export type SkillType = 'lore' | 'influence' | 'observation' | 'strength' | 'will';

export type TileType = 'city' | 'wilderness' | 'sea';

export type CardType = 'item' | 'weapon' | 'ally' | 'spell' | 'artifact' | 'condition' | 'trinket' | 'service' | 'task';

export type ExpansionCode = 'core' | 'fl' | 'mom' | 'sr' | 'utp' | 'soc' | 'td' | 'cir' | 'mon' | 'custom';

export interface ExpansionInfo {
  code: ExpansionCode;
  name: string;
  fullName: string;
  description: string;
}

export const ALL_EXPANSIONS: ExpansionInfo[] = [
  { code: 'core', name: 'Core Game', fullName: 'Eldritch Horror Base Game', description: 'Base Game cards, assets, and 12 starting investigators.' },
  { code: 'fl', name: 'Forsaken Lore', fullName: 'Forsaken Lore (FL)', description: 'Ancient One Yig, additional spells, assets, and encounters.' },
  { code: 'mom', name: 'Mountains of Madness', fullName: 'Mountains of Madness (MoM)', description: 'Antarctica side board, prelude cards, focus tokens, and 8 investigators.' },
  { code: 'sr', name: 'Strange Remnants', fullName: 'Strange Remnants (SR)', description: 'Mystic ruins, Syzygy, glamour spells, and 4 investigators.' },
  { code: 'utp', name: 'Under the Pyramids', fullName: 'Under the Pyramids (UtP)', description: 'Egypt side board, museum treasures, impairment tokens, and 8 investigators.' },
  { code: 'soc', name: 'Signs of Carcosa', fullName: 'Signs of Carcosa (SoC)', description: 'The King in Yellow, Hastur, talent cards, and 4 investigators.' },
  { code: 'td', name: 'The Dreamlands', fullName: 'The Dreamlands (TD)', description: 'Dreamlands side board, Hypnos, Atlach-Nacha, and 8 investigators.' },
  { code: 'cir', name: 'Cities in Ruin', fullName: 'Cities in Ruin (CiR)', description: 'Shudde M\'ell, disaster decks, devastation tokens, and 4 investigators.' },
  { code: 'mon', name: 'Masks of Nyarlathotep', fullName: 'Masks of Nyarlathotep (MoN)', description: 'Personal stories, campaign mode, resource tokens, and 7 investigators.' },
];

export interface SkillSet {
  lore: number;
  influence: number;
  observation: number;
  strength: number;
  will: number;
}

export interface PossessionCard {
  id: string;
  name: string;
  type: CardType;
  expansion?: ExpansionCode;
  cost?: number;
  statBonus?: {
    skill: SkillType;
    amount: number;
    condition?: string;
  };
  combatBonus?: {
    skill: SkillType;
    amount: number;
  };
  rerollsGranted?: {
    skill?: SkillType;
    amount: number;
    description: string;
    isCombatOnly?: boolean;
  };
  effectText: string;
  flavorText?: string;
  isExhausted?: boolean;
  custom?: boolean;
  isDiscardToGain?: boolean;
  discardBonus?: {
    skill?: SkillType;
    amount: number;
    description?: string;
    isCombatOnly?: boolean;
  };
  isOncePerRound?: boolean;
  oncePerRoundBonus?: {
    skill?: SkillType;
    amount: number;
    description?: string;
    isCombatOnly?: boolean;
  };
  traits?: string[];
  category?: string;
  isUnique?: boolean;
  rulings?: string;
}

export interface DefeatEncounter {
  healthDefeat: string;
  sanityDefeat: string;
}

export interface InvestigatorStatic {
  id: string;
  name: string;
  title: string;
  occupation?: string;
  role?: string;
  quote: string;
  expansion?: ExpansionCode;
  health: number;
  sanity: number;
  skills: SkillSet;
  startingLocation: string;
  startingTileType: TileType;
  startingPossessions: PossessionCard[];
  startingPossessionsSummary?: string;
  startingSkillModifiers?: Partial<Record<SkillType, number>>;
  startingConditions?: string[];
  startingTokens?: {
    focus?: number;
    resources?: number;
    clues?: number;
    trainTickets?: number;
    shipTickets?: number;
    eldritch?: number;
  };
  action: {
    title: string;
    description: string;
  };
  passive: {
    title: string;
    description: string;
    rulesEffect?: string;
  };
  defeatEncounter?: DefeatEncounter;
  backStory?: string;
  avatarColor: string;
  gender?: 'male' | 'female';
  isAdHoc?: boolean;
  isProxy?: boolean;
}

export interface InvestigatorState {
  investigatorId: string;
  currentHealth: number;
  maxHealth: number;
  currentSanity: number;
  maxSanity: number;
  location: string;
  tileType: TileType;
  actionsTaken: number;
  maxActions: number;
  skillModifiers: Record<SkillType, number>;
  tokens: {
    focus: number;
    resources: number;
    clues: number;
    trainTickets: number;
    shipTickets: number;
    eldritch: number;
  };
  possessions: PossessionCard[];
  rerollsUsedThisTurn: number;
  status: 'active' | 'in_pool' | 'defeated' | 'devoured';
  sameTileAsLeoAnderson?: boolean;
  isBlessed?: boolean;
  isCursed?: boolean;
  isPoisoned?: boolean;
  hasLegInjury?: boolean;
}

export interface PlayerSlot {
  id: string;
  name: string;
  investigatorId: string;
}

export interface FallenInvestigator {
  id: string;
  investigatorId: string;
  playerName: string;
  cause: 'health' | 'sanity' | 'devoured';
  defeatText: string;
  location: string;
  possessions: PossessionCard[];
  tokens: InvestigatorState['tokens'];
  defeatedAtTimestamp: number;
  collected: boolean;
}

export interface GameState {
  activeInvestigatorId: string;
  partyInvestigatorIds: string[];
  investigatorStates: Record<string, InvestigatorState>;
  turnNumber: number;
  enabledExpansions: ExpansionCode[];
  players: PlayerSlot[];
  isGameSetupComplete: boolean;
  fallenInvestigators: FallenInvestigator[];
  customInvestigators?: InvestigatorStatic[];
  allowExpansionProxies?: boolean;
}
