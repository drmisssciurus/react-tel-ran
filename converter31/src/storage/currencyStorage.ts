import type { RatesCache } from '../types';

const RATES_CACHE_KEY = 'currency-rates-cache';
export function saveRatesCache(data: RatesCache) {
  localStorage.setItem(RATES_CACHE_KEY, JSON.stringify(data));
}

export function loadRatesCache(): RatesCache | null {
  const rawCache = localStorage.getItem(RATES_CACHE_KEY);
  if (!rawCache) return null;
  try {
    return JSON.parse(rawCache) as RatesCache;
  } catch {
    localStorage.removeItem(RATES_CACHE_KEY);
    return null;
  }
}

export function getFreshRatesCache(): RatesCache {
  const cache = loadRatesCache();
  if (!cache) {
    return null;
  }
  if (Date.now() > cache.expiresAt) {
    return null;
  }
  return cache;
}
