import type { WeatherStatus } from '../types/types';

type WeatherCardProps = {
  status: WeatherStatus;
};

function formatDate(date: number, timezoneOffset: number) {
  const unuversalTimeMs = date * 1000 + timezoneOffset * 1000;
  return new Date(unuversalTimeMs).toISOString().slice(11, 16);
}

const WeatherCard = ({ status }: WeatherCardProps) => {
  if (status.type === 'idle' || status.type === 'loading') {
    return <div className="weather-status">{status.message}</div>;
  }
  if (status.type === 'error') {
    return (
      <div className="weather-status weather-status--error">
        {status.message}
      </div>
    );
  }
  const { data } = status;
  return (
    <div className="weather-result">
      <h2 className="weather-result__city">
        {data.city}, {data.country}
      </h2>
      <div className="weather-result__main">
        <div className="card_numbers">Temperature {data.temp.toFixed(0)}°C</div>
        <div className="card_numbers">
          Feels like {data.feelselike.toFixed(0)}°C
        </div>
        <div className="card_numbers">Wind speed {data.windSpeed} m/s</div>
        <div className="card_numbers">Humidity {data.humidity} %</div>
        <div className="card_numbers">Pressure {data.pressure} mb</div>
        <div className="card_numbers">
          Sunset {formatDate(data.sunset, data.timezone)} by local TimeZone
        </div>
        <div className="card_numbers">
          Sunrise {formatDate(data.sunrise, data.timezone)} by local TimeZone
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
