import { SkillType } from '../types';

export interface StoryBonusResult {
  message: string;
  applied: boolean;
}

export interface StoryApplierParams {
  investigatorId: string;
  updateHealth: (delta: number) => void;
  updateSanity: (delta: number) => void;
  updateSkillModifier: (skill: SkillType, delta: number) => void;
  updateToken: (tokenType: 'focus' | 'resources' | 'clues' | 'trainTickets' | 'shipTickets' | 'eldritch', delta: number) => void;
}

/**
 * Applies automated mechanical stat bonuses/tokens for passing a personal story.
 * Covers all 55 official Eldritch Horror investigators with personal stories.
 */
export function applyStoryReward(params: StoryApplierParams): StoryBonusResult {
  const { investigatorId, updateHealth, updateSanity, updateSkillModifier, updateToken } = params;

  switch (investigatorId) {
    // Core Game
    case 'akachi-onyele':
      updateSkillModifier('lore', 1);
      updateSkillModifier('will', 1);
      return { applied: true, message: '+1 Lore and +1 Will applied!' };

    case 'charlie-kane':
      updateSkillModifier('influence', 1);
      updateSkillModifier('will', 1);
      return { applied: true, message: '+1 Influence and +1 Will applied!' };

    case 'diana-stanley':
      updateToken('focus', 1);
      return { applied: true, message: '+1 Focus gained! (Remember to retreat Doom by 1 on the Doom track).' };

    case 'jacqueline-fine':
      updateToken('clues', 1);
      return { applied: true, message: '+1 Clue gained!' };

    case 'jim-culver':
      updateToken('focus', 1);
      updateSanity(1);
      return { applied: true, message: '+1 Focus and +1 Sanity applied!' };

    case 'leo-anderson':
      return { applied: true, message: 'Reward active! Gain 1 Character Unique Asset from deck.' };

    case 'lily-chen':
      updateHealth(1);
      updateSanity(1);
      return { applied: true, message: '+1 Health and +1 Sanity recovered!' };

    case 'lola-hayes':
      // Lola Hayes: improve 2 skills of choice -> default Lore + Influence
      updateSkillModifier('lore', 1);
      updateSkillModifier('influence', 1);
      return { applied: true, message: '+1 Lore and +1 Influence improved (or adjust skills of your choice)!' };

    case 'mark-harrigan':
      updateSanity(2);
      return { applied: true, message: '+2 Sanity recovered! Max Sanity also increased by 2.' };

    case 'norman-withers':
      return { applied: true, message: 'Reward active! Move Omen to any space of track without advancing Doom.' };

    case 'silas-marsh':
      updateToken('focus', 1);
      return { applied: true, message: '+1 Focus gained (or recover 1 Sanity)!' };

    case 'trish-scarborough':
      updateToken('focus', 1);
      return { applied: true, message: '+1 Focus gained! (Remember +X to all skills where X is Focus count).' };

    // Forsaken Lore
    case 'agnes-baker':
      updateSkillModifier('lore', 1);
      updateSkillModifier('will', 1);
      return { applied: true, message: '+1 Lore and +1 Will improved!' };

    // Mountains of Madness
    case 'daisy-walker':
      return { applied: true, message: 'Reward active! Gain 2 Tome Artifacts from deck and discard 1.' };

    case 'finn-edwards':
      return { applied: true, message: 'Reward active! You/companion may perform an additional Trade or Travel action.' };

    case 'george-barnaby':
      updateHealth(2);
      return { applied: true, message: '+2 Health recovered! Max Health also increased by 2 (advance active Mystery by 1).' };

    case 'patrice-hathaway':
      updateToken('clues', 1);
      return { applied: true, message: '+1 Clue gained!' };

    case 'tommy-muldoon':
      updateSkillModifier('strength', 1);
      updateSkillModifier('will', 1);
      return { applied: true, message: '+1 Strength and +1 Will improved!' };

    case 'ursula-downs':
      updateToken('focus', 1);
      return { applied: true, message: '+1 Focus gained! (Gain Jake Williams Unique Asset from deck).' };

    case 'wilson-richards':
      updateToken('resources', 1);
      updateToken('focus', 1);
      return { applied: true, message: '+1 Resource and +1 Focus gained!' };

    // Strange Remnants
    case 'marie-lambeau':
      return { applied: true, message: 'Reward active! Retreat Doom by 1.' };

    case 'skids-otoole':
      return { applied: true, message: 'Reward active: Whenever you roll a 2 during a test, you may reroll that die.' };

    case 'tony-morgan':
      updateToken('resources', 1);
      return { applied: true, message: '+1 Resource gained!' };

    case 'zoey-samaras':
      return { applied: true, message: 'Reward active! Gain 2 Task Unique Assets from deck and discard 1.' };

    // Under the Pyramids
    case 'hank-samson':
      updateSkillModifier('lore', 1);
      updateSkillModifier('influence', 1);
      return { applied: true, message: '+1 Lore and +1 Influence improved!' };

    case 'harvey-walters':
      updateSkillModifier('lore', 1);
      updateSkillModifier('observation', 1);
      return { applied: true, message: '+1 Lore and +1 Observation improved (or adjust 2 skills of choice)!' };

    case 'joe-diamond':
      updateSkillModifier('observation', 1);
      updateSkillModifier('strength', 1);
      return { applied: true, message: '+1 Observation and +1 Strength improved (or adjust 2 skills of choice)!' };

    case 'mandy-thompson':
      updateToken('clues', 3);
      return { applied: true, message: '+3 Clues spawned/gained!' };

    case 'minh-thi-phan':
      return { applied: true, message: 'Reward active! Gain 1 Character Unique Asset from deck.' };

    case 'monterey-jack':
      updateToken('clues', 1);
      return { applied: true, message: '+1 Clue gained! Gain 1 Artifact from deck.' };

    case 'rex-murphy':
      updateToken('clues', 1);
      updateSkillModifier('observation', 1);
      return { applied: true, message: '+1 Clue gained and +1 Observation improved! (Discard Cursed Condition).' };

    case 'sister-mary':
      updateSkillModifier('influence', 1);
      updateSkillModifier('will', 1);
      return { applied: true, message: '+1 Influence and +1 Will improved!' };

    // Signs of Carcosa
    case 'dexter-drake':
      return { applied: true, message: 'Reward active! Gain 2 Ritual Spells from deck.' };

    case 'jenny-barnes':
      updateSkillModifier('observation', 1);
      updateSkillModifier('will', 1);
      return { applied: true, message: '+1 Observation and +1 Will improved!' };

    case 'michael-mcglen':
      updateSanity(2);
      updateSkillModifier('strength', 1);
      updateSkillModifier('will', 1);
      return { applied: true, message: '+2 Sanity recovered! +1 Strength & +1 Will improved (Max Sanity +2).' };

    case 'wendy-adams':
      return { applied: true, message: 'Reward active! Mythos card text effects cannot cause you to lose Health or Sanity.' };

    // The Dreamlands
    case 'amanda-sharpe':
      updateSkillModifier('lore', 1);
      updateSkillModifier('observation', 1);
      return { applied: true, message: '+1 Lore and +1 Observation improved!' };

    case 'carolyn-fern':
      updateSkillModifier('lore', 1);
      updateSkillModifier('will', 1);
      updateToken('clues', 1);
      return { applied: true, message: '+1 Lore, +1 Will improved, and +1 Clue gained!' };

    case 'darrell-simmons':
      updateToken('clues', 3);
      return { applied: true, message: '+3 Clues gained!' };

    case 'gloria-goldberg':
      updateSanity(1);
      updateToken('focus', 1);
      return { applied: true, message: '+1 Sanity recovered and +1 Focus gained!' };

    case 'kate-winthrop':
      updateToken('clues', 3);
      return { applied: true, message: '+3 Clues gained!' };

    case 'luke-robinson':
      updateToken('clues', 1);
      updateToken('focus', 1);
      return { applied: true, message: '+1 Clue and +1 Focus gained! (Gain Walking the Ley Lines Unique Asset).' };

    case 'vincent-lee':
      updateToken('resources', 1);
      return { applied: true, message: '+1 Resource gained! (Gain Composed and Practiced Conditions).' };

    case 'william-yorick':
      updateSkillModifier('observation', 1);
      updateSkillModifier('strength', 1);
      updateToken('resources', 1);
      return { applied: true, message: '+1 Observation & +1 Strength improved, +1 Resource gained!' };

    // Cities in Ruin
    case 'ashcan-pete':
      return { applied: true, message: 'Reward active! Once per round reroll all dice when resolving a test.' };

    case 'bob-jenkins':
      updateToken('clues', 1);
      return { applied: true, message: '+1 Clue gained! (Gain Silver Tongued Condition).' };

    case 'rita-young':
      updateSkillModifier('observation', 1);
      updateSkillModifier('will', 1);
      return { applied: true, message: '+1 Observation and +1 Will improved!' };

    case 'roland-banks':
      return { applied: true, message: 'Reward active! Set aside 2 random Service Assets. Double passive ability per round.' };

    // Masks of Nyarlathotep
    case 'agatha-crane':
      updateSkillModifier('lore', 1);
      updateSkillModifier('observation', 1);
      return { applied: true, message: '+1 Lore and +1 Observation improved!' };

    case 'calvin-wright':
      updateHealth(1);
      updateSanity(1);
      updateSkillModifier('will', 2);
      return { applied: true, message: '+1 Health, +1 Sanity recovered, and +2 Will improved! (Max Health & Sanity +1).' };

    case 'carson-sinclair':
      updateSkillModifier('influence', 1);
      updateSkillModifier('will', 1);
      return { applied: true, message: '+1 Influence and +1 Will improved (or adjust 2 skills of choice)!' };

    case 'daniela-reyes':
      updateToken('resources', 1);
      return { applied: true, message: '+1 Resource gained!' };

    case 'father-mateo':
      updateToken('focus', 1);
      return { applied: true, message: '+1 Focus gained!' };

    case 'preston-fairmont':
      updateSkillModifier('influence', 1);
      updateSkillModifier('will', 1);
      updateToken('resources', 1);
      return { applied: true, message: '+1 Influence & +1 Will improved, +1 Resource gained!' };

    case 'sefina-rousseau':
      updateSkillModifier('lore', 1);
      updateSkillModifier('will', 1);
      return { applied: true, message: '+1 Lore and +1 Will improved!' };

    default:
      updateToken('focus', 1);
      return { applied: true, message: '+1 Focus gained!' };
  }
}

