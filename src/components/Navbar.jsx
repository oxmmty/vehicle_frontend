import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Anchor } from 'antd';

const Navbar = ({ list, ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentAnchor, setCurrentAnchor] = useState(location.pathname.slice(1));
  const [navbar, setNavbar] = useState([]);
  
  const getCurrentAnchor = () => currentAnchor;

  const setAnchor = (e, link) => {
    e.preventDefault();
    navigate(link.href);
    setCurrentAnchor(link.href);
  }
  
  useEffect(() => {
    setCurrentAnchor(location.pathname.slice(1));
  }, [location])

  useEffect(() => {
    const items = [];
    list.map((item, key) => {
      items.push(
        {
          key: key,
          href: item.key,
          title: <div className='flex items-center h-[52px]'>
            <div className='p-2 rounded-lg hover:bg-hover-primary'>
              {item.value}
            </div>
          </div>
        }
      )
    });
    setNavbar(items);
  }, [])

  return (
    <div className={`${props.className} flex items-center`}>
      <Anchor className='flex items-center m-auto'
        getCurrentAnchor={getCurrentAnchor}
        direction="horizontal"
        onClick={setAnchor}
        items={navbar}
      />
    </div>
  );
}

export default Navbar;