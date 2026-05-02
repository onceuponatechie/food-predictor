import type { PredictionResponse } from '../types/prediction';

/**
 * v1 mock data. Reference market is "Mile 12 Market, Lagos" across the
 * board — we are explicit that v1 predictions are Lagos-anchored.
 *
 * Prices reflect the typical consumer-facing unit for each commodity
 * (basket for tomato/sweet potato, tuber for yam, mudu for garri/beans,
 * 50kg bag for rice/flour, 5L jerry can for palm oil). The schema does
 * not yet carry a unit field; this will be added when the backend does.
 */

const REFERENCE_MARKET = 'Mile 12 Market, Lagos';
const DATA_AS_OF = '2026-04-28';
const LAST_PREDICTION_DATE = '2026-04-01';

const PREDICTIONS: PredictionResponse[] = [
  {
    food_item: 'Tomato',
    food_item_id: 'tomato',
    current_price_ngn: 55_000,
    reference_market: REFERENCE_MARKET,
    data_as_of: DATA_AS_OF,
    forecast_horizon: '4_weeks',
    predicted_price_ngn: 61_600,
    predicted_percentage_change: 12.0,
    confidence_level: 'high',
    seasonality_note:
      'Tomato prices typically rise in May as the rainy season disrupts supply from northern farms before the wet-season harvest stabilises in late June.',
    xai_explanation: {
      base_market_trend: 2.0,
      feature_contributions: [
        {
          feature_key: 'Diesel_Price_Change_1W',
          feature_label: 'Diesel prices',
          impact_percentage: 5.0,
          direction: 'increase',
          plain_explanation:
            'Diesel rose about 5% this week, pushing up the cost of moving baskets from Kano and Kaduna down to Lagos.',
        },
        {
          feature_key: 'Insecurity_Index_Producer_States',
          feature_label: 'Insecurity in producing states',
          impact_percentage: 4.0,
          direction: 'increase',
          plain_explanation:
            'Reported attacks on farms in Plateau and Benue have slowed harvests, so fewer baskets are reaching the market.',
        },
        {
          feature_key: 'Local_Harvest_Index',
          feature_label: 'Local harvest improvement',
          impact_percentage: 1.0,
          direction: 'decrease',
          plain_explanation:
            'Early greenhouse output around Ogun is starting to add a little supply, softening prices slightly.',
        },
      ],
    },
    historical_accuracy: {
      last_prediction_date: LAST_PREDICTION_DATE,
      last_predicted_change: 6.0,
      last_actual_change: 7.2,
      accuracy_note:
        'Last month we predicted +6%, the market actually moved +7.2%. Close call — we slightly underestimated the impact of fuel costs.',
    },
  },

  {
    food_item: 'Yam',
    food_item_id: 'yam',
    current_price_ngn: 7_500,
    reference_market: REFERENCE_MARKET,
    data_as_of: DATA_AS_OF,
    forecast_horizon: '4_weeks',
    predicted_price_ngn: 6_750,
    predicted_percentage_change: -10.0,
    confidence_level: 'moderate',
    seasonality_note:
      'Yam prices usually ease between May and July as new tubers from Benue, Taraba and Nasarawa start arriving in southern markets.',
    xai_explanation: {
      base_market_trend: 1.0,
      feature_contributions: [
        {
          feature_key: 'Seasonality_New_Harvest',
          feature_label: 'New harvest season',
          impact_percentage: 9.0,
          direction: 'decrease',
          plain_explanation:
            'Early-season yam from the Middle Belt is beginning to land in Lagos, which historically pushes prices down through May and June.',
        },
        {
          feature_key: 'Consumer_Demand_Index',
          feature_label: 'Softer demand',
          impact_percentage: 2.0,
          direction: 'decrease',
          plain_explanation:
            'Households are spending less on tubers right now, so traders are clearing stock at slightly lower prices.',
        },
        {
          feature_key: 'Diesel_Price_Change_1W',
          feature_label: 'Diesel prices',
          impact_percentage: 1.0,
          direction: 'increase',
          plain_explanation:
            'Higher transport costs are partly offsetting the seasonal drop, but not enough to reverse it.',
        },
      ],
    },
    historical_accuracy: {
      last_prediction_date: LAST_PREDICTION_DATE,
      last_predicted_change: -8.0,
      last_actual_change: -9.1,
      accuracy_note:
        'Last month we predicted a 8% drop, prices actually fell 9.1%. Direction was right, magnitude was very close.',
    },
  },

  {
    food_item: 'Ofada Rice',
    food_item_id: 'ofada-rice',
    current_price_ngn: 95_000,
    reference_market: REFERENCE_MARKET,
    data_as_of: DATA_AS_OF,
    forecast_horizon: '4_weeks',
    predicted_price_ngn: 98_500,
    predicted_percentage_change: 3.7,
    confidence_level: 'moderate',
    seasonality_note: null,
    xai_explanation: {
      base_market_trend: 1.0,
      feature_contributions: [
        {
          feature_key: 'NGN_USD_Rate_Change',
          feature_label: 'Exchange rate pressure',
          impact_percentage: 2.0,
          direction: 'increase',
          plain_explanation:
            'A weaker naira raises the cost of imported milling inputs and packaging, which feeds into local rice prices.',
        },
        {
          feature_key: 'Diesel_Price_Change_1W',
          feature_label: 'Diesel prices',
          impact_percentage: 1.5,
          direction: 'increase',
          plain_explanation:
            'Higher diesel costs are pushing up haulage rates from Ogun and Ekiti rice belts into Lagos.',
        },
        {
          feature_key: 'Local_Supply_Index',
          feature_label: 'Local supply improving',
          impact_percentage: 0.8,
          direction: 'decrease',
          plain_explanation:
            'Slightly improved milling output around Abeokuta is putting a small downward drag on prices.',
        },
      ],
    },
    historical_accuracy: {
      last_prediction_date: LAST_PREDICTION_DATE,
      last_predicted_change: 4.5,
      last_actual_change: 3.0,
      accuracy_note:
        'Last month we predicted +4.5%, actual was +3%. We slightly overshot — milling supply recovered faster than expected.',
    },
  },

  {
    food_item: 'White Garri',
    food_item_id: 'white-garri',
    current_price_ngn: 1_500,
    reference_market: REFERENCE_MARKET,
    data_as_of: DATA_AS_OF,
    forecast_horizon: '4_weeks',
    predicted_price_ngn: 1_510,
    predicted_percentage_change: 0.7,
    confidence_level: 'high',
    seasonality_note:
      'Cassava is harvested year-round, so garri rarely shows strong seasonal swings.',
    xai_explanation: {
      base_market_trend: 0.5,
      feature_contributions: [
        {
          feature_key: 'Cassava_Supply_Index',
          feature_label: 'Cassava supply',
          impact_percentage: 0.3,
          direction: 'increase',
          plain_explanation:
            'Cassava supply across Ogun and Oyo is steady, so processors are not pushing prices much in either direction.',
        },
        {
          feature_key: 'Diesel_Price_Change_1W',
          feature_label: 'Diesel prices',
          impact_percentage: 0.4,
          direction: 'increase',
          plain_explanation:
            'A small bump in transport costs is the main reason we expect a tiny upward drift.',
        },
        {
          feature_key: 'Consumer_Demand_Index',
          feature_label: 'Demand',
          impact_percentage: 0.5,
          direction: 'decrease',
          plain_explanation:
            'Household garri purchases have been flat to slightly soft, which keeps a lid on price rises.',
        },
      ],
    },
    historical_accuracy: {
      last_prediction_date: LAST_PREDICTION_DATE,
      last_predicted_change: 0.5,
      last_actual_change: 1.2,
      accuracy_note:
        'Last month we predicted +0.5%, actual was +1.2%. Both numbers point to a stable market — small differences here are normal.',
    },
  },

  {
    food_item: 'Beans',
    food_item_id: 'beans',
    current_price_ngn: 3_500,
    reference_market: REFERENCE_MARKET,
    data_as_of: DATA_AS_OF,
    forecast_horizon: '4_weeks',
    predicted_price_ngn: 3_850,
    predicted_percentage_change: 10.0,
    confidence_level: 'high',
    seasonality_note:
      'Beans tend to tighten between April and July as old-crop stock from the previous harvest runs down before the next harvest in October.',
    xai_explanation: {
      base_market_trend: 2.0,
      feature_contributions: [
        {
          feature_key: 'Insecurity_Index_Producer_States',
          feature_label: 'Insecurity in producing states',
          impact_percentage: 6.0,
          direction: 'increase',
          plain_explanation:
            'Continued unrest in Borno, Yobe and parts of Zamfara is keeping farmers off their land, which reduces the volume of beans reaching southern markets.',
        },
        {
          feature_key: 'Diesel_Price_Change_1W',
          feature_label: 'Diesel prices',
          impact_percentage: 2.0,
          direction: 'increase',
          plain_explanation:
            'Beans travel a long way to Lagos, so every increase in fuel prices feeds directly into the mudu price.',
        },
      ],
    },
    historical_accuracy: {
      last_prediction_date: LAST_PREDICTION_DATE,
      last_predicted_change: 8.5,
      last_actual_change: 9.8,
      accuracy_note:
        'Last month we predicted +8.5%, actual was +9.8%. The direction was right; insecurity disrupted supply more than our model expected.',
    },
  },

  {
    food_item: 'Palm Oil',
    food_item_id: 'palm-oil',
    current_price_ngn: 12_000,
    reference_market: REFERENCE_MARKET,
    data_as_of: DATA_AS_OF,
    forecast_horizon: '4_weeks',
    predicted_price_ngn: 13_800,
    predicted_percentage_change: 15.0,
    confidence_level: 'high',
    seasonality_note:
      'Palm oil supply usually tightens in May and June, after the heavy fruiting season ends in southern producing states.',
    xai_explanation: {
      base_market_trend: 2.0,
      feature_contributions: [
        {
          feature_key: 'NGN_USD_Rate_Change',
          feature_label: 'Exchange rate pressure',
          impact_percentage: 8.0,
          direction: 'increase',
          plain_explanation:
            'The naira has weakened against the dollar, lifting the price of imported palm oil that fills gaps in local supply.',
        },
        {
          feature_key: 'Diesel_Price_Change_1W',
          feature_label: 'Diesel and transport',
          impact_percentage: 3.0,
          direction: 'increase',
          plain_explanation:
            'Higher fuel prices are raising the cost of moving 5-litre jerry cans from Cross River and Edo into Lagos.',
        },
        {
          feature_key: 'Seasonality_Off_Peak',
          feature_label: 'Off-peak supply',
          impact_percentage: 2.0,
          direction: 'increase',
          plain_explanation:
            'We are entering the part of the year when fewer fresh palm fruits are processed, so traders raise prices to manage stock.',
        },
      ],
    },
    historical_accuracy: {
      last_prediction_date: LAST_PREDICTION_DATE,
      last_predicted_change: 12.0,
      last_actual_change: 13.5,
      accuracy_note:
        'Last month we predicted +12%, actual was +13.5%. The naira weakened a little faster than our model expected.',
    },
  },

  {
    food_item: 'Sweet Potato',
    food_item_id: 'sweet-potato',
    current_price_ngn: 9_000,
    reference_market: REFERENCE_MARKET,
    data_as_of: DATA_AS_OF,
    forecast_horizon: '4_weeks',
    predicted_price_ngn: 9_090,
    predicted_percentage_change: 1.0,
    confidence_level: 'moderate',
    seasonality_note: null,
    xai_explanation: {
      base_market_trend: 1.0,
      feature_contributions: [
        {
          feature_key: 'Local_Supply_Index',
          feature_label: 'Local supply',
          impact_percentage: 0.5,
          direction: 'decrease',
          plain_explanation:
            'Steady supply from Plateau and Nasarawa is keeping the basket price calm.',
        },
        {
          feature_key: 'Diesel_Price_Change_1W',
          feature_label: 'Diesel prices',
          impact_percentage: 0.5,
          direction: 'increase',
          plain_explanation:
            'A small uptick in transport costs is the main reason we still expect a slight rise rather than a drop.',
        },
      ],
    },
    historical_accuracy: {
      last_prediction_date: LAST_PREDICTION_DATE,
      last_predicted_change: 1.5,
      last_actual_change: 0.4,
      accuracy_note:
        'Last month we predicted +1.5%, actual was +0.4%. Both signal a calm market — small misses are expected when prices barely move.',
    },
  },

  {
    food_item: 'Wheat Flour',
    food_item_id: 'wheat-flour',
    current_price_ngn: 65_000,
    reference_market: REFERENCE_MARKET,
    data_as_of: DATA_AS_OF,
    forecast_horizon: '4_weeks',
    predicted_price_ngn: 71_500,
    predicted_percentage_change: 10.0,
    confidence_level: 'high',
    seasonality_note: null,
    xai_explanation: {
      base_market_trend: 0.5,
      feature_contributions: [
        {
          feature_key: 'NGN_USD_Rate_Change',
          feature_label: 'Exchange rate pressure',
          impact_percentage: 5.0,
          direction: 'increase',
          plain_explanation:
            'Nigeria imports most of its wheat, so a weaker naira translates almost directly into higher 50kg bag prices.',
        },
        {
          feature_key: 'Global_Wheat_Price',
          feature_label: 'Global wheat prices',
          impact_percentage: 3.0,
          direction: 'increase',
          plain_explanation:
            'Wheat futures on global markets have moved up over the past month, raising the landed cost in Apapa.',
        },
        {
          feature_key: 'Diesel_Price_Change_1W',
          feature_label: 'Diesel prices',
          impact_percentage: 1.5,
          direction: 'increase',
          plain_explanation:
            'Higher fuel costs are adding to the cost of milling and inland distribution.',
        },
      ],
    },
    historical_accuracy: {
      last_prediction_date: LAST_PREDICTION_DATE,
      last_predicted_change: 9.0,
      last_actual_change: 10.5,
      accuracy_note:
        'Last month we predicted +9%, actual was +10.5%. The naira and global wheat both moved a touch more than our model expected.',
    },
  },
];

/** Simulated network delay so loading states are visible during development. */
const MOCK_LATENCY_MS = 350;

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function getAllCommodities(): Promise<PredictionResponse[]> {
  await wait(MOCK_LATENCY_MS);
  return PREDICTIONS.map((p) => ({ ...p }));
}

export async function getCommodity(
  id: string,
): Promise<PredictionResponse | null> {
  await wait(MOCK_LATENCY_MS);
  const match = PREDICTIONS.find((p) => p.food_item_id === id);
  return match ? { ...match } : null;
}
