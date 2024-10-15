import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Menu } from "antd";

const Sidebar = ({ items, ...props }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [current, setCurrent] = useState();
  const currentPath = location.pathname;

  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const handleSubmenu = (e) => {
    let parts = location.pathname.split("/");
    parts[parts.length - 1] = e.key;
    navigate(parts.join("/"));
  };

  useEffect(() => {
    const paths = location.pathname.split("/").filter(Boolean);
    if (paths.length < 2) {
      navigate(`${location.pathname}/${items[paths[0]][0]["key"]}`);
    } else setCurrent(paths[1]);
  }, [location.pathname]);

  if (currentPath === "/dashboard/overview") {
    return null;
  }
  return (
    <aside className={props.className}>
      <div
        className={`relative h-full bg-bg-light border-r border-border-100 ${
          collapsed ? "w-fit" : "w-[250px]"
        }`}>
        <Menu
          className="font-bold"
          onSelect={handleSubmenu}
          selectedKeys={[currentPath]}
          mode="inline"
          items={items[location.pathname.split("/")[1]]}
        />
        {/* <div onClick={toggleCollapsed} className='absolute top-4 right-[-10px] p-1 text-center bg-bg-light-dark rounded-full cursor-pointer z-50'>
          {collapsed ? <RightOutlined className='w-4' /> : <LeftOutlined className='w-4' />}
        </div> */}
      </div>
    </aside>
  );
};

export default Sidebar;
