import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  allowedRoles,
}) {

  const loggedIn =
    localStorage.getItem("loggedIn");

  const role =
    localStorage.getItem("role");

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(role)
  ) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

        <div className="bg-red-950 border border-red-500 p-10 rounded-xl">

          <h1 className="text-4xl font-bold mb-4">
            Access Denied
          </h1>

          <p>
            Your role ({role}) does not
            have permission to access
            this page.
          </p>

        </div>

      </div>
    );
  }

  return children;
}

export default ProtectedRoute;