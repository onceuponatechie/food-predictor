/**
 * Wire-format types for the Food Forecast prediction API.
 *
 * IMPORTANT: These mirror the JSON the backend will return. When the real API
 * is wired up, only the data-source layer (lib/api or mock-data) changes —
 * components consume these types directly.
 *
 * Fields beyond the original engineering JSON (reference_market, data_as_of,
 * confidence_level, seasonality_note, historical_accuracy, plain_explanation,
 * feature_label) close FRD gaps around trust, transparency, and accuracy
 * communication.
 */

export type ConfidenceLevel = 'high' | 'moderate' | 'low';

export type ForecastHorizon = '4_weeks';

export type FeatureDirection = 'increase' | 'decrease';

export interface FeatureContribution {
  /** Stable machine key from the model. */
  feature_key: string;
  /** Human-readable label for UI. */
  feature_label: string;
  /** Signed percentage points contributed to the forecast. */
  impact_percentage: number;
  direction: FeatureDirection;
  /** One-sentence explanation a non-technical user can understand. */
  plain_explanation: string;
}

export interface XaiExplanation {
  /** Baseline market drift before any feature contributions. */
  base_market_trend: number;
  feature_contributions: FeatureContribution[];
}

export interface HistoricalAccuracy {
  /** ISO date — when the previous forecast was issued. */
  last_prediction_date: string;
  last_predicted_change: number;
  last_actual_change: number;
  /** Plain-language framing of the model's recent track record. */
  accuracy_note: string;
}

export interface PredictionResponse {
  food_item: string;
  /** URL-safe slug. */
  food_item_id: string;
  current_price_ngn: number;
  /** Market the current price is averaged from, e.g. "Mile 12 Market, Lagos". */
  reference_market: string;
  /** ISO date — when underlying data was last refreshed. */
  data_as_of: string;
  forecast_horizon: ForecastHorizon;
  predicted_price_ngn: number;
  /** Signed percentage. Positive = rise, negative = fall. */
  predicted_percentage_change: number;
  confidence_level: ConfidenceLevel;
  /** Null when no clear seasonal pattern applies. */
  seasonality_note: string | null;
  xai_explanation: XaiExplanation;
  historical_accuracy: HistoricalAccuracy;
}
