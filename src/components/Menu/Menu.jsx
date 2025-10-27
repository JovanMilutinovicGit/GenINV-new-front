import React from "react";
import "./Menu.css";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const menuItems = [
    { id: 1, name: "Generiši račun", route: "gen-inv" },
    { id: 2, name: "Novi kupac", route: "new-customer" },
  ];
  const navigate = useNavigate();
  const navigateHandle = (name) => {
    navigate(`/${name}`);
  };
  return (
    <div className="menu-bar">
      {menuItems.map((item) => {
        return (
          <li
            key={item.id}
            onClick={() => {
              navigateHandle(item.route);
            }}
          >
            {item.name}
          </li>
        );
      })}
    </div>
  );
};

export default Menu;
