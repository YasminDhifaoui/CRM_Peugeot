import { userList } from "../../services/manager_services/usersService";
export function userList() {
  const fetchUsers = async (e) => {
    try {
      const res = await userList();
    } catch (err) {
      setError(err.message || "Une erreur est survenue, veuillez réessayer.");
    }
  };
  return (
    <div onLoad={fetchUsers}>
        <p></p>
    </div>
  )
}
