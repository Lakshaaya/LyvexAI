import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    const users = [
      {
        username: "admin",
        password: "admin123",
        role: "Admin",
      },
      {
        username: "analyst",
        password: "analyst123",
        role: "Analyst",
      },
      {
        username: "viewer",
        password: "viewer123",
        role: "Viewer",
      },
    ];

    const user = users.find(
      (u) =>
        u.username === username &&
        u.password === password
    );

    if (user) {

      localStorage.setItem(
        "loggedIn",
        "true"
      );

      localStorage.setItem(
        "role",
        user.role
      );

      localStorage.setItem(
        "username",
        user.username
      );

      alert(
        `Login Successful (${user.role})`
      );

      window.location.href = "/";
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <div className="bg-slate-900 border border-cyan-500 p-10 rounded-2xl w-[450px]">

        <h1 className="text-5xl font-bold text-cyan-400 text-center mb-8">
          LyvexAI
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-3 mb-6 rounded-lg bg-slate-800 text-white"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-cyan-600 hover:bg-cyan-700 p-3 rounded-lg"
        >
          Login
        </button>

        <div className="mt-6 text-sm text-gray-400">

          <p>
            Admin:
            admin / admin123
          </p>

          <p>
            Analyst:
            analyst / analyst123
          </p>

          <p>
            Viewer:
            viewer / viewer123
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;