import {
  CHANGE_CITY,
  RESET_WEATHER,
  SHOW_WEATHER_ERROR,
  SHOW_WEATHER_LOADING,
  SHOW_WEATHER_SUCCESS,
  type WeatherAction,
  type WeatherState,
} from './weatherActions';

export const initiaWeatherState: WeatherState = {
  city: 'Kefar Sava',
  status: 'idle',
  data: null,
  error: null,
};

export function WeatherReducer(
  state = initiaWeatherState,
  action: WeatherAction
): WeatherState {
  switch (action.type) {
    case CHANGE_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case SHOW_WEATHER_LOADING:
      return {
        ...state,
        status: 'loading',
        data: null,
        error: null,
      };
    case SHOW_WEATHER_SUCCESS:
      return {
        ...state,
        status: 'success',
        data: action.payload,
        error: null,
      };
    case SHOW_WEATHER_ERROR:
      return {
        ...state,
        status: 'error',
        data: null,
        error: action.payload,
      };
    case RESET_WEATHER:
      return initiaWeatherState;
    default:
      return state;
  }
}
