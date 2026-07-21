import type { RateResult } from '../types';

const API_URL =
  'https://api.frankfurter.dev/v1/latest?base=EUR&symbols=USD,ILS,SEK';

export async function loadRatesData(): Promise<RateResult> {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to load rates data');
  const data = await response.json();
  console.log('data', data);
  return {
    data,
    source: 'api',
    expiresAt: Date.now(),
  };
}
