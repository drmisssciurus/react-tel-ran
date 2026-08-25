import './App.css';
import { NavLink, Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <nav>
        <NavLink to="/account">Account</NavLink>
        <NavLink to="/pet">Pet</NavLink>
      </nav>
      <Outlet />
    </>
  );
}

export default App;
