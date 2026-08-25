import { useState } from 'react';

import { useAppDispatch } from '../app/hooks';
import {
  depositAction,
  resetAction,
  withdrawAction,
} from '../features/account/accountActions';

function Operation() {
  const [sum, setSum] = useState<number>(0);
  const dispatch = useAppDispatch();
  return (
    <div className="account-operations">
      <button
        type="button"
        className="account-btn"
        onClick={() => dispatch(withdrawAction(sum))}
      >
        Withdraw
      </button>
      <input
        className="account-input"
        type="number"
        min={0}
        value={sum}
        onChange={(e) => setSum(Number(e.target.value))}
      />
      <button
        type="button"
        className="account-btn"
        onClick={() => dispatch(depositAction(sum))}
      >
        Deposit
      </button>
      <button
        type="button"
        className="account-btn account-btn-reset"
        onClick={() => dispatch(resetAction())}
      >
        Reset Balance
      </button>
    </div>
  );
}

export default Operation;
