import React, { useState, useEffect } from "react";
import NavbarAgent from "../../../widgets/layout/agentC-layout/navbar-agent";
import SidebarAgent from "../../../widgets/layout/agentC-layout/sidebar-agent";

import { dossiersListAgent, addDossierAgent } from "../../../services/agent-services/dossiersAgentServices";
import {
  PlusIcon,
  XMarkIcon,
  CheckCircleIcon,
  ArchiveBoxIcon,
  PencilIcon
} from "@heroicons/react/24/solid";

const statusOptions = ["Devis", "Commande", "Facturation", "Livraison", "Blockage"];

const DossiersPage = () => {
  const [dossiers, setDossiers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nom_prenom_client: "",
    telephone: "",
    modeles: "",
    commentaire: "",
    status: "",
    immatriculation: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    loadDossiers();
  }, []);

  const loadDossiers = async () => {
    try {
      const result = await dossiersListAgent();
      if (result.message) {
        setDossiers(result.message);
      }
    } catch (error) {
      console.error("Failed to load dossiers:", error);
    }
  };
  const statusColors = {
  Devis: "bg-rose-400 text-white",
  Commande: "bg-yellow-400 text-black",
  Facturation: "bg-green-400 text-white",
  Livraison: "bg-blue-500 text-white",
  Blockage: "bg-red-500 text-white",
};

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "immatriculation") {
      // Allow only up to 18 alphanumeric chars
      if (/^[a-zA-Z0-9]{0,18}$/.test(value)) {
        setFormData((prev) => ({ ...prev, immatriculation: value }));
      }
    } else if (name === "telephone") {
      // Allow only digits, up to 8 chars
      if (/^\d{0,8}$/.test(value)) {
        setFormData((prev) => ({ ...prev, telephone: value }));
      }
    } else if (name === "status" && value.toLowerCase() !== "livraison") {
      // Clear immatriculation if status not 'livraison'
      setFormData((prev) => ({ ...prev, status: value, immatriculation: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addDossierAgent(formData);
      console.log("Dossier added:", res);

      if (res.message) {
        setShowForm(false);
        setFormData({
          nom_prenom_client: "",
          telephone: "",
          modeles: "",
          commentaire: "",
          status: "",
          immatriculation: "",
        });
        loadDossiers();
      }
    } catch (error) {
      console.error("Error adding dossier:", error);
      alert(error.message); // ← helpful for debugging
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    // Format date MM/DD/YYYY
    const formattedDate = date.toLocaleDateString("en-US");

    // Format time HH:mm (24h)
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;

    return (
      <>
        <div>{formattedDate}</div>
        <div className="text-xs text-gray-600">{formattedTime}</div>
      </>
    );
  };

  // Filter dossiers by search term and status filter
  const filteredDossiers = dossiers.filter((d) => {
    const matchesSearch = d.nom_prenom_client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? d.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-300 text-white font-[Georgia] relative flex flex-col mt-20">
      {/* Navbar full width */}
      <NavbarAgent />

      <div className="flex flex-1 pt-6 px-4 md:px-8">
        {/* Sidebar */}
        <SidebarAgent />

        {/* Left: Stats cards + charts */}
        <main className="flex-1 pl-6 md:pl-12">
          <div className="flex h-full flex-row gap-4">
            
            {/* Search & Filter */}
            <div className={`flex-1 transition-all duration-300 ${showForm ? "w-1/2" : "w-full"}`}>              
            <h2 className="text-xl text-black font-semibold">Liste des dossiers commerciales</h2>

            <div className="flex items-center gap-4 mb-4">
              <input
                type="text"
                placeholder="Rechercher par client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 rounded border text-black flex-1"
              />
              <div className="flex gap-2 flex-wrap">
  <button
    onClick={() => setStatusFilter("")}
    className={`px-3 py-1 rounded ${
      statusFilter === "" ? "bg-blue-900 text-white" : "bg-gray-200 text-black"
    }`}
  >
    Tous
  </button>
  {statusOptions.map((status) => (
    <button
      key={status}
      onClick={() => setStatusFilter(status)}
      className={`px-3 py-1 rounded ${
        statusFilter === status
          ? statusColors[status]
          : "bg-gray-200 text-black"
      }`}
    >
      {status}
    </button>
  ))}
</div>
              <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setShowForm(!showForm)}
                className={`flex items-center gap-2 px-4 py-2 rounded text-white font-semibold transition ${
                  showForm ? "bg-red-600 hover:bg-red-700" : "bg-blue-900 hover:bg-blue-800"
                }`}
              >
                {showForm ? (
                  <>
                    <XMarkIcon className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    <PlusIcon className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
            </div>
                        {/* Table Section */}

              <table className="w-full border text-sm">
                <thead className="bg-blue-900 text-gray-200">
                  <tr>
                    <th className="border p-2">Date de création</th>
                    <th className="border p-2">Client</th>
                    <th className="border p-2">Téléphone</th>
                    <th className="border p-2">Modèles</th>
                    <th className="border p-2">Immatriculation</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Date de mise à jours</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDossiers.map((d, i) => (
                    <tr key={i} className="bg-gray-100 hover:bg-gray-400 text-gray-200">
                      <td className="border p-2 text-black">{formatDateTime(d.date_creation)}</td>
                      <td className="border p-2 text-black">{d.nom_prenom_client}</td>
                      <td className="border p-2 text-black">{d.telephone}</td>
                      <td className="border p-2 text-black">{d.modeles}</td>
                      <td className="border p-2 text-black">{d.immatriculation}</td>
                      <td className="border p-2 text-black">
                        <span
                          className={`px-2 py-1 rounded ${
                            d.status === "Commande" ? "text-black" : "text-white"
                          } ${statusColors[d.status] || ""}`}
                        >
                          {d.status}
                        </span>
                      </td>

                      <td className="border p-2 text-black">{formatDateTime(d.updated_at)}</td>
                      <td className="border p-2 text-black bg-yellow-700 w-10 px-2 py-1 rounded-lg"><ArchiveBoxIcon/></td>
                      <td className="border p-2 text-black bg-red-800 w-10 px-2 py-1 rounded-lg"><PencilIcon/></td>
                    </tr>
                  ))}
                  {filteredDossiers.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center text-black p-4">
                        Aucun dossier trouvé.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Form Section */}
            {showForm && (
              <div className="w-1/3 bg-gray-200 p-6 shadow rounded-lg border border-gray-200">
                <h3 className="text-lg text-black font-bold mb-4">Ajouter un dossier</h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="nom_prenom_client"
                    placeholder="Nom et prénom client"
                    value={formData.nom_prenom_client}
                    onChange={handleChange}
                    className="border p-2 bg-white text-gray-500 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="telephone"
                    placeholder="Téléphone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className="border p-2 bg-white text-gray-500 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="modeles"
                    placeholder="Modèles"
                    value={formData.modeles}
                    onChange={handleChange}
                    className="border p-2 bg-white text-gray-500 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="immatriculation"
                    placeholder="Immatriculation"
                    value={formData.immatriculation}
                    onChange={handleChange}
                    className={`border p-2 bg-white text-gray-500 rounded ${
                      formData.status.toLowerCase() !== "livraison" ? "bg-gray-200 cursor-not-allowed" : ""
                    }`}
                    required={formData.status.toLowerCase() === "livraison"}
                    disabled={formData.status.toLowerCase() !== "livraison"}
                  />

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="border p-2 bg-white text-gray-500 rounded"
                    required
                  >
                   {statusOptions.map((status) => (
                    <option
                      key={status}
                      value={status}
                      style={{
                        color:
                          status === "Devis" ? "crimson" :
                          status === "Commande" ? "orange" :
                          status === "Facturation" ? "green" :
                          status === "Livraison" ? "blue" :
                          status === "Blockage" ? "red" : "black"
                      }}
                    >
                      {status}
                    </option>
                  ))}

                  </select>
                  <textarea
                    name="commentaire"
                    placeholder="Commentaire"
                    value={formData.commentaire}
                    onChange={handleChange}
                    className="col-span-2 border p-2 bg-white text-gray-500 rounded"
                  />
                  <div className="col-span-2 flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                      <CheckCircleIcon className="w-5 h-5" />
                      Enregistrer
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DossiersPage;
