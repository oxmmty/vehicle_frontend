import { Anchor } from 'antd';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Toc = ({ ...props }) => {
  const location = useLocation();
  const items = [
    {
      key: '1',
      href: '#anchor-demo-basic',
      title: 'Basic demo',
    },
    {
      key: '2',
      href: '#anchor-demo-static',
      title: 'Static demo',
    },
    {
      key: '3',
      href: '#api',
      title: 'API',
      children: [
        {
          key: '4',
          href: '#anchor-props',
          title: 'Anchor Props',
        },
        {
          key: '5',
          href: '#link-props',
          title: 'Link Props',
        },
      ],
    }
  ];

  return (
    <aside className={props.className}>
      <Anchor items={items} />
    </aside>
  );
}

export default Toc;