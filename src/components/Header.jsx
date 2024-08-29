import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { ThemeContext } from 'src/components/Theme';
import Navbar from 'src/components/Navbar';
import LogoMenu from 'src/components/menu/LogoMenu';
import { SunOutlined, MoonOutlined, MenuOutlined, BellOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Drawer, Input, Typography } from 'antd';
const { Text } = Typography;

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
  const location = useLocation();
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
      <div className='flex justify-between items-center h-full px-4 2xl:px-6 m-auto'>
        <button className='flex-none' onClick={() => navigate('/dashboard')}>
          <img src='/logo.png' className='h-[40px]' />
        </button>
        <Navbar list={list} className="h-full hidden 2xl:inline" />
        <div className='pr-2'>
          <Input placeholder='Type keywords...' prefix={<SearchOutlined />} suffix={<Text keyboard>Ctrl K</Text>} className='hidden sm:inline-flex rounded-full bg-transparent' />
        </div>
        <div className='flex justify-center items-center gap-2'>
          <Badge count={5} color="hsl(102, 70%, 61%)">
            <Button shape='circle' icon={<BellOutlined />} />
          </Badge>
          <Button shape='circle' icon={<img src='./language.png' />} />
          <Button shape="circle" icon={theme === 'light' ? <SunOutlined /> : <MoonOutlined />} onClick={toggleTheme} />
          <LogoMenu>
            <Button icon={<Avatar src={'./user/man.png'} />} className='rounded-full' />
          </LogoMenu>
          <div className='2xl:hidden'>
            <Button onClick={showDrawer} icon={<MenuOutlined />} />
          </div>
        </div>
        <Drawer title="Menu" onClose={onClose} open={open}>
          <div className='flex flex-col gap-2 w-full'>
            {list.map((item, index) => (
              <div key={index} onClick={() => navigate(`/${item.key}`)} className={`w-full hover:bg-hover-primary p-2 rounded-lg cursor-pointer ${location.pathname.slice(1) === item.key ? 'bg-base-primary' : 'bg-bg-300'}`}>
                <Typography className={location.pathname === `/${item.key}` ? 'text-colorLink' : ''}>{item.value}</Typography>
              </div>
            ))}
          </div>
        </Drawer>
      </div>
    </header >
  );
}

export default Header;
