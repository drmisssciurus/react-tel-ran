import { combineReducers, legacy_createStore } from 'redux';
import { accountReducer } from '../features/account/accountReducer';
import { petReducer } from '../features/pet/petReducer';

const rootReducer = combineReducers({
  account: accountReducer,
  pet: petReducer,
});

export const store = legacy_createStore(rootReducer);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
