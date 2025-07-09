import BASE_URL from "../../api/base";

export const userList = async()=>{
    try{
        const response = await fetch (`${BASE_URL}/manager/users/listUser.php`,{
            method: "GET",
            headers: {
                "Content-Type":"application/json",
            },
        });
        const data = await response.json();
         if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    return data;

    }catch(error){
        console.error("error fetching users:",error);
        throw error;
    }
};