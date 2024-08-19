import { Anchor } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const { Link } = Anchor;

const Toc = ({ ...props }) => {
  const location = useLocation();
  const [anchorItems, setAnchorItems] = useState([]);
  
  useEffect(() => {
    // Find all elements with an ID in the document
    const sections = document.querySelectorAll('.anchor-section[id]');
    const items = [];

    sections.forEach(section => {
      const id = section.id;
      const title = section.dataset.anchorTitle || id; // Use a data attribute for title or fallback to the ID
      items.push({ key: id, href: `#${id}`, title });
    });

    setAnchorItems(items);
  }, [location.pathname]);

  return (
    <aside className={props.className}>
      <Anchor>
        {anchorItems.map(item => (
          <Link key={item.key} href={item.href} title={item.title} />
        ))}
      </Anchor>
    </aside>
  );
}

export default Toc;