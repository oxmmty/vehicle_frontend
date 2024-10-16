import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { ThemeContext } from "src/components/Theme";
import Navbar from "src/components/Navbar";
import LogoMenu from "src/components/menu/LogoMenu";
import {
  SunOutlined,
  MoonOutlined,
  MenuOutlined,
  BellOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Drawer, Image, Input, Typography } from "antd";
const { Text } = Typography;

const list = [
  { key: "dashboard", value: "ダッシュボード" },
  { key: "orders_invoices", value: "受注・請求書" },
  // { key: "calendar_schedules", value: "カレンダー・配車" },
  { key: "containers", value: "コンテナ管理" },
  { key: "masterDatas", value: "マスタデータ" },
  { key: "analysis_reports", value: "分析・レポート" },
  { key: "document_notes", value: "ドキュメント" },
  { key: "settings_administration", value: "設定・管理" },
];

const Header = ({ items, ...props }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userName } = useSelector((state) => state.user);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [openNav, setOpenNav] = useState(false);
  const [openSide, setOpenSide] = useState(false);

  const showDrawerNav = () => {
    setOpenNav(true);
  };

  const showDrawerSide = () => {
    setOpenSide(true);
  };

  const onClose = () => {
    setOpenNav(false);
    setOpenSide(false);
  };

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
        {/* <div className="pr-2">
          <Input
            placeholder="Type keywords..."
            prefix={<SearchOutlined />}
            suffix={<Text keyboard>Ctrl K</Text>}
            className="hidden sm:inline-flex rounded-full bg-transparent"
          />
        </div> */}
        <div className="flex justify-center items-center gap-2">
          <Badge count={5} color="hsl(102, 70%, 61%)">
            <Button shape="circle" icon={<BellOutlined />} />
          </Badge>
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
          <div className="lg:hidden">
            <Button onClick={showDrawerNav} icon={<MenuOutlined />} />
          </div>
        </div>
        <Drawer title="Navbar Menu" onClose={onClose} open={openNav}>
          <div className="flex flex-col gap-2 w-full">
            {list.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  navigate(`/${item.key}`);
                  onClose();
                }}
                className={`w-full hover:bg-hover-primary p-2 rounded-lg cursor-pointer ${
                  location.pathname.split("/")[1] === item.key
                    ? "bg-base-primary"
                    : "bg-bg-300"
                }`}>
                <Typography
                  className={
                    location.pathname.split("/")[1] === `${item.key}`
                      ? "text-colorLink"
                      : ""
                  }>
                  {item.value}
                </Typography>
              </div>
            ))}
          </div>
        </Drawer>
        <Drawer
          title="Sidebar Menu"
          onClose={onClose}
          open={openSide}
          placement={"left"}>
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
      </div>
    </header>
  );
};

export default Header;
