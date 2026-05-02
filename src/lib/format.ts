/**
 * Nigerian-locale formatters used across the UI. Always go through these so
 * naira amounts and dates render consistently and never reflow as digits change.
 */

const nairaFormatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
});

const longDateFormatter = new Intl.DateTimeFormat('en-NG', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export function formatNaira(amount: number): string {
  // Replace the default NGN sign with the cleaner ₦ glyph.
  return nairaFormatter.format(amount).replace('NGN', '₦').replace(/\s/g, '');
}

export function formatLongDate(iso: string): string {
  return longDateFormatter.format(new Date(iso));
}

export function formatSignedPercent(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  const sign = rounded > 0 ? '+' : rounded < 0 ? '−' : '';
  return `${sign}${Math.abs(rounded)}%`;
}

export type PriceTrend = 'rising' | 'falling' | 'stable';

/** Anything within ±1.5 percentage points reads as "stable" to a household. */
export function classifyTrend(change: number): PriceTrend {
  if (change > 1.5) return 'rising';
  if (change < -1.5) return 'falling';
  return 'stable';
}
