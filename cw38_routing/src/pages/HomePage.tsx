import { Link, useNavigate } from 'react-router-dom';
import type { AppPage } from '../types';

function HomePage() {
  const navigate = useNavigate();

  return (
    <section className="panel home-panel">
      <p className="eyebrow">Main page</p>
      <h2>Choose a lifecycle example</h2>
      <p>
        Both examples load currency rates from Frankfurter and cache the result
        in localStorage. If the cache is fresh, the app uses browser storage. If
        it is expired, the app requests fresh rates again.
      </p>

      <div className="home-actions">
        <Link to="/class">Open Class lifecycle</Link>
        <Link to="/function">Open Function lifecycle</Link>
      </div>

      <h2>Quick currency conversions</h2>
      <div className="home-actions">
        <Link to="/convert/EUR/USD">EUR → USD</Link>
        <Link to="/convert/USD/GBP">USD → GBP</Link>
        <Link to="/convert/EUR/ILS">EUR → ILS</Link>
      </div>
    </section>
  );
}

export default HomePage;
