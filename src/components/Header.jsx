import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { ThemeContext } from "src/components/Theme";
import Navbar from "src/components/Navbar";
import LogoMenu from "src/components/menu/LogoMenu";
import {
  DashboardOutlined,
  FileTextOutlined,
  ContainerOutlined,
  DatabaseOutlined,
  BarChartOutlined,
  FileOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { SunOutlined, MoonOutlined, MenuOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Drawer, Image, Menu, Typography } from "antd";
const { Text } = Typography;

const list = [
  { key: "dashboard", value: "ダッシュボード", icon: <DashboardOutlined /> },
  { key: "orders_invoices", value: "受注・請求書", icon: <FileTextOutlined /> },
  { key: "containers", value: "コンテナ管理", icon: <ContainerOutlined /> },
  { key: "masterDatas", value: "マスタデータ", icon: <DatabaseOutlined /> },
  {
    key: "analysis_reports",
    value: "分析・レポート",
    icon: <BarChartOutlined />,
  },
  { key: "document_notes", value: "ドキュメント", icon: <FileOutlined /> },
  {
    key: "settings_administration",
    value: "設定・管理",
    icon: <SettingOutlined />,
  },
];
const sectionIcons = {
  dashboard: <DashboardOutlined />,
  orders_invoices: <FileTextOutlined />,
  containers: <ContainerOutlined />,
  masterDatas: <DatabaseOutlined />,
  analysis_reports: <BarChartOutlined />,
  document_notes: <FileOutlined />,
  settings_administration: <SettingOutlined />,
};
const Header = ({ items, ...props }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userName } = useSelector((state) => state.user);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [openNav, setOpenNav] = useState(false);
  const [openSide, setOpenSide] = useState(false);
  const [openKeys, setOpenKeys] = useState([location.pathname.split("/")[1]]);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const showDrawerNav = () => {
    setOpenNav(true);
  };

  const showDrawerSide = () => {
    setOpenSide(true);
  };
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };
  const onClose = () => {
    setOpenNav(false);
    setOpenSide(false);
  };
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <header className={props.className}>
      <div className="flex justify-between items-center h-full px-2 2xl:px-6 m-auto">
        <div className="flex justify-center items-center">
          <div className=" xl:hidden">
            <Button onClick={showDrawerSide} icon={<MenuOutlined />} />
          </div>
          <button
            className="flex-none px-4"
            onClick={() => navigate("/dashboard")}>
            <Image src="/logo.png" width={40} preview={false} />
          </button>
        </div>
        <Navbar
          list={list}
          className="h-full hidden lg:inline lg:font-[6px] xl:inline 2xl:inline"
        />

        <div className="flex justify-center items-center gap-2">
          {/* <Badge count={5} color="hsl(102, 70%, 61%)">
            <Button shape="circle" icon={<BellOutlined />} />
          </Badge> */}
          <Button
            shape="circle"
            icon={<Image src="/language.png" preview={false} />}
          />
          <Button
            shape="circle"
            icon={theme === "light" ? <SunOutlined /> : <MoonOutlined />}
            onClick={toggleTheme}
          />
          <LogoMenu>
            <Button
              icon={<Avatar src={"/user/man.png"} />}
              className="rounded-full"
            />
          </LogoMenu>
        </div>

        {isLargeScreen ? (
          <Drawer
            title={
              <button
                className="flex-none px-4"
                onClick={() => navigate("/dashboard")}>
                <Image src="/logo.png" width={40} preview={false} />
              </button>
            }
            onClose={onClose}
            open={openSide}
            placement={"left"}
            className="w-[200px] lg:inline-block !important ">
            <div className="flex flex-col gap-2 w-full">
              {items[location.pathname.split("/")[1]].map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    navigate(`/${location.pathname.split("/")[1]}/${item.key}`);
                    onClose();
                  }}
                  className={`w-full hover:bg-hover-primary p-2 rounded-lg cursor-pointer ${
                    location.pathname.split("/")[2] === item.key
                      ? "bg-base-primary"
                      : "bg-bg-300"
                  }`}>
                  <Typography
                    className={
                      location.pathname ===
                      `/${location.pathname.split("/")[1]}/${item.key}`
                        ? "text-colorLink"
                        : ""
                    }>
                    {item.label}
                  </Typography>
                </div>
              ))}
            </div>
          </Drawer>
        ) : (
          <Drawer
            title={
              <button
                className="flex-none px-4"
                onClick={() => navigate("/dashboard")}>
                <Image src="/logo.png" width={40} preview={false} />
              </button>
            }
            onClose={onClose}
            open={openSide}
            placement="left"
            width={200}>
            <Menu
              mode="inline"
              selectedKeys={[location.pathname.split("/")[2]]}
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              onSelect={({ key, keyPath }) => {
                navigate(`/${keyPath[1]}/${key}`);
                onClose();
              }}>
              {Object.entries(items).map(([section, sectionItems]) => (
                <Menu.SubMenu
                  key={section}
                  icon={sectionIcons[section]}
                  title={
                    list.find((item) => item.key === section)?.value || section
                  }>
                  {sectionItems.map((item) => (
                    <Menu.Item
                      key={item.key}
                      className={`w-full hover:bg-hover-primary rounded-lg cursor-pointer ${
                        location.pathname.split("/")[2] === item.key
                          ? "bg-base-primary"
                          : "bg-bg-300"
                      }`}>
                      <Text
                        className={
                          location.pathname === `/${section}/${item.key}`
                            ? "text-colorLink"
                            : ""
                        }>
                        {item.label}
                      </Text>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              ))}
            </Menu>
          </Drawer>
        )}
      </div>
    </header>
  );
};

export default Header;
