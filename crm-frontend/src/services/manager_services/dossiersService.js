import { BASE_URL } from "../../api/base";

export const dossiersListManager = async() => {
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
        credentials: 'include',  // important to send cookies

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
};

export const listCarsManager =async ()=>{
    try{
        const response = await fetch(`${BASE_URL}/get_car_models.php`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
            },
            credentials:"include",
        });
        const data = await response.json();
        if(! response.ok){
            throw new Error(data.Error || "login failed");
        }
        return data;

    }catch(error){
    console.error("Error fetching dossiers:", error);
    throw error;
    }
};
export const addDossiersManager = async()=>{

};

export const archiveDossiersManager = async (id)=>{
 try {
    const response = await fetch(`${BASE_URL}/manager/dossiers/archiveDossiers-manager.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
      body: JSON.stringify({ id }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false };
  }
};

export const archiveListManager =async()=>{
try {
    const response = await fetch(`${BASE_URL}/manager/dossiers/listArchive-manager.php`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: "include"
    });

    const data = await response.json();
    if (response.ok) {
      return data.message; 
    } else {
      throw new Error(data.error || 'Failed to fetch archive');
    }
  } catch (error) {
    throw error;
  }
};
export const unarchiveDossierManager = async(id)=>{
try {
    const response = await fetch(`${BASE_URL}/manager/dossiers/unarchiveDossier-manager.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ id }),
    });

    const data = await response.json();
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
