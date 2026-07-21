import type { CurrencyCode, RatesData } from '../types';

export const currencies: CurrencyCode[] = ['USD', 'EUR', 'ILS', 'SEK'];

export function convertCurrency(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode,
  ratesData?: RatesData
) {
  if (!ratesData) return 0;

  if (from === to) return amount;

  const fromRate = from === ratesData.base ? 1 : ratesData.rates[from];
  const toRate = to === ratesData.base ? 1 : ratesData.rates[to];

  if (!fromRate || !toRate) return 1;
  return (amount / fromRate) * toRate;
}
