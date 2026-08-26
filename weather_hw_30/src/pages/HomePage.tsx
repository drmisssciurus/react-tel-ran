import { NavLink } from 'react-router-dom';
import Info from '../components/Info';

function HomePage() {
  return (
    <div className="app-shell">
      <Info />
      <nav className="home-links">
        <NavLink to="/weather">Weather</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>
    </div>
  );
}

export default HomePage;
