import { Link } from "react-router-dom";

function Navbar() {

  const role =
    localStorage.getItem("role") || "Unknown";

  const username =
    localStorage.getItem("username") || "User";

  const logout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("username");

    window.location.href = "/login";
  };

  return (
    <nav className="bg-slate-900 border-b border-cyan-500 p-4">

      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <div>

          <h1 className="text-2xl font-bold text-cyan-400">
            LyvexAI
          </h1>

          <p className="text-sm text-gray-400">
            Logged in as:
            {" "}
            <span className="text-cyan-400">
              {username}
            </span>
            {" "}
            ({role})
          </p>

        </div>

        <div className="flex gap-6 items-center">

          <Link
            to="/"
            className="hover:text-cyan-400"
          >
            Dashboard
          </Link>

          <Link
            to="/alerts"
            className="hover:text-cyan-400"
          >
            Alerts
          </Link>

          <Link
            to="/reports"
            className="hover:text-cyan-400"
          >
            Reports
          </Link>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;