import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Typography, Button, IconButton } from "@material-tailwind/react";
import {
  XMarkIcon,
  HomeIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

// Sidebar routes data
const SidebarRoutes = [
  {
    title: "Manager",
    layout: "/managerDashboard",
    pages: [
      {
        name: "Dashboard",
        path: "/",
        icon: <HomeIcon className="h-5 w-5" />,
      },
      {
        name: "Utilisateurs",
        path: "/usersList",
        icon: <UserIcon className="h-5 w-5" />,
      },
      {
        name: "Dossiers Commerciales",
        path: "/dossiersList",
        icon: <EnvelopeIcon className="h-5 w-5" />,
      },
      {
        name: "Déconnexion",
        path: "/logout",
        icon: <ArrowRightOnRectangleIcon className="h-5 w-5" />,
      },
    ],
  },
];

export default function Sidebar({ brandName, routes }) {
  return (
    <aside className="bg-gradient-to-br from-blue-400 to-blue-700 text-white w-72 h-screen fixed top-0 left-0 z-50 shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-blue-600 flex justify-between items-center">
        <Typography variant="h6" className="text-white tracking-wide">
          {brandName}
        </Typography>
        <IconButton variant="text" size="sm" className="xl:hidden text-white">
          <XMarkIcon className="h-5 w-5" />
        </IconButton>
      </div>

      {/* Navigation */}
      <div className="p-4 overflow-y-auto">
        {routes.map(({ title, layout, pages }, idx) => (
          <ul key={idx} className="mb-6">
            {title && (
              <Typography
                variant="small"
                className="px-4 py-2 uppercase text-sm text-blue-200 font-semibold tracking-wide"
              >
                {title}
              </Typography>
            )}
            {pages.map(({ name, path, icon }) => (
              <li key={name} className="my-1">
                <NavLink to={`${layout}${path}`}>
                  {({ isActive }) => (
                    <div
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer
                        ${isActive
                          ? "bg-white text-blue-900 font-semibold shadow-sm"
                          : "hover:bg-blue-800 hover:text-white text-blue-100"}`}
                    >
                      <span className="w-5 h-5">{icon}</span>
                      <span className="capitalize">{name}</span>
                    </div>
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
  brandName: "Peugeot CRM",
  routes: SidebarRoutes,
};
