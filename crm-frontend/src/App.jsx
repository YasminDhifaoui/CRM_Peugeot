import React from "react";
import { ThemeProvider } from "@material-tailwind/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./api/ProtectedRoute";
import TestSession from "./pages/TestSession";

import Login from "./pages/auth-pages/login";
import Logout from "./pages/auth-pages/logout";

import ManagerDashboard from "./pages/manager-pages/managerDashboard";
import { UserList } from "./pages/manager-pages/usersManagement/usersList";
import { AddUser } from "./pages/manager-pages/usersManagement/addUser";
import DossiersPageManager from "./pages/manager-pages/dossiersManagement/listDossier-manager";
import ArchiveManager from "./pages/manager-pages/dossiersManagement/listArchive-manager";

import AgentCDashboard from "./pages/agentC-pages/agentCDashboard";
import ListDossierAgent from "./pages/agentC-pages/dossiers-agentManagement/listDossier-agent";
import ArchiveAgent from "./pages/agentC-pages/dossiers-agentManagement/listArchive-agent";

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
        <Route
          path="/managerDashboard/dossiersList"
          element={<DossiersPageManager />}
        />
        <Route
          path="/managerDashboard/archiveList"
          element={<ArchiveManager />}
        />

        {/* AgentC routes */}
        <Route
          path="/agentCDashboard"
          element={
            <ProtectedRoute>
              {" "}
              {/*it means the user cant return to previous page after logout*/}
              <AgentCDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/agentCDashboard/logout" element={<Logout />} />
        <Route
          path="/agentCDashboard/ListDossierAgent"
          element={<ListDossierAgent />}
        />
        <Route
          path="/agentCDashboard/ArchiveAgent"
          element={<ArchiveAgent />}
        />
      </Routes>
    </Router>
  );
}

export default App;
