import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PICTURE_URL } from "../../../api/base";
import { userList as fetchUserList } from "../../../services/manager_services/usersService";
import { updateUser } from "../../../services/manager_services/usersService";
import Sidebar from "../../../widgets/layout/manager-layout/sidebar";
import Navbar from "../../../widgets/layout/manager-layout/navbar";

export function UserList() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState("");
  const [activeRole, setActiveRole] = useState("all");

  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetchUserList();
      setUsers(res.message);
    } catch (err) {
      setError(err.message || "Une erreur est survenue, veuillez réessayer.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Combine filters, search, and sorting
  useEffect(() => {
    let filtered = [...users];

    // Role filter
    if (activeRole !== "all") {
      filtered = filtered.filter(
        (user) => user.role.toLowerCase() === activeRole
      );
    }

    // Search filter (on nom, prenom, cin, telephone)
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((user) =>
        `${user.nom} ${user.prenom} ${user.cin} ${user.telephone}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    // Sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key]?.toString().toLowerCase() || "";
        const bValue = b[sortConfig.key]?.toString().toLowerCase() || "";

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredUsers(filtered);
  }, [users, activeRole, searchTerm, sortConfig]);

  // Role background color class for table cell badges
  const roleBgColor = (role) => {
    switch (role.toLowerCase()) {
      case "manager":
        return "bg-red-600 text-white";
      case "agentc":
        return "bg-yellow-300 text-black";
      case "responsablev":
        return "bg-blue-900 text-white";
      default:
        return "bg-gray-200 text-black";
    }
  };

  // Role color class for buttons (background + text)
  const roleBtnColor = (role, isActive) => {
    const baseClasses =
      "px-4 py-2 rounded font-medium transition-colors duration-200 ";
    const activeClasses = " text-white shadow-lg ";
    const inactiveClasses = " border ";

    switch (role) {
      case "manager":
        return (
          baseClasses +
          (isActive
            ? "bg-red-600 hover:bg-red-700" + activeClasses
            : "bg-white border-red-600 text-red-600 hover:bg-red-100")
        );
      case "agentc":
        return (
          baseClasses +
          (isActive
            ? "bg-yellow-600 hover:bg-yellow-700" + activeClasses
            : "bg-white border-yellow-600 text-yellow-600 hover:bg-yellow-100")
        );
      case "responsablev":
        return (
          baseClasses +
          (isActive
            ? "bg-blue-900 hover:bg-blue-800" + activeClasses
            : "bg-white border-blue-600 text-blue-600 hover:bg-blue-100")
        );
      case "all":
      default:
        return (
          baseClasses +
          (isActive
            ? "bg-gray-700 hover:bg-gray-800" + activeClasses
            : "bg-white border-blue-600 text-blue-600 hover:bg-blue-100")
        );
    }
  };

  const handleFilter = (role) => {
    setActiveRole(role);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setEditedUser(user); // shallow copy
  };

  const handleCancel = () => {
    setEditingUserId(null);
    setEditedUser({});
  };

  const handleSave = async () => {
    try {
      await updateUser(editedUser);
      setEditingUserId(null);
      setEditedUser({});
      fetchUsers();
    } catch (err) {
      alert("Erreur lors de la mise à jour : " + err.message);
    }
  };

  const handleInputChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen bg-gray-400 text-white font-[Georgia]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1 xl:ml-72">
        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <main className="flex-1 p-6 bg-gray-500">
          <br />
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Liste des utilisateurs</h2>
            <button
              onClick={() => navigate("/managerDashboard/addUser")}
              className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-700 transition"
            >
              +
            </button>
          </div>

          {/* Filter Buttons */}
          <div className="mb-4 flex flex-wrap gap-4 items-center">
            {["all", "manager", "agentc", "responsablev"].map((role) => (
              <button
                key={role}
                onClick={() => handleFilter(role)}
                className={roleBtnColor(role, activeRole === role)}
              >
                {role === "all"
                  ? "Tous les Roles"
                  : role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ml-auto w-full max-w-xs px-4 py-2 border border-gray-300 bg-gray-200 text-black rounded focus:outline-none focus:ring-2 focus:ring-black-400"
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          {filteredUsers.length > 0 ? (
            <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200 bg-white">
              <table className="min-w-full text-sm text-gray-800">
                <thead className="bg-blue-900 text-white text-gorgia uppercase tracking-wider">
                  <tr>
                    {[
                      { key: "photopath", label: "Image", noSort: true },
                      { key: "nom", label: "Nom" },
                      { key: "prenom", label: "Prénom" },
                      { key: "role", label: "Rôle" },
                      { key: "cin", label: "CIN" },
                      { key: "telephone", label: "Téléphone" },
                    ].map(({ key, label, noSort }) => (
                      <th
                        key={key}
                        onClick={() => !noSort && handleSort(key)}
                        className={`font-gorgia py-2 px-3 text-left cursor-pointer select-none ${
                          noSort ? "cursor-default" : ""
                        }`}
                      >
                        {label}{" "}
                        {!noSort &&
                          (sortConfig.key === key
                            ? sortConfig.direction === "asc"
                              ? "▲"
                              : "▼"
                            : "⇅")}
                      </th>
                    ))}
                    <th className="py-2 px-3 text-left"></th>
                  </tr>
                </thead>

                <tbody className="bg-gray-300 font-comic divide-y divide-gray-100">
                  {filteredUsers.map(
                    ({ id, photopath, nom, prenom, role, cin, telephone }) => (
                      <tr key={id} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3">
                          <img
                            src={
                              photopath
                                ? `${PICTURE_URL}/${photopath}`
                                : "/img/default-avatar.png"
                            }
                            alt="User"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        </td>
                        <td className="px-4 py-3">
                          {editingUserId === id ? (
                            <input
                              name="nom"
                              value={editedUser.nom}
                              onChange={handleInputChange}
                              className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                          ) : (
                            nom
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {editingUserId === id ? (
                            <input
                              name="prenom"
                              value={editedUser.prenom}
                              onChange={handleInputChange}
                              className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                          ) : (
                            prenom
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded font-semibold text-sm ${roleBgColor(
                              role
                            )}`}
                          >
                            {role}
                          </span>
                        </td>
                        <td className="px-4 py-3">{cin}</td>
                        <td className="px-4 py-3">
                          {editingUserId === id ? (
                            <input
                              name="telephone"
                              value={editedUser.telephone}
                              onChange={handleInputChange}
                              className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                          ) : (
                            telephone || "—"
                          )}
                        </td>
                        <td className="px-4 py-3 space-x-2 whitespace-nowrap">
                          {editingUserId === id ? (
                            <>
                              <button
                                onClick={handleSave}
                                className="bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded text-xs transition"
                              >
                                Save
                              </button>
                              <button
                                onClick={handleCancel}
                                className="bg-gray-700 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs transition"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() =>
                                handleEdit({
                                  id,
                                  nom,
                                  prenom,
                                  role,
                                  cin,
                                  telephone,
                                })
                              }
                              className=""
                            >
                              <img
                                src="/img/icons/edit-row.png"
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Aucun utilisateur trouvé.</p>
          )}
        </main>
      </div>
    </div>
  );
}
