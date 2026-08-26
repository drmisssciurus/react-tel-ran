export type WeatherStatus =
  | { type: 'idle' }
  | { type: 'loading'; message: string }
  | { type: 'error'; message: string }
  | { type: 'success'; data: WeatherInfo };

export type RequestStatus = 'idle' | 'loading' | 'error' | 'success';

export type WeatherInfo = {
  city: string;
  country: string;
  temperature: number;
  feelslike: number;
  pressure: number;
  humidity: number;
  windSpeed: number;
  description: string;
  sunset: number;
  timezone: number;
};

export type OpenWeatherResponse = {
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
    country: string;
    sunset: number;
  };
  cod: number | string;
  message?: string;
};
