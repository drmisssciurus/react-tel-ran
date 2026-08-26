import { combineReducers, legacy_createStore } from 'redux';
import { WeatherReducer } from '../features/weather/weatherReducer';
import type { WeatherAction } from '../features/weather/weatherActions';
import type { ProfileAction } from '../features/profile/profileActions';
import { ProfileReducer } from '../features/profile/profileReducer';

const rootReducer = combineReducers({
  profile: ProfileReducer,
  weather: WeatherReducer,
});

export const store = legacy_createStore(rootReducer);
export type RootState = ReturnType<typeof rootReducer>;
export type AppAction = ProfileAction | WeatherAction;
export type AppDispatch = typeof store.dispatch;
