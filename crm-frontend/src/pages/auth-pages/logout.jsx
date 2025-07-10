import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/auth-services/authService"; 

export function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    async function doLogout() {
      try {
        await logoutUser();
      } catch (err) {
        // Optionally handle logout errors here
      }
      navigate("/login", { replace: true });
    }
    doLogout();
  }, [navigate]);

  return <p>Logging out...</p>; // or a spinner/loading UI
}

export default Logout;
