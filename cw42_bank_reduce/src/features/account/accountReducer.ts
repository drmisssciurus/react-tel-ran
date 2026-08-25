import {
  type AccountAction,
  DEPOSIT,
  RESET,
  WITHDRAW,
} from './accountActions.ts';

export const initialState: AccountState = {
  balance: 0,
};

export type AccountState = {
  balance: number;
};

export function accountReducer(
  state: AccountState = initialState,
  action: AccountAction
): AccountState {
  switch (action.type) {
    case DEPOSIT:
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case WITHDRAW:
      const res = state.balance - action.payload;
      return {
        ...state,
        balance: res < 0 ? state.balance : res,
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
}
