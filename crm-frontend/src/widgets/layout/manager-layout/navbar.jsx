import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-gray-700 border-b border-gray-300 px-6 py-3 flex justify-between items-center font-[Georgia] shadow-sm">
      {/* Title */}
     <div className="text-xl font-bold text-blue-900 tracking-wide">
         {/*Manager Dashboard*/}
      </div>

      {/* Profile Dropdown */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <img
            src="/img/default-avatar.png"
            alt="User Avatar"
            className="w-9 h-9 rounded-full border border-gray-400 shadow-sm"
          />
          <span className="hidden sm:inline-block text-sm font-semibold text-white-800">
            Admin
          </span>
          <svg
            className="w-4 h-4 text-white-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
            <ul className="py-2 text-sm text-gray-700 font-medium">
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 transition duration-200"
                >
                  Profil
                </Link>
              </li>
              <li>
                <Link
                  to="/logout"
                  className="block px-4 py-2 hover:bg-gray-100 text-red-600 transition duration-200"
                >
                  Déconnexion
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
