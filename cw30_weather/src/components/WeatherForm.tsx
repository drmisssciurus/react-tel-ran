import { type FormEvent } from 'react';

type WeatherFormProps = {
  city: string;
  onCityChange: (city: string) => void;
  onSubmit: (city: string) => void;
  isLoading: boolean;
};

const WeatherForm = ({ city, onCityChange, onSubmit, isLoading }: WeatherFormProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(city.trim());
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form__label" htmlFor="city">City</label>
      <div className="form__row">
        <input
          className="form__input"
          type="text"
          id="city"
          name="city"
          placeholder="Haifa"
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
        />
        <button className="form__btn" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Show weather'}
        </button>
      </div>
    </form>
  );
};

export default WeatherForm;
