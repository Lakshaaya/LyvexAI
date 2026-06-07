import { useEffect, useState } from "react";

function Reports() {
  const [logs, setLogs] = useState([]);

  const BLACKLIST = [
    "45.67.89.100",
    "192.168.1.250",
    "10.0.0.15",
  ];

  useEffect(() => {
    fetch("http://127.0.0.1:8000/logs")
      .then((res) => res.json())
      .then((data) => setLogs(data))
      .catch((err) => console.error(err));
  }, []);

  const ipCount = {};

  logs.forEach((log) => {
    ipCount[log.ip] = (ipCount[log.ip] || 0) + 1;
  });

  const leaderboard = Object.entries(ipCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const highThreats = logs.filter(
    (log) => log.threat_level === "High"
  ).length;

  const criticalThreats = logs.filter(
    (log) => log.threat_level === "Critical"
  ).length;

  const mediumThreats = logs.filter(
    (log) => log.threat_level === "Medium"
  ).length;

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

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-5xl font-bold text-green-400 mb-10">
        Security Reports Center
      </h1>

      <div className="grid grid-cols-5 gap-6 mb-10">

        <div className="bg-slate-900 p-6 rounded-xl text-center">
          <h2>Total Incidents</h2>
          <p className="text-4xl font-bold mt-3">
            {logs.length}
          </p>
        </div>

        <div className="bg-red-950 p-6 rounded-xl text-center">
          <h2>High Threats</h2>
          <p className="text-4xl font-bold text-red-400 mt-3">
            {highThreats}
          </p>
        </div>

        <div className="bg-purple-950 p-6 rounded-xl text-center">
          <h2>Critical Threats</h2>
          <p className="text-4xl font-bold text-purple-400 mt-3">
            {criticalThreats}
          </p>
        </div>

        <div className="bg-yellow-950 p-6 rounded-xl text-center">
          <h2>Medium Threats</h2>
          <p className="text-4xl font-bold text-yellow-400 mt-3">
            {mediumThreats}
          </p>
        </div>

        <div className="bg-cyan-950 p-6 rounded-xl text-center">
          <h2>Risk Score</h2>
          <p className="text-4xl font-bold text-cyan-400 mt-3">
            {riskScore}
          </p>
          <p>{riskLevel}</p>
        </div>

      </div>

      {/* Threat Intelligence */}

      <div className="bg-slate-900 p-8 rounded-xl mb-8">

        <h2 className="text-3xl font-bold text-red-400 mb-6">
          Threat Intelligence Panel
        </h2>

        {BLACKLIST.map((ip) => (

          <div
            key={ip}
            className="border-b border-slate-700 py-3"
          >
            🚨 Known Malicious IP: {ip}
          </div>

        ))}

      </div>

      {/* Attack Leaderboard */}

      <div className="bg-slate-900 p-8 rounded-xl mb-8">

        <h2 className="text-3xl font-bold text-yellow-400 mb-6">
          🏆 Attack Leaderboard
        </h2>

        {leaderboard.map(([ip, count], index) => (

          <div
            key={ip}
            className="flex justify-between border-b border-slate-700 py-3"
          >
            <span>
              #{index + 1} - {ip}
            </span>

            <span className="font-bold text-red-400">
              {count} attacks
            </span>
          </div>

        ))}

      </div>

      {/* Threat Trend */}

      <div className="bg-slate-900 p-8 rounded-xl mb-8">

        <h2 className="text-3xl font-bold text-cyan-400 mb-4">
          Threat Trend Prediction
        </h2>

        <p className="text-2xl">
          {criticalThreats >= 3
            ? "📈 Increasing"
            : "➡ Stable"}
        </p>

      </div>

      {/* AI Recommendations */}

      <div className="bg-slate-900 p-8 rounded-xl">

        <h2 className="text-3xl font-bold text-purple-400 mb-4">
          AI Recommendations
        </h2>

        <ul className="space-y-3">
          <li>Review critical incidents immediately</li>
          <li>Monitor repeated login failures</li>
          <li>Investigate blacklisted IP activity</li>
          <li>Perform periodic security audits</li>
        </ul>

      </div>

    </div>
  );
}

export default Reports;