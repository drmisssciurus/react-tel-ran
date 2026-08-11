import type { RatesData } from "../types";

const RATES_CACHE_KEY = "currency-converter:rates-cache";
export const RATES_CACHE_TTL_MS = 60 * 60 * 1000;

type RatesCache = {
  savedAt: number;
  data: RatesData;
};

export function loadRatesCache(): RatesCache | null {
  try {
    const raw = localStorage.getItem(RATES_CACHE_KEY);
    return raw ? (JSON.parse(raw) as RatesCache) : null;
  } catch {
    localStorage.removeItem(RATES_CACHE_KEY);
    return null;
  }
}

export function saveRatesCache(data: RatesData) {
  const cache: RatesCache = {
    savedAt: Date.now(),
    data,
  };

  localStorage.setItem(RATES_CACHE_KEY, JSON.stringify(cache));
}

export function getFreshRatesCache(maxAgeMs = RATES_CACHE_TTL_MS): RatesCache | null {
  const cache = loadRatesCache();

  if (!cache) {
    return null;
  }

  return Date.now() - cache.savedAt <= maxAgeMs ? cache : null;
}

export function getRatesCacheExpiresAt(savedAt: number, maxAgeMs = RATES_CACHE_TTL_MS) {
  return savedAt + maxAgeMs;
}
