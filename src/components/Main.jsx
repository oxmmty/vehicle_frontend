import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Breadcrumb } from "antd"
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

const Main = ({ ...props }) => {
  const location = useLocation();
  return (
    <main className={props.className}>
      <div className='bg-base-300 p-1 sm:p-2 rounded-lg shadow-custom'>
        <Breadcrumb className='p-4'
          items={[
            {
              href: '',
              title: <HomeOutlined />,
            },
            {
              href: '',
              title: (
                <>
                  <UserOutlined />
                  <span>Application List</span>
                </>
              ),
            },
            {
              title: 'Application',
            },
          ]}
        />
        <Outlet />
      </div>
    </main>
  );
}

export default Main;