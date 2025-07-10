import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
<nav className="bg-blue-100 shadow-sm border-b border-gray-200 px-6 py-3 flex justify-between items-center">
      {/* Logo / Title */}
      <div className="text-xl font-bold text-blue-600 tracking-wide">
        MyDashboard
      </div>

      {/* Right Side: Profile Dropdown */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <img
            src="/img/default-avatar.png"
            alt="User Avatar"
            className="w-8 h-8 rounded-full border"
          />
          <span className="hidden sm:inline-block text-sm font-medium text-gray-700">
            Admin
          </span>
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
            <ul className="py-2 text-sm text-gray-700">
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/logout"
                  className="block px-4 py-2 hover:bg-gray-100 text-red-500"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
