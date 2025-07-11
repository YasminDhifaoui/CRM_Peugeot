import { useEffect, useState } from "react";
import Sidebar from "../../../widgets/layout/manager-layout/sidebar";
import Navbar from "../../../widgets/layout/manager-layout/navbar";
import { dossiersList } from "../../../services/manager_services/dossiersService";
import { updateDossier } from "../../../services/manager_services/dossiersService";

export function DossiersList() {
  const [dossiers, setDossiers] = useState([]);
  const [filteredDossiers, setFilteredDossiers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editedDossier, setEditedDossier] = useState({});

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

  const startEditing = (dossier) => {
    setEditingId(dossier.id);
    setEditedDossier({ ...dossier });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditedDossier({});
  };

  const handleInputChange = (e) => {
    setEditedDossier({ ...editedDossier, [e.target.name]: e.target.value });
  };

  const saveEditing = async () => {
    try {
      await updateDossier(editedDossier);
      setEditingId(null);
      setEditedDossier({});
      // Refresh data
      const res = await dossiersList();
      setDossiers(res.message || []);
    } catch (err) {
      alert("Erreur lors de la mise à jour : " + err.message);
    }
  };

  const statuses = [
    "Tous",
    "Devis",
    "Commande",
    "Facturation",
    "Livraison",
    "Blockage",
  ];

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
            <option value="Commande" className="bg-yellow-200 text-black">Commande</option>
            <option value="Facturation" className="bg-green-400 text-black">Facturation</option>
            <option value="Livraison" className="bg-blue-300 text-black">Livraison</option>
            <option value="Blockage" className="bg-red-600 text-black">Blockage</option>
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
                  <th className="py-2 px-3 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {filteredDossiers.map((d) => {
                  let rowColor = "";
                  switch (d.status.toLowerCase()) {
                    case "devis":
                      rowColor = "bg-rose-300";
                      break;
                    case "commande":
                      rowColor = "bg-yellow-200";
                      break;
                    case "facturation":
                      rowColor = "bg-green-400";
                      break;
                    case "livraison":
                      rowColor = "bg-blue-300";
                      break;
                    case "blockage":
                      rowColor = "bg-red-500";
                      break;
                    default:
                      rowColor = "bg-white";
                  }

                  const isEditing = editingId === d.id;

                   const handleFileChange = (e) => {
      setEditedDossier({ ...editedDossier, file: e.target.files[0] });
    };

                  return (
      <tr
        key={d.id}
        className={`${rowColor} border-b border-gray-200 hover:bg-opacity-80`}
      >
        {/* Other cells as plain text */}
        <td className="p-2">{d.date_creation ? new Date(d.date_creation).toLocaleString() : "—"}</td>

        {/* Editable fields */}
        <td className="p-2">
          {isEditing ? (
            <input
              name="nom_prenom_client"
              value={editedDossier.nom_prenom_client || ""}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
            />
          ) : (
            d.nom_prenom_client
          )}
        </td>

        <td className="p-2">
          {isEditing ? (
            <input
              name="telephone"
              value={editedDossier.telephone || ""}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
            />
          ) : (
            d.telephone
          )}
        </td>

        <td className="p-2">
          {isEditing ? (
            <input
              name="modeles"
              value={editedDossier.modeles || ""}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
            />
          ) : (
            d.modeles
          )}
        </td>

        <td className="p-2 font-semibold">
          {isEditing ? (
            <select
              name="status"
              value={editedDossier.status || ""}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
            >
              {statuses
                .filter((s) => s !== "Tous")
                .map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
            </select>
          ) : (
            d.status
          )}
        </td>

        <td className="p-2">
          {isEditing ? (
            <>
              <textarea
                name="commentaire"
                value={editedDossier.commentaire || ""}
                onChange={handleInputChange}
                rows={3}
                className="border border-gray-300 rounded px-2 py-1 w-full text-sm mb-1 resize-none"
              />
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*,application/pdf" // adjust mime types as needed
                className="text-xs"
              />
              {editedDossier.file && (
                <p className="text-xs text-gray-600 mt-1">
                  Fichier sélectionné : {editedDossier.file.name}
                </p>
              )}
            </>
          ) : (
            d.commentaire
          )}
        </td>

        {/* Other fields as plain text */}
<td className="p-2">
  {isEditing && (editedDossier.status?.toLowerCase() === "livraison") ? (
    <input
      name="immatriculation"
      value={editedDossier.immatriculation || ""}
      onChange={handleInputChange}
        maxLength={18}
      className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
    />
  ) : (
    d.immatriculation || "—"
  )}
</td>
        <td className="p-2">{d.agent_full_name || "—"}</td>
        <td className="p-2">{d.updated_at ? new Date(d.updated_at).toLocaleString() : "—"}</td>

        <td className="p-2 space-x-1">
          {isEditing ? (
            <>
              <button
                onClick={saveEditing}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs transition"
              >
                Sauvegarder
              </button>
              <button
                onClick={cancelEditing}
                className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs transition"
              >
                Annuler
              </button>
            </>
          ) : (
            <button
              onClick={() => startEditing(d)}
              className="bg-gray-600 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded text-xs"
            >
              Modifier
            </button>
          )}
        </td>
      </tr>
    );
  })}
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
