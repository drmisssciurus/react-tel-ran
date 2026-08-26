import React from 'react';
import { NavLink } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <NavLink to="/weather">Weather</NavLink>
      <NavLink to="/profile">Profile</NavLink>
    </div>
  );
}

export default HomePage;
