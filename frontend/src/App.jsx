import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./Dashboard";
import Login from "./Login";
import Alerts from "./Alerts";
import Reports from "./Reports";
import Navbar from "./Navbar";
import ProtectedRoute from "./ProtectedRoute";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        {/* Dashboard */}

        <Route
          path="/"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Admin",
                "Analyst",
                "Viewer",
              ]}
            >
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Alerts */}

        <Route
          path="/alerts"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Admin",
                "Analyst",
              ]}
            >
              <Layout>
                <Alerts />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Reports */}

        <Route
          path="/reports"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Admin",
                "Analyst",
              ]}
            >
              <Layout>
                <Reports />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;