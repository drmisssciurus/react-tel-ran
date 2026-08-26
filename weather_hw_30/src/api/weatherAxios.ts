import axios from 'axios';
import type { OpenWeatherResponse, WeatherInfo } from '../types/types';

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

export const api = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric',
  },
});

export const loadWeather = async (city: string) => {
  const response = await api.get('', { params: { q: city } });
  return toWeatherInfo(response.data);
};
