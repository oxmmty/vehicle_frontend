import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
    parts[parts.length - 1] = e.key; // Replace last part with selected key
    navigate(parts.join("/"));
  };

  useEffect(() => {
    const paths = location.pathname.split("/").filter(Boolean);
    if (paths.length < 2) {
      navigate(`${location.pathname}/${items[paths[0]][0]["key"]}`);
    } else {
      setCurrent(paths[1]); // Set current to match the second part of URL
    }
  }, [location.pathname]);

  if (currentPath === "/dashboard/overview") {
    return null; // Don't render sidebar for this path
  }

  // Get the relevant items based on the current path
  const menuItems = items[location.pathname.split("/")[1]] || [];

  return (
    <aside className={props.className}>
      <div
        className={`relative h-full bg-bg-light border-r border-border-100 ${
          collapsed ? "w-fit" : "w-[250px]"
        }`}>
        <Menu
          className="font-bold"
          onSelect={handleSubmenu}
          selectedKeys={[current]}
          mode="inline">
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </aside>
  );
};

export default Sidebar;
