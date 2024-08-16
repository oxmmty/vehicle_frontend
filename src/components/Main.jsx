import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';

const Main = ({ ...props }) => {
  const location = useLocation();
  return (
    <main className={props.className}>
      <Outlet />
    </main>
  );
}

export default Main;