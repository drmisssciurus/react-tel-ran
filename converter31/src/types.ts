export type AppPage = 'home' | 'class' | 'function';

export type ConverterControls = {
  amount: number;
  from: CurrencyCode;
  to: CurrencyCode;
};

export type RatesData = {
  base: CurrencyCode;
  date: string;
  rates: Record<CurrencyCode, number>;
};

export type CurrencyCode = 'USD' | 'EUR' | 'ILS' | 'SEK';

export type RatesStatus =
  | { type: 'idle'; message: string }
  | { type: 'loading'; message: string }
  | { type: 'success'; result: RateResult }
  | { type: 'error'; message: string };

export type RateResult = {
  data: RatesData;
  source: 'api' | 'localStorage';
  expiresAt: number;
};
