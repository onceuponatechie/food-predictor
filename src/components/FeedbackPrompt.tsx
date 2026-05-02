import { useState } from 'react';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

interface FeedbackPromptProps {
  foodItemId: string;
}

type Vote = 'up' | 'down';

/**
 * Stub for the eventual feedback endpoint. Keeping the shape close to what a
 * real POST body would look like, so wiring it to fetch later is one diff.
 */
function submitFeedback(payload: { food_item_id: string; vote: Vote }) {
  console.log('[feedback] submit', payload);
}

export function FeedbackPrompt({ foodItemId }: FeedbackPromptProps) {
  const [vote, setVote] = useState<Vote | null>(null);

  function cast(next: Vote) {
    if (vote) return;
    setVote(next);
    submitFeedback({ food_item_id: foodItemId, vote: next });
  }

  if (vote) {
    return (
      <section
        aria-live="polite"
        className="rounded-2xl border border-primary-100 bg-primary-50/60 p-5 sm:p-6 text-center"
      >
        <p className="text-body-lg font-medium text-primary-800">
          Thanks — your feedback helps us improve.
        </p>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="feedback-heading"
      className="rounded-2xl bg-surface border border-neutral-200 shadow-sm p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
    >
      <h2 id="feedback-heading" className="text-body-lg font-semibold text-neutral-900">
        Was this prediction useful?
      </h2>
      <div className="flex gap-3">
        <FeedbackButton icon={ThumbsUp} label="Yes" onClick={() => cast('up')} />
        <FeedbackButton icon={ThumbsDown} label="No" onClick={() => cast('down')} />
      </div>
    </section>
  );
}

interface FeedbackButtonProps {
  icon: typeof ThumbsUp;
  label: string;
  onClick: () => void;
}

function FeedbackButton({ icon: Icon, label, onClick }: FeedbackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-surface px-4 h-10',
        'text-body font-medium text-neutral-700',
        'transition-colors duration-base',
        'hover:border-primary-200 hover:bg-primary-50 hover:text-primary-800',
      ].join(' ')}
    >
      <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      {label}
    </button>
  );
}
