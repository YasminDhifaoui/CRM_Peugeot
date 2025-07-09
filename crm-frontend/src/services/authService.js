import BASE_URL from '../api/base';

export const loginUser = async (cin, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",  
      },
      body: JSON.stringify({ cin, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
export const logoutUser = async () => {
  localStorage.removeItem("user");

  try {
    const response = await fetch(`${BASE_URL}/auth/logout.php`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    const data = await response.json();
    console.log(data.message);  // Optional: show logout success message

  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};