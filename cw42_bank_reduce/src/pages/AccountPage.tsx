import './AccountPage.css';
import Balance from '../components/Balance.tsx';
import Operation from '../components/Operation.tsx';

function AccountPage() {
  return (
    <div className="account-page">
      <Balance />
      <Operation />
    </div>
  );
}

export default AccountPage;
