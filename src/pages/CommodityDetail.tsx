import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BackToDashboard } from '../components/BackToDashboard';
import { PredictionHero } from '../components/PredictionHero';
import { XaiExplanationBlock } from '../components/XaiExplanationBlock';
import { SeasonalityCallout } from '../components/SeasonalityCallout';
import { AccuracyTransparency } from '../components/AccuracyTransparency';
import { FeedbackPrompt } from '../components/FeedbackPrompt';
import { RelatedCommodities } from '../components/RelatedCommodities';
import { CommodityDetailSkeleton } from '../components/CommodityDetailSkeleton';
import { CommodityNotFound } from '../components/CommodityNotFound';
import { getAllCommodities, getCommodity } from '../mock-data/predictions';
import type { PredictionResponse } from '../types/prediction';

type LoadState =
  | { status: 'loading' }
  | { status: 'not-found' }
  | { status: 'ready'; prediction: PredictionResponse; all: PredictionResponse[] };

export function CommodityDetail() {
  const { id = '' } = useParams<{ id: string }>();
  const [state, setState] = useState<LoadState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });

    Promise.all([getCommodity(id), getAllCommodities()]).then(([prediction, all]) => {
      if (cancelled) return;
      if (!prediction) {
        setState({ status: 'not-found' });
      } else {
        setState({ status: 'ready', prediction, all });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [id]);

  // Reset scroll on commodity change so detail pages start at the top.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <BackToDashboard />

      {state.status === 'loading' ? (
        <CommodityDetailSkeleton />
      ) : state.status === 'not-found' ? (
        <CommodityNotFound attemptedId={id} />
      ) : (
        <ReadyView prediction={state.prediction} all={state.all} />
      )}
    </div>
  );
}

interface ReadyViewProps {
  prediction: PredictionResponse;
  all: PredictionResponse[];
}

function ReadyView({ prediction, all }: ReadyViewProps) {
  return (
    <>
      <PredictionHero prediction={prediction} />
      <XaiExplanationBlock explanation={prediction.xai_explanation} />
      {prediction.seasonality_note ? (
        <SeasonalityCallout note={prediction.seasonality_note} />
      ) : null}
      <AccuracyTransparency accuracy={prediction.historical_accuracy} />
      <FeedbackPrompt foodItemId={prediction.food_item_id} />
      <RelatedCommodities current={prediction} all={all} />
    </>
  );
}
