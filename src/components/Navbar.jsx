import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = ({ list, ...props }) => {
  const location = useLocation();

  return (
    <div className={`${props.className} flex items-center gap-8`}>
        {list.map((item, index) => (
          // <div className='h-full bg-red-400'>
            <NavLink key={index} to={`/${item.key}`} className={location.pathname === `/${item.key}` ? 'text-colorLink' : ''}>{item.value}</NavLink>
          // </div>
        ))}
    </div>
  );
}

export default Navbar;