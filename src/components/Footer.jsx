import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = ({ ...props }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  if (currentPath === "/dashboard/overview") {
    return null;
  }
  return (
    <footer className={props.className}>
      <div className="footer flex justify-center items-center w-full h-28 m-auto">
        <p>&copy; 2024 Vehicle System</p>
      </div>
    </footer>
  );
};

export default Footer;
