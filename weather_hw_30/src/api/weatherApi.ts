import type { OpenWeatherResponse, WeatherInfo } from '../types/types.ts';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string | undefined;

function toWeatherInfo(data: OpenWeatherResponse): WeatherInfo {
  return {
    city: data.name,
    country: data.sys.country,
    temperature: data.main.temp,
    feelslike: data.main.feels_like,
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    description: data.weather[0]?.description ?? 'no description',
    sunset: data.sys.sunset,
    timezone: data.timezone,
  };
}

export async function getWeatherByCity(city: string): Promise<WeatherInfo> {
  if (!API_KEY || API_KEY === 'put_your_key_here') {
    throw new Error(
      'No API key provided - please add your own key to .env.local'
    );
  }
  const params = new URLSearchParams({
    q: city,
    appid: API_KEY,
    units: 'metric',
  });
  const response = await fetch(`${BASE_URL}?${params.toString()}`);
  const data = (await response.json()) as OpenWeatherResponse;
  if (!response.ok) throw new Error(data.message || 'weather request failed');
  return toWeatherInfo(data);
}
