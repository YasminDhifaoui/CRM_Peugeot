import React from "react";
import { ThemeProvider } from "@material-tailwind/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/auth-pages/login";
import Logout from "./pages/auth-pages/logout";
import ManagerDashboard from "./pages/manager-pages/managerDashboard";
import ProtectedRoute from "./api/ProtectedRoute";
import { UserList } from "./pages/manager-pages/usersManagement/usersList";
import { AddUser } from "./pages/manager-pages/usersManagement/addUser";
import {DossiersList} from "./pages/manager-pages/dossiersManagement/listDossier";
import TestSession from "./pages/TestSession";
function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect default path "/" to "/login" */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/managerDashboard/logout" element={<Logout />} />
        <Route
          path="/managerDashboard/test-session"
          element={<TestSession />}
        />

        {/* Manager routes */}
        <Route
          path="/managerDashboard"
          element={
            <ProtectedRoute>
              {" "}
              {/*it means the user cant return to previous page after logout*/}
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/managerDashboard/usersList" element={<UserList />} />
        <Route path="/managerDashboard/addUser" element={<AddUser />} />
        <Route path="/managerDashboard/dossiersList" element={<DossiersList />} />

      </Routes>
    </Router>
  );
}

export default App;
