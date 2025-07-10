import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PICTURE_URL } from "../../../api/base"; 
import { userList as fetchUserList } from "../../../services/manager_services/usersService";
import { updateUser } from "../../../services/manager_services/usersService"; 
import Sidebar from "../../../widgets/layout/manager-layout/sidebar";
import Navbar from "../../../widgets/layout/manager-layout/navbar";

export function UserList() {
  const navigate = useNavigate();  // <--- Use this inside your component

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState("");
  const [activeRole, setActiveRole] = useState("all");

  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});


  const fetchUsers = async () => {
    try {
      const res = await fetchUserList();
      setUsers(res.message);
      setFilteredUsers(res.message);
    } catch (err) {
      setError(err.message || "Une erreur est survenue, veuillez réessayer.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Role color class for text
  const roleColor = (role) => {
    switch (role.toLowerCase()) {
      case "manager":
        return "text-red-600 font-semibold";
      case "agentc":
        return "text-green-600 font-semibold";
      case "responsablev":
        return "text-purple-600 font-semibold";
      default:
        return "text-gray-600 font-semibold";
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
            ? "bg-green-600 hover:bg-green-700" + activeClasses
            : "bg-white border-green-600 text-green-600 hover:bg-green-100")
        );
      case "responsablev":
        return (
          baseClasses +
          (isActive
            ? "bg-purple-600 hover:bg-purple-700" + activeClasses
            : "bg-white border-purple-600 text-purple-600 hover:bg-purple-100")
        );
      case "all":
      default:
        return (
          baseClasses +
          (isActive
            ? "bg-blue-600 hover:bg-blue-700" + activeClasses
            : "bg-white border-blue-600 text-blue-600 hover:bg-blue-100")
        );
    }
  };

  const handleFilter = (role) => {
    setActiveRole(role);
    if (role === "all") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter((user) => user.role.toLowerCase() === role)
      );
    }
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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex flex-col flex-1 xl:ml-72 p-6">
        <Navbar />
        <br></br>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">User List</h2>
          <button
            onClick={() => navigate("/managerDashboard/addUser")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            +
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="mb-6 flex gap-4">
          {["all", "manager", "agentc", "responsablev"].map((role) => (
            <button
              key={role}
              onClick={() => handleFilter(role)}
              className={roleBtnColor(role, activeRole === role)}
            >
              {role === "all"
                ? "All Roles"
                : role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {filteredUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-lg">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Image</th>
                  <th className="py-3 px-6 text-left">Nom</th>
                  <th className="py-3 px-6 text-left">Prénom</th>
                  <th className="py-3 px-6 text-left">Role</th>
                  <th className="py-3 px-6 text-left">CIN</th>
                  <th className="py-3 px-6 text-left">Téléphone</th>
                      <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
             <tbody>
  {filteredUsers.map(({ id, photopath, nom, prenom, role, cin, telephone }) => (
    <tr key={id} className="border-b border-gray-200 hover:bg-gray-100">
      {/* Image */}
      <td className="py-3 px-6">
        <img
          src={photopath ? `${PICTURE_URL}/${photopath}` : "/img/default-avatar.png"}
          alt="User"
          className="w-12 h-12 rounded-full"
        />
      </td>

      {/* Nom */}
      <td className="py-3 px-6">
        {editingUserId === id ? (
          <input
            name="nom"
            value={editedUser.nom}
            onChange={handleInputChange}
            className="border p-1 rounded w-full"
          />
        ) : (
          nom
        )}
      </td>

      {/* Prénom */}
      <td className="py-3 px-6">
        {editingUserId === id ? (
          <input
            name="prenom"
            value={editedUser.prenom}
            onChange={handleInputChange}
            className="border p-1 rounded w-full"
          />
        ) : (
          prenom
        )}
      </td>

      {/* Role (not editable for now) */}
      <td className={`py-3 px-6 ${roleColor(role)}`}>{role}</td>

      {/* CIN (not editable) */}
      <td className="py-3 px-6">{cin}</td>

      {/* Téléphone */}
      <td className="py-3 px-6">
        {editingUserId === id ? (
          <input
            name="telephone"
            value={editedUser.telephone}
            onChange={handleInputChange}
            className="border p-1 rounded w-full"
          />
        ) : (
          telephone || "-"
        )}
      </td>

      {/* Action buttons */}
      <td className="py-3 px-6 space-x-2">
        {editingUserId === id ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() =>
              handleEdit({ id, nom, prenom, role, cin, telephone })
            }
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          >
            Edit
          </button>
        )}
      </td>
    </tr>
  ))}
</tbody>

            </table>
          </div>
        ) : (
          <p>Aucun utilisateur trouvé.</p>
        )}
      </div>
    </div>
  );
}
