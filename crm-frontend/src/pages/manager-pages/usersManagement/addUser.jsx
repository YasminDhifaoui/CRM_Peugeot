import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../widgets/layout/manager-layout/sidebar";
import Navbar from "../../../widgets/layout/manager-layout/navbar";
import { addUser } from "../../../services/manager_services/usersService";
import {
  UserIcon,
} from "@heroicons/react/24/outline";

export function AddUser() {
  const [form, setForm] = useState({
    cin: "",
    nom: "",
    prenom: "",
    telephone: "",

    photoPath: "",  // This will store the uploaded image URL/path after upload
    password: "",
    role: "agentC", // default role
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const formData = new FormData();
      formData.append("cin", form.cin);
      formData.append("nom", form.nom);
      formData.append("prenom", form.prenom);
      formData.append("telephone", form.telephone);
      formData.append("password", form.password);
      formData.append("role", form.role);
      formData.append("photo", form.photo); // file here!

      await addUser(formData);

      setSuccess("User added successfully!");
      setTimeout(() => navigate("/managerDashboard/usersList"), 1500);
    } catch (err) {
      setError(err.message || "Failed to add user.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 text-white font-[Georgia] relative">
      {/* Navbar full width */}
      <Navbar />

      {/* Sidebar (icon buttons on left) */}
      <Sidebar />

      {/* Content with padding to prevent overlap with sidebar */}
      <div className="pl-20 pr-4 pt-6 md:pl-24 md:pr-8 mt-16">
        {/* Content */}
        <main className="flex-1 p-6 bg-gray-300 text-white">
  <div className="w-full flex flex-col gap-6">
    {/* Retourner Button */}
    <button
  type="button"
  onClick={() => navigate("/managerDashboard/usersList")}
  className="w-full py-3 bg-gray-900 text-white font-semibold rounded hover:bg-gray-600 transition flex items-center justify-center gap-2"
>
  Retourner à la liste des utilisateurs <UserIcon className="h-5 w-5" />
</button>


    {/* Form Section Full Width */}
    <div className="bg-gray-800 p-8 rounded shadow-md w-full">
      <h2 className="text-2xl font-bold mb-6 text-white">Ajouter un nouveau utilisateur</h2>

      {error && <p className="text-red-400 mb-4">{error}</p>}
      {success && <p className="text-green-400 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form fields... */}

        {/* CIN */}
        <div>
          <label htmlFor="cin" className="block text-sm font-medium text-gray-300 mb-1">
            CIN <span className="text-red-500">*</span>
          </label>
          <input
            id="cin"
            name="cin"
            placeholder="CIN"
            value={form.cin}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-600 bg-gray-900 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
          />
        </div>

        {/* Nom */}
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-gray-300 mb-1">
            Nom <span className="text-red-500">*</span>
          </label>
          <input
            id="nom"
            name="nom"
            placeholder="Nom"
            value={form.nom}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-600 bg-gray-900 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
          />
        </div>

        {/* Prénom */}
        <div>
          <label htmlFor="prenom" className="block text-sm font-medium text-gray-300 mb-1">
            Prénom <span className="text-red-500">*</span>
          </label>
          <input
            id="prenom"
            name="prenom"
            placeholder="Prénom"
            value={form.prenom}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-600 bg-gray-900 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
          />
        </div>

        {/* Téléphone */}
        <div>
          <label htmlFor="telephone" className="block text-sm font-medium text-gray-300 mb-1">
            Téléphone
          </label>
          <input
            id="telephone"
            name="telephone"
            placeholder="Téléphone"
            value={form.telephone}
            onChange={handleChange}
            className="w-full rounded border border-gray-600 bg-gray-900 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
          />
        </div>

        {/* Photo */}
        <div>
          <label htmlFor="photo" className="block text-sm font-medium text-gray-300 mb-1">
            Photo
          </label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={(e) => setForm((prev) => ({ ...prev, photo: e.target.files[0] }))}
            className="text-gray-300"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            Mot de passe <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Mot de passe"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-600 bg-gray-900 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
          />
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">
            Rôle <span className="text-red-500">*</span>
          </label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full rounded border border-gray-600 bg-gray-900 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
          >
            <option value="agentC">Agent Commercial</option>
            <option value="responsableV">Responsable Vente</option>
          </select>
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full py-3 bg-black text-white font-semibold rounded hover:bg-gray-700 transition"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  </div>
</main>

      </div>
    </div>
  );
}

export default AddUser;
