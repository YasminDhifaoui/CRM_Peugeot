import { useEffect, useState } from "react";
import Sidebar from "../../../widgets/layout/manager-layout/sidebar";
import Navbar from "../../../widgets/layout/manager-layout/navbar";
import { dossiersList } from "../../../services/manager_services/dossiersService";

export function DossiersList() {
  const [dossiers, setDossiers] = useState([]);
  const [filteredDossiers, setFilteredDossiers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDossiers = async () => {
      try {
        const res = await dossiersList();
        const data = res.message || [];
        setDossiers(data);
        setFilteredDossiers(data);
      } catch (err) {
        setError(err.message || "Une erreur est survenue, veuillez réessayer.");
      }
    };

    fetchDossiers();
  }, []);

  useEffect(() => {
    let filtered = [...dossiers];

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((d) =>
        Object.values(d)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "Tous") {
      filtered = filtered.filter((d) => d.status === statusFilter);
    }

    if (sortConfig.key !== "") {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredDossiers(filtered);
  }, [searchTerm, statusFilter, sortConfig, dossiers]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleUpdate = (id) => {
    alert(`Update dossier with id: ${id}`);
  };

  const statuses = ["Tous", "Devis", "Commande", "Facturation", "Livraison", "Blockage"];

  return (
    <div className="flex min-h-screen bg-gray-50 text-sm">
      <Sidebar />
      <div className="flex flex-col flex-1 xl:ml-72 p-4">
        <Navbar />
        <h2 className="text-xl font-bold mb-4">Liste des Dossiers</h2>

        {error && <p className="text-red-500">{error}</p>}

        {/* 🔍 Search and Filter */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 w-60 text-sm"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`border border-gray-300 rounded px-3 py-1 w-52 font-semibold text-white text-sm ${
              statusFilter === "Devis"
                ? "bg-rose-300"
                : statusFilter === "Commande"
                ? "bg-yellow-300"
                : statusFilter === "Facturation"
                ? "bg-green-300"
                : statusFilter === "Livraison"
                ? "bg-blue-300"
                : statusFilter === "Blockage"
                ? "bg-red-300"
                : "bg-black text-white"
            }`}
          >
            <option value="Tous" className="bg-gray-500 text-black">
              Tous les statuts
            </option>
            <option value="Devis" className="bg-pink-300 text-black">Devis</option>
            <option value="Commande" className="bg-yellow-300 text-black">Commande</option>
            <option value="Facturation" className="bg-green-300 text-black">Facturation</option>
            <option value="Livraison" className="bg-blue-300 text-black">Livraison</option>
            <option value="Blockage" className="bg-red-300 text-black">Blockage</option>
          </select>
        </div>

        {/* 📋 Table */}
        {filteredDossiers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  {[
                    { key: "date_creation", label: "Date de création" },
                    { key: "nom_prenom_client", label: "Nom & prénom client" },
                    { key: "telephone", label: "Téléphone" },
                    { key: "modeles", label: "Modèle" },
                    { key: "status", label: "Status" },
                    { key: "commentaire", label: "Commentaires" },
                    { key: "immatriculation", label: "Immatriculation" },
                    { key: "agent_full_name", label: "Agent" },
                    { key: "updated_at", label: "Dernière mise à jour" },
                  ].map(({ key, label }) => (
                    <th
                      key={key}
                      onClick={() => handleSort(key)}
                      className="py-2 px-3 text-left cursor-pointer select-none"
                    >
                      {label}{" "}
                      {sortConfig.key === key ? (
                        sortConfig.direction === "asc" ? "▲" : "▼"
                      ) : (
                        "⇅"
                      )}
                    </th>
                  ))}
                  <th className="py-2 px-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDossiers.map(
                  ({
                    id,
                    date_creation,
                    nom_prenom_client,
                    telephone,
                    modeles,
                    commentaire,
                    status,
                    immatriculation,
                    updated_at,
                    agent_full_name,
                  }) => {
                    let rowColor = "";
                    switch (status.toLowerCase()) {
                      case "devis":
                        rowColor = "bg-rose-100";
                        break;
                      case "commande":
                        rowColor = "bg-yellow-100";
                        break;
                      case "facturation":
                        rowColor = "bg-green-100";
                        break;
                      case "livraison":
                        rowColor = "bg-blue-100";
                        break;
                      case "blockage":
                        rowColor = "bg-red-100";
                        break;
                      default:
                        rowColor = "bg-white";
                    }

                    return (
                      <tr key={id} className={`${rowColor} border-b border-gray-200 hover:bg-opacity-80`}>
                        <td className="p-2">{new Date(date_creation).toLocaleString()}</td>
                        <td className="p-2">{nom_prenom_client}</td>
                        <td className="p-2">{telephone}</td>
                        <td className="p-2">{modeles}</td>
                        <td className="p-2 font-semibold">{status}</td>
                        <td className="p-2">{commentaire}</td>
                        <td className="p-2">{immatriculation || "—"}</td>
                        <td className="p-2">{agent_full_name || "—"}</td>
                        <td className="p-2">{updated_at ? new Date(updated_at).toLocaleString() : "—"}</td>
                        <td className="p-2">
                          <button
                            onClick={() => handleUpdate(id)}
                            className="bg-gray-600 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded text-xs"
                          >
                            Modifier
                          </button>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Aucun dossier trouvé.</p>
        )}
      </div>
    </div>
  );
}
