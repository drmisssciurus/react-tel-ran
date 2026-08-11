import type { CurrencyCode, RatesData } from "../types";

export const currencies: CurrencyCode[] = ["EUR", "USD", "GBP", "ILS"];

export function isCurrencyCode(value: string | undefined): value is CurrencyCode {
  return !!value && (currencies as string[]).includes(value);
}

export function convertCurrency(amount: number, from: CurrencyCode, to: CurrencyCode, ratesData?: RatesData) {
  if (!ratesData) {
    return 0;
  }

  const fromRate = ratesData.rates[from];
  const toRate = ratesData.rates[to];

  if (!fromRate || !toRate) {
    return 0;
  }

  return (amount / fromRate) * toRate;
}

export function formatDateTime(value: number | string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
