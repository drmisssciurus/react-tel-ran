import { NavLink, Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <div className="app-layout">
      <nav className="site-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/weather">Weather</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>
      <main className="page">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
