import { BASE_URL } from "../../api/base";

export const dossiersList = async() => {
    try{
        const response = await fetch(`${BASE_URL}/manager/dossiers/listDossiers.php`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const data = await response.json();
        if (!response.ok){
            throw new Error(data.Error || "login failed");
        }
        return data;
    }
    catch (error) {
    console.error("Error fetching dossiers:", error);
    throw error;
  }
};

// 📌 Update a dossier
export async function updateDossier(dossierData) {
  try {
    const response = await fetch(`${BASE_URL}/manager/dossiers/updateDossier.php`, {
      method: "POST", // Or "PUT" if your backend accepts it
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dossierData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erreur lors de la mise à jour du dossier.");
    }

    return data;
  } catch (error) {
    console.error("Update dossier error:", error);
    throw error;
  }
}
