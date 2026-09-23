import { SkillType } from '../types';
import personalStoriesData from './personalStoriesData.json';

export type StoryStatus = 'in_progress' | 'passed' | 'failed';

export interface StoryReward {
  title: string;
  effect: string;
}

export interface StoryConsequence {
  title: string;
  effect: string;
}

export interface PersonalStoryDefinition {
  investigatorId: string;
  investigatorName: string;
  storyTitle: string;
  onGainText?: string;
  specialReckoning?: string;
  passCondition: string;
  failCondition: string;
  reward: StoryReward;
  consequence: StoryConsequence;
  targetCount?: number;
  trackerLabel?: string;
  trackType?: 'tokens' | 'monsters' | 'clues' | 'resources' | 'gates' | 'skills' | 'allies' | 'assets';
}

export interface PersonalStoryProgress {
  status: StoryStatus;
  currentCount: number;
  notes?: string;
}

export const PERSONAL_STORIES: Record<string, PersonalStoryDefinition> = personalStoriesData as Record<
  string,
  PersonalStoryDefinition
>;

export function getPersonalStory(investigatorId: string): PersonalStoryDefinition | undefined {
  return PERSONAL_STORIES[investigatorId];
}
