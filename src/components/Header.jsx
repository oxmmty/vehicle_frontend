import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, NavLink } from "react-router-dom";
import { ThemeContext } from 'src/components/Theme';
import Navbar from 'src/components/Navbar';
import LogoMenu from 'src/components/menu/LogoMenu';
import { SunOutlined, MoonOutlined, MenuOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import { capitalize } from 'src/utils/General';

const list = ['dashboard', 'container', 'truck', 'daily', 'clamping', 'invoicing', 'payment', 'maintainer', 'analysis', 'order'];

const Header = () => {
  const navigate = useNavigate();
  const { userName } = useSelector(state => state.user);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className='flex justify-between items-center h-full px-4 lg:px-10 max-w-[1440px] m-auto'>
      <div className='flex-none'>
        <button onClick={() => navigate('/dashboard')}>
          <img src='/logo.png' className='h-[45px]' />
        </button>
      </div>
      <div className='flex-grow hidden md:block'>
        <Navbar list={list} />
      </div>
      <div className='flex items-center gap-4 lg:gap-10'>
        <button shape="circle" className='flex justify-center items-center w-[40px] h-[40px] bg-base-100' onClick={toggleTheme}>
          {theme === 'light' ? <SunOutlined className='text-[30px] text-text-100' /> : <MoonOutlined className='text-[30px] text-text-100' />}
        </button>
        <div className='flex-none'>
          <LogoMenu>
            <div className='flex items-center gap-2'>
              <img src='/user/man.png' className='w-[30px] rounded-full' />
            </div>
          </LogoMenu>
        </div>
        <button onClick={showDrawer} className='md:hidden'>
          <MenuOutlined className='text-[30px]' />
        </button>
      </div>
      <Drawer title="Menu" onClose={onClose} open={open}>
        <nav>
          <ul className='flex flex-col justify-center text-xl gap-2'>
            {list.map((item, index) => (
              <NavLink onClick={onClose} key={index} to={`/${item}`} className={location.pathname === `/${item}` ? 'text-colorLink' : ''}>{capitalize(item)}</NavLink>
            ))}
          </ul>
        </nav>
      </Drawer>
    </div>
  );
}

export default Header;
