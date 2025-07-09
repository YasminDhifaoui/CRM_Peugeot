// src/layout/manager/sidebar.jsx
import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import {
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Sidebar({ brandName, routes }) {
  const sidenavType = "white";
  const sidenavColor = "blue";
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} w-72 h-screen fixed top-0 left-0 z-50 border-r border-blue-gray-100`}
    >
      <div className="p-6 border-b border-blue-gray-100 flex justify-between items-center">
        <Typography variant="h6" color="blue-gray">
          {brandName}
        </Typography>
        <IconButton variant="text" size="sm" className="xl:hidden">
          <XMarkIcon className="h-5 w-5" />
        </IconButton>
      </div>

      <div className="p-4">
        {routes.map(({ title, layout, pages }, idx) => (
          <ul key={idx} className="mb-4">
            {title && (
              <Typography
                variant="small"
                color="blue-gray"
                className="px-3 py-2 font-bold uppercase"
              >
                {title}
              </Typography>
            )}
            {pages.map(({ name, path, icon }) => (
              <li key={name} className="mb-1">
                <NavLink to={`${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color={isActive ? sidenavColor : "blue-gray"}
                      className="flex items-center gap-3 w-full px-4 py-2 capitalize"
                    >
                      {icon}
                      <span>{name}</span>
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidebar.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidebar.defaultProps = {
  brandName: "Manager Panel",
};
