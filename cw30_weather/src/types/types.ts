export type WeatherStatus =
  | { type: 'idle'; message: string }
  | { type: 'loading'; message: string }
  | {
      type: 'error';
      message: string;
    }
  | { type: 'success'; data: WeatherInfo };

export type WeatherInfo = {
  city: string;
  country: string;
  temp: number;
  feelselike: number;
  pressure: number;
  humidity: number;
  windSpeed: number;
  description: string;
  sunset: number;
  sunrise: number;
  timezone: number;
};

export type OpenWeatherResponce = {
  name: string;
  timezone: number;
  weather: Array<{ description: string }>;
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  wind: { speed: number };
  sys: {
    sunrise: number;
    country: string;
    sunset: number;
  };
  message?: string;
  cod: number | string;
};
