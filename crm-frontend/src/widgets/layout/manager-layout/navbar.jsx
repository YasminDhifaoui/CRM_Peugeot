import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">
        MyDashboard
      </div>
      
      <ul className="flex space-x-6 text-sm font-medium text-gray-700">
        <li>
          <Link to="/managerDashboard/usersList" className="hover:text-blue-500">Users</Link>
        </li>
        <li>
          <Link to="/logout" className="hover:text-red-500">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
