import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { ThemeContext } from 'src/components/Theme';
import Navbar from 'src/components/Navbar';
import LogoMenu from 'src/components/menu/LogoMenu';
import { SunOutlined, MoonOutlined, MenuOutlined, BellOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Drawer, Input, Typography } from 'antd';
const { Text } = Typography;

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
      <LogoMenu>
        <Button icon={<Avatar src={'./user/man.png'} />} className='rounded-full' />
      </LogoMenu>
    </header >
  );
}

export default Header;
