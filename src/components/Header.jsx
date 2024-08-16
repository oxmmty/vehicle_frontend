import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, NavLink } from "react-router-dom";
import { ThemeContext } from 'src/components/Theme';
import Navbar from 'src/components/Navbar';
import LogoMenu from 'src/components/menu/LogoMenu';
import { SunOutlined, MoonOutlined, MenuOutlined, BellOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Drawer, Input, Typography } from 'antd';
const { Text } = Typography;
import { capitalize } from 'src/utils/General';

const list = [
  { key: 'dashboard', value: 'ダッシュボード' },
  { key: 'container', value: 'コンテナ' },
  { key: 'truck', value: 'トラック' },
  { key: 'daily', value: '作業日報' },
  { key: 'clamping', value: '締め処理' },
  { key: 'invoicing', value: '請求書発行' },
  { key: 'payment', value: '支払書発行' },
  { key: 'maintainer', value: 'マスタメンテ' },
  { key: 'analysis', value: '車両・就労分析' },
  { key: 'order', value: 'Web受注' }
];

const Header = ({ ...props }) => {
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
    <header className={props.className}>
      <div className='flex justify-between items-center h-full px-4 lg:px-10 m-auto'>
        <button onClick={() => navigate('/dashboard')}>
          <img src='/logo.png' className='h-[45px]' />
        </button>
        <Navbar list={list} className="h-full" />
        <div>
          <Input placeholder='Type keywords...' prefix={<SearchOutlined />} suffix={<Text keyboard>Ctrl K</Text>} className='hidden sm:inline-flex rounded-full bg-transparent' />
        </div>
        <div className='flex justify-center items-center gap-2'>
          <Badge count={5}>
            <Button shape='circle' icon={<BellOutlined />} />
          </Badge>
          <Button shape='circle' icon={<img src='./language.png' />} />
          <Button shape="circle" icon={theme === 'light' ? <SunOutlined /> : <MoonOutlined />} onClick={toggleTheme} />
          <LogoMenu>
            <Button icon={<Avatar src={'./user/man.png'} />} className='rounded-full' />
          </LogoMenu>
          <Button onClick={showDrawer} icon={<MenuOutlined />} className='md:hidden' />
        </div>

        <Drawer title="Menu" onClose={onClose} open={open}>
          <nav>
            <ul className='flex flex-col justify-center text-xl gap-2'>
              {list.map((item, index) => (
                <NavLink onClick={onClose} key={index} to={`/${item.key}`} className={location.pathname === `/${item.key}` ? 'text-colorLink' : ''}>{item.value}</NavLink>
              ))}
            </ul>
          </nav>
        </Drawer>
      </div>
    </header >
  );
}

export default Header;
