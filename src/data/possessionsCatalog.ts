import { PossessionCard, ExpansionCode } from '../types';

export const getCardExpansion = (card: PossessionCard): ExpansionCode => card.expansion || 'core';

export const PRESET_POSSESSIONS: PossessionCard[] = [
  {
    "id": "agency-quarantine",
    "name": "Agency Quarantine",
    "type": "service",
    "category": "Service",
    "expansion": "core",
    "isUnique": false,
    "effectText": "When you gain this card, immediately choose a space. Each Monster on the chosen space loses 4 Health. Then discard this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "agency-stakeout",
    "name": "Agency Stakeout",
    "type": "service",
    "category": "Service",
    "expansion": "cir",
    "isUnique": false,
    "effectText": "When you gain this card, immediately gain 1 Clue and 1 Monster of your choice on any space loses 3 Health. Then discard this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "appeal-to-the-council",
    "name": "Appeal to the Council",
    "type": "service",
    "category": "Service",
    "expansion": "fl",
    "isUnique": false,
    "effectText": "When you gain this card, you may immediately spend 2 Clues to retreat Doom by 1. Then discard this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "assassination",
    "name": "Assassination",
    "type": "service",
    "category": "Service",
    "expansion": "soc",
    "isUnique": false,
    "effectText": "When you gain this card, immediately choose a Monster on any space. The chosen Monster loses 2 Health. Then discard this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "charter-flight",
    "name": "Charter Flight",
    "type": "service",
    "category": "Service",
    "expansion": "core",
    "isUnique": false,
    "effectText": "When you gain this card, immediately move up to 2 spaces. Then discard this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "consecration",
    "name": "Consecration",
    "type": "service",
    "category": "Service",
    "expansion": "sr",
    "isUnique": false,
    "effectText": "When you gain this card, immediately gain 1 Boon Condition. Then discard this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "courier-needed",
    "name": "Courier Needed!",
    "type": "service",
    "category": "Service",
    "expansion": "mom",
    "isUnique": false,
    "effectText": "When you gain this card, immediately gain a Courier Run Unique Asset. Then discard this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "curiosity-shoppe",
    "name": "Curiosity Shoppe",
    "type": "service",
    "category": "Service",
    "expansion": "utp",
    "isUnique": false,
    "effectText": "When you gain this card, immediately gain 1 Artifact. Then discard this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "delivery-service",
    "name": "Delivery Service",
    "type": "service",
    "category": "Service",
    "expansion": "core",
    "isUnique": false,
    "effectText": "When you gain this card, immediately give any number of Item possessions to another investigator on any space. Then discard this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "divination",
    "name": "Divination",
    "type": "service",
    "category": "Service",
    "expansion": "td",
    "isUnique": false,
    "effectText": "When you gain this card, look at the top 3 Gates in the Gate stack. Put any number of them on the bottom of the Gate stack and the rest on top in any order. Then discard this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "intelligence-report",
    "name": "Intelligence Report",
    "type": "service",
    "category": "Service",
    "expansion": "fl",
    "isUnique": false,
    "effectText": "When you gain this card, immediately gain 2 Clues. Then discard this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "lavish-feast",
    "name": "Lavish Feast",
    "type": "service",
    "category": "Service",
    "expansion": "sr",
    "isUnique": false,
    "effectText": "When you gain this card, immediately recover 2 Health and 2 Sanity. Then discard this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "magick-shoppe",
    "name": "Magick Shoppe",
    "type": "service",
    "category": "Service",
    "expansion": "utp",
    "isUnique": false,
    "effectText": "When you gain this card, immediately gain 2 Spells. Then discard 1 Spell and this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "mission-briefing",
    "name": "Mission Briefing",
    "type": "service",
    "category": "Service",
    "expansion": "cir",
    "isUnique": false,
    "effectText": "When you gain this card, immediately gain 2 Task Unique Assets. Then discard 1 Task Asset and this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "news-report",
    "name": "News Report",
    "type": "service",
    "category": "Service",
    "expansion": "cir",
    "isUnique": false,
    "effectText": "When you gain this card, immediately spawn 3 Clues. Then discard this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "night-classes",
    "name": "Night Classes",
    "type": "service",
    "category": "Service",
    "expansion": "td",
    "isUnique": false,
    "effectText": "When you gain this card, immediately gain 2 Talent Conditions. Then discard 1 Talent Condition and this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "police-assistance",
    "name": "Police Assistance",
    "type": "service",
    "category": "Service",
    "expansion": "fl",
    "isUnique": false,
    "effectText": "When you gain this card, immediately discard 1 Monster of your choice on any space with toughness 2 or less. Then discard this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "police-raid",
    "name": "Police Raid",
    "type": "service",
    "category": "Service",
    "expansion": "td",
    "isUnique": false,
    "effectText": "When you gain this card, immediately choose a Monster on any space. The chosen Monster loses 3 Health. Then discard this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "private-care",
    "name": "Private Care",
    "type": "service",
    "category": "Service",
    "expansion": "core",
    "isUnique": false,
    "effectText": "When you gain this card, immediately recover all  Health and  Sanity. Then Discard this Card",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "private-flight",
    "name": "Private Flight",
    "type": "service",
    "category": "Service",
    "expansion": "cir",
    "isUnique": false,
    "effectText": "When you gain this card, immediately move to any space. Then discard this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "rumor-mill",
    "name": "Rumor Mill",
    "type": "service",
    "category": "Service",
    "expansion": "soc",
    "isUnique": false,
    "effectText": "When you gain this card, immediately gain  1 Clue. Then Discard this card",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "sanctuary",
    "name": "Sanctuary",
    "type": "service",
    "category": "Service",
    "expansion": "core",
    "isUnique": false,
    "effectText": "When you gain this card, you may immediately discard 1 Condition.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "search-the-archives",
    "name": "Search the Archives",
    "type": "service",
    "category": "Service",
    "expansion": "mom",
    "isUnique": false,
    "effectText": "When you gain this card, immediately gain 1 random Tome Asset from the deck. Then discard this card",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "silver-twilight-host",
    "name": "Silver Twilight Host",
    "type": "service",
    "category": "Service",
    "expansion": "cir",
    "isUnique": false,
    "effectText": "en you gain this card, immediately recover Health 3 Health, Sanity 3 Sanity, and gain 1 Boon Condition. Then discard this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "silver-twilight-ritual",
    "name": "Silver Twilight Ritual",
    "type": "service",
    "category": "Service",
    "expansion": "core",
    "isUnique": false,
    "effectText": "When you gain this card, immediately retreat Doom Doom by 1. Then discard this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "three-card-monte",
    "name": "Three-card Monte",
    "type": "service",
    "category": "Service",
    "expansion": "soc",
    "isUnique": false,
    "effectText": "When you gain this card, immediately roll 1 die. On a 5 or 6, gain 1 Asset of your choice from the reserve, or 1 random Asset with value 3 or greater from the deck. Then discard this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "training-regimen",
    "name": "Training Regimen",
    "type": "service",
    "category": "Service",
    "expansion": "cir",
    "isUnique": false,
    "effectText": "When you gain this card, immediately improve 1 skill of your choice and gain 1 Talent Condition. Then discard this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "ward-evil",
    "name": "Ward Evil",
    "type": "service",
    "category": "Service",
    "expansion": "utp",
    "isUnique": false,
    "effectText": "When you gain this card, immediately discard 1 Monster of your choice on any space with toughness 3 or less. Then discard this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "wireless-report",
    "name": "Wireless Report",
    "type": "service",
    "category": "Service",
    "expansion": "core",
    "isUnique": false,
    "effectText": "When you gain this card, immediately give any number of Clue tokens to another investigator on any space. Then discard this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "agent-of-secrets",
    "name": "Agent of Secrets",
    "type": "ally",
    "category": "Ally",
    "expansion": "sr",
    "isUnique": false,
    "effectText": "Gain +1 lore and +1 observation . You may reroll 1 die when resolving an lore or observationtest.",
    "statBonus": {
      "amount": 1,
      "skill": "lore"
    },
    "rerollsGranted": {
      "amount": 1,
      "skill": "lore",
      "description": "You may reroll 1 die when resolving a lore test.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "arcane-assistant",
    "name": "Arcane Assistant",
    "type": "ally",
    "category": "Ally",
    "expansion": "soc",
    "isUnique": false,
    "effectText": "Roll 1 additional die when resolving a lore test as part of a Spell effect.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "arcane-scholar",
    "name": "Arcane Scholar",
    "type": "ally",
    "category": "Ally",
    "expansion": "core",
    "isUnique": false,
    "effectText": "Gain +1 lore. You may reroll 1 die when resolving a lore test.",
    "statBonus": {
      "amount": 1,
      "skill": "lore"
    },
    "rerollsGranted": {
      "amount": 1,
      "skill": "lore",
      "description": "You may reroll 1 die when resolving a lore test.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "arcanist",
    "name": "Arcanist",
    "type": "ally",
    "category": "Ally",
    "expansion": "td",
    "isUnique": false,
    "effectText": "When you gain this card from the deck or reserve, gain 2 Spells. Then discard 1 Spell. Roll 1 additional die when resolving a lore test as part of a Spell effect.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "astute-researcher",
    "name": "Astute Researcher",
    "type": "ally",
    "category": "Ally",
    "expansion": "mon",
    "isUnique": false,
    "effectText": "When you gain this card from the deck or reserve, gain 2 Task Unique Assets. Then discard 1 Task Unique Asset. Whenever you discard a Task Unique Asset, gain 1 Clue.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "bodyguard",
    "name": "Bodyguard",
    "type": "ally",
    "category": "Ally",
    "expansion": "fl",
    "isUnique": false,
    "effectText": "Gain +1 strength. Reduce the damage of Monsters you encounter by 1 (to a minimum of 1).",
    "statBonus": {
      "amount": 1,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "cat-burglar",
    "name": "Cat Burglar",
    "type": "ally",
    "category": "Ally",
    "expansion": "core",
    "isUnique": false,
    "effectText": "Action: Roll 1 die. On a 5 or 6, gain 1 Item or Trinket Asset from the reserve. On a 1, discard this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "chief-inspector",
    "name": "Chief Inspector",
    "type": "ally",
    "category": "Ally",
    "expansion": "soc",
    "isUnique": false,
    "effectText": "Gain +1 observation. Gain +2 observation during Research Encounters.",
    "statBonus": {
      "amount": 1,
      "skill": "observation"
    },
    "combatBonus": {
      "amount": 2,
      "skill": "observation"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "conspiracy-theorist",
    "name": "Conspiracy Theorist",
    "type": "ally",
    "category": "Ally",
    "expansion": "fl",
    "isUnique": false,
    "effectText": "Gain +2 observation during Research Encounters. Reckoning: Roll 1 die. On a 4, 5, or 6, gain 1 Clue.",
    "statBonus": {
      "amount": 2,
      "skill": "observation"
    },
    "combatBonus": {
      "amount": 2,
      "skill": "observation"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "esteemed-author",
    "name": "Esteemed Author",
    "type": "ally",
    "category": "Ally",
    "expansion": "soc",
    "isUnique": false,
    "effectText": "You may reroll 1 die when resolving an influence test. When you gain this card from the deck or reserve, gain 1 random Tome Asset from the deck.",
    "rerollsGranted": {
      "amount": 1,
      "skill": "influence",
      "description": "You may reroll 1 die when resolving a influence test.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "expedition-guide",
    "name": "Expedition Guide",
    "type": "ally",
    "category": "Ally",
    "expansion": "sr",
    "isUnique": false,
    "effectText": "When you spend a Focus to reroll a die when resolving an observation or strength test, you may reroll up to 2 dice instead.",
    "rerollsGranted": {
      "amount": 2,
      "skill": "observation",
      "description": "You may reroll 2 die when resolving a observation test.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "hired-muscle",
    "name": "Hired Muscle",
    "type": "ally",
    "category": "Ally",
    "expansion": "core",
    "isUnique": false,
    "effectText": "Gain +1 strength. You may reroll 1 die when resolving a strength test.",
    "statBonus": {
      "amount": 1,
      "skill": "strength"
    },
    "rerollsGranted": {
      "amount": 1,
      "skill": "strength",
      "description": "You may reroll 1 die when resolving a strength test.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "hitman",
    "name": "Hitman",
    "type": "ally",
    "category": "Ally",
    "expansion": "td",
    "isUnique": false,
    "effectText": "When you gain this card from the deck or reserve, gain 1 random Weapon Asset from the deck. Roll 1 additional die when resolving a strength test during a Combat Encounter.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "lodge-disciple",
    "name": "Lodge Disciple",
    "type": "ally",
    "category": "Ally",
    "expansion": "soc",
    "isUnique": false,
    "effectText": "Gain +1 lore and +1 influence. You may reroll 1 die when resolving a lore or influence test.",
    "statBonus": {
      "amount": 1,
      "skill": "lore"
    },
    "rerollsGranted": {
      "amount": 1,
      "skill": "lore",
      "description": "You may reroll 1 die when resolving a lore test.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "lodge-hunter",
    "name": "Lodge Hunter",
    "type": "ally",
    "category": "Ally",
    "expansion": "cir",
    "isUnique": false,
    "effectText": "Gain +1 strength and +1 wil;;. You may reroll 1 die when resolving a strength or willtest.",
    "statBonus": {
      "amount": 1,
      "skill": "strength"
    },
    "rerollsGranted": {
      "amount": 1,
      "skill": "strength",
      "description": "You may reroll 1 die when resolving a strength test.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "lodge-physician",
    "name": "Lodge Physician",
    "type": "ally",
    "category": "Ally",
    "expansion": "soc",
    "isUnique": false,
    "effectText": "You and other investigators on your space may recover 1 additional Health or discard 1 Illness or Injury Condition when performing a Rest action.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "lodge-researcher",
    "name": "Lodge Researcher",
    "type": "ally",
    "category": "Ally",
    "expansion": "core",
    "isUnique": false,
    "effectText": "If you defeat a Monster during a Combat Encounter, recover 1 Sanity and gain 1 Clue.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "monster-hunter",
    "name": "Monster Hunter",
    "type": "ally",
    "category": "Ally",
    "expansion": "mom",
    "isUnique": false,
    "effectText": "Gain +2 strength during Combat Encounters. Action: A Monster of your choice on your space loses 1 Health.",
    "combatBonus": {
      "amount": 2,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "museum-curator",
    "name": "Museum Curator",
    "type": "ally",
    "category": "Ally",
    "expansion": "sr",
    "isUnique": false,
    "effectText": "You may reroll 1 die when resolving a test during an Expedition Encounter or a Mystic Ruins Encounter. When you gain this card from the deck or reserve, gain 1 Relic Unique Asset.",
    "rerollsGranted": {
      "amount": 1,
      "description": "You may reroll 1 die.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "museum-director",
    "name": "Museum Director",
    "type": "ally",
    "category": "Ally",
    "expansion": "mon",
    "isUnique": false,
    "effectText": "When you gain this card from the deck or reserve, gain 1 Artifact. Roll 1 additional die when resolving a strength test during a Combat Encounter.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "mystic-bounty-hunter",
    "name": "Mystic Bounty Hunter",
    "type": "ally",
    "category": "Ally",
    "expansion": "fl",
    "isUnique": false,
    "effectText": "Gain +1 strength during Combat Encounters. Gain +2 lore when resolving Spell effects.",
    "statBonus": {
      "amount": 2,
      "skill": "lore"
    },
    "combatBonus": {
      "amount": 1,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "personal-assistant",
    "name": "Personal Assistant",
    "type": "ally",
    "category": "Ally",
    "expansion": "core",
    "isUnique": false,
    "effectText": "Gain +1 influence. You may reroll 1 die when resolving an influence test.",
    "statBonus": {
      "amount": 1,
      "skill": "influence"
    },
    "rerollsGranted": {
      "amount": 1,
      "skill": "influence",
      "description": "You may reroll 1 die when resolving a influence test.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "private-investigator",
    "name": "Private Investigator",
    "type": "ally",
    "category": "Ally",
    "expansion": "core",
    "isUnique": false,
    "effectText": "Gain +1 observation. You may reroll 1 die when resolving an observation test.",
    "statBonus": {
      "amount": 1,
      "skill": "observation"
    },
    "rerollsGranted": {
      "amount": 1,
      "skill": "observation",
      "description": "You may reroll 1 die when resolving a observation test.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "psychoanalyst",
    "name": "Psychoanalyst",
    "type": "ally",
    "category": "Ally",
    "expansion": "utp",
    "isUnique": false,
    "effectText": "You may reroll 1 die when resolving a will test as part of a Madness Condition effect. When you perform a Rest action, recover 1 additional Sanity.",
    "rerollsGranted": {
      "amount": 1,
      "skill": "will",
      "description": "You may reroll 1 die when resolving a will test.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "research-student",
    "name": "Research Student",
    "type": "ally",
    "category": "Ally",
    "expansion": "fl",
    "isUnique": false,
    "effectText": "Action: Roll 1 die. On a 5 or 6, gain 1 Clue. On a 1, discard the nearest Clue on the game board.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "security-squad",
    "name": "Security Squad",
    "type": "ally",
    "category": "Ally",
    "expansion": "soc",
    "isUnique": false,
    "effectText": "When resolving a Combat Encounter, you may resolve an influence test in place of the strength test, using the same test modifier.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "specialist",
    "name": "Specialist",
    "type": "ally",
    "category": "Ally",
    "expansion": "soc",
    "isUnique": false,
    "effectText": "Once per round, you may reroll 1 die when resolving a test. When you gain this card from the deck or reserve, gain 1 Talent Condition.",
    "rerollsGranted": {
      "amount": 1,
      "description": "You may reroll 1 die.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "syndicate-agent",
    "name": "Syndicate Agent",
    "type": "ally",
    "category": "Ally",
    "expansion": "fl",
    "isUnique": false,
    "effectText": "Gain +2 strength during Combat Encounters. You may reroll 1 die when resolving a strength test during a Combat Encounter.",
    "combatBonus": {
      "amount": 2,
      "skill": "strength"
    },
    "rerollsGranted": {
      "amount": 1,
      "skill": "strength",
      "description": "You may reroll 1 die when resolving a strength test.",
      "isCombatOnly": true
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "treasure-hunter",
    "name": "Treasure Hunter",
    "type": "ally",
    "category": "Ally",
    "expansion": "utp",
    "isUnique": false,
    "effectText": "Gain +1 observation and +1 strength. You may reroll 1 die when resolving an observation or strength test.",
    "statBonus": {
      "amount": 1,
      "skill": "observation"
    },
    "rerollsGranted": {
      "amount": 1,
      "skill": "observation",
      "description": "You may reroll 1 die when resolving a observation test.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "urban-guide",
    "name": "Urban Guide",
    "type": "ally",
    "category": "Ally",
    "expansion": "core",
    "isUnique": false,
    "effectText": "If you are on a City space, investigators on your space roll 1 additional die when resolving tests except when resolving Other World Encounters.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "vatican-missionary",
    "name": "Vatican Missionary",
    "type": "ally",
    "category": "Ally",
    "expansion": "core",
    "isUnique": false,
    "effectText": "Gain +1 will. You may reroll 1 die when resolving a will test.",
    "statBonus": {
      "amount": 1,
      "skill": "will"
    },
    "rerollsGranted": {
      "amount": 1,
      "skill": "will",
      "description": "You may reroll 1 die when resolving a will test.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "witch-doctor",
    "name": "Witch Doctor",
    "type": "ally",
    "category": "Ally",
    "expansion": "core",
    "isUnique": false,
    "effectText": "Gain +1 Influence and +1 Will. You may reroll 1 die when resolving an Influence or Will test.\nInvestigators on your space may recover 1 additional Health or discard a Cursed Condition when performing a Rest action.",
    "statBonus": {
      "amount": 1,
      "skill": "influence"
    },
    "rerollsGranted": {
      "amount": 1,
      "skill": "influence",
      "description": "You may reroll 1 die when resolving a Influence test.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "agent-callahan",
    "name": "Agent Callahan",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "cir",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "When you gain this card from the deck, gain 1 Agency Secrets Unique Asset. Gain +2 strength and +2 observation.",
    "statBonus": {
      "amount": 2,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "albert-wilmarth",
    "name": "Albert Wilmarth",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "soc",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "When you gain this card from the deck, gain 1 random Tome Asset from the deck. Reckoning: Roll 1 die. On a 4-6, gain 1 Clue and recover 1 Sanity.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "amery-wendy-smith",
    "name": "Amery Wendy-Smith",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "cir",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "When you gain this card from the deck, gain 1 Tome Artifact. You may spend or lose 1 fewer Health or Sanity when resolving a Tome or Spell effect.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "anna-tilton",
    "name": "Anna Tilton",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "mom",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "When you gain this card from the deck, improve lore. You and other investigators on your space roll 1 additional die when resolving tests during Research Encounters.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "asenath-waithe",
    "name": "Asenath Waithe",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "sr",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "When you gain this card from the deck, gain 1 Spell. When a Gate spawns, you may discard 2 Spells to discard that Gate and each Monster on that space.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "antarctic-guide",
    "name": "Antarctic Guide",
    "type": "ally",
    "category": "Unique Ally",
    "expansion": "mom",
    "isUnique": true,
    "effectText": "Once per round, if you are on a space on the Antarctica side board, you may reroll 1 die when resolving a test, except when resolving an Other World Encounter.",
    "rerollsGranted": {
      "amount": 1,
      "description": "You may reroll 1 die.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "basil-elton",
    "name": "Basil Elton",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "td",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "Roll 1 additional die when resolving a test if you are on a space containing a Gate. Action: Move 1 space along a Ship path, then perform 1 additional action.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "constance-hawberk",
    "name": "Constance Hawberk",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "mom",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "When you gain this card from the deck, improve influence. Reckoning: Gain 1 random Weapon Asset from the deck.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "corinna-jones",
    "name": "Corinna Jones",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "soc",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "Roll 1 additional die when resolving an influence or observation test. When you gain this card from the deck, gain 1 Talent Condition.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "danforth",
    "name": "Danforth",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "mom",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "When you gain this card from the deck, improve will. Once per round, you may spend 1 Focus to prevent yourself from losing up to 2 Sanity.",
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "dog-sled",
    "name": "Dog Sled",
    "type": "ally",
    "category": "Unique Ally",
    "expansion": "mom",
    "isUnique": true,
    "effectText": "Action: Move to an adjacent space on the Antarctica side board. Then perform 1 additional action.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "dr-ali-kafour",
    "name": "Dr. Ali Kafour",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "mon",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "When this card enters play, gain 1 Relic Unique Asset. Gain +2 lore and +2 observation.",
    "statBonus": {
      "amount": 2,
      "skill": "lore"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "dr-hiram-upham",
    "name": "Dr. Hiram Upham",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "mom",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "When you gain this card from the deck, gain 2 Clues. Action: You may spend 2 Clues to discard 1 Monster of your choice on a space containing a Gate.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "duke",
    "name": "Duke",
    "type": "ally",
    "category": "Unique Ally",
    "expansion": "cir",
    "isUnique": true,
    "effectText": "Once per round, you may reroll 1 die when resolving a test. When you perform a Rest action, recover 1 additional Sanity.",
    "rerollsGranted": {
      "amount": 1,
      "description": "You may reroll 1 die.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "enoch-bowen",
    "name": "Enoch Bowen",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "utp",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "When you gain this card from the deck, close 1 Gate of your choice on any space. Roll 1 additional die when resolving a lore or will test.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "erich-weiss",
    "name": "Erich Weiss",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "utp",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "Roll 1 additional die when resolving a Lore or Observation test. You cannot become Delayed or gain a Detained Condition unless you choose to.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "esteban-herrero",
    "name": "Esteban Herrero",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "mom",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "When you gain this card from the deck, improve observation. Once per round, during the Action Phase, you may trade possessions with each other investigator on your space.",
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "etienne-laurent",
    "name": "Etienne Laurent",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "sr",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "You may add 1 success to your test result when resolving an influence test during an Acquire Assets action. Once per round, during the Action Phase, you may discard 1 card from the reserve.",
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "father-merluzzo",
    "name": "Father Merluzzo",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "mom",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "Once per round, you may add 1 success to your test result when resolving a will test during a Combat Encounter. Reckoning: Roll 1 die. On a 4, 5, or 6, gain a Blessed Condition.",
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "granny-orne",
    "name": "Granny Orne",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "soc",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "You may add 1 to the result of 1 die when resolving a test during a Research Encounter. Once per round, you may spend 1 fewer Clue to pay for an effect.",
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "halpin-chalmers",
    "name": "Halpin Chalmers",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "utp",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "When you gain this card from the deck, gain 1 Relic Unique Asset. Action: Move 1 space along an Uncharted pathUncharted path. Then perform 1 additional action.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "henry-wilcox",
    "name": "Henry Wilcox",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "mom",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "You and other investigators on your space roll 1 additional die when resolving tests during Other World Encounters. After resolving an Other World Encounter, if you did not close that Gate, gain Clue 1 Clue.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "hildred-castaigne",
    "name": "Hildred Castaigne",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "soc",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "When you gain this card from the deck, gain Clue 5 Clues. Reckoning: Castaigne's behavior grows erratic. Flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "jack-brady",
    "name": "Jack Brady",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "mon",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "When you gain this card from the deck, gain Clue 3 Clues. After resolving an Expedition Encounter or Mystic Ruins Encounter, gain 1 Relic Unique Asset.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "jake-williams",
    "name": "Jake Williams",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "mon",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "When you gain this card from the deck, improve Strength. Once per round, during the Action Phase, you may shuffle the Expedition Encounters deck and/or the Mystic Ruins Encounter deck.",
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "kid-obrien",
    "name": "Kid O'Brien",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "mom",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "Once per round, you may add 1 success to your test result when resolving a Strength test during a Combat Encounter. Reduce the damage of Monsters you encounter by 1 to a minimum of 1.",
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "miss-doyle",
    "name": "Miss Doyle",
    "type": "ally",
    "category": "Unique Ally",
    "expansion": "td",
    "isUnique": true,
    "effectText": "When you gain this card from the deck, gain Clue 5 Clues. You may spend 1 Clue to add 1 success to your test result when resolving a test on the Dreamlands side board.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "professor-armitage",
    "name": "Professor Armitage",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "mom",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "When you gain this card from the deck, gain 1 Spell. Once per round, you may add 1 success to your test result when resolving a Lore test as part of a Spell effect.",
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "professor-morgan",
    "name": "Professor Morgan",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "cir",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "When you gain this card from the deck, gain 2 Task Unique Assets, then discard 1 of them. When another effect causes you to place a token on a Task Asset, place 1 additional token of that type on that card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "professor-rice",
    "name": "Professor Rice",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "sr",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "When you gain this card from the deck, gain 1 Relic Unique Asset. After resolving an Expedition Encounter or a Mystic Ruins Encounter, gain Clue 1 Clue.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "randolph-carter",
    "name": "Randolph Carter",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "td",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "Gain +2 Lore and +2 Will. Once per round, during the Action Phase, you may reveal the top Gate in the Gate stack. If you do, you may put it on the bottom of the Gate stack.",
    "statBonus": {
      "amount": 2,
      "skill": "lore"
    },
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "sir-william-brinton",
    "name": "Sir William Brinton",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "mom",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "Gain +1 Will and +1 Observation. After resolving a Research Encounter, recover Sanity 1 Sanity.",
    "statBonus": {
      "amount": 1,
      "skill": "will"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "the-messenger",
    "name": "The Messenger",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "mon",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "When you gain this card from the deck, gain up to Eldritch token 3 Eldritch tokens. Once per round, you may spend 1 Eldritch token to reroll up to two dice.",
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "william-dyer",
    "name": "William Dyer",
    "type": "ally",
    "category": "Unique Ally — Character",
    "expansion": "mom",
    "isUnique": true,
    "traits": [
      "Character"
    ],
    "effectText": "When you gain this card from the deck, gain Clue 2 Clues. You may spend 1 Clue to add 1 success to your test result when resolving a test on the Antarctica side board.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "wooden-puppet",
    "name": "Wooden Puppet",
    "type": "ally",
    "category": "Unique Ally — Magical Relic",
    "expansion": "utp",
    "isUnique": true,
    "traits": [
      "Magical",
      "Relic"
    ],
    "effectText": "Once per round, you may reroll 1 die when resolving a test. Reckoning: The puppet acts on its own. Flip this card.",
    "rerollsGranted": {
      "amount": 1,
      "description": "You may reroll 1 die.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "18-derringer",
    "name": ".18 Derringer",
    "type": "trinket",
    "category": "Trinket — Weapon",
    "expansion": "core",
    "isUnique": false,
    "traits": [
      "Weapon"
    ],
    "effectText": "You may add 1 to the result of 1 die when resolving a Strength test during a Combat Encounter.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "25-automatic",
    "name": ".25 Automatic",
    "type": "weapon",
    "category": "Item — Weapon",
    "expansion": "soc",
    "isUnique": false,
    "traits": [
      "Weapon"
    ],
    "effectText": "Roll 1 additional die when resolving a Strength test during a Combat Encounter.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "32-colt-pocket",
    "name": ".32 Colt Pocket",
    "type": "weapon",
    "category": "Item — Weapon",
    "expansion": "utp",
    "isUnique": false,
    "traits": [
      "Weapon"
    ],
    "effectText": "Roll 1 additional die when resolving a Strength during a Combat Encounter. You may reroll 1 die when resolving a Strength test during a Combat Encounter",
    "rerollsGranted": {
      "amount": 1,
      "skill": "strength",
      "description": "You may reroll 1 die when resolving a Strength test.",
      "isCombatOnly": true
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "38-revolver",
    "name": ".38 Revolver",
    "type": "weapon",
    "category": "Item — Weapon",
    "expansion": "core",
    "isUnique": false,
    "traits": [
      "Weapon"
    ],
    "effectText": "Gain +2 Strength during Combat Encounters.",
    "combatBonus": {
      "amount": 2,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "45-automatic",
    "name": ".45 Automatic",
    "type": "weapon",
    "category": "Item — Weapon",
    "expansion": "core",
    "isUnique": false,
    "traits": [
      "Weapon"
    ],
    "effectText": "Gain +3 Strength during Combat Encounters.",
    "combatBonus": {
      "amount": 3,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "45-colt-revolver",
    "name": ".45 Colt Revolver",
    "type": "weapon",
    "category": "Item — Weapon",
    "expansion": "fl",
    "isUnique": false,
    "traits": [
      "Weapon"
    ],
    "effectText": "Once per round, you may gain +3 Strength during a Combat Encounter.",
    "combatBonus": {
      "amount": 3,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": true,
    "oncePerRoundBonus": {
      "amount": 3,
      "skill": "strength",
      "isCombatOnly": true,
      "description": "Once per round, you may gain +3 Strength"
    }
  },
  {
    "id": "alchemical-concoction",
    "name": "Alchemical Concoction",
    "type": "item",
    "category": "Item — Magical",
    "expansion": "td",
    "isUnique": false,
    "traits": [
      "Magical"
    ],
    "effectText": "You may discard this card to gain +5 Strength during a Combat Encounter.",
    "combatBonus": {
      "amount": 5,
      "skill": "strength"
    },
    "isDiscardToGain": true,
    "discardBonus": {
      "amount": 5,
      "skill": "strength",
      "isCombatOnly": true,
      "description": "discard this card to gain +5 Strength"
    },
    "isOncePerRound": false
  },
  {
    "id": "ancient-tome",
    "name": "Ancient Tome",
    "type": "item",
    "category": "Item — Relic Tome",
    "expansion": "utp",
    "isUnique": false,
    "traits": [
      "Relic",
      "Tome"
    ],
    "effectText": "Action: You study the words of the long dead language (Lore). If you pass, you may spend Sanity 1 Sanity to gain Clue 1 Clue, 1 Spell, or 1 Task Unique Asset.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "ankh",
    "name": "Ankh",
    "type": "item",
    "category": "Item — Relic",
    "expansion": "utp",
    "isUnique": false,
    "traits": [
      "Relic"
    ],
    "effectText": "Gain +2 Lore when resolving Spell effects. Gain +2 Will when resolving Combat Encounters.",
    "statBonus": {
      "amount": 2,
      "skill": "lore"
    },
    "combatBonus": {
      "amount": 2,
      "skill": "will"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "arcane-blade",
    "name": "Arcane Blade",
    "type": "weapon",
    "category": "Item — Magical Weapon",
    "expansion": "sr",
    "isUnique": false,
    "traits": [
      "Magical",
      "Weapon"
    ],
    "effectText": "Gain +2 Strength when resolving Combat Encounters. Gain +2 Lore when resolving Spell effects.",
    "statBonus": {
      "amount": 2,
      "skill": "lore"
    },
    "combatBonus": {
      "amount": 2,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "arcane-manuscripts",
    "name": "Arcane Manuscripts",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "core",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Gain +1 Lore when resolving Spell effects.",
    "statBonus": {
      "amount": 1,
      "skill": "lore"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "arcane-sutra",
    "name": "Arcane Sutra",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "cir",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Gain +2 Lore when resolving Spell effects. You may reroll 2 dice with matching results when resolving a Lore test as part of a Spell effect.",
    "statBonus": {
      "amount": 2,
      "skill": "lore"
    },
    "rerollsGranted": {
      "amount": 2,
      "skill": "lore",
      "description": "You may reroll 2 die when resolving a Lore test.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "arcane-tome",
    "name": "Arcane Tome",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "core",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Gain +2 Lore when resolving Spell effects. When you perform a Rest action, you may test Lore. If you pass, gain 1 Spell.",
    "statBonus": {
      "amount": 2,
      "skill": "lore"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "astronomy-guidebook",
    "name": "Astronomy Guidebook",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "mom",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "When you close a Gate during an Other World Encounter, recover Sanity 1 Sanity and gain Clue 1 Clue.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "axe",
    "name": "Axe",
    "type": "weapon",
    "category": "Item — Weapon",
    "expansion": "core",
    "isUnique": false,
    "traits": [
      "Weapon"
    ],
    "effectText": "Gain +2 Strength during Combat Encounters. You may spend Sanity 2 Sanity to reroll any number of dice when resolving a Strength test during a Combat Encounter.",
    "combatBonus": {
      "amount": 2,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "bandages",
    "name": "Bandages",
    "type": "item",
    "category": "Item",
    "expansion": "core",
    "isUnique": false,
    "effectText": "You may discard this card to prevent an investigator on your space from losing up to Health 2 Health.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "blessed-blade",
    "name": "Blessed Blade",
    "type": "weapon",
    "category": "Item — Magical Relic Weapon",
    "expansion": "mon",
    "isUnique": false,
    "traits": [
      "Magical",
      "Relic",
      "Weapon"
    ],
    "effectText": "When you gain this card from the deck or reserve, gain 1 Boon Conditions. Gain +3 Strength during Combat Encounters.",
    "combatBonus": {
      "amount": 3,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "blunderbuss",
    "name": "Blunderbuss",
    "type": "weapon",
    "category": "Item — Weapon",
    "expansion": "mom",
    "isUnique": false,
    "traits": [
      "Weapon"
    ],
    "effectText": "When resolving a Combat Encounter, you may gain +2 Strength. If you do, each 6 you roll when resolving a Strength test during a Combat Encounter counts as 2 successes and each 1 negates 1 success.",
    "rulings": "Rulings, Clarifications, and Reminders If you choose to gain the bonus, but apply a different, higher bonus, 6's and 1's will still be affected.[1]",
    "statBonus": {
      "amount": 2,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "book-of-spells",
    "name": "Book of Spells",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "utp",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "When you gain this card from the deck or reserve, gain 2 Spells and discard 1 of them. Gain +2 Lore when resolving Spell effects.",
    "statBonus": {
      "amount": 2,
      "skill": "lore"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "bull-whip",
    "name": "Bull Whip",
    "type": "weapon",
    "category": "Item — Weapon",
    "expansion": "core",
    "isUnique": false,
    "traits": [
      "Weapon"
    ],
    "effectText": "Gain +1 Strength during Combat Encounters. You may reroll 1 die when resolving a Strength test during a Combat Encounter.",
    "combatBonus": {
      "amount": 1,
      "skill": "strength"
    },
    "rerollsGranted": {
      "amount": 1,
      "skill": "strength",
      "description": "You may reroll 1 die when resolving a Strength test.",
      "isCombatOnly": true
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "camera",
    "name": "Camera",
    "type": "item",
    "category": "Item",
    "expansion": "td",
    "isUnique": false,
    "effectText": "Once per round, when you spend a Clue, you may gain 1 Clue.",
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "carbine-rifle",
    "name": "Carbine Rifle",
    "type": "weapon",
    "category": "Item — Weapon",
    "expansion": "core",
    "isUnique": false,
    "traits": [
      "Weapon"
    ],
    "effectText": "Once per round, you may gain +5 Strength during a Combat Encounter.",
    "combatBonus": {
      "amount": 5,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": true,
    "oncePerRoundBonus": {
      "amount": 5,
      "skill": "strength",
      "isCombatOnly": true,
      "description": "Once per round, you may gain +5 Strength"
    }
  },
  {
    "id": "chainsaw",
    "name": "Chainsaw",
    "type": "item",
    "category": "Item",
    "expansion": "mon",
    "isUnique": false,
    "effectText": "Gain +3 Strength during Combat Encounters. Each 6 you roll when resolving a Strength test during a Combat Encounter counts as 2 successes.",
    "combatBonus": {
      "amount": 3,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "cultists-journal",
    "name": "Cultist's Journal",
    "type": "item",
    "category": "Item — Magical Tome",
    "expansion": "mom",
    "isUnique": false,
    "traits": [
      "Magical",
      "Tome"
    ],
    "effectText": "Gain +2 Will and +2 Strength during Combat Encounters.",
    "statBonus": {
      "amount": 2,
      "skill": "will"
    },
    "combatBonus": {
      "amount": 2,
      "skill": "will"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "double-barreled-shotgun",
    "name": "Double-barreled Shotgun",
    "type": "weapon",
    "category": "Item — Weapon",
    "expansion": "core",
    "isUnique": false,
    "traits": [
      "Weapon"
    ],
    "effectText": "Gain +4 Strength during Combat Encounters. Each 6 you roll when resolving a Strength test during a Combat Encounter counts as 2 successes.",
    "combatBonus": {
      "amount": 4,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "dream-diary",
    "name": "Dream Diary",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "td",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Gain +1 Lore during Other World Encounters. When you perform a Rest action, spawn 1 Clue.",
    "statBonus": {
      "amount": 1,
      "skill": "lore"
    },
    "combatBonus": {
      "amount": 1,
      "skill": "lore"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "dynamite",
    "name": "Dynamite",
    "type": "weapon",
    "category": "Item — Weapon",
    "expansion": "core",
    "isUnique": false,
    "traits": [
      "Weapon"
    ],
    "effectText": "Action: You may discard this card to cause each Monster on your space to lose 3 Health.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "enchanted-blade",
    "name": "Enchanted Blade",
    "type": "weapon",
    "category": "Item — Magical Weapon",
    "expansion": "fl",
    "isUnique": false,
    "traits": [
      "Magical",
      "Weapon"
    ],
    "effectText": "Gain +1 Will and +3 Strength during Combat Encounters.",
    "statBonus": {
      "amount": 1,
      "skill": "will"
    },
    "combatBonus": {
      "amount": 1,
      "skill": "will"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "enchanted-bow",
    "name": "Enchanted Bow",
    "type": "weapon",
    "category": "Item — Magical Weapon",
    "expansion": "td",
    "isUnique": false,
    "traits": [
      "Magical",
      "Weapon"
    ],
    "effectText": "Gain +3 Strength during Combat Encounters. Action: A Monster of your choice on your space loses Health 1 Health.",
    "combatBonus": {
      "amount": 3,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "enchanted-cane",
    "name": "Enchanted Cane",
    "type": "weapon",
    "category": "Item — Magical Weapon",
    "expansion": "soc",
    "isUnique": false,
    "traits": [
      "Magical",
      "Weapon"
    ],
    "effectText": "Gain +3 Strength during Combat Encounters.",
    "combatBonus": {
      "amount": 3,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "enchanted-dagger",
    "name": "Enchanted Dagger",
    "type": "weapon",
    "category": "Item — Magical Weapon",
    "expansion": "utp",
    "isUnique": false,
    "traits": [
      "Magical",
      "Weapon"
    ],
    "effectText": "Gain +2 Strength during Combat Encounters.",
    "combatBonus": {
      "amount": 2,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "enchanted-jewelry",
    "name": "Enchanted Jewelry",
    "type": "item",
    "category": "Item — Magical Relic",
    "expansion": "mon",
    "isUnique": false,
    "traits": [
      "Magical",
      "Relic"
    ],
    "effectText": "If you would lose Sanity, you may spend 1 Focus to prevent 2 of that Sanity loss.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "experts-blade",
    "name": "Expert's Blade",
    "type": "weapon",
    "category": "Item — Magical Relic Weapon",
    "expansion": "mon",
    "isUnique": false,
    "traits": [
      "Magical",
      "Relic",
      "Weapon"
    ],
    "effectText": "When you gain this card from the deck or reserve, gain 1 Talent Condition. Gain +2 Strength during Combat Encounters.",
    "combatBonus": {
      "amount": 2,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "fine-clothes",
    "name": "Fine Clothes",
    "type": "item",
    "category": "Item",
    "expansion": "core",
    "isUnique": false,
    "effectText": "Each 6 you roll when performing an Acquire Assets action counts as 2 successes.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "fishing-net",
    "name": "Fishing Net",
    "type": "item",
    "category": "Item",
    "expansion": "core",
    "isUnique": false,
    "effectText": "You may reroll 1 die when resolving a Strength test during a Combat Encounter. Reduce the damage of Monsters you encounter by 1 to a minimum of 1.",
    "rerollsGranted": {
      "amount": 1,
      "skill": "strength",
      "description": "You may reroll 1 die when resolving a Strength test.",
      "isCombatOnly": true
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "flamethrower",
    "name": "Flamethrower",
    "type": "weapon",
    "category": "Item — Weapon",
    "expansion": "soc",
    "isUnique": false,
    "traits": [
      "Weapon"
    ],
    "effectText": "Gain +5 Strength during Combat Encounters. Reduce the damage of Monsters you encounter by 1 to a minimum of 1.",
    "combatBonus": {
      "amount": 5,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "forbidden-secrets",
    "name": "Forbidden Secrets",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "cir",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Gain +1 Will during Combat Encounters. When you resolve a Will test during a Combat Encounter, if you do not lose Sanity Sanity, gain Clue 1 Clue.",
    "combatBonus": {
      "amount": 1,
      "skill": "will"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "forbidden-text",
    "name": "Forbidden Text",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "td",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Gain +1 Will. Gain +2 Will during Combat Encounters.",
    "statBonus": {
      "amount": 1,
      "skill": "will"
    },
    "combatBonus": {
      "amount": 2,
      "skill": "will"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "fresh-fruit",
    "name": "Fresh Fruit",
    "type": "item",
    "category": "Item",
    "expansion": "fl",
    "isUnique": false,
    "effectText": "When you perform a Rest action, you may discard this card to recover 1 additional Health and 1 additional Sanity.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "gatling-gun",
    "name": "Gatling Gun",
    "type": "weapon",
    "category": "Item — Weapon",
    "expansion": "cir",
    "isUnique": false,
    "traits": [
      "Weapon"
    ],
    "effectText": "Gain +5 Strength during Combat Encounters. You may reroll 2 dice with matching results when resolving a Strength test during a Combat Encounter.",
    "combatBonus": {
      "amount": 5,
      "skill": "strength"
    },
    "rerollsGranted": {
      "amount": 2,
      "skill": "strength",
      "description": "You may reroll 2 die when resolving a Strength test.",
      "isCombatOnly": true
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "grim-lexicon",
    "name": "Grim Lexicon",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "mon",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "When you gain this card from the deck or reserve, gain Clue 1 Clue. Reduce the horror of Monsters you encounter by 1 to a minimum of 1.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "grotesque-compendium",
    "name": "Grotesque Compendium",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "mon",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Gain +4 Lore when resolving Spell effects. Each 6 you roll when resolving a Spell effect counts as two successes.",
    "statBonus": {
      "amount": 4,
      "skill": "lore"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "handcuffs",
    "name": "Handcuffs",
    "type": "item",
    "category": "Item",
    "expansion": "sr",
    "isUnique": false,
    "effectText": "Before resolving the Strength test during a Combat Encounter, you may spend Focus 1 Focus to defeat that Monster if it has toughness 2 or less.",
    "rulings": "Rulings, Clarifications, and Reminders Handcuffs cannot be used while encountering a Colour Out of Space or a Ghost which do not have a Strength test, but can be used to defeat a Cultist of Nephren-Ka which has a Lore test in place of its Strength test.[1]",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "holy-cross",
    "name": "Holy Cross",
    "type": "item",
    "category": "Item",
    "expansion": "core",
    "isUnique": false,
    "effectText": "Gain +2 Will during Combat Encounters.",
    "combatBonus": {
      "amount": 2,
      "skill": "will"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "holy-spear",
    "name": "Holy Spear",
    "type": "weapon",
    "category": "Item — Magical Relic Weapon",
    "expansion": "sr",
    "isUnique": false,
    "traits": [
      "Magical",
      "Relic",
      "Weapon"
    ],
    "effectText": "Gain +4 Strength during Combat Encounters.",
    "combatBonus": {
      "amount": 4,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "holy-water",
    "name": "Holy Water",
    "type": "item",
    "category": "Item — Magical",
    "expansion": "core",
    "isUnique": false,
    "traits": [
      "Magical"
    ],
    "effectText": "You may discard this card to gain +5 Will and +5 Strength during a Combat Encounter. Action: You may discard this card to choose an investigator on your space. That investigator gains a Blessed Condition.",
    "statBonus": {
      "amount": 5,
      "skill": "will"
    },
    "combatBonus": {
      "amount": 5,
      "skill": "will"
    },
    "isDiscardToGain": true,
    "discardBonus": {
      "amount": 5,
      "skill": "will",
      "isCombatOnly": true,
      "description": "discard this card to gain +5 Will"
    },
    "isOncePerRound": false
  },
  {
    "id": "kerosene",
    "name": "Kerosene",
    "type": "item",
    "category": "Item",
    "expansion": "core",
    "isUnique": false,
    "effectText": "You may discard this card to gain +5 Strength during a Combat Encounter.",
    "combatBonus": {
      "amount": 5,
      "skill": "strength"
    },
    "isDiscardToGain": true,
    "discardBonus": {
      "amount": 5,
      "skill": "strength",
      "isCombatOnly": true,
      "description": "discard this card to gain +5 Strength"
    },
    "isOncePerRound": false
  },
  {
    "id": "king-james-bible",
    "name": "King James Bible",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "core",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "You may reroll 1 die when resolving a Will test during a Combat Encounter. When you perform a Rest action, recover 1 additional Sanity.",
    "rerollsGranted": {
      "amount": 1,
      "skill": "will",
      "description": "You may reroll 1 die when resolving a Will test.",
      "isCombatOnly": true
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "lantern",
    "name": "Lantern",
    "type": "item",
    "category": "Item",
    "expansion": "fl",
    "isUnique": false,
    "effectText": "Once per round, you may roll 1 additional die when resolving a test.",
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "map-of-the-ley-lines",
    "name": "Map of the Ley Lines",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "mom",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Gain +1 Lore and +1 Will. Once per round, you may reroll 1 die when resolving a test during an Other World Encounter.",
    "statBonus": {
      "amount": 1,
      "skill": "lore"
    },
    "rerollsGranted": {
      "amount": 1,
      "description": "You may reroll 1 die.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "mauser-c96",
    "name": "Mauser C96",
    "type": "weapon",
    "category": "Item — Weapon",
    "expansion": "cir",
    "isUnique": false,
    "traits": [
      "Weapon"
    ],
    "effectText": "Gain +2 Strength during Combat Encounters. You may reroll 1 die when resolving a Strength test during a Combat Encounter.",
    "combatBonus": {
      "amount": 2,
      "skill": "strength"
    },
    "rerollsGranted": {
      "amount": 1,
      "skill": "strength",
      "description": "You may reroll 1 die when resolving a Strength test.",
      "isCombatOnly": true
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "medical-journal",
    "name": "Medical Journal",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "sr",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "You may reroll 1 die when resolving a Strength test as part of an Illness or Injury Condition effect. When you perform a Rest action, recover 1 additional Health Health.",
    "rerollsGranted": {
      "amount": 1,
      "skill": "strength",
      "description": "You may reroll 1 die when resolving a Strength test.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "mysterious-tome",
    "name": "Mysterious Tome",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "sr",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "When you spend a Focus to reroll a die when resolving a Lore or Will test, you may reroll up to 2 dice instead.",
    "rerollsGranted": {
      "amount": 2,
      "skill": "lore",
      "description": "You may reroll 2 die when resolving a Lore test.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "mystic-scroll",
    "name": "Mystic Scroll",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "cir",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "You may reroll 1 die when resolving a Lore test.",
    "rerollsGranted": {
      "amount": 1,
      "skill": "lore",
      "description": "You may reroll 1 die when resolving a Lore test.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "mystic-tome",
    "name": "Mystic Tome",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "mon",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "When you gain this card from the deck or reserve, gain 2 Spells, then discard 1 Spell. When you perform a Rest action, recover 1 additional Sanity.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "occult-grimoire",
    "name": "Occult Grimoire",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "td",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Gain +3 Lore when resolving Spell effects. Reduce the horror of Monsters you encounter by 1 to a minimum of 1.",
    "statBonus": {
      "amount": 3,
      "skill": "lore"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "occult-scripture",
    "name": "Occult Scripture",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "cir",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "When you gain this card from the deck or reserve, gain 2 Clues. Whenever you gain a Clue during a Research Encounter, spawn 1 Clue.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "occult-tablet",
    "name": "Occult Tablet",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "mon",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Gain +3 Lore when resolving Spell effects. When you undertake a Rest action, you may test Lore. If you pass, you may spend 1 Sanity to gain 1 Clue.",
    "statBonus": {
      "amount": 3,
      "skill": "lore"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "occult-text",
    "name": "Occult Text",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "soc",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Gain +1 Will during Combat Encounters. Monsters you encounter lose Physical Resistance.",
    "combatBonus": {
      "amount": 1,
      "skill": "will"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "opus-arcana",
    "name": "Opus Arcana",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "sr",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Gain +1 Lore. Gain +2 Lore when resolving Spell effects.",
    "statBonus": {
      "amount": 1,
      "skill": "lore"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "otherworld-codex",
    "name": "Otherworld Codex",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "td",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Gain +1 Lore and +1 Will. Play with the top Gate in the Gate stack revealed.",
    "statBonus": {
      "amount": 1,
      "skill": "lore"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "police-ledger",
    "name": "Police Ledger",
    "type": "item",
    "category": "Item",
    "expansion": "fl",
    "isUnique": false,
    "effectText": "When you perform a Rest action, you may attempt to decipher the ledger (Observation). If you pass, you may discard this card to gain Clue 1 Clue.",
    "isDiscardToGain": true,
    "isOncePerRound": false
  },
  {
    "id": "profane-tome",
    "name": "Profane Tome",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "mom",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "You may reroll 1 die when resolving a Will test during a Combat Encounter",
    "rerollsGranted": {
      "amount": 1,
      "skill": "will",
      "description": "You may reroll 1 die when resolving a Will test.",
      "isCombatOnly": true
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "protective-amulet",
    "name": "Protective Amulet",
    "type": "item",
    "category": "Item",
    "expansion": "core",
    "isUnique": false,
    "effectText": "Gain +1 Will during Combat Encounters.",
    "combatBonus": {
      "amount": 1,
      "skill": "will"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "protective-totem",
    "name": "Protective Totem",
    "type": "item",
    "category": "Item — Magical Relic",
    "expansion": "mon",
    "isUnique": false,
    "traits": [
      "Magical",
      "Relic"
    ],
    "effectText": "Once per round, if you would lose 2 or more Health and/or Sanity, prevent 1 of that loss.",
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "ritual-dagger",
    "name": "Ritual Dagger",
    "type": "weapon",
    "category": "Item — Magical Weapon",
    "expansion": "sr",
    "isUnique": false,
    "traits": [
      "Magical",
      "Weapon"
    ],
    "effectText": "Once per round, you may gain +1 Lore when resolving a Spell effect or +2 Strength when resolving a Combat Encounter.",
    "statBonus": {
      "amount": 1,
      "skill": "lore"
    },
    "combatBonus": {
      "amount": 1,
      "skill": "lore"
    },
    "isDiscardToGain": false,
    "isOncePerRound": true,
    "oncePerRoundBonus": {
      "amount": 1,
      "skill": "lore",
      "isCombatOnly": true,
      "description": "Once per round, you may gain +1 Lore"
    }
  },
  {
    "id": "scribes-journal",
    "name": "Scribe's Journal",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "utp",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Effects cannot cause you to discard your Clues or Spells unless you choose to.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "scroll-of-secrets",
    "name": "Scroll of Secrets",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "mon",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "When you gain this card from the deck or reserve, gain 1 Clue. Gain +2 Lore when resolving Spell effects.",
    "statBonus": {
      "amount": 2,
      "skill": "lore"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "secret-page",
    "name": "Secret Page",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "mom",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Gain +1 Lore when resolving Spell effects. When you gain this card from the deck or reserve, gain 1 Spell.",
    "statBonus": {
      "amount": 1,
      "skill": "lore"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "sledgehammer",
    "name": "Sledgehammer",
    "type": "item",
    "category": "Item",
    "expansion": "utp",
    "isUnique": false,
    "effectText": "Gain +1 Strength. Gain +2 Strength during Combat Encounters.",
    "statBonus": {
      "amount": 1,
      "skill": "strength"
    },
    "combatBonus": {
      "amount": 2,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "spirit-dagger",
    "name": "Spirit Dagger",
    "type": "weapon",
    "category": "Item — Magical Weapon",
    "expansion": "core",
    "isUnique": false,
    "traits": [
      "Magical",
      "Weapon"
    ],
    "effectText": "Gain +1 Will and +2 Strength during Combat Encounters.",
    "statBonus": {
      "amount": 1,
      "skill": "will"
    },
    "combatBonus": {
      "amount": 1,
      "skill": "will"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "tear-gas",
    "name": "Tear Gas",
    "type": "weapon",
    "category": "Item — Weapon",
    "expansion": "fl",
    "isUnique": false,
    "traits": [
      "Weapon"
    ],
    "effectText": "You may discard this card to reroll up to 2 dice when resolving a Strength test during a Combat Encounter. In addition, reduce the Monster's damage by 2 to a minimum of 1.",
    "rerollsGranted": {
      "amount": 2,
      "skill": "strength",
      "description": "You may reroll 2 die when resolving a Strength test.",
      "isCombatOnly": true
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "timeworn-brand",
    "name": "Timeworn Brand",
    "type": "weapon",
    "category": "Item — Magical Weapon",
    "expansion": "mon",
    "isUnique": false,
    "traits": [
      "Magical",
      "Weapon"
    ],
    "effectText": "Gain +1 Strength during Combat Encounters. You may reroll 1 die when resolving a Strength check during a Combat Encounter.",
    "combatBonus": {
      "amount": 1,
      "skill": "strength"
    },
    "rerollsGranted": {
      "amount": 1,
      "skill": "strength",
      "description": "You may reroll 1 die when resolving a Strength test.",
      "isCombatOnly": true
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "tome-of-horrors",
    "name": "Tome of Horrors",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "mom",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Gain +2 Will during Combat Encounters. Reduce the horror of Monsters you encounter by 1 to a minimum of 1.",
    "combatBonus": {
      "amount": 2,
      "skill": "will"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "tome-of-secrets",
    "name": "Tome of Secrets",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "sr",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Once per round, you may spend Focus 1 Focus in place of spending Clue 1 Clue. When you perform a Focus action, recover Sanity 1 Sanity.",
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "tommy-gun",
    "name": "Tommy Gun",
    "type": "weapon",
    "category": "Item — Weapon",
    "expansion": "soc",
    "isUnique": false,
    "traits": [
      "Weapon"
    ],
    "effectText": "Gain +4 Strength during Combat Encounters.",
    "combatBonus": {
      "amount": 4,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "vampiric-talisman",
    "name": "Vampiric Talisman",
    "type": "item",
    "category": "Item — Magical Relic",
    "expansion": "mon",
    "isUnique": false,
    "traits": [
      "Magical",
      "Relic"
    ],
    "effectText": "Gain +2 Strength during Combat Encounters. When you defeat a Monster during a Combat Encounter, gain 1 Focus.",
    "combatBonus": {
      "amount": 2,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "whiskey",
    "name": "Whiskey",
    "type": "item",
    "category": "Item",
    "expansion": "core",
    "isUnique": false,
    "effectText": "You may discard this card to prevent an investigator on your space from losing up to 2 Sanity.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "winchester-rifle",
    "name": "Winchester Rifle",
    "type": "weapon",
    "category": "Item — Weapon",
    "expansion": "cir",
    "isUnique": false,
    "traits": [
      "Weapon"
    ],
    "effectText": "Once per round, you may gain +4 Strength during a Combat Encounter.",
    "combatBonus": {
      "amount": 4,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": true,
    "oncePerRoundBonus": {
      "amount": 4,
      "skill": "strength",
      "isCombatOnly": true,
      "description": "Once per round, you may gain +4 Strength"
    }
  },
  {
    "id": "agency-secrets",
    "name": "Agency Secrets",
    "type": "item",
    "category": "Item",
    "expansion": "cir",
    "isUnique": true,
    "effectText": "Action: Test Influence. If you pass, you strike a deal with the Agency to assist one another; flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "ancient-scroll",
    "name": "Ancient Scroll",
    "type": "item",
    "category": "Item — Relic Tome",
    "expansion": "mon",
    "isUnique": true,
    "traits": [
      "Relic",
      "Tome"
    ],
    "effectText": "When you gain this card from the deck, improve Lore.\nOnce per round, when you pass a Lore test as part of a Spell effect, flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "ancient-sword",
    "name": "Ancient Sword",
    "type": "weapon",
    "category": "Item — Magical Relic Weapon",
    "expansion": "sr",
    "isUnique": true,
    "traits": [
      "Magical",
      "Relic",
      "Weapon"
    ],
    "effectText": "Gain +3 Strength during Combat Encounters.\nWhen you defeat a Monster during a Combat Encounter, flip this card.",
    "combatBonus": {
      "amount": 3,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "canopic-jar",
    "name": "Canopic Jar",
    "type": "item",
    "category": "Item — Magical Relic",
    "expansion": "utp",
    "isUnique": true,
    "traits": [
      "Magical",
      "Relic"
    ],
    "effectText": "When you perform a Rest action, the spirits of the dead whisper to you (Will -1). If you pass, flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "cryptic-text",
    "name": "Cryptic Text",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "utp",
    "isUnique": true,
    "traits": [
      "Tome"
    ],
    "effectText": "Action: You attempt to decipher a cryptic message in the text (Lore). If you pass, you uncover secrets that could alter the fate of humanity; flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "cursed-tablet",
    "name": "Cursed Tablet",
    "type": "item",
    "category": "Item — Magical Relic",
    "expansion": "utp",
    "isUnique": true,
    "traits": [
      "Magical",
      "Relic"
    ],
    "effectText": "When you gain this card from the deck, improve 1 skill of your choice.\nAction: You invoke the tablet's power, but at what cost? Flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "eye-of-darkness",
    "name": "Eye of Darkness",
    "type": "item",
    "category": "Item — Magical",
    "expansion": "mon",
    "isUnique": true,
    "traits": [
      "Magical"
    ],
    "effectText": "When you gain or spend an Eldritch token to reroll a die, you may reroll 1 other die.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "eye-of-light",
    "name": "Eye of Light",
    "type": "item",
    "category": "Item — Magical",
    "expansion": "mon",
    "isUnique": true,
    "traits": [
      "Magical"
    ],
    "effectText": "Once per round, you may spend 1 Eldritch token to reroll 1 die when resolving a test.",
    "rerollsGranted": {
      "amount": 1,
      "description": "You may reroll 1 die.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "flux-stabilizer",
    "name": "Flux Stabilizer",
    "type": "item",
    "category": "Item",
    "expansion": "td",
    "isUnique": true,
    "effectText": "If a Gate would spawn on your space, discard that Gate instead.\nAction: Move 1 Monster on your space to an adjacent space.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "fossilized-samples",
    "name": "Fossilized Samples",
    "type": "item",
    "category": "Item — Relic",
    "expansion": "utp",
    "isUnique": true,
    "traits": [
      "Relic"
    ],
    "effectText": "When you perform a Rest action, you may examine the fossils (Observation). If you pass, flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "lost-treasure",
    "name": "Lost Treasure",
    "type": "item",
    "category": "Item — Magical Relic",
    "expansion": "sr",
    "isUnique": true,
    "traits": [
      "Magical",
      "Relic"
    ],
    "effectText": "You may discard this card to add 3 successes to your test result during an Acquire Assets action.\nWhen you perform a Rest action, you may examine the intricate markings (Observation -1). If you pass, flip this card.",
    "isDiscardToGain": true,
    "isOncePerRound": false
  },
  {
    "id": "mysterious-idol",
    "name": "Mysterious Idol",
    "type": "item",
    "category": "Item — Magical Relic",
    "expansion": "sr",
    "isUnique": true,
    "traits": [
      "Magical",
      "Relic"
    ],
    "effectText": "When you gain this card from the deck, gain 1 Clue.\nReckoning: The idol reveals its true purpose to you. Flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "mythos-codex",
    "name": "Mythos Codex",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "td",
    "isUnique": true,
    "traits": [
      "Tome"
    ],
    "effectText": "Action: You muster the courage to look upon the secrets of the universe (Will). If you pass, the pages contain knowledge your mind can hardly fathom; flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "old-journal",
    "name": "Old Journal",
    "type": "item",
    "category": "Item — Tome",
    "expansion": "mom",
    "isUnique": true,
    "traits": [
      "Tome"
    ],
    "effectText": "Action: Test Observation. If you pass, you discover information that may prove useful to your cause; flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "perplexing-idol",
    "name": "Perplexing Idol",
    "type": "item",
    "category": "Item — Magical Relic",
    "expansion": "mon",
    "isUnique": true,
    "traits": [
      "Magical",
      "Relic"
    ],
    "effectText": "When you gain this card from the deck, gain 3 Clues.\nReckoning: The idol's features seem to fluctuate as the stars move overhead. Flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "pharaonic-mask",
    "name": "Pharaonic Mask",
    "type": "item",
    "category": "Item — Magical Relic",
    "expansion": "utp",
    "isUnique": true,
    "traits": [
      "Magical",
      "Relic"
    ],
    "effectText": "You may perform the action abilities of other investigators on the game board.\nReckoning: You hear the whispers of the pharaohs from the past. Flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "provisions",
    "name": "Provisions",
    "type": "item",
    "category": "Item",
    "expansion": "mom",
    "isUnique": true,
    "effectText": "When you perform a Rest action, you may discard this card to recover 1 additional Health and 1 additional Sanity.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "stone-calendar",
    "name": "Stone Calendar",
    "type": "item",
    "category": "Item — Magical Relic",
    "expansion": "sr",
    "isUnique": true,
    "traits": [
      "Magical",
      "Relic"
    ],
    "effectText": "When you gain this card from the deck, you may move the Omen counterclockwise by 1 without advancing Doom.\nReckoning: The alignment of the stars is right. Flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "stone-chest",
    "name": "Stone Chest",
    "type": "item",
    "category": "Item — Relic",
    "expansion": "sr",
    "isUnique": true,
    "traits": [
      "Relic"
    ],
    "effectText": "When you perform a Rest action, you may attempt to pry open the chest (Strength). If you pass, flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "stone-tablet",
    "name": "Stone Tablet",
    "type": "item",
    "category": "Item — Relic",
    "expansion": "sr",
    "isUnique": true,
    "traits": [
      "Relic"
    ],
    "effectText": "When you perform a Rest action, you may attempt to decipher the carvings on the tablet (Lore -1). If you pass, flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "tablet-shards",
    "name": "Tablet Shards",
    "type": "item",
    "category": "Item — Relic",
    "expansion": "mon",
    "isUnique": true,
    "traits": [
      "Relic"
    ],
    "effectText": "When you perform a Rest action, you may attempt to piece together the tablet shards (Observation -1). If you pass, flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "alien-device",
    "name": "Alien Device",
    "type": "artifact",
    "category": "Item",
    "expansion": "mom",
    "isUnique": false,
    "effectText": "Gain +3 Lore when resolving Spell effects.\nYou may spend 1 Sanity to reroll any number of dice when resolving a Lore test as part of a Spell effect.",
    "statBonus": {
      "amount": 3,
      "skill": "lore"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "black-book",
    "name": "Black Book",
    "type": "artifact",
    "category": "Item — Tome",
    "expansion": "mon",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Gain +2 to all skills if you have a Dark Pact Condition.\nAction: You may gain a Dark Pact to discard any number of other Conditions and all of your Eldritch tokens.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "black-fan",
    "name": "Black Fan",
    "type": "artifact",
    "category": "Item — Magical",
    "expansion": "mon",
    "isUnique": false,
    "traits": [
      "Magical"
    ],
    "effectText": "Gain +2 Influence and +2 Will.\nYou may add 2 successes to your test result when performing an Acquire Assets action.",
    "statBonus": {
      "amount": 2,
      "skill": "influence"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "bone-pipes",
    "name": "Bone Pipes",
    "type": "artifact",
    "category": "Item — Magical",
    "expansion": "sr",
    "isUnique": false,
    "traits": [
      "Magical"
    ],
    "effectText": "Action: Test Lore. If you pass, you may spend 1 Sanity to choose 1 Monster on your space or an adjacent space. The chosen Monster loses 2 Health or moves 1 space.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "book-of-the-dead",
    "name": "Book of the Dead",
    "type": "artifact",
    "category": "Item — Relic Tome",
    "expansion": "utp",
    "isUnique": false,
    "traits": [
      "Relic",
      "Tome"
    ],
    "effectText": "Gain +2 Observation and +2 Will.\nWhenever a Monster is defeated, gain 1 Clue.",
    "statBonus": {
      "amount": 2,
      "skill": "observation"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "crux-of-cykranosh",
    "name": "Crux of Cykranosh",
    "type": "artifact",
    "category": "Item — Magical",
    "expansion": "td",
    "isUnique": false,
    "traits": [
      "Magical"
    ],
    "effectText": "When you pass a Strength test during a Combat Encounter, improve Lore.\nWhen you pass a Lore test while resolving a Spell effect, improve Strength.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "crystal-of-the-elder-things",
    "name": "Crystal of the Elder Things",
    "type": "artifact",
    "category": "Item",
    "expansion": "mom",
    "isUnique": false,
    "effectText": "Mythos card text effects cannot cause you to lose Health or Sanity.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "crystallizer-of-dreams",
    "name": "Crystallizer of Dreams",
    "type": "artifact",
    "category": "Item — Magical Teamwork",
    "expansion": "td",
    "isUnique": false,
    "traits": [
      "Magical",
      "Teamwork"
    ],
    "effectText": "Once per round, during the Action Phase, you may trade any number of Conditions, Focus, Improvement tokens, and/or Impairment tokens with another investigator on any space.",
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "cultes-des-goules",
    "name": "Cultes des Goules",
    "type": "artifact",
    "category": "Item — Tome",
    "expansion": "core",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Action: Test Lore. If you pass, you may spend 1 Sanity to gain 2 Clues.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "cursed-sphere",
    "name": "Cursed Sphere",
    "type": "artifact",
    "category": "Item — Magical",
    "expansion": "fl",
    "isUnique": false,
    "traits": [
      "Magical"
    ],
    "effectText": "Gain +2 to all skills.\nReckoning: Roll 1 die. On a 1 or 2, gain a Cursed Condition.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "de-vermis-mysteriis",
    "name": "De Vermis Mysteriis",
    "type": "artifact",
    "category": "Item — Tome",
    "expansion": "core",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Action: Test Lore. If you pass, you may spend 1 Sanity to improve 1 skill of your choice.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "dhol-chants",
    "name": "Dhol Chants",
    "type": "artifact",
    "category": "Item — Tome",
    "expansion": "mom",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "When resolving a Combat Encounter, you may test Lore. If you pass, you may spend 1 Sanity to roll 3 additional dice when resolving the Strength test during that encounter.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "dragon-idol",
    "name": "Dragon Idol",
    "type": "artifact",
    "category": "Item — Magical Relic",
    "expansion": "sr",
    "isUnique": false,
    "traits": [
      "Magical",
      "Relic"
    ],
    "effectText": "Action: You lose 1 Sanity and 1 Monster on your space or an adjacent space loses 2 Health.\nYou may spend 1 Sanity to reroll any number of dice when resolving a Strength test during a Combat Encounter.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "elder-key",
    "name": "Elder Key",
    "type": "artifact",
    "category": "Item — Tome",
    "expansion": "td",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Action: You may spend 1 Health to move to a space containing a Gate or a Dream Portal.\nOnce per round, you may spend 1 Health in place of spending 1 Clue.",
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "elixir-of-life",
    "name": "Elixir of Life",
    "type": "artifact",
    "category": "Item — Elixir",
    "expansion": "fl",
    "isUnique": false,
    "traits": [
      "Elixir"
    ],
    "effectText": "Action: Test Will. If you pass, you may spend 1 Sanity to recover all Health and discard all Illness, Injury, and Madness Conditions.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "eltdown-shards",
    "name": "Eltdown Shards",
    "type": "artifact",
    "category": "Item — Tome",
    "expansion": "mom",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Action: Test Lore. If you pass, you may spend 1 Sanity to discard 1 Monster of your choice with toughness 3 or less on any space.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "fetch-stick",
    "name": "Fetch Stick",
    "type": "artifact",
    "category": "Item — Magical Weapon",
    "expansion": "cir",
    "isUnique": false,
    "traits": [
      "Magical",
      "Weapon"
    ],
    "effectText": "Gain +6 Strength during Combat Encounters.\nIf you defeat a Monster during a Combat Encounter, gain 1 Clue.",
    "combatBonus": {
      "amount": 6,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "flute-of-the-outer-gods",
    "name": "Flute of the Outer Gods",
    "type": "artifact",
    "category": "Item — Magical",
    "expansion": "core",
    "isUnique": false,
    "traits": [
      "Magical"
    ],
    "effectText": "Action: Spend 2 Health and 2 Sanity to defeat all Monsters on your space.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "gharne-fragments",
    "name": "G'harne Fragments",
    "type": "artifact",
    "category": "Item — Relic Tome",
    "expansion": "cir",
    "isUnique": false,
    "traits": [
      "Relic",
      "Tome"
    ],
    "effectText": "As part of a Travel action, you may spend 1 Health to move 1 additional space along any path.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "gate-box",
    "name": "Gate Box",
    "type": "artifact",
    "category": "Item — Magical",
    "expansion": "core",
    "isUnique": false,
    "traits": [
      "Magical"
    ],
    "effectText": "Investigators on your space roll 1 additional die when resolving tests during Other World Encounters.\nIf you close a Gate during an Other World Encounter, gain 1 Clue.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "glass-of-mortlan",
    "name": "Glass of Mortlan",
    "type": "artifact",
    "category": "Item — Magical",
    "expansion": "core",
    "isUnique": false,
    "traits": [
      "Magical"
    ],
    "effectText": "Each 6 you roll when resolving a Spell effect counts as 2 successes.\nYou may prevent the loss of 1 Sanity when resolving your Spell effects.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "grotesque-statue",
    "name": "Grotesque Statue",
    "type": "artifact",
    "category": "Item",
    "expansion": "core",
    "isUnique": false,
    "effectText": "When you gain this card from the deck, gain 5 Clues.\nOnce per round, you may spend 1 Clue to prevent all Sanity loss from a single effect.",
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "heart-of-winter",
    "name": "Heart of Winter",
    "type": "artifact",
    "category": "Item",
    "expansion": "mom",
    "isUnique": false,
    "effectText": "You cannot gain a Hypothermia Condition unless you choose to.\nGain +2 to all skills if you have a Hypothermia Condition.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "hemisphere-map",
    "name": "Hemisphere Map",
    "type": "artifact",
    "category": "Item",
    "expansion": "mon",
    "isUnique": false,
    "effectText": "Once per round, during the Action Phase, you may move to an adjacent space.",
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "hyperborean-crystal",
    "name": "Hyperborean Crystal",
    "type": "artifact",
    "category": "Item — Magical",
    "expansion": "mom",
    "isUnique": false,
    "traits": [
      "Magical"
    ],
    "effectText": "You may discard 1 Spell to reroll any number of dice when resolving a test except when resolving a Spell effect.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "key-to-carcosa",
    "name": "Key to Carcosa",
    "type": "trinket",
    "category": "Trinket — Magical",
    "expansion": "soc",
    "isUnique": false,
    "traits": [
      "Magical"
    ],
    "effectText": "Once per round, you may spend 1 Sanity to reroll any number of dice when resolving a test.",
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "khopesh-of-the-abyss",
    "name": "Khopesh of the Abyss",
    "type": "artifact",
    "category": "Item — Magical Relic Weapon",
    "expansion": "sr",
    "isUnique": false,
    "traits": [
      "Magical",
      "Relic",
      "Weapon"
    ],
    "effectText": "Gain +5 Strength during Combat Encounters.\nOnce per round, when you defeat a Monster during a Combat Encounter, you may move to the nearest space containing a Monster.",
    "combatBonus": {
      "amount": 5,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "king-in-yellow",
    "name": "King in Yellow",
    "type": "artifact",
    "category": "Item — Tome",
    "expansion": "soc",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Gain +2 to all skills if you have a Blight Condition.\nReckoning: Gain a Blight Condition.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "lightning-gun",
    "name": "Lightning Gun",
    "type": "artifact",
    "category": "Item — Magical Weapon",
    "expansion": "core",
    "isUnique": false,
    "traits": [
      "Magical",
      "Weapon"
    ],
    "effectText": "Gain +6 Strength when resolving a Combat Encounter.\nAction: You and each Monster on your space lose 1 Health.",
    "combatBonus": {
      "amount": 6,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "livre-divon",
    "name": "Livre d'Ivon",
    "type": "artifact",
    "category": "Item — Tome",
    "expansion": "mom",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Action: Test Lore -1. If you pass, you may spend 1 Sanity to move to any space of your choice.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "mask-of-sthenelus",
    "name": "Mask of Sthenelus",
    "type": "artifact",
    "category": "Item — Magical Relic",
    "expansion": "soc",
    "isUnique": false,
    "traits": [
      "Magical",
      "Relic"
    ],
    "effectText": "Action: You may spend 1 Improvement or Impairment token to improve 1 skill of your choice or gain 1 Talent Condition.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "mask-of-the-watcher",
    "name": "Mask of the Watcher",
    "type": "artifact",
    "category": "Item — Magical",
    "expansion": "sr",
    "isUnique": false,
    "traits": [
      "Magical"
    ],
    "effectText": "Reduce the horror of Monsters you encounter to 1.\nWhen you pass a Will test during a Combat Encounter, gain 1 Focus.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "massa-di-requiem-per-shuggay",
    "name": "Massa di Requiem per Shuggay",
    "type": "artifact",
    "category": "Item — Tome",
    "expansion": "fl",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Action: Test Lore -1. If you pass, you may spend 1 Sanity to discard 1 Monster on a space of your choice containing a Gate.\nReckoning: Roll 1 die. On a 1, advance Doom by 1.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "mi-go-brain-case",
    "name": "Mi-go Brain Case",
    "type": "artifact",
    "category": "Item — Magical Teamwork",
    "expansion": "core",
    "isUnique": false,
    "traits": [
      "Magical",
      "Teamwork"
    ],
    "effectText": "Action: You and another investigator may trade possessions. In addition, he may move to your space; if he does, move to his previous space.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "milk-of-shub-niggurath",
    "name": "Milk of Shub-Niggurath",
    "type": "artifact",
    "category": "Item — Elixir",
    "expansion": "fl",
    "isUnique": false,
    "traits": [
      "Elixir"
    ],
    "effectText": "Action: Test Will. If you pass, you may spend 1 Sanity to recover all Health and improve Strength twice; then a Monster ambushes you!",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "necronomicon",
    "name": "Necronomicon",
    "type": "artifact",
    "category": "Item — Tome",
    "expansion": "core",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Action: Test Lore. If you pass, you may spend 1 Sanity to gain 2 Spells.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "pallid-mask",
    "name": "Pallid Mask",
    "type": "artifact",
    "category": "Item — Magical",
    "expansion": "core",
    "isUnique": false,
    "traits": [
      "Magical"
    ],
    "effectText": "During the Encounter Phase, you may choose an encounter as if there are no Monsters on your space.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "pentacle-of-planes",
    "name": "Pentacle of Planes",
    "type": "artifact",
    "category": "Item — Magical",
    "expansion": "td",
    "isUnique": false,
    "traits": [
      "Magical"
    ],
    "effectText": "Action: Defeat 1 Monster on your space. You lose Sanity equal to its toughness.\nReduce the damage and horror of Monsters you encounter by 2 to a minimum of 1.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "pnakotic-manuscripts",
    "name": "Pnakotic Manuscripts",
    "type": "artifact",
    "category": "Item — Tome",
    "expansion": "mom",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Gain +1 Lore and +1 Will.\nAction: If you are on a space containing a Gate, gain 1 Clue.",
    "statBonus": {
      "amount": 1,
      "skill": "lore"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "ruby-of-rlyeh",
    "name": "Ruby of R'lyeh",
    "type": "artifact",
    "category": "Item — Magical",
    "expansion": "core",
    "isUnique": false,
    "traits": [
      "Magical"
    ],
    "effectText": "Once per round, during the Action Phase, you may spend 1 Sanity and perform 1 additional action.",
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "satchel-of-the-void",
    "name": "Satchel of the Void",
    "type": "artifact",
    "category": "Item — Magical",
    "expansion": "fl",
    "isUnique": false,
    "traits": [
      "Magical"
    ],
    "effectText": "You cannot gain a Lost in Time and Space Condition unless you choose to.\nAction: Look at the top Gate in the Gate stack. Gain 1 Clue if that Gate corresponds to the current Omen.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "scales-of-thoth",
    "name": "Scales of Thoth",
    "type": "artifact",
    "category": "Item — Magical Relic",
    "expansion": "utp",
    "isUnique": false,
    "traits": [
      "Magical",
      "Relic"
    ],
    "effectText": "Gain +2 to all skills if your Health and Sanity are equal.\nReckoning: Lose 1 Health and/or 1 Sanity.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "serpent-crown",
    "name": "Serpent Crown",
    "type": "artifact",
    "category": "Item — Magical",
    "expansion": "fl",
    "isUnique": false,
    "traits": [
      "Magical"
    ],
    "effectText": "Action: Test Will -1. If you pass, you may spend 1 Sanity to gain 1 random Ally Asset from the deck.\nReckoning: Discard 1 Ally Asset.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "shining-trapezohedron",
    "name": "Shining Trapezohedron",
    "type": "artifact",
    "category": "Item — Magical",
    "expansion": "utp",
    "isUnique": false,
    "traits": [
      "Magical"
    ],
    "effectText": "Action: Choose 1 Monster on any space and roll 1 die. On a 5 or 6, discard that Monster. On a 1-4, move that Monster to your space.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "sword-of-saint-jerome",
    "name": "Sword of Saint Jerome",
    "type": "artifact",
    "category": "Item — Magical Weapon",
    "expansion": "core",
    "isUnique": false,
    "traits": [
      "Magical",
      "Weapon"
    ],
    "effectText": "Gain +2 Will and +5 Strength when resolving Combat Encounters.\nIf you defeat a Monster during a Combat Encounter, recover 1 Sanity.",
    "statBonus": {
      "amount": 2,
      "skill": "will"
    },
    "combatBonus": {
      "amount": 2,
      "skill": "will"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "sword-of-yha-talla",
    "name": "Sword of Y'ha-Talla",
    "type": "artifact",
    "category": "Item — Magical Weapon",
    "expansion": "fl",
    "isUnique": false,
    "traits": [
      "Magical",
      "Weapon"
    ],
    "effectText": "Gain +2 Will and +3 Strength during Combat Encounters.\nIf you defeat a Monster during a Combat Encounter, gain 1 Clue.",
    "statBonus": {
      "amount": 2,
      "skill": "will"
    },
    "combatBonus": {
      "amount": 2,
      "skill": "will"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "ttka-halot",
    "name": "T'tka Halot",
    "type": "artifact",
    "category": "Item — Tome",
    "expansion": "core",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Action: Test Lore. If you pass, you may spend 1 Sanity to choose 1 Monster on your space to lose 3 Health.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "tattered-cloak",
    "name": "Tattered Cloak",
    "type": "artifact",
    "category": "Item — Magical",
    "expansion": "soc",
    "isUnique": false,
    "traits": [
      "Magical"
    ],
    "effectText": "You may spend 1 fewer Sanity to pay for an effect.\nIf an effect would cause you to lose Sanity, lose 1 fewer Sanity instead.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "the-silver-key",
    "name": "The Silver Key",
    "type": "artifact",
    "category": "Item — Magical",
    "expansion": "core",
    "isUnique": false,
    "traits": [
      "Magical"
    ],
    "effectText": "Once per round, you may spend 1 less Clue to pay for an effect.\nYou may reroll 1 die when resolving a test during an Other World Encounter.",
    "rerollsGranted": {
      "amount": 1,
      "description": "You may reroll 1 die.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "tikkoun-elixir",
    "name": "Tikkoun Elixir",
    "type": "artifact",
    "category": "Item — Elixir",
    "expansion": "cir",
    "isUnique": false,
    "traits": [
      "Elixir"
    ],
    "effectText": "Action: Test Will. If you pass, you may spend 1 Sanity to gain 1 Boon Condition.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "true-magick",
    "name": "True Magick",
    "type": "artifact",
    "category": "Item — Tome",
    "expansion": "mon",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Gain +5 Lore when resolving Spell effects.\nIf you would spend or lose Sanity as part of a Spell effect, you may spend or lose 1 fewer Sanity as part of that effect.",
    "statBonus": {
      "amount": 5,
      "skill": "lore"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "twin-scepters",
    "name": "Twin Scepters",
    "type": "artifact",
    "category": "Item — Magical Relic",
    "expansion": "utp",
    "isUnique": false,
    "traits": [
      "Magical",
      "Relic"
    ],
    "effectText": "Gain +4 Strength during Combat Encounters.\nGain +4 Lore when resolving Spell effects.",
    "statBonus": {
      "amount": 4,
      "skill": "lore"
    },
    "combatBonus": {
      "amount": 4,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "vach-viraj-chant",
    "name": "Vach-Viraj Chant",
    "type": "artifact",
    "category": "Item — Magical Tome",
    "expansion": "cir",
    "isUnique": false,
    "traits": [
      "Magical",
      "Tome"
    ],
    "effectText": "Gain +5 Strength during Combat Encounters.\nReduce the horror and damage of Monsters you encounter by 1 to a minimum of 1.",
    "combatBonus": {
      "amount": 5,
      "skill": "strength"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "zanthu-tablets",
    "name": "Zanthu Tablets",
    "type": "artifact",
    "category": "Item — Tome",
    "expansion": "fl",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Gain +3 Lore when resolving Spell effects.\nAction: Test Lore. If you pass, you may spend 1 Sanity to gain 2 Spells, then discard 1 Spell.",
    "statBonus": {
      "amount": 3,
      "skill": "lore"
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "genealogy-research",
    "name": "Genealogy Research",
    "type": "task",
    "category": "Task",
    "expansion": "mom",
    "isUnique": false,
    "effectText": "When you defeat a Monster with toughness 2 or more during a Combat Encounter, you may examine the creature's remains (Observation). If you pass, gain 2 Clues and discard this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "investment",
    "name": "Investment",
    "type": "task",
    "category": "Task",
    "expansion": "mom",
    "isUnique": false,
    "effectText": "Reckoning: Your investment has paid off. You may discard this card to gain a Funding Condition.",
    "isDiscardToGain": true,
    "isOncePerRound": false
  },
  {
    "id": "mineralogy-research",
    "name": "Mineralogy Research",
    "type": "task",
    "category": "Task",
    "expansion": "mom",
    "isUnique": false,
    "effectText": "After resolving a General Encounter or an Expedition Encounter on a Wilderness space, you may examine the area's soil (Observation). If you pass, gain 2 Clues and discard this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "newspaper-report",
    "name": "Newspaper Report",
    "type": "task",
    "category": "Task",
    "expansion": "mom",
    "isUnique": false,
    "effectText": "After resolving a Research Encounter, you may spend 1 Clue you gained from that encounter and discard this card to retreat Doom by 1.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "patrolling-the-streets",
    "name": "Patrolling the Streets",
    "type": "task",
    "category": "Task",
    "expansion": "mom",
    "isUnique": false,
    "effectText": "When you defeat a Monster with toughness 3 or more during a Combat Encounter, you may discard this card to retreat Doom by 1.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "seek-the-truth",
    "name": "Seek the Truth",
    "type": "task",
    "category": "Task",
    "expansion": "td",
    "isUnique": false,
    "effectText": "Whenever you gain a Clue during a Research Encounter, spawn 1 Clue. Then, you may spend 3 Clues and discard this card to advance the active Mystery by 1.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "specialized-training",
    "name": "Specialized Training",
    "type": "task",
    "category": "Task",
    "expansion": "sr",
    "isUnique": false,
    "effectText": "When you perform a Focus action, you may consult experts to train you (Will). If you pass, discard this card and improve 1 skill of your choice.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "bury-them-deep",
    "name": "Bury Them Deep",
    "type": "task",
    "category": "Task",
    "expansion": "td",
    "isUnique": true,
    "effectText": "When a non-Epic Monster is defeated or discarded, you may spend 1 Focus to place that Monster on this card. Then you may flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "courier-run",
    "name": "Courier Run",
    "type": "task",
    "category": "Task",
    "expansion": "mom",
    "isUnique": true,
    "effectText": "When you gain this card from the deck, place 1 random Clue that corresponds to a City space faceup on this card.\nAfter resolving a location encounter on that space, flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "dimensional-study",
    "name": "Dimensional Study",
    "type": "task",
    "category": "Task",
    "expansion": "td",
    "isUnique": true,
    "effectText": "Once per round, when a Gate is closed or discarded, you may spend 1 Clue to place 1 Clue on this card. Then you may flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "enlist-the-masses",
    "name": "Enlist the Masses",
    "type": "task",
    "category": "Task",
    "expansion": "soc",
    "isUnique": true,
    "effectText": "When you perform a Rest action, you may attempt to gather the people to your cause (Influence). If you pass, place 1 Eldritch token on this card; then you may flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "exploring-the-ruins",
    "name": "Exploring the Ruins",
    "type": "task",
    "category": "Task",
    "expansion": "sr",
    "isUnique": true,
    "effectText": "After resolving an Expedition Encounter or a Mystic Ruins Encounter, you may spend 1 Focus to place 1 Focus on this card. Then you may flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "for-the-greater-good",
    "name": "For the Greater Good",
    "type": "task",
    "category": "Task",
    "expansion": "mom",
    "isUnique": true,
    "effectText": "At the end of the Mythos Phase, you may spend Clues equal to the number of investigators to sacrifice yourself for the good of all mankind; flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "funding-the-cause",
    "name": "Funding the Cause",
    "type": "task",
    "category": "Task",
    "expansion": "soc",
    "isUnique": true,
    "effectText": "When you perform an Acquire Assets action, you may spend successes greater than the number of Eldritch tokens on this card to place 1 Eldritch token on this card. Then you may flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "invoke-the-elements",
    "name": "Invoke the Elements",
    "type": "task",
    "category": "Task",
    "expansion": "utp",
    "isUnique": true,
    "effectText": "When you perform a Rest action, you may attempt to call upon the arcane energies of the world (Lore). If you pass, place 1 Eldritch token on this card; then you may flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "know-thy-enemy",
    "name": "Know Thy Enemy",
    "type": "task",
    "category": "Task",
    "expansion": "utp",
    "isUnique": true,
    "effectText": "Whenever you gain a Clue during a Research Encounter, place 1 Eldritch token on this card. Then you may flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "light-of-reason",
    "name": "Light of Reason",
    "type": "task",
    "category": "Task",
    "expansion": "cir",
    "isUnique": true,
    "effectText": "Whenever you gain Clue during a Research Encounter, you may spend 1 Clue to place 1 Clue on this card. Then you may flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "mastering-the-art",
    "name": "Mastering the Art",
    "type": "task",
    "category": "Task",
    "expansion": "soc",
    "isUnique": true,
    "effectText": "Once per round, when you improve a skill, place 1 Eldritch token on this card. Then you may flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "prayer",
    "name": "Prayer",
    "type": "task",
    "category": "Task",
    "expansion": "sr",
    "isUnique": true,
    "effectText": "When you perform a Rest action, you may beseech a higher power for assistance (Will). If you pass, place 1 Eldritch token on this card; then you may flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "purifying-the-world",
    "name": "Purifying the World",
    "type": "task",
    "category": "Task",
    "expansion": "mom",
    "isUnique": true,
    "effectText": "When you defeat a non-Epic Monster during a Combat Encounter, place that Monster on this card. Then you may flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "push-it-to-the-limit",
    "name": "Push It to the Limit",
    "type": "task",
    "category": "Task",
    "expansion": "mon",
    "isUnique": true,
    "effectText": "When you perform a Rest action, you may push your body to its limit (Strength). If you pass, place 1 Eldritch token on this card; then you may flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "sacrifices-to-make",
    "name": "Sacrifices to Make",
    "type": "task",
    "category": "Task",
    "expansion": "mom",
    "isUnique": true,
    "effectText": "When you perform a Focus action, you may spend 1 Health to place 1 Health on this card. Then you may flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "sealing-the-old-ones",
    "name": "Sealing the Old Ones",
    "type": "task",
    "category": "Task",
    "expansion": "mom",
    "isUnique": true,
    "effectText": "When you pass a Lore test when resolving a Spell effect, you may discard that Spell after resolving its effects to place 1 Eldritch token on this card. Then you may flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "seeking-the-masters",
    "name": "Seeking the Masters",
    "type": "task",
    "category": "Task",
    "expansion": "cir",
    "isUnique": true,
    "effectText": "When you perform an Acquire Assets action, you may spend 2 or more successes to place an equal number of Eldritch tokens on this card. If you do, flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "tempted-by-darkness",
    "name": "Tempted by Darkness",
    "type": "task",
    "category": "Task",
    "expansion": "mon",
    "isUnique": true,
    "effectText": "At the end of the Mythos Phase, you may spend 2 Health and 2 Sanity to flip this card. If you do not flip this card, gain 1 Eldritch token.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "turning-the-tide",
    "name": "Turning the Tide",
    "type": "task",
    "category": "Task",
    "expansion": "soc",
    "isUnique": true,
    "effectText": "At the end of the Mythos Phase, if Doom has advanced this round, or the Ancient One has awoken, you may spend Clues equal to half the number of investigators to flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "unspeakable-research",
    "name": "Unspeakable Research",
    "type": "task",
    "category": "Task",
    "expansion": "td",
    "isUnique": true,
    "effectText": "When you perform a Rest action, you may delve deeper into the secrets of the ancient ones (Observation). If you pass, place 1 Eldritch token on this card; then you may flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "walking-the-ley-lines",
    "name": "Walking the Ley Lines",
    "type": "task",
    "category": "Task",
    "expansion": "mom",
    "isUnique": true,
    "effectText": "When you close a Gate during an Other World Encounter, place that Gate on this card. Then you may flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "wave-of-destruction",
    "name": "Wave of Destruction",
    "type": "task",
    "category": "Task",
    "expansion": "cir",
    "isUnique": true,
    "effectText": "When you pass a Lore test while resolving a Spell effect, you may spend 1 Health to place 1 Health on this card. Then you may flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "ancient-manuscript",
    "name": "Ancient Manuscript",
    "type": "trinket",
    "category": "Trinket — Relic Tome",
    "expansion": "mon",
    "isUnique": false,
    "traits": [
      "Relic",
      "Tome"
    ],
    "effectText": "Gain +1 Lore and +1 Will.\nOnce per round, you may reroll 1 die when resolving a test.",
    "statBonus": {
      "amount": 1,
      "skill": "lore"
    },
    "rerollsGranted": {
      "amount": 1,
      "description": "You may reroll 1 die.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "arcane-scroll",
    "name": "Arcane Scroll",
    "type": "trinket",
    "category": "Trinket — Tome",
    "expansion": "utp",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "You may add 1 to the result of 1 die when resolving a Lore test as part of a Spell effect.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "dream-box",
    "name": "Dream Box",
    "type": "trinket",
    "category": "Trinket — Magical",
    "expansion": "td",
    "isUnique": false,
    "traits": [
      "Magical"
    ],
    "effectText": "When you close a Gate during an Other World Encounter, gain 1 Focus. If that Gate corresponds to the current Omen, recover 1 Sanity.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "elder-sign",
    "name": "Elder Sign",
    "type": "trinket",
    "category": "Trinket — Magical",
    "expansion": "fl",
    "isUnique": false,
    "traits": [
      "Magical"
    ],
    "effectText": "You may reroll 1 die when resolving a Will test during a Combat Encounter.\nReduce the horror of Monsters you encounter by 1 to a minimum of 1.",
    "rerollsGranted": {
      "amount": 1,
      "skill": "will",
      "description": "You may reroll 1 die when resolving a Will test.",
      "isCombatOnly": true
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "expedition-map",
    "name": "Expedition Map",
    "type": "trinket",
    "category": "Trinket — Tome",
    "expansion": "sr",
    "isUnique": false,
    "traits": [
      "Tome"
    ],
    "effectText": "Once per round, you may add 1 to the result of 1 die when resolving a test during an Expedition Encounter or a Mystic Ruins Encounter.",
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "fine-jewelry",
    "name": "Fine Jewelry",
    "type": "trinket",
    "category": "Trinket",
    "expansion": "soc",
    "isUnique": false,
    "effectText": "You may add 1 to the result of 1 die when performing an Influence test during an Acquire Assets action.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "gamblers-dice",
    "name": "Gambler's Dice",
    "type": "trinket",
    "category": "Trinket",
    "expansion": "mom",
    "isUnique": false,
    "effectText": "You roll a minimum of 2 dice when resolving tests.\nOnce per round, you may reroll 2 dice with matching results when resolving a test.",
    "rerollsGranted": {
      "amount": 2,
      "description": "You may reroll 2 die.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "grisly-totem",
    "name": "Grisly Totem",
    "type": "trinket",
    "category": "Trinket — Magical",
    "expansion": "cir",
    "isUnique": false,
    "traits": [
      "Magical"
    ],
    "effectText": "Gain +1 Strength and +1 Will.\nOnce per round, you may reroll 1 die when resolving a test.",
    "statBonus": {
      "amount": 1,
      "skill": "strength"
    },
    "rerollsGranted": {
      "amount": 1,
      "description": "You may reroll 1 die.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "gruesome-talisman",
    "name": "Gruesome Talisman",
    "type": "trinket",
    "category": "Trinket",
    "expansion": "sr",
    "isUnique": false,
    "effectText": "You may add 1 to the result of 1 die when resolving a Will test during a Combat Encounter.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "lucky-cigarette-case",
    "name": "Lucky Cigarette Case",
    "type": "trinket",
    "category": "Trinket",
    "expansion": "core",
    "isUnique": false,
    "effectText": "Once per round, you may add 1 to the result of 1 die when resolving a test.",
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "lucky-rabbits-foot",
    "name": "Lucky Rabbit's Foot",
    "type": "trinket",
    "category": "Trinket",
    "expansion": "core",
    "isUnique": false,
    "effectText": "Once per round, you may reroll 1 die when resolving a test.",
    "rerollsGranted": {
      "amount": 1,
      "description": "You may reroll 1 die.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "lucky-ring",
    "name": "Lucky Ring",
    "type": "trinket",
    "category": "Trinket",
    "expansion": "fl",
    "isUnique": false,
    "effectText": "You may reroll 1 die when resolving a test.",
    "rerollsGranted": {
      "amount": 1,
      "description": "You may reroll 1 die.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "lucky-talisman",
    "name": "Lucky Talisman",
    "type": "trinket",
    "category": "Trinket — Relic",
    "expansion": "utp",
    "isUnique": false,
    "traits": [
      "Relic"
    ],
    "effectText": "Once per round, you may reroll all of your dice when resolving a test.",
    "rerollsGranted": {
      "amount": 1,
      "description": "You may reroll 1 die.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "magnifying-glass",
    "name": "Magnifying Glass",
    "type": "trinket",
    "category": "Trinket",
    "expansion": "utp",
    "isUnique": false,
    "effectText": "Once per round, you or another investigator on your space may spend 1 Clue to reroll any number of dice when resolving a test.",
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "painkillers",
    "name": "Painkillers",
    "type": "trinket",
    "category": "Trinket",
    "expansion": "cir",
    "isUnique": false,
    "effectText": "You may reroll 1 die when resolving a Strength test as part of an Illness or Injury Condition effect.",
    "rerollsGranted": {
      "amount": 1,
      "skill": "strength",
      "description": "You may reroll 1 die when resolving a Strength test.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "pocket-watch",
    "name": "Pocket Watch",
    "type": "trinket",
    "category": "Trinket",
    "expansion": "core",
    "isUnique": false,
    "effectText": "You cannot become Delayed unless you choose to.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "puzzle-box",
    "name": "Puzzle Box",
    "type": "trinket",
    "category": "Trinket",
    "expansion": "core",
    "isUnique": false,
    "effectText": "When you perform a Rest action, you may attempt to open the puzzle box (Observation -2). If you pass, you may discard this card to gain 1 Artifact.",
    "isDiscardToGain": true,
    "isOncePerRound": false
  },
  {
    "id": "ritual-candles",
    "name": "Ritual Candles",
    "type": "trinket",
    "category": "Trinket",
    "expansion": "utp",
    "isUnique": false,
    "effectText": "You may discard this card to gain +5 Lore when resolving a Spell effect.\nAction: You may discard this card to gain 1 Spell.",
    "statBonus": {
      "amount": 5,
      "skill": "lore"
    },
    "isDiscardToGain": true,
    "discardBonus": {
      "amount": 5,
      "skill": "lore",
      "isCombatOnly": false,
      "description": "discard this card to gain +5 Lore"
    },
    "isOncePerRound": false
  },
  {
    "id": "skeleton-keys",
    "name": "Skeleton Keys",
    "type": "trinket",
    "category": "Trinket",
    "expansion": "td",
    "isUnique": false,
    "effectText": "Once per round, you may add 1 to the result of 1 die when resolving a test during an Other World Encounter.",
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "treasured-memento",
    "name": "Treasured Memento",
    "type": "trinket",
    "category": "Trinket",
    "expansion": "mon",
    "isUnique": false,
    "effectText": "Once per round, when you spend 1 Focus, you may gain 1 Focus.",
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "ace-of-swords",
    "name": "Ace of Swords",
    "type": "trinket",
    "category": "Trinket — Tarot",
    "expansion": "td",
    "isUnique": true,
    "traits": [
      "Tarot"
    ],
    "effectText": "When you gain this card from the deck, improve Strength.\nWhenever you roll a 1 during a Strength test as part of a Combat Encounter, you may reroll that die.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "death-xiii",
    "name": "Death XIII",
    "type": "trinket",
    "category": "Trinket — Tarot",
    "expansion": "td",
    "isUnique": true,
    "traits": [
      "Tarot"
    ],
    "effectText": "Whenever a Mystery is solved, retreat Doom by 1.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "five-of-pentacles",
    "name": "Five of Pentacles",
    "type": "trinket",
    "category": "Trinket — Tarot",
    "expansion": "td",
    "isUnique": true,
    "traits": [
      "Tarot"
    ],
    "effectText": "When you gain this card from the deck, improve Influence.\nWhenever you roll a 1 during an Influence test as part of an Acquire Assets action, you may reroll that die.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "four-of-cups",
    "name": "Four of Cups",
    "type": "trinket",
    "category": "Trinket — Tarot",
    "expansion": "td",
    "isUnique": true,
    "traits": [
      "Tarot"
    ],
    "effectText": "When you gain this card from the deck, improve Will.\nWhenever you roll a 1 during a Will test as part of a Combat Encounter, you may reroll that die.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "jeweled-scarab",
    "name": "Jeweled Scarab",
    "type": "trinket",
    "category": "Trinket — Magical Relic",
    "expansion": "utp",
    "isUnique": true,
    "traits": [
      "Magical",
      "Relic"
    ],
    "effectText": "You may reroll 1 die when resolving a Lore or Will test.\nReckoning: If you or another investigator on any space has an Ornate Scarab Unique Asset, you may flip this card.",
    "rerollsGranted": {
      "amount": 1,
      "skill": "lore",
      "description": "You may reroll 1 die when resolving a Lore test.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "ornate-scarab",
    "name": "Ornate Scarab",
    "type": "trinket",
    "category": "Trinket — Magical Relic",
    "expansion": "utp",
    "isUnique": true,
    "traits": [
      "Magical",
      "Relic"
    ],
    "effectText": "You may reroll 1 die when resolving an Observation or Strength test.\nReckoning: If you or another investigator on any space has a Jeweled Scarab Unique Asset, you may flip this card.",
    "rerollsGranted": {
      "amount": 1,
      "skill": "observation",
      "description": "You may reroll 1 die when resolving a Observation test.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "sacred-icon",
    "name": "Sacred Icon",
    "type": "trinket",
    "category": "Trinket — Magical Relic",
    "expansion": "mon",
    "isUnique": true,
    "traits": [
      "Magical",
      "Relic"
    ],
    "effectText": "Once per round, you may reroll 1 die when resolving a test.\nWhen you perform a Focus action, the icon whispers to you. Flip this card.",
    "rerollsGranted": {
      "amount": 1,
      "description": "You may reroll 1 die.",
      "isCombatOnly": false
    },
    "isDiscardToGain": false,
    "isOncePerRound": true
  },
  {
    "id": "the-moon-xviii",
    "name": "The Moon XVIII",
    "type": "trinket",
    "category": "Trinket — Tarot",
    "expansion": "td",
    "isUnique": true,
    "traits": [
      "Tarot"
    ],
    "effectText": "Whenever you lose 1 or more Sanity, you may gain 1 Focus or spend 1 Focus to improve 1 skill of your choice.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "treasure-map",
    "name": "Treasure Map",
    "type": "trinket",
    "category": "Trinket",
    "expansion": "utp",
    "isUnique": true,
    "effectText": "When you gain this card from the deck, place 1 random Clue faceup on this card.\nAfter resolving a location encounter or an Expedition Encounter on that space, flip this card.",
    "isDiscardToGain": false,
    "isOncePerRound": false
  },
  {
    "id": "spell-wither",
    "name": "Wither",
    "type": "spell",
    "cost": 2,
    "combatBonus": {
      "skill": "lore",
      "amount": 3
    },
    "effectText": "Combat Spell: Gain +3 Lore during Combat Encounters.\nTest Lore -1; on pass, target Monster loses 2 toughness.",
    "flavorText": "A blackened invocation that drains the vitality of alien flesh."
  },
  {
    "id": "spell-shrivelling",
    "name": "Shrivelling",
    "type": "spell",
    "cost": 3,
    "combatBonus": {
      "skill": "lore",
      "amount": 5
    },
    "rerollsGranted": {
      "skill": "lore",
      "amount": 2,
      "description": "Spend 1 Sanity to reroll up to 2 dice.",
      "isCombatOnly": true
    },
    "effectText": "Combat Spell: Gain +5 Lore during Combat Encounters.\nYou may spend 1 Sanity to reroll 2 dice.",
    "flavorText": "Blue eldritch flames twist around your fingertips, scorching everything in their path."
  },
  {
    "id": "spell-clairvoyance",
    "name": "Clairvoyance",
    "type": "spell",
    "cost": 2,
    "effectText": "Incantation Spell: Test Lore.\nIf you pass, spawn 1 Clue on your space, or look at the top 3 cards of the Mythos or Encounter deck.",
    "flavorText": "Your third eye opens across the gulf of time and cosmic geometry."
  },
  {
    "id": "spell-healing-words",
    "name": "Healing Words",
    "type": "spell",
    "cost": 2,
    "effectText": "Incantation Spell: Test Lore.\nOn pass, you or another investigator on your space recovers up to 2 Health.",
    "flavorText": "Syllables of primordial renewal knit muscle and mend broken bone."
  },
  {
    "id": "spell-instill-courage",
    "name": "Instill Courage",
    "type": "spell",
    "cost": 2,
    "effectText": "Incantation Spell: Test Lore.\nOn pass, you or another investigator on your space recovers up to 2 Sanity.",
    "flavorText": "Harmonious tones dispel shadows and calm the shrieking terror within."
  },
  {
    "id": "spell-binding",
    "name": "Binding",
    "type": "spell",
    "cost": 2,
    "effectText": "Ritual Spell: Test Lore -1.\nOn pass, choose a Monster on your space; that Monster cannot deal damage to investigators this round.",
    "flavorText": "Invisible occult chains hold the entity rigid against the earth."
  },
  {
    "id": "spell-body-shield",
    "name": "Body Shield",
    "type": "spell",
    "cost": 2,
    "effectText": "Incantation Spell: When you would suffer physical damage, test Lore.\nPrevent 1 damage for each success rolled.",
    "flavorText": "A hardened translucent barrier of arcane force deflects talons and projectile fire."
  },
  {
    "id": "spell-spectral-razer",
    "name": "Spectral Razer",
    "type": "spell",
    "cost": 3,
    "combatBonus": {
      "skill": "lore",
      "amount": 4
    },
    "rerollsGranted": {
      "skill": "lore",
      "amount": 1,
      "description": "Reroll 1 die when attacking with Spectral Razer.",
      "isCombatOnly": true
    },
    "effectText": "Combat Spell: Gain +4 Lore during Combat Encounters.\nYou may reroll 1 die when attacking with this spell.",
    "flavorText": "Blades of razor psychic energy slice through dimensional folds."
  },
  {
    "id": "spell-storm-of-the-soul",
    "name": "Storm of the Soul",
    "type": "spell",
    "cost": 3,
    "combatBonus": {
      "skill": "lore",
      "amount": 4
    },
    "effectText": "Ritual Spell: Test Lore -2.\nOn pass, deal 3 damage to every Monster on your space.",
    "flavorText": "A tempest of psychic resonance shatters monstrous consciousness."
  },
  {
    "id": "spell-voice-of-ra",
    "name": "Voice of Ra",
    "type": "spell",
    "cost": 2,
    "effectText": "Glamour Spell: Pay 1 Sanity to add +1 to the result of every die rolled on your next test.\nReckoning: Test Lore; on fail, discard this card.",
    "flavorText": "Sunlit glory echoes through your spoken commands, bending reality."
  },
  {
    "id": "spell-astral-travel",
    "name": "Astral Travel",
    "type": "spell",
    "cost": 2,
    "effectText": "Ritual Spell: Test Lore.\nOn pass, you may instantly move to any space containing a Gate or a Clue token.",
    "flavorText": "Your spirit detaches from flesh and traverses the astral slipstreams."
  },
  {
    "id": "spell-poison-mist",
    "name": "Poison Mist",
    "type": "spell",
    "cost": 2,
    "effectText": "Ritual Spell: Test Lore -1.\nOn pass, all Monsters on your space lose 1 toughness.",
    "flavorText": "Emerald vapors seep along the ground, dissolving unnatural physiology."
  },
  {
    "id": "spell-mystical-insight",
    "name": "Mystical Insight",
    "type": "spell",
    "cost": 2,
    "effectText": "Incantation Spell: Test Lore.\nOn pass, gain 1 Clue and 1 Focus token.",
    "flavorText": "Veiled truths of the cosmos align into clear crystalline understanding."
  },
  {
    "id": "fl-bind-monster",
    "name": "Bind Monster",
    "type": "spell",
    "expansion": "fl",
    "cost": 2,
    "effectText": "Action: Test Lore -1. On pass, exhaust 1 Non-Epic Monster on your space; that monster cannot attack this round.",
    "flavorText": "Chants that tie spectral ropes around eldritch jaws and tendrils."
  },
  {
    "id": "sr-glamour-spell",
    "name": "Glamour of Youth",
    "type": "spell",
    "expansion": "sr",
    "cost": 2,
    "statBonus": {
      "skill": "influence",
      "amount": 2
    },
    "effectText": "Gain +2 Influence.\nWhen acquiring assets, you may reroll up to 2 dice.",
    "flavorText": "Whispered incantations masking the signs of fatigue, madness, and advancing decay."
  },
  {
    "id": "soc-song-of-cassilda",
    "name": "Song of Cassilda",
    "type": "spell",
    "expansion": "soc",
    "cost": 3,
    "combatBonus": {
      "skill": "lore",
      "amount": 4
    },
    "effectText": "Gain +4 Lore in Combat.\nIf you pass by 2 or more successes, the target Monster is immediately discarded.",
    "flavorText": "Chords that echo across Lake Hali beneath twin black suns."
  },
  {
    "id": "mists-of-releh",
    "name": "Mists of Releh",
    "type": "spell",
    "cost": 1,
    "statBonus": {
      "skill": "observation",
      "amount": 1
    },
    "effectText": "Lore test: Move through or evade Monsters on your space without encountering them.",
    "flavorText": "A dense silvery fog billows from the floor, blinding enemies and veiling footsteps."
  },
  {
    "id": "flesh-ward",
    "name": "Flesh Ward",
    "type": "spell",
    "cost": 2,
    "effectText": "Lore test: When you or an investigator on your space would lose Health, prevent up to 2 Health loss.",
    "flavorText": "An invisible barrier of pressurized eldritch energy deadens impacts and turns bladed weapons."
  },
  {
    "id": "spell-shriveling",
    "name": "Shriveling",
    "type": "spell",
    "cost": 2,
    "combatBonus": {
      "skill": "strength",
      "amount": 3
    },
    "effectText": "Lore test: Gain +3 Strength during a Combat Encounter.",
    "flavorText": "Black lightning shoots from your outstretched fingers, withering muscle and bone to dust."
  },
  {
    "id": "inner-strength",
    "name": "Inner Strength",
    "type": "spell",
    "cost": 1,
    "statBonus": {
      "skill": "will",
      "amount": 1
    },
    "effectText": "Lore test: Recover 1 Health and gain +2 Strength until end of turn.",
    "flavorText": "Channeled chi calms the beating heart, knitting flesh and steadying trembling limbs."
  },
  {
    "id": "feed-the-mind",
    "name": "Feed the Mind",
    "type": "spell",
    "cost": 2,
    "effectText": "Lore test: Gain 1 Clue token or improve 1 skill of choice; lose 1 Sanity if you fail.",
    "flavorText": "Opening your consciousness to cosmic transmissions, absorbing secrets not meant for mortals."
  },
  {
    "id": "storm-of-spirits",
    "name": "Storm of Spirits",
    "type": "spell",
    "cost": 2,
    "combatBonus": {
      "skill": "strength",
      "amount": 4
    },
    "effectText": "Lore test: Deal 4 damage to a Monster or divide among monsters on your space.",
    "flavorText": "Howling ethereal phantoms descend from the vortex, tearing at physical and spectral foes."
  },
  {
    "id": "arcane-insight",
    "name": "Arcane Insight",
    "type": "spell",
    "cost": 1,
    "effectText": "Lore test: Roll 2 additional dice when resolving Research Encounters.",
    "flavorText": "Hidden patterns emerge from faded inks, revealing truths long veiled from the eyes of man."
  },
  {
    "id": "banishment",
    "name": "Banishment",
    "type": "spell",
    "cost": 2,
    "effectText": "Lore test: Return 1 non-Epic Monster on your space to the monster cup.",
    "flavorText": "Speaking ancient sumerian words of castigation, opening an abyss that swallows the fiend."
  },
  {
    "id": "find-gate",
    "name": "Find Gate",
    "type": "spell",
    "cost": 1,
    "effectText": "Lore test: Immediately move to any space on the game board containing a Gate.",
    "flavorText": "Following gravitational ripples in spacetime directly toward active dimensional tears."
  },
  {
    "id": "call-the-storm",
    "name": "Call the Storm",
    "type": "spell",
    "cost": 2,
    "combatBonus": {
      "skill": "strength",
      "amount": 3
    },
    "effectText": "Lore test: Deal 3 damage to all Monsters on your space.",
    "flavorText": "Thunderclouds coalesce in moments, discharging blinding bolts of ozone-scented fury."
  },
  {
    "id": "instill-bravery",
    "name": "Instill Bravery",
    "type": "spell",
    "cost": 1,
    "effectText": "Lore test: Restore 2 Sanity to an investigator on your space and remove 1 Terror or Madness condition.",
    "flavorText": "A soothing resonant intonation that dispels terror and re-anchors fractured minds."
  },
  {
    "id": "condition-blessed",
    "name": "Blessed",
    "type": "condition",
    "effectText": "When rolling dice, a result of 4, 5, or 6 is a success (instead of only 5 or 6).\nReckoning: Roll 1 die; on a 1, discard this card.\nCannot have Cursed while Blessed.",
    "flavorText": "A warm aura of divine protection shields you from dread and guides your hand."
  },
  {
    "id": "condition-cursed",
    "name": "Cursed",
    "type": "condition",
    "effectText": "When rolling dice, ONLY a result of 6 is a success (instead of 5 or 6).\nReckoning: Roll 1 die; on a 6, discard this card.\nCannot have Blessed while Cursed.",
    "flavorText": "The gaze of the ancient abyss weighs heavily upon your fate. Misfortune dog your heels."
  },
  {
    "id": "condition-leg-injury",
    "name": "Leg Injury",
    "type": "condition",
    "statBonus": {
      "skill": "strength",
      "amount": -1,
      "condition": "Leg Injury"
    },
    "effectText": "You cannot perform the Travel action without spending a Ticket.\nReduce Strength by 1.",
    "flavorText": "A deep fracture that throbs with agony every step you take."
  },
  {
    "id": "condition-back-injury",
    "name": "Back Injury",
    "type": "condition",
    "statBonus": {
      "skill": "strength",
      "amount": -1,
      "condition": "Back Injury"
    },
    "effectText": "Reduce Strength by 1.\nYou cannot carry more than 4 Item or Weapon cards.",
    "flavorText": "Severe spinal strain that buckles under heavy baggage or strenuous effort."
  },
  {
    "id": "condition-head-injury",
    "name": "Head Injury",
    "type": "condition",
    "statBonus": {
      "skill": "lore",
      "amount": -1,
      "condition": "Head Injury"
    },
    "effectText": "Reduce Lore by 1.\nWhenever you cast a Spell, suffer 1 Sanity damage.",
    "flavorText": "Concussion and blurred vision make deciphering eldritch texts excruciating."
  },
  {
    "id": "condition-internal-injury",
    "name": "Internal Injury",
    "type": "condition",
    "effectText": "Your maximum Health is reduced by 1.\nReckoning: Test Strength; on failure, suffer 1 damage.",
    "flavorText": "Bruised ribs and internal bleeding that flare into sudden agony."
  },
  {
    "id": "condition-amnesia",
    "name": "Amnesia",
    "type": "condition",
    "statBonus": {
      "skill": "lore",
      "amount": -1,
      "condition": "Amnesia"
    },
    "effectText": "Reduce Lore and Observation by 1.\nYou cannot spend Clue tokens to add dice to tests until cured.",
    "flavorText": "Who are you? How did you arrive here? Memories slip through your fingers like water."
  },
  {
    "id": "condition-hallucination",
    "name": "Hallucination",
    "type": "condition",
    "statBonus": {
      "skill": "will",
      "amount": -1,
      "condition": "Hallucination"
    },
    "effectText": "Reduce Will by 1.\nYou cannot perform the Rest action while any other investigator is on your space.",
    "flavorText": "Familiar faces twist into slavering maws in the corners of your vision."
  },
  {
    "id": "condition-paranoia",
    "name": "Paranoia",
    "type": "condition",
    "effectText": "You cannot Trade with or receive assistance from other investigators.\nReckoning: Suffer 1 Sanity damage if with another investigator.",
    "flavorText": "They are watching. They are conspiring. Even your closest allies have been replaced."
  },
  {
    "id": "condition-dark-pact",
    "name": "Dark Pact",
    "type": "condition",
    "effectText": "Deal: You made a covenant with dark entities for immediate power.\nReckoning: Roll 1 die; on a 1, flip this card and face the ultimate price.",
    "flavorText": "The ink on the parchment was red. The signatory was not human."
  },
  {
    "id": "condition-debt",
    "name": "Debt",
    "type": "condition",
    "effectText": "Deal: You owe dangerous syndicates or loan sharks.\nReckoning: Roll 1 die; on a 1 or 2, pay 2 Resources or discard 1 Item possession; if you cannot, suffer an Injury.",
    "flavorText": "Hard-faced men in heavy coats are waiting at every train depot and hotel lobby."
  },
  {
    "id": "condition-poisoned",
    "name": "Poisoned",
    "type": "condition",
    "effectText": "Illness: At the start of your turn, suffer 1 Health damage unless you spend 1 Focus or pass a Strength test.",
    "flavorText": "Venom burns in your veins, turning lips pale and breath ragged."
  },
  {
    "id": "condition-hypothermia",
    "name": "Hypothermia",
    "type": "condition",
    "effectText": "Exposure: When ending your turn on a Wilderness or Sea space, suffer 1 Health damage and 1 Sanity damage.",
    "flavorText": "Numb extremities and unrelenting frost leach your soul."
  },
  {
    "id": "condition-wanted",
    "name": "Wanted",
    "type": "condition",
    "effectText": "Pursuit: You cannot perform Acquire Assets in City spaces.\nWhen entering a City space, test Influence; on failure, become Delayed.",
    "flavorText": "Your photograph is pinned to every post office wall and police station bulletin."
  },
  {
    "id": "mom-frostbite",
    "name": "Frostbite",
    "type": "condition",
    "expansion": "mom",
    "effectText": "Exposure: Suffer -1 to Strength and Dexterity checks. Suffer 1 Health damage whenever you fail an athletic test.",
    "flavorText": "Blackened, dead skin on fingers and toes that burns with chilling agony."
  },
  {
    "id": "soc-lost-in-carcosa",
    "name": "Lost in Carcosa",
    "type": "condition",
    "expansion": "soc",
    "effectText": "Madness: You cannot move voluntarily. At the start of your turn, test Will -1. On pass, discard this card; on failure, suffer 1 Sanity.",
    "flavorText": "The towers of Carcosa loom through the fog. The lake is still. The stars are black."
  },
  {
    "id": "condition-elusive",
    "name": "Elusive",
    "type": "condition",
    "effectText": "Talent: You do not need to encounter Monsters when moving through or leaving a space.",
    "flavorText": "Slender and quiet, slipping through shadows without drawing hungry gazes."
  },
  {
    "id": "condition-quick-study",
    "name": "Quick Study",
    "type": "condition",
    "effectText": "Talent: Whenever you improve a skill, you may improve a second different skill of choice.",
    "flavorText": "An voracious intellect that connects disparate disciplines in a heartbeat."
  },
  {
    "id": "condition-composed",
    "name": "Composed",
    "type": "condition",
    "effectText": "Talent: You cannot gain Paranoia or Hallucination conditions. When you Rest, recover 1 additional Sanity.",
    "flavorText": "Clinical medical detachment providing an impenetrable psychological bulwark."
  },
  {
    "id": "condition-rugged",
    "name": "Rugged",
    "type": "condition",
    "effectText": "Talent: You cannot gain Leg Injury or Back Injury conditions. When you Rest, recover 1 additional Health.",
    "flavorText": "Endurance runner physique accustomed to pushing through agony and bone-deep fatigue."
  },
  {
    "id": "condition-corruption",
    "name": "Corruption",
    "type": "condition",
    "effectText": "A dark taint eats at your soul. Roll 1 additional die on dark pact tests, but risk losing your humanity.",
    "flavorText": "Twisted black veins spread outward from the heart, whispering seductive cosmic blasphemies."
  },
  {
    "id": "condition-headstrong",
    "name": "Headstrong",
    "type": "condition",
    "effectText": "Talent: You cannot gain Amnesia. You may reroll 1 die on Will tests.",
    "flavorText": "Stubborn resilience that refuses to bend before supernatural intimidation."
  }
];
