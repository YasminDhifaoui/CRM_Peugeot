import BaseComponent from "bootstrap/js/dist/base-component";
import { BASE_URL } from "../../api/base";

export const dossiersListAgent = async() => {
    try{
        const response = await fetch(`${BASE_URL}/agent/dossiers-agent/listDossier-agent.php`,{
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
export const addDossierAgent = async (dossierData) => {
  try {
    const response = await fetch(`${BASE_URL}/agent/dossiers-agent/addDossiers-agent.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(dossierData),  // pass the whole object directly here
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erreur lors de l'ajout du dossier");
    }

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
