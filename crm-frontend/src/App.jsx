import React from "react";
import { ThemeProvider } from "@material-tailwind/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Logout from "./pages/logout";
import Login from "./pages/login";
import ManagerDashboard from "./pages/manager-pages/managerDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/managerDashboard" element={<ManagerDashboard />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
