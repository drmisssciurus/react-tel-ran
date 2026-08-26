import { useAppSelector } from '../app/hooks.ts';
import { formatCityTime } from '../utils/formatTime.ts';

function WeatherCard() {
  const { status, data, error } = useAppSelector((state) => state.weather);

  if (status === 'idle') {
    return (
      <section className="message-card">
        <p>Enter a city name to see current weather</p>
      </section>
    );
  }
  if (status === 'loading') {
    return <section className="message-card">Loading...</section>;
  }
  if (status === 'error') {
    return (
      <section className="message-card message-card--error">{error}</section>
    );
  }
  if (!data) {
    return <section className="message-card">No data</section>;
  }

  return (
    <section className="weather-card">
      <div>
        <p className="weather-card__label">Location</p>
        <h2>
          {data.city}, {data.country}
        </h2>
        <p className="weather-card__description">{data.description}</p>
      </div>
      <p className="weather-card__temp">{Math.round(data.temperature)} C</p>
      <dl className="weather-grid">
        <div>
          <dt>Feels like</dt>
          <dd>{Math.round(data.feelslike)} C</dd>
        </div>
        <div>
          <dt>Pressure</dt>
          <dd>{data.pressure} hPa</dd>
        </div>
        <div>
          <dt>Humidity</dt>
          <dd>{data.humidity} %</dd>
        </div>
        <div>
          <dt>Wind</dt>
          <dd>{data.windSpeed}</dd>
        </div>
        <div>
          <dt>Sunset</dt>
          {/*<dd>{data.sunset}</dd>*/}
          <dd>{formatCityTime(data.sunset, data.timezone)}</dd>
        </div>
      </dl>
    </section>
  );
}

export default WeatherCard;
