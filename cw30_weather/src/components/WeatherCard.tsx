import type { WeatherStatus } from '../types/types';

type WeatherCardProps = {
  status: WeatherStatus;
};

function formatDate(date: number) {
  const newDate = date * 1000;
  const dateParts = new Date(newDate);
  return dateParts.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
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
        <div className="card_numbers">Temperature {data.temp}°C</div>
        <div className="card_numbers">Feels like {data.feelselike}</div>
        <div className="card_numbers">Wind speed {data.windSpeed}</div>
        <div className="card_numbers">Humidity {data.humidity}</div>
        <div className="card_numbers">Pressure {data.pressure}</div>
        <div className="card_numbers">Sunset {formatDate(data.sunset)}</div>
      </div>
    </div>
  );
};

export default WeatherCard;
