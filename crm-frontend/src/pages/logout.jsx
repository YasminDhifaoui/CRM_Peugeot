import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService"; // your logout function

export function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    async function doLogout() {
      try {
        await logoutUser();
      } catch (err) {
        // Optionally handle logout errors here
      }
      navigate("/auth/sign-in"); // Redirect to sign-in after logout
    }
    doLogout();
  }, [navigate]);

  return <p>Logging out...</p>; // or a spinner/loading UI
}

export default Logout;
