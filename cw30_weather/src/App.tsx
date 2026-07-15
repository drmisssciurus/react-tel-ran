import { useState } from 'react';
import type { WeatherStatus } from './types/types';
import Info from './components/Info';
import WeatherCard from './components/WeatherCard';
import WeatherForm from './components/WeatherForm';
import { getWeatherByCity } from './api/weather';
import './App.css';

function App() {
  const [city, setCity] = useState<string>('');
  const [weatherStatus, setWeatherStatus] = useState<WeatherStatus>({
    type: 'idle',
    message: 'enter a city name to see current weather',
  });

  const handleWeatherRequest = async (requestCity: string) => {
    if (!requestCity) {
      setWeatherStatus({ type: 'error', message: 'Please enter a city name' });
      return;
    }
    setWeatherStatus({ type: 'loading', message: 'Fetching weather...' });
    try {
      const weather = await getWeatherByCity(requestCity);
      setWeatherStatus({ type: 'success', data: weather });
      setCity('');
    } catch (e) {
      setWeatherStatus({
        type: 'error',
        message: e instanceof Error ? e.message : 'Something went wrong',
      });
    }
  };

  return (
    <main className="app">
      <section className="card">
        <Info />
        <WeatherForm
          city={city}
          onCityChange={setCity}
          onSubmit={handleWeatherRequest}
          isLoading={weatherStatus.type === 'loading'}
        />
        <WeatherCard status={weatherStatus} />
      </section>
    </main>
  );
}

export default App;
