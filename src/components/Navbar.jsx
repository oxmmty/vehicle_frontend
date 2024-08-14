import React from 'react';
import { capitalize } from 'src/utils/General';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = ({list}) => {
  const location = useLocation();

  return (
    <nav>
      <ul className='flex justify-evenly items-center'>
        {list.map((item, index) => (
          <NavLink key={index} to={`/${item}`} className={ location.pathname === `/${item}` ? 'text-colorLink' : ''}>{capitalize(item)}</NavLink>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;