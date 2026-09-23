import { PossessionCard } from '../types';

export const OFFICIAL_SPELLS: PossessionCard[] = [
  // =========================================================================
  // INCANTATIONS (12 Spells)
  // =========================================================================
  {
    id: "spell-clairvoyance",
    name: "Clairvoyance",
    type: "spell",
    category: "Spell — Incantation",
    expansion: "core",
    traits: ["Incantation"],
    cost: 2,
    effectText: "During the Encounter Phase, you may test Lore. If you pass, you may choose to encounter a Clue as if you are on its space, ignoring Monsters on that space.\nThen flip this card.",
    flavorText: "Your third eye opens across the gulf of time and cosmic geometry."
  },
  {
    id: "spell-flesh-ward",
    name: "Flesh Ward",
    type: "spell",
    category: "Spell — Incantation",
    expansion: "core",
    traits: ["Incantation"],
    cost: 2,
    effectText: "Once per round, when an investigator would lose Health, you may test Lore. If you pass, prevent that investigator from losing up to 2 Health.\nThen flip this card.",
    flavorText: "An invisible barrier of pressurized eldritch energy deadens impacts and turns bladed weapons."
  },
  {
    id: "spell-instill-bravery",
    name: "Instill Bravery",
    type: "spell",
    category: "Spell — Incantation",
    expansion: "core",
    traits: ["Incantation"],
    cost: 1,
    effectText: "Once per round, when an investigator would lose Sanity, you may test Lore. If you pass, prevent that investigator from losing up to 2 Sanity.\nThen flip this card.",
    flavorText: "A soothing resonant intonation that dispels terror and re-anchors fractured minds."
  },
  {
    id: "spell-mists-of-releh",
    name: "Mists of Releh",
    type: "spell",
    category: "Spell — Incantation",
    expansion: "core",
    traits: ["Incantation"],
    cost: 1,
    effectText: "During the Encounter Phase, you may test Lore. If you pass, you may choose an encounter as if there are no Monsters on your space.\nThen flip this card.",
    flavorText: "A dense silvery fog billows from the floor, blinding enemies and veiling footsteps."
  },
  {
    id: "spell-wither",
    name: "Wither",
    type: "spell",
    category: "Spell — Incantation",
    expansion: "core",
    traits: ["Incantation"],
    cost: 2,
    combatBonus: {
      skill: "strength",
      amount: 3
    },
    effectText: "When resolving a Combat Encounter, you may test Lore. If you pass, gain +3 Strength during that encounter.\nThen flip this card.",
    flavorText: "A blackened invocation that drains the vitality of alien flesh."
  },
  {
    id: "spell-healing-words",
    name: "Healing Words",
    type: "spell",
    category: "Spell — Incantation",
    expansion: "fl",
    traits: ["Incantation"],
    cost: 2,
    effectText: "When an investigator on your space performs a Rest action, you may test Lore. If you pass, that investigator recovers 1 additional Health and 1 additional Sanity.\nThen flip this card.",
    flavorText: "Syllables of primordial renewal knit muscle and mend broken bone."
  },
  {
    id: "spell-intervene",
    name: "Intervene",
    type: "spell",
    category: "Spell — Incantation",
    expansion: "mom",
    traits: ["Incantation"],
    cost: 2,
    combatBonus: {
      skill: "strength",
      amount: 3
    },
    effectText: "When another investigator resolves a Combat Encounter, you may test Lore. If you pass, that investigator gains +3 Strength during this encounter.\nThen flip this card.",
    flavorText: "Projecting ethereal force across physical space to deflect a monstrosity's swipe."
  },
  {
    id: "spell-storm-of-spirits",
    name: "Storm of Spirits",
    type: "spell",
    category: "Spell — Incantation",
    expansion: "mom",
    traits: ["Incantation"],
    cost: 2,
    effectText: "When resolving a Combat Encounter, you may resolve a Lore test in place of a Strength test, using the same test modifier.\nThen flip this card.",
    flavorText: "Howling ethereal phantoms descend from the vortex, tearing at physical and spectral foes."
  },
  {
    id: "spell-wrack",
    name: "Wrack",
    type: "spell",
    category: "Spell — Incantation",
    expansion: "utp",
    traits: ["Incantation"],
    cost: 2,
    combatBonus: {
      skill: "strength",
      amount: 5
    },
    effectText: "When resolving a Combat Encounter, you may test Lore-1. If you pass, gain +5 Strength during that encounter.\nThen flip this card.",
    flavorText: "Unnatural spasms shatter joints and crack carapace with sickening resonance."
  },
  {
    id: "spell-binding",
    name: "Binding",
    type: "spell",
    category: "Spell — Incantation",
    expansion: "soc",
    traits: ["Incantation"],
    cost: 2,
    effectText: "When you or another investigator on any space resolves a Combat Encounter, you may test Lore. If you pass, reduce that Monster's damage to 1 during that encounter.\nThen flip this card.",
    flavorText: "Invisible occult chains hold the entity rigid against the earth."
  },
  {
    id: "spell-dread-curse",
    name: "Dread Curse",
    type: "spell",
    category: "Spell — Incantation",
    expansion: "td",
    traits: ["Incantation"],
    cost: 3,
    combatBonus: {
      skill: "strength",
      amount: 8
    },
    effectText: "When resolving a Combat Encounter, you may test Lore-2. If you pass, gain +8 Strength during that encounter.\nThen flip this card.",
    flavorText: "Pronouncing the forbidden syllables of elder doom that tear through cosmic fabric."
  },
  {
    id: "spell-spectral-razor",
    name: "Spectral Razor",
    type: "spell",
    category: "Spell — Incantation",
    expansion: "cir",
    traits: ["Incantation"],
    cost: 2,
    effectText: "When resolving a Combat Encounter, you may test Lore. If you pass, roll 1 additional die when resolving the Strength test during that encounter.\nThen flip this card.",
    flavorText: "Blades of razor psychic energy slice through dimensional folds."
  },

  // =========================================================================
  // RITUALS (12 Spells)
  // =========================================================================
  {
    id: "spell-blessing-of-isis",
    name: "Blessing of Isis",
    type: "spell",
    category: "Spell — Ritual",
    expansion: "core",
    traits: ["Ritual"],
    cost: 2,
    effectText: "Action: Test Lore-1. If you pass, choose an investigator on your space that does not have a Blessed Condition to gain a Blessed Condition.\nThen flip this card.",
    flavorText: "A sacred Egyptian benediction invoking the queen of deities."
  },
  {
    id: "spell-conjuration",
    name: "Conjuration",
    type: "spell",
    category: "Spell — Ritual",
    expansion: "core",
    traits: ["Ritual"],
    cost: 2,
    effectText: "Action: Test Lore+1. If you pass, you may gain 1 Item or Trinket Asset from the reserve with value equal to or less than your test result.\nThen flip this card.",
    flavorText: "Drawing forth physical artifacts from unseen ethereal storehouses."
  },
  {
    id: "spell-feed-the-mind",
    name: "Feed the Mind",
    type: "spell",
    category: "Spell — Ritual",
    expansion: "core",
    traits: ["Ritual"],
    cost: 2,
    effectText: "Action: Test Lore-1. If you pass, choose an investigator on your space to improve 1 skill of his choice.\nThen flip this card.",
    flavorText: "Opening your consciousness to cosmic transmissions, absorbing secrets not meant for mortals."
  },
  {
    id: "spell-plumb-the-void",
    name: "Plumb the Void",
    type: "spell",
    category: "Spell — Ritual",
    expansion: "core",
    traits: ["Ritual"],
    cost: 2,
    effectText: "Action: Test Lore-1. If you pass, an investigator of your choice may move to any space.\nThen flip this card.",
    flavorText: "Folding the fabric of distance through uncharted interdimensional abysses."
  },
  {
    id: "spell-shriveling",
    name: "Shriveling",
    type: "spell",
    category: "Spell — Ritual",
    expansion: "core",
    traits: ["Ritual"],
    cost: 2,
    effectText: "Action: Test Lore. If you pass, choose a Monster on your space to lose 2 Health.\nThen flip this card.",
    flavorText: "Black lightning shoots from your outstretched fingers, withering muscle and bone to dust."
  },
  {
    id: "spell-poison-mist",
    name: "Poison Mist",
    type: "spell",
    category: "Spell — Ritual",
    expansion: "fl",
    traits: ["Ritual"],
    cost: 2,
    effectText: "Action: Test Lore+1. If you pass, discard Monsters from your space with total toughness equal to or less than your test result.\nThen flip this card.",
    flavorText: "Emerald vapors seep along the ground, dissolving unnatural physiology."
  },
  {
    id: "spell-arcane-insight",
    name: "Arcane Insight",
    type: "spell",
    category: "Spell — Ritual",
    expansion: "mom",
    traits: ["Ritual"],
    cost: 2,
    effectText: "Action: Choose yourself or another investigator on any space and test Lore-2; roll 1 additional die for each Tome possession you have. If you pass, that investigator gains 1 Clue.\nThen flip this card.",
    flavorText: "Hidden patterns emerge from faded inks, revealing truths long veiled from the eyes of man."
  },
  {
    id: "spell-banishment",
    name: "Banishment",
    type: "spell",
    category: "Spell — Ritual",
    expansion: "mom",
    traits: ["Ritual"],
    cost: 2,
    effectText: "Action: Test Lore+2. If you pass, discard 1 Monster on the nearest space containing a Gate with toughness equal to or less than your test result.\nThen flip this card.",
    flavorText: "Speaking ancient sumerian words of castigation, opening an abyss that swallows the fiend."
  },
  {
    id: "spell-summon-byakhee",
    name: "Summon Byakhee",
    type: "spell",
    category: "Spell — Ritual",
    expansion: "soc",
    traits: ["Ritual"],
    cost: 2,
    effectText: "Action: Test Lore. If you pass, move to a space of your choice within 2 spaces.\nThen flip this card.",
    flavorText: "A whistle made of human bone calls interstellar steeds down from the vacuum."
  },
  {
    id: "spell-summoning",
    name: "Summoning",
    type: "spell",
    category: "Spell — Ritual",
    expansion: "td",
    traits: ["Ritual"],
    cost: 2,
    effectText: "Action: Test Lore+2. If you pass, you may move 1 Monster of your choice with toughness equal to or less than your test result to your space.\nThen flip this card.",
    flavorText: "Drawing beasts into your perimeter where trapped defenses lie in waiting."
  },
  {
    id: "spell-occult-exaltation",
    name: "Occult Exaltation",
    type: "spell",
    category: "Spell — Ritual",
    expansion: "cir",
    traits: ["Ritual"],
    cost: 2,
    effectText: "Action: Choose yourself or another investigator on your space and test Lore. If you pass, the chosen investigator gains 1 Talent Condition.\nThen flip this card.",
    flavorText: "Chanting in unrecorded dialects to awaken latent psychic faculties."
  },
  {
    id: "spell-call-the-storm",
    name: "Call the Storm",
    type: "spell",
    category: "Spell — Ritual",
    expansion: "mon",
    traits: ["Ritual"],
    cost: 2,
    effectText: "Action: Choose a Monster on your space and test Lore-1. If you pass, the chosen Monster loses 3 Health.\nThen flip this card.",
    flavorText: "Thunderclouds coalesce in moments, discharging blinding bolts of ozone-scented fury."
  },

  // =========================================================================
  // GLAMOURS (12 Spells)
  // =========================================================================
  {
    id: "spell-astral-travel",
    name: "Astral Travel",
    type: "spell",
    category: "Spell — Glamour",
    expansion: "sr",
    traits: ["Glamour"],
    cost: 2,
    effectText: "When you perform a Travel action you may spend 1 Sanity to move 1 additional space along any path.\nReckoning: Test Lore and flip this card.",
    flavorText: "Your spirit detaches from flesh and traverses the astral slipstreams."
  },
  {
    id: "spell-azure-flame",
    name: "Azure Flame",
    type: "spell",
    category: "Spell — Glamour",
    expansion: "sr",
    traits: ["Glamour"],
    cost: 2,
    effectText: "Each 6 you roll when resolving a Strength test during a Combat Encounter counts as 2 successes.\nReckoning: Test Lore and flip this card.",
    flavorText: "Cerulean fire envelopes your strikes with blistering spiritual intensity."
  },
  {
    id: "spell-markings-of-isis",
    name: "Markings of Isis",
    type: "spell",
    category: "Spell — Glamour",
    expansion: "sr",
    traits: ["Glamour"],
    cost: 3,
    statBonus: {
      skill: "lore",
      amount: 1,
      condition: "All Skills +1"
    },
    effectText: "Gain +1 to all skills.\nOnce per round, you may reroll 1 die when resolving a test.\nReckoning: Test Lore-1 and flip this card.",
    flavorText: "Golden hieroglyphs etched across the skin gleam with timeless divine authority."
  },
  {
    id: "spell-voice-of-ra",
    name: "Voice of Ra",
    type: "spell",
    category: "Spell — Glamour",
    expansion: "sr",
    traits: ["Glamour"],
    cost: 2,
    effectText: "Once per round, during the Action Phase, you may spend 1 Health and 1 Sanity to perform 1 additional action.\nReckoning: Test Lore and flip this card.",
    flavorText: "Sunlit glory echoes through your spoken commands, bending reality."
  },
  {
    id: "spell-alter-fate",
    name: "Alter Fate",
    type: "spell",
    category: "Spell — Glamour",
    expansion: "utp",
    traits: ["Glamour"],
    cost: 2,
    effectText: "You may trade Conditions, Focus, Improvement tokens, and Impairment tokens as part of a Trade action.\nReckoning: Test Lore and flip this card.",
    flavorText: "Shifting the karmic threads connecting human souls across the tapestry."
  },
  {
    id: "spell-enchant-weapon",
    name: "Enchant Weapon",
    type: "spell",
    category: "Spell — Glamour",
    expansion: "utp",
    traits: ["Glamour"],
    cost: 2,
    rerollsGranted: {
      amount: 2,
      skill: "strength",
      description: "You may reroll up to 2 dice when resolving a Strength test during a Combat Encounter.",
      isCombatOnly: true
    },
    effectText: "Monsters you encounter lose Physical Resistance.\nYou may reroll up to 2 dice when resolving a Strength test during a Combat Encounter.\nReckoning: Test Lore and flip this card.",
    flavorText: "Runes inscribed along cold steel burn white-hot against elder abominations."
  },
  {
    id: "spell-enchanting-grace",
    name: "Enchanting Grace",
    type: "spell",
    category: "Spell — Glamour",
    expansion: "utp",
    traits: ["Glamour"],
    cost: 2,
    effectText: "Once per round, when you would lose Health, prevent 2 of that Health loss.\nReckoning: Test Lore and flip this card.",
    flavorText: "A shimmering illusion deflects mortal blows into empty air."
  },
  {
    id: "spell-forced-learning",
    name: "Forced Learning",
    type: "spell",
    category: "Spell — Glamour",
    expansion: "utp",
    traits: ["Glamour"],
    cost: 2,
    effectText: "Once per round, when you improve a skill, improve that skill again.\nReckoning: Test Lore and flip this card.",
    flavorText: "Accelerating the mind beyond mortal limits, grasping impossible disciplines instantly."
  },
  {
    id: "spell-shroud-of-shadow",
    name: "Shroud of Shadow",
    type: "spell",
    category: "Spell — Glamour",
    expansion: "utp",
    traits: ["Glamour"],
    cost: 2,
    effectText: "During the Encounter Phase, you may choose an encounter as if there are no Monsters on your space.\nReckoning: Test Lore-1 and flip this card.",
    flavorText: "Shadows envelop your form, concealing you completely from predatory gaze."
  },
  {
    id: "spell-minds-eye",
    name: "Mind's Eye",
    type: "spell",
    category: "Spell — Glamour",
    expansion: "soc",
    traits: ["Glamour"],
    cost: 2,
    effectText: "You may reroll 1 die when resolving an Influence or Will test.\nReckoning: Test Lore and flip this card.",
    flavorText: "Clairvoyant perception unravels falsehoods and fortifies the resolve."
  },
  {
    id: "spell-find-gate",
    name: "Find Gate",
    type: "spell",
    category: "Spell — Glamour",
    expansion: "td",
    traits: ["Glamour"],
    cost: 2,
    effectText: "Play with the top Gate of the Gate stack revealed.\nReckoning: Test Lore and flip this card.",
    flavorText: "Following gravitational ripples in spacetime directly toward active dimensional tears."
  },
  {
    id: "spell-beast-within",
    name: "Beast Within",
    type: "spell",
    category: "Spell — Glamour",
    expansion: "cir",
    traits: ["Glamour"],
    cost: 2,
    effectText: "You may reroll 1 die when resolving an Observation or Strength test.\nReckoning: Test Lore and flip this card.",
    flavorText: "Awakening predatory instinct, sensory acuity, and animal vigor."
  }
];
