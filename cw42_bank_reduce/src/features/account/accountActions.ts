export const DEPOSIT = 'account/deposit';
export const WITHDRAW = 'account/withdraw';
export const RESET = 'account/reset';

export type DepositAction = {
  type: typeof DEPOSIT;
  payload: number;
};

export type WithdrawActions = {
  type: typeof WITHDRAW;
  payload: number;
};

export type ResetAction = {
  type: typeof RESET;
};

export type AccountAction = DepositAction | WithdrawActions | ResetAction;

export function depositAction(sum: number): DepositAction {
  return {
    type: DEPOSIT,
    payload: sum,
  };
}

export function withdrawAction(sum: number): WithdrawActions {
  return {
    type: WITHDRAW,
    payload: sum,
  };
}

export function resetAction(): ResetAction {
  return {
    type: RESET,
  };
}
