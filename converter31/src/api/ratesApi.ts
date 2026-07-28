import { getFreshRatesCache, saveRatesCache } from '../storage/currencyStorage';
import type { CurrencyCode, RateResult } from '../types';
import { currencies } from '../utils/currency';

const BASE_CURRENCY = 'EUR';
const RATES_CACHE_TTL = 60 * 60 * 1000;
const symbols: string = currencies
  .filter((currency) => currency !== BASE_CURRENCY)
  .join(',');
const API_URL = `https://api.frankfurter.dev/v1/latest?base=${BASE_CURRENCY}&symbols=${symbols}`;

export async function loadRates(forceRefresh = false): Promise<RateResult> {
  if (!forceRefresh) {
    const cache = getFreshRatesCache();
    if (cache) {
      return {
        data: cache.data,
        source: 'localStorage',
        expiresAt: cache.expiresAt,
      };
    }
  }

  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to load rates data');
  const data = await response.json();
  const expiresAt = Date.now() + RATES_CACHE_TTL;
  console.log('data', data);
  saveRatesCache({
    data,
    expiresAt,
  });
  return {
    data,
    source: 'api',
    expiresAt: expiresAt,
  };
}
