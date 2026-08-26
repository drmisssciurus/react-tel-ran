import type { FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  changeCityAction,
  resetWeatherAction,
  showWeatherErrorAction,
  showWeatherLoadingAction,
  showWeatherSuccessAction,
} from '../features/weather/weatherActions';
import { getWeatherByCity } from '../api/weatherApi';
import { loadWeather } from '../api/weatherAxios';

function WeatherSearch() {
  const dispatch = useAppDispatch();
  const { city, status } = useAppSelector((state) => state.weather);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trCity = city.trim();
    if (!trCity) {
      dispatch(showWeatherErrorAction('Please enter a city name'));
      return;
    }

    dispatch(showWeatherLoadingAction());
    try {
      const data = await loadWeather(trCity);
      dispatch(changeCityAction(trCity));
      dispatch(showWeatherSuccessAction(data));
    } catch (error) {
      dispatch(
        showWeatherErrorAction(
          error instanceof Error
            ? error.message
            : 'Something went wrong. Try again'
        )
      );
    }
  }

  return (
    <form className="weather-form" onSubmit={handleSubmit}>
      <label htmlFor="city">City</label>
      <div className="weather-form__row">
        <input
          id="city"
          name="city"
          type="text"
          placeholder="Haifa"
          value={city}
          onChange={(e) => dispatch(changeCityAction(e.target.value))}
        />
        <button disabled={status === 'loading'} type="submit">
          {status === 'loading' ? 'Loading...' : 'Show weather'}
        </button>
        <button onClick={() => dispatch(resetWeatherAction())}>Reset</button>
      </div>
    </form>
  );
}
export default WeatherSearch;
