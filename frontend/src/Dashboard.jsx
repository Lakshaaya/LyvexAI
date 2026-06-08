import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [logs, setLogs] = useState([]);
  console.log("LOGS STATE:", logs);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchLogs = () => {
      fetch("https://lyvexai-backend.onrender.com/logs")
        .then((res) => res.json())
        .then((data) => setLogs(data))
        .catch((err) => console.error(err));
    };

    fetchLogs();

    const interval = setInterval(fetchLogs, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredLogs = logs.filter((log) =>
    log.ip.toLowerCase().includes(search.toLowerCase())
  );

  const highThreats = logs.filter(
    (log) => log.threat_level === "High"
  ).length;

  const mediumThreats = logs.filter(
    (log) => log.threat_level === "Medium"
  ).length;

  const criticalThreats = logs.filter(
    (log) => log.threat_level === "Critical"
  ).length;

  const pieData = [
    { name: "High", value: highThreats },
    { name: "Medium", value: mediumThreats },
    { name: "Critical", value: criticalThreats },
  ];

  const barData = [
    { level: "High", count: highThreats },
    { level: "Medium", count: mediumThreats },
    { level: "Critical", count: criticalThreats },
  ];

  const COLORS = ["#ef4444", "#facc15", "#a855f7"];

  const ipCount = {};

  logs.forEach((log) => {
    ipCount[log.ip] = (ipCount[log.ip] || 0) + 1;
  });

  let topIP = "N/A";
  let topCount = 0;

  Object.entries(ipCount).forEach(([ip, count]) => {
    if (count > topCount) {
      topIP = ip;
      topCount = count;
    }
  });

  const riskScore = Math.min(
    100,
    highThreats * 20 +
      criticalThreats * 35 +
      logs.length * 5
  );

  let riskLevel = "Low";

  if (riskScore > 70) {
    riskLevel = "High";
  } else if (riskScore > 30) {
    riskLevel = "Medium";
  }

  const exportReport = () => {
    const headers =
      "IP,Event,Threat Level,Recommendation\n";

    const rows = logs
      .map(
        (log) =>
          `${log.ip},${log.event},${log.threat_level},${log.recommendation}`
      )
      .join("\n");

    const csv = headers + rows;

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "security_report.csv";

    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-6xl font-bold text-cyan-400 text-center mb-10">
        LyvexAI SOC Dashboard
      </h1>

      {/* System Health */}

      <div className="grid grid-cols-3 gap-4 mb-8">

        <div className="bg-slate-900 p-4 rounded-xl text-center">
          🟢 Backend Online
        </div>

        <div className="bg-slate-900 p-4 rounded-xl text-center">
          🟢 Database Connected
        </div>

        <div className="bg-slate-900 p-4 rounded-xl text-center">
          🟢 Dashboard Active
        </div>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-5 gap-6 mb-10">

        <div className="bg-slate-900 border border-cyan-500 rounded-xl p-6 text-center">
          <h2>Total Logs</h2>
          <p className="text-5xl font-bold mt-4">
            {logs.length}
          </p>
        </div>

        <div className="bg-slate-900 border border-red-500 rounded-xl p-6 text-center">
          <h2>High Threats</h2>
          <p className="text-5xl font-bold text-red-400 mt-4">
            {highThreats}
          </p>
        </div>

        <div className="bg-slate-900 border border-yellow-500 rounded-xl p-6 text-center">
          <h2>Critical Threats</h2>
          <p className="text-5xl font-bold text-yellow-400 mt-4">
            {criticalThreats}
          </p>
        </div>

        <div className="bg-slate-900 border border-green-500 rounded-xl p-6 text-center">
          <h2>Top Attacker</h2>

          <p className="text-xl font-bold text-green-400 mt-4">
            {topIP}
          </p>

          <p>{topCount} attacks</p>
        </div>

        <div className="bg-slate-900 border border-purple-500 rounded-xl p-6 text-center">
          <h2>AI Risk Score</h2>

          <p className="text-5xl font-bold text-purple-400 mt-4">
            {riskScore}
          </p>

          <p className="mt-2">
            {riskLevel} Risk
          </p>
        </div>

      </div>

      {/* Charts */}

      <div className="grid grid-cols-2 gap-8 mb-10">

        <div className="bg-slate-900 p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">
            Threat Distribution
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={130}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">
            Threat Analytics
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="level" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* AI Summary */}

      <div className="bg-slate-900 rounded-xl p-6 mb-8">

        <h2 className="text-3xl font-bold text-cyan-400 mb-4">
          AI Incident Summary
        </h2>

        <ul className="space-y-2">
          <li>• Total Incidents: {logs.length}</li>
          <li>• High Threats: {highThreats}</li>
          <li>• Critical Threats: {criticalThreats}</li>
          <li>• Most Active IP: {topIP}</li>
          <li>• Current Risk Level: {riskLevel}</li>
        </ul>

      </div>

      {/* AI Insights */}

      <div className="bg-slate-900 rounded-xl p-6 mb-8">

        <h2 className="text-3xl font-bold text-cyan-400 mb-4">
          AI Security Insights
        </h2>

        {logs.slice(0, 5).map((log, index) => (
          <div
            key={index}
            className="border-b border-slate-700 py-2"
          >
            ⚠ {log.recommendation}
          </div>
        ))}

      </div>

      {/* Threat Table */}

      <div className="bg-slate-900 rounded-xl p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold text-cyan-400">
            Recent Threats
          </h2>

          <button
            onClick={exportReport}
            className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg"
          >
            Export Report
          </button>

        </div>

        <input
          type="text"
          placeholder="Search IP Address..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="mb-6 w-full p-3 rounded-lg bg-slate-800 text-white border border-cyan-500"
        />

        <table className="w-full">

          <thead>
            <tr className="border-b border-slate-700">
              <th className="p-3 text-left">IP</th>
              <th className="p-3 text-left">Event</th>
              <th className="p-3 text-left">Threat</th>
              <th className="p-3 text-left">
                Recommendation
              </th>
            </tr>
          </thead>

          <tbody>

            {filteredLogs.map((log, index) => (
              <tr
                key={index}
                className="border-b border-slate-800 hover:bg-slate-800"
              >
                <td className="p-3">{log.ip}</td>

                <td className="p-3">{log.event}</td>

                <td className="p-3">

                  {log.threat_level === "High" && (
                    <span className="bg-red-600 px-3 py-1 rounded-full">
                      High
                    </span>
                  )}

                  {log.threat_level === "Medium" && (
                    <span className="bg-yellow-500 text-black px-3 py-1 rounded-full">
                      Medium
                    </span>
                  )}

                  {log.threat_level === "Critical" && (
                    <span className="bg-purple-700 px-3 py-1 rounded-full">
                      Critical
                    </span>
                  )}

                </td>

                <td className="p-3">
                  {log.recommendation}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Dashboard;