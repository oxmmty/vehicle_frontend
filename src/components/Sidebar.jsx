import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

const Sidebar = ({ ...props }) => {
  const location = useLocation();
  const items = [
    {
      key: '1',
      icon: <PieChartOutlined />,
      label: 'Option 1',
    },
    {
      key: '2',
      icon: <DesktopOutlined />,
      label: 'Option 2',
    },
    {
      key: '3',
      icon: <ContainerOutlined />,
      label: 'Option 3',
    },
    {
      key: 'sub1',
      label: 'Navigation One',
      icon: <MailOutlined />,
      children: [
        {
          key: '5',
          label: 'Option 5',
        },
        {
          key: '6',
          label: 'Option 6',
        },
        {
          key: '7',
          label: 'Option 7',
        },
        {
          key: '8',
          label: 'Option 8',
        },
      ],
    },
    {
      key: 'sub2',
      label: 'Navigation Two',
      icon: <AppstoreOutlined />,
      children: [
        {
          key: '9',
          label: 'Option 9',
        },
        {
          key: '10',
          label: 'Option 10',
        },
        {
          key: 'sub3',
          label: 'Submenu',
          children: [
            {
              key: '11',
              label: 'Option 11werqwer',
            },
            {
              key: '12',
              label: 'Option 12',
            },
          ],
        },
      ],
    },
  ];
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {

  }, [location.pathname]);

  return (
    <aside className={props.className}>
      <div className={`relative h-full bg-bg-light border-r border-border-100 ${collapsed ? 'w-fit' : 'w-[250px]'}`}>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          inlineCollapsed={collapsed}
          items={items}
        />
        <div onClick={toggleCollapsed} className='absolute top-4 right-[-10px] p-1 text-center bg-bg-light-dark rounded-full cursor-pointer z-50'>
          {collapsed ? <RightOutlined className='w-4'/> : <LeftOutlined className='w-4'/> }
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;