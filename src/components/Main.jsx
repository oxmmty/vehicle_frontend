import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const Main = ({...props}) => {
  const location = useLocation();
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  useEffect(() => {
    const paths = location.pathname.split('/').filter(Boolean);
    const breadcrumbList = [
      {
        title: <Link to="/"><HomeOutlined /></Link>,
      },
    ];

    let currentPath = '';
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      if (index === paths.length - 1) {
        breadcrumbList.push({
          title: path,
        });
      } else {
        breadcrumbList.push({
          title: <Link to={currentPath}>{path}</Link>,
        });
      }
    });

    setBreadcrumbItems(breadcrumbList);
  }, [location.pathname]);

  return (
    <main className={props.className}>
      <div className='sticky'>
        dsfadsfasdf
      </div>
      <div className='bg-bg-dark p-1 sm:p-2 rounded-lg shadow-custom'>
        <Outlet />
      </div>
    </main>
  );
}

export default Main;