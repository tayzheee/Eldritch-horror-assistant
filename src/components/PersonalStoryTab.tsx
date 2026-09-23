import React from 'react';
import {
  BookOpen,
  Trophy,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  Minus,
  Sparkles,
  Info,
  RotateCcw,
} from 'lucide-react';
import { InvestigatorStatic, InvestigatorState, SkillType } from '../types';
import { getPersonalStory, StoryStatus } from '../data/personalStories';

interface Props {
  investigator: InvestigatorStatic;
  state: InvestigatorState;
  onUpdateStoryStatus: (status: StoryStatus) => void;
  onUpdateStoryCount: (delta: number) => void;
  onSetStoryCount: (count: number) => void;
  onApplyRewardEffects?: () => void;
  onApplyConsequenceEffects?: () => void;
}

export const PersonalStoryTab: React.FC<Props> = ({
  investigator,
  state,
  onUpdateStoryStatus,
  onUpdateStoryCount,
  onSetStoryCount,
  onApplyRewardEffects,
  onApplyConsequenceEffects,
}) => {
  const [feedbackMessage, setFeedbackMessage] = React.useState<{ type: 'reward' | 'consequence'; text: string } | null>(null);

  const story = getPersonalStory(investigator.id);
  const storyProgress = state.personalStoryProgress || {
    status: 'in_progress',
    currentCount: 0,
  };

  const status = storyProgress.status;
  const currentCount = storyProgress.currentCount;
  const targetCount = story?.targetCount;

  const handlePassStory = () => {
    onUpdateStoryStatus('passed');
    if (onApplyRewardEffects) {
      onApplyRewardEffects();
      setFeedbackMessage({
        type: 'reward',
        text: `Personal Story passed! Any applicable stat bonuses or tokens have been applied to ${investigator.name}.`,
      });
    }
  };

  const handleFailStory = () => {
    onUpdateStoryStatus('failed');
    if (onApplyConsequenceEffects) {
      onApplyConsequenceEffects();
      setFeedbackMessage({
        type: 'consequence',
        text: `Personal Story failed! Consequence penalties have been applied to ${investigator.name}.`,
      });
    }
  };

  if (!story) {
    return (
      <div className="p-8 text-center bg-slate-900/60 rounded-xl border border-slate-800">
        <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
        <h3 className="font-serif text-lg font-bold text-slate-300">No Personal Story Available</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
          Personal stories were introduced in the Masks of Nyarlathotep expansion for official investigators.
        </p>
      </div>
    );
  }

  const isPassed = status === 'passed';
  const isFailed = status === 'failed';
  const isInProgress = status === 'in_progress';

  return (
    <div className="p-5 space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900/90 to-purple-950/40 border border-amber-600/40 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0 text-amber-300">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Personal Story
              </span>
              <span className="text-xs font-serif text-slate-400">Masks of Nyarlathotep</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-amber-100 mt-0.5">
              {story.storyTitle}
            </h2>
            <p className="text-xs text-slate-300/80 font-serif italic mt-0.5">
              Investigator quest for {investigator.name}
            </p>
          </div>
        </div>

        {/* Current Status Pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {isInProgress && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-serif font-bold bg-amber-950/80 border border-amber-500 text-amber-200 shadow-sm animate-pulse">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>In Progress</span>
            </span>
          )}
          {isPassed && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-serif font-bold bg-emerald-950/90 border border-emerald-500 text-emerald-200 shadow-md">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Story Passed! (Reward Active)</span>
            </span>
          )}
          {isFailed && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-serif font-bold bg-rose-950/90 border border-rose-500 text-rose-200 shadow-md">
              <XCircle className="w-4 h-4 text-rose-400" />
              <span>Story Failed (Consequence Active)</span>
            </span>
          )}
        </div>
      </div>

      {/* Feedback Banner on Stat Application */}
      {feedbackMessage && (
        <div
          className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs font-serif animate-in fade-in slide-in-from-top-2 duration-300 ${
            feedbackMessage.type === 'reward'
              ? 'bg-emerald-950/80 border-emerald-500/80 text-emerald-200'
              : 'bg-rose-950/80 border-rose-500/80 text-rose-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedbackMessage.type === 'reward' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            )}
            <span>{feedbackMessage.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedbackMessage(null)}
            className="text-[11px] underline opacity-80 hover:opacity-100 font-sans"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Progress / Objective Tracker (if card has numeric objective) */}
      {targetCount && (
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-750 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-serif font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Objective Progress: {story.trackerLabel || 'Milestone Counter'}
            </span>
            <span className="text-xs font-mono font-bold text-amber-300">
              {currentCount} / {targetCount} ({Math.min(100, Math.round((currentCount / targetCount) * 100))}%)
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
            <div
              className={`h-full transition-all duration-300 ${
                isPassed
                  ? 'bg-emerald-500'
                  : isFailed
                  ? 'bg-rose-500'
                  : currentCount >= targetCount
                  ? 'bg-amber-400'
                  : 'bg-gradient-to-r from-amber-600 to-amber-400'
              }`}
              style={{
                width: `${Math.min(100, (currentCount / targetCount) * 100)}%`,
              }}
            />
          </div>

          {/* Counter Controls */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onUpdateStoryCount(-1)}
                disabled={currentCount <= 0}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 flex items-center justify-center border border-slate-700 font-bold transition-colors"
                title="Decrease count"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onUpdateStoryCount(1)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center border border-slate-700 font-bold transition-colors"
                title="Increase count"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onSetStoryCount(0)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-slate-200 text-xs border border-slate-700 transition-colors"
                title="Reset counter to zero"
              >
                Reset
              </button>
            </div>

            {currentCount >= targetCount && isInProgress && (
              <button
                type="button"
                onClick={handlePassStory}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-serif font-bold text-xs shadow-md transition-all animate-bounce"
              >
                Target Reached: Complete Story (Pass & Apply)
              </button>
            )}
          </div>
        </div>
      )}

      {/* Story Details Card: Pass & Fail Conditions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pass Condition Box */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            isPassed
              ? 'bg-emerald-950/40 border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
              : 'bg-slate-900/80 border-slate-750'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-emerald-300">
              Pass Condition
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 font-serif leading-relaxed whitespace-pre-line">
            {story.passCondition}
          </p>
          {story.onGainText && (
            <div className="mt-3 pt-2.5 border-t border-slate-800 text-[11px] text-amber-300/90 font-serif">
              <strong>On Gain:</strong> {story.onGainText}
            </div>
          )}
          {story.specialReckoning && (
            <div className="mt-2 text-[11px] text-amber-200 font-serif italic">
              <strong>{story.specialReckoning}</strong>
            </div>
          )}
        </div>

        {/* Fail Condition Box */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            isFailed
              ? 'bg-rose-950/40 border-rose-500 shadow-md ring-1 ring-rose-500/50'
              : 'bg-slate-900/80 border-slate-750'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-4 h-4 text-rose-400" />
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-rose-300">
              Fail Condition
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 font-serif leading-relaxed whitespace-pre-line">
            {story.failCondition}
          </p>
        </div>
      </div>

      {/* Rewards & Consequences Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Reward Card */}
        <div
          className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
            isPassed
              ? 'bg-gradient-to-b from-emerald-950/60 to-slate-900 border-emerald-500 shadow-xl ring-2 ring-emerald-500/30'
              : 'bg-slate-900/90 border-slate-750'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5 text-xs font-serif font-bold uppercase tracking-wider text-emerald-400">
                <Trophy className="w-4 h-4 text-emerald-400" />
                Reward Card (When Passed)
              </span>
              {isPassed && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Active
                </span>
              )}
            </div>

            <h4 className="font-serif text-lg font-bold text-emerald-200">
              {story.reward.title}
            </h4>

            <div className="mt-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs sm:text-sm text-slate-200 font-serif leading-relaxed whitespace-pre-line">
              {story.reward.effect}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePassStory}
              className={`px-3.5 py-1.5 rounded-xl font-serif text-xs font-bold transition-all flex items-center gap-1.5 ${
                isPassed
                  ? 'bg-emerald-600 text-slate-950 shadow-md'
                  : 'bg-slate-800 hover:bg-emerald-900/50 text-slate-300 hover:text-emerald-200 border border-slate-700'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isPassed ? 'Passed (Applied)' : 'Pass & Apply Bonuses'}</span>
            </button>

            {onApplyRewardEffects && (
              <button
                type="button"
                onClick={() => {
                  onApplyRewardEffects();
                  setFeedbackMessage({
                    type: 'reward',
                    text: `Applied story stat bonuses / tokens to ${investigator.name}.`,
                  });
                }}
                className="text-xs text-emerald-400 hover:text-emerald-300 underline font-serif"
                title="Automatically apply stat improvements or tokens mentioned in the reward"
              >
                Re-apply Stat Bonuses
              </button>
            )}
          </div>
        </div>

        {/* Consequence Card */}
        <div
          className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
            isFailed
              ? 'bg-gradient-to-b from-rose-950/60 to-slate-900 border-rose-500 shadow-xl ring-2 ring-rose-500/30'
              : 'bg-slate-900/90 border-slate-750'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5 text-xs font-serif font-bold uppercase tracking-wider text-rose-400">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                Consequence Card (When Failed)
              </span>
              {isFailed && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  Active Penalty
                </span>
              )}
            </div>

            <h4 className="font-serif text-lg font-bold text-rose-200">
              {story.consequence.title}
            </h4>

            <div className="mt-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs sm:text-sm text-slate-200 font-serif leading-relaxed whitespace-pre-line">
              {story.consequence.effect}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={handleFailStory}
              className={`px-3.5 py-1.5 rounded-xl font-serif text-xs font-bold transition-all flex items-center gap-1.5 ${
                isFailed
                  ? 'bg-rose-600 text-slate-950 shadow-md'
                  : 'bg-slate-800 hover:bg-rose-900/50 text-slate-300 hover:text-rose-200 border border-slate-700'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>{isFailed ? 'Failed (Applied)' : 'Fail & Apply Penalties'}</span>
            </button>

            {onApplyConsequenceEffects && (
              <button
                type="button"
                onClick={() => {
                  onApplyConsequenceEffects();
                  setFeedbackMessage({
                    type: 'consequence',
                    text: `Applied consequence penalties to ${investigator.name}.`,
                  });
                }}
                className="text-xs text-rose-400 hover:text-rose-300 underline font-serif"
                title="Apply stat reductions or penalties mentioned in consequence"
              >
                Re-apply Penalties
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Manual Reset / Status Controls */}
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>
            You can manually toggle between <strong>In Progress</strong>, <strong>Passed</strong>, or <strong>Failed</strong> at any time as game events unfold.
          </span>
        </div>

        <button
          type="button"
          onClick={() => onUpdateStoryStatus('in_progress')}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-slate-100 border border-slate-700 transition-colors whitespace-nowrap"
        >
          <RotateCcw className="w-3 h-3 text-amber-400" />
          <span>Reset to In Progress</span>
        </button>
      </div>
    </div>
  );
};
