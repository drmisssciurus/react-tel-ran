import { getFreshRatesCache, getRatesCacheExpiresAt, loadRatesCache, saveRatesCache } from "../storage/currencyStorage";
import type { CurrencyCode, FrankfurterRatesResponse, RatesData, RatesResult } from "../types";

const API_URL = "https://api.frankfurter.dev/v1/latest";
const SUPPORTED_CURRENCIES: CurrencyCode[] = ["EUR", "USD", "GBP", "ILS"];

function normalizeRatesResponse(response: FrankfurterRatesResponse): RatesData {
  if (response.base !== "EUR" || !response.rates || !response.date) {
    throw new Error("Frankfurter API returned an invalid response");
  }

  return {
    base: "EUR",
    date: response.date,
    fetchedAt: Date.now(),
    rates: {
      EUR: 1,
      USD: response.rates.USD ?? 0,
      GBP: response.rates.GBP ?? 0,
      ILS: response.rates.ILS ?? 0,
    },
  };
}

export async function loadRates(forceRefresh = false): Promise<RatesResult> {
  if (!forceRefresh) {
    const cache = getFreshRatesCache();

    if (cache) {
      return {
        data: cache.data,
        source: "localStorage",
        expiresAt: getRatesCacheExpiresAt(cache.savedAt),
      };
    }
  }

  const params = new URLSearchParams({
    base: "EUR",
    symbols: SUPPORTED_CURRENCIES.filter((currency) => currency !== "EUR").join(","),
  });

  const response = await fetch(`${API_URL}?${params.toString()}`);
  const payload = (await response.json()) as FrankfurterRatesResponse;

  if (!response.ok) {
    const cache = loadRatesCache();

    if (cache) {
      return {
        data: cache.data,
        source: "localStorage",
        expiresAt: getRatesCacheExpiresAt(cache.savedAt),
      };
    }

    throw new Error("Failed to load exchange rates");
  }

  const data = normalizeRatesResponse(payload);
  saveRatesCache(data);

  return {
    data,
    source: "api",
    expiresAt: Date.now() + 60 * 60 * 1000,
  };
}
