import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { end: true, to: '/', label: 'Home' },
  { to: '/class', label: 'Class lifecycle' },
  { to: '/function', label: 'Function lifecycle' },
];

function AppLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Currency rates cache</p>
          <h1>Lifecycle demo</h1>
        </div>

        <nav className="nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) => (isActive ? 'active' : '')}
              end={item.end}
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>{<Outlet />}</main>
    </div>
  );
}

export default AppLayout;
