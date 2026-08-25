import { useAppSelector } from '../app/hooks';

function Balance() {
  const balance = useAppSelector((state) => state.account.balance);
  return (
    <div className="account-balance">
      <p className="account-label">Bank account</p>
      <h3 className="account-amount">Balance = ${balance}</h3>
    </div>
  );
}

export default Balance;
