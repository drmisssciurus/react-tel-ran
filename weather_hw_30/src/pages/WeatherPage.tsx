import WeatherSearch from '../components/WeatherSearch';
import WeatherCard from '../components/WeatherCard';

function WeatherPage() {
  return (
    <section className="app-shell">
      <WeatherSearch />
      <WeatherCard />
    </section>
  );
}

export default WeatherPage;
