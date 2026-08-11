export type AppPage = "home" | "class" | "function";

export type CurrencyCode = "EUR" | "USD" | "GBP" | "ILS";

export type RatesData = {
  base: "EUR";
  date: string;
  fetchedAt: number;
  rates: Record<CurrencyCode, number>;
};

export type RatesSource = "api" | "localStorage";

export type RatesResult = {
  data: RatesData;
  source: RatesSource;
  expiresAt: number;
};

export type RatesStatus =
  | { type: "idle"; message: string }
  | { type: "loading"; message: string }
  | { type: "success"; result: RatesResult }
  | { type: "error"; message: string; cachedData?: RatesData };

export type FrankfurterRatesResponse = {
  amount: number;
  base: "EUR";
  date: string;
  rates: Partial<Record<CurrencyCode, number>>;
};
