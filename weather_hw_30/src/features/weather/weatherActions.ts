import type { RequestStatus, WeatherInfo } from '../../types/types';

export const CHANGE_CITY = 'weather/changeCity';
export const SHOW_WEATHER_LOADING = 'weather/showLoading';
export const SHOW_WEATHER_SUCCESS = 'weather/showSuccess';
export const SHOW_WEATHER_ERROR = 'weather/showError';
export const RESET_WEATHER = 'weather/reset';

export type WeatherState = {
  city: string;
  status: RequestStatus;
  data: WeatherInfo | null;
  error: string | null;
};

export type ChangeCityAction = {
  type: typeof CHANGE_CITY;
  payload: string;
};

export type ShowWeatherLoadingAction = {
  type: typeof SHOW_WEATHER_LOADING;
};

export type ShowWeatherSuccessAction = {
  type: typeof SHOW_WEATHER_SUCCESS;
  payload: WeatherInfo;
};

export type ShowWeatherErrorAction = {
  type: typeof SHOW_WEATHER_ERROR;
  payload: string;
};

export type ResetWeatherAction = {
  type: typeof RESET_WEATHER;
};

export type WeatherAction =
  | ChangeCityAction
  | ShowWeatherLoadingAction
  | ShowWeatherSuccessAction
  | ShowWeatherErrorAction
  | ResetWeatherAction;

export function changeCityAction(city: string): ChangeCityAction {
  return {
    type: CHANGE_CITY,
    payload: city,
  };
}

export function showWeatherLoadingAction(): ShowWeatherLoadingAction {
  return {
    type: SHOW_WEATHER_LOADING,
  };
}

export function showWeatherSuccessAction(
  weather: WeatherInfo
): ShowWeatherSuccessAction {
  return {
    type: SHOW_WEATHER_SUCCESS,
    payload: weather,
  };
}

export function showWeatherErrorAction(error: string): ShowWeatherErrorAction {
  return {
    type: SHOW_WEATHER_ERROR,
    payload: error,
  };
}

export function resetWeatherAction(): ResetWeatherAction {
  return {
    type: RESET_WEATHER,
  };
}