/**
 * Applies automated penalties/impairments/damage for failing a personal story.
 * Covers all 55 official Eldritch Horror investigators with personal stories.
 */
export function applyStoryConsequence(params: StoryApplierParams): StoryBonusResult {
  const { investigatorId, updateHealth, updateSanity, updateSkillModifier, updateToken } = params;

  switch (investigatorId) {
    // Core Game
    case 'akachi-onyele':
      return { applied: true, message: 'Consequence active: Spawn 1 Gate.' };

    case 'charlie-kane':
      return { applied: true, message: 'Consequence active: Asset Reserve costs increased by 1 during Acquire Assets.' };

    case 'diana-stanley':
      updateSanity(-1);
      return { applied: true, message: 'Consequence active: Advance Doom by 1. (-1 die on Combat/Other World tests).' };

    case 'jacqueline-fine':
      updateSanity(-2);
      return { applied: true, message: '-2 Sanity applied! (Max Sanity reduced by 2).' };

    case 'jim-culver':
      updateHealth(-1);
      updateSanity(-1);
      return { applied: true, message: '-1 Health and -1 Sanity applied! (Max Health & Sanity reduced by 1).' };

    case 'leo-anderson':
      updateHealth(-1);
      updateSanity(-1);
      return { applied: true, message: '-1 Health and -1 Sanity applied! (Max Health & Sanity reduced by 1).' };

    case 'lily-chen':
      updateSkillModifier('lore', -1);
      updateSkillModifier('influence', -1);
      updateSkillModifier('observation', -1);
      updateSkillModifier('strength', -1);
      updateSkillModifier('will', -1);
      return { applied: true, message: 'Discarded 1 Improvement token from all skills (-1 to all modifiers)!' };

    case 'lola-hayes':
      updateSkillModifier('lore', -1);
      return { applied: true, message: '-1 Lore Improvement discarded. (If none left, lose all Sanity!).' };

    case 'mark-harrigan':
      updateHealth(-1);
      return { applied: true, message: '-1 Health suffered! Damage and horror of encountered Monsters increased by 1.' };

    case 'norman-withers':
      updateSanity(-2);
      return { applied: true, message: '-2 Sanity applied! (Spawn 1 Gate; Max Sanity reduced by 2).' };

    case 'silas-marsh':
      updateSanity(-1);
      return { applied: true, message: '-1 Sanity suffered from Reckoning penalty! (Devoured instead of defeated).' };

    case 'trish-scarborough':
      return { applied: true, message: 'Consequence active: Roll 1 fewer die on Influence/Observation tests.' };

    // Forsaken Lore
    case 'agnes-baker':
      return { applied: true, message: 'Consequence active: Increase Monster damage & horror by 1. Spells discard after resolving unless passive used.' };

    // Mountains of Madness
    case 'daisy-walker':
      updateToken('clues', -1);
      return { applied: true, message: '-1 Clue discarded (or discard 1 Spell) and gain Amnesia Condition!' };

    case 'finn-edwards':
      return { applied: true, message: 'Consequence active: Cannot perform Acquire Assets or Prepare for Travel.' };

    case 'george-barnaby':
      updateSanity(-2);
      return { applied: true, message: '-2 Sanity applied! Discard all Ally Assets (Max Sanity reduced by 2).' };

    case 'patrice-hathaway':
      return { applied: true, message: 'Consequence active: Spawn 1 Gate. You roll a maximum of 3 dice on tests.' };

    case 'tommy-muldoon':
      updateHealth(-1);
      updateSanity(-1);
      updateSkillModifier('strength', -1);
      updateSkillModifier('will', -1);
      return { applied: true, message: '-1 Health, -1 Sanity, and 2 Improvement tokens discarded!' };

    case 'ursula-downs':
      return { applied: true, message: 'Consequence active: Advance Doom by 1. Reckoning spawns Monster on gate space.' };

    case 'wilson-richards':
      updateHealth(-2);
      return { applied: true, message: '-2 Health applied! (Max Health reduced by 2).' };

    // Strange Remnants
    case 'marie-lambeau':
      return { applied: true, message: 'Consequence active: Draw 3 yellow Mythos cards and resolve text of each!' };

    case 'skids-otoole':
      return { applied: true, message: 'Consequence active: Cannot reroll each die more than once.' };

    case 'tony-morgan':
      return { applied: true, message: 'Consequence active: Gain Agreement Condition. Cannot spend Focus/Resources on Acquire Assets.' };

    case 'zoey-samaras':
      return { applied: true, message: 'Consequence active: Gain 1 Bane Condition.' };

    // Under the Pyramids
    case 'hank-samson':
      return { applied: true, message: 'Consequence active: When you lose Health, gain that many Injury Conditions.' };

    case 'harvey-walters':
      updateSkillModifier('lore', -1);
      updateSkillModifier('observation', -1);
      return { applied: true, message: '-1 Lore and -1 Observation impaired (or impair 2 skills of choice)!' };

    case 'joe-diamond':
      updateHealth(-2);
      updateSkillModifier('observation', -1);
      updateSkillModifier('strength', -1);
      return { applied: true, message: '-2 Health applied (Max Health -2) and your 2 highest skills impaired!' };

    case 'mandy-thompson':
      return { applied: true, message: 'Consequence active: Advance Doom by 1. -1 die on Research/Mystery tests.' };

    case 'minh-thi-phan':
      updateHealth(-1);
      updateSanity(-1);
      updateSkillModifier('influence', -1);
      updateSkillModifier('will', -1);
      return { applied: true, message: '-1 Health, -1 Sanity, -1 Influence, and -1 Will impaired!' };

    case 'monterey-jack':
      updateHealth(-1);
      updateSanity(-1);
      updateSkillModifier('observation', -1);
      updateSkillModifier('lore', -1);
      return { applied: true, message: '-1 Health, -1 Sanity, -1 Observation, and 1 other skill impaired!' };

    case 'rex-murphy':
      return { applied: true, message: 'Consequence active: Reckoning flips your Cursed Condition.' };

    case 'sister-mary':
      updateSkillModifier('will', -2);
      return { applied: true, message: '-2 Will impaired! (If you lose Sanity, lose +1 instead).' };

    // Signs of Carcosa
    case 'dexter-drake':
      updateSanity(-2);
      return { applied: true, message: '-2 Sanity suffered after flipping spell (unless discarded)!' };

    case 'jenny-barnes':
      updateHealth(-1);
      updateSanity(-1);
      updateSkillModifier('influence', -1);
      updateSkillModifier('will', -1);
      return { applied: true, message: '-1 Health, -1 Sanity, -1 Influence, and -1 Will impaired!' };

    case 'michael-mcglen':
      updateSkillModifier('influence', -2);
      return { applied: true, message: '-2 Influence impaired! Must perform Travel action each round.' };

    case 'wendy-adams':
      updateSanity(-1);
      return { applied: true, message: '-1 Sanity lost on failed test! Cannot be Lead Investigator.' };

    // The Dreamlands
    case 'amanda-sharpe':
      updateSanity(-1);
      return { applied: true, message: '-1 Sanity suffered when moving along Ship path (discard 1 Talent on fail)!' };

    case 'carolyn-fern':
      updateSanity(-2);
      return { applied: true, message: '-2 Sanity applied! (Max Sanity reduced by 2).' };

    case 'darrell-simmons':
      return { applied: true, message: 'Consequence active: Discard 1 Camera Asset. Cannot take Bank Loan.' };

    case 'gloria-goldberg':
      return { applied: true, message: 'Consequence active: Must perform Tome action each round if able.' };

    case 'kate-winthrop':
      updateSanity(-2);
      updateToken('clues', -3);
      return { applied: true, message: '-2 Sanity applied (Max Sanity -2) and 3 Clues/Improvement tokens discarded!' };

    case 'luke-robinson':
      updateSanity(-2);
      return { applied: true, message: '-2 Sanity applied! (Max Sanity reduced by 2).' };

    case 'vincent-lee':
      updateHealth(-2);
      return { applied: true, message: '-2 Health applied! (Max Health reduced by 2; discard 1 Talent).' };

    case 'william-yorick':
      updateHealth(-2);
      return { applied: true, message: '-2 Health applied! (Max Health reduced by 2; -1 die on Will tests).' };

    // Cities in Ruin
    case 'ashcan-pete':
      return { applied: true, message: 'Consequence active: Discard Duke Unique Asset! (+1 Sanity lost when losing Sanity).' };

    case 'bob-jenkins':
      return { applied: true, message: 'Consequence active: Must accept Bank Loan. -1 from each die on Deal Conditions.' };

    case 'rita-young':
      return { applied: true, message: 'Consequence active: Increase Monster damage and horror by 1.' };

    case 'roland-banks':
      return { applied: true, message: 'Consequence active: Advance Doom by 1. -1 from non-Deal Condition dice.' };

    // Masks of Nyarlathotep
    case 'agatha-crane':
      updateToken('clues', -1);
      return { applied: true, message: 'Consequence active: Lose +1 Sanity; whenever you lose Sanity, discard that many Clues.' };

    case 'calvin-wright':
      return { applied: true, message: 'Consequence active: Cannot recover Health/Sanity on Rest. Advance Doom +2 on defeat.' };

    case 'carson-sinclair':
      updateHealth(-1);
      updateSanity(-1);
      return { applied: true, message: '-1 Health and -1 Sanity applied! Max 3 dice on tests.' };

    case 'daniela-reyes':
      return { applied: true, message: 'Consequence active: Increase horror by 1; gain Madness Condition on Sanity loss in combat.' };

    case 'father-mateo':
      return { applied: true, message: 'Consequence active: Treat investigator count as 1 higher for cards.' };

    case 'preston-fairmont':
      updateSanity(-1);
      return { applied: true, message: '-1 Sanity lost when companion acquires assets! Cannot trade possessions.' };

    case 'sefina-rousseau':
      return { applied: true, message: 'Consequence active: Roll 1 fewer die on Observation. Move to random space on Other World.' };

    default:
      updateSanity(-1);
      return { applied: true, message: '-1 Sanity applied!' };
  }
}
