import { useEffect, useState } from "react";

function Alerts() {
  const [logs, setLogs] = useState([]);
  const [statusMap, setStatusMap] = useState({});

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

  const alerts = logs.filter(
    (log) =>
      log.threat_level === "High" ||
      log.threat_level === "Critical"
  );

  const criticalCount = alerts.filter(
    (log) => log.threat_level === "Critical"
  ).length;

  const highCount = alerts.filter(
    (log) => log.threat_level === "High"
  ).length;

  const updateStatus = (id, status) => {
    setStatusMap({
      ...statusMap,
      [id]: status,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-5xl font-bold text-red-400 mb-8">
        Security Alerts Center
      </h1>

      {/* Statistics */}

      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-slate-900 p-6 rounded-xl text-center">
          <h2>Total Alerts</h2>

          <p className="text-4xl font-bold mt-3">
            {alerts.length}
          </p>
        </div>

        <div className="bg-red-950 border border-red-500 p-6 rounded-xl text-center">
          <h2>High Alerts</h2>

          <p className="text-4xl font-bold text-red-400 mt-3">
            {highCount}
          </p>
        </div>

        <div className="bg-purple-950 border border-purple-500 p-6 rounded-xl text-center">
          <h2>Critical Alerts</h2>

          <p className="text-4xl font-bold text-purple-400 mt-3">
            {criticalCount}
          </p>
        </div>

      </div>

      {/* SOC Feed */}

      <div className="bg-slate-900 rounded-xl p-6 mb-8">

        <h2 className="text-3xl font-bold text-cyan-400 mb-6">
          SOC Activity Feed
        </h2>

        {logs.slice().reverse().slice(0, 10).map((log) => (
          <div
            key={log.id}
            className="border-b border-slate-700 py-3"
          >
            #{log.id} - {log.event} - {log.threat_level}
          </div>
        ))}

      </div>

      {/* Email Simulation */}

      <div className="bg-slate-900 rounded-xl p-6 mb-8">

        <h2 className="text-3xl font-bold text-green-400 mb-6">
          Email Alert Simulation
        </h2>

        {alerts
          .filter(
            (alert) =>
              alert.threat_level === "Critical"
          )
          .map((alert) => (
            <div
              key={alert.id}
              className="border-b border-slate-700 py-3"
            >
              📧 Email Alert Sent → {alert.ip}
            </div>
          ))}

      </div>

      {/* Alert Management */}

      <div className="grid gap-5">

        {alerts.map((alert) => {

          const status =
            statusMap[alert.id] || "Active";

          return (

            <div
              key={alert.id}
              className={`p-6 rounded-xl border ${
                alert.threat_level === "Critical"
                  ? "border-purple-500 bg-purple-950"
                  : "border-red-500 bg-red-950"
              }`}
            >

              <div className="flex justify-between items-center">

                <h2 className="text-2xl font-bold">
                  {alert.threat_level} Alert
                </h2>

                <span
                  className={`px-4 py-2 rounded-full ${
                    status === "Resolved"
                      ? "bg-green-600"
                      : status === "Investigating"
                      ? "bg-yellow-600"
                      : "bg-red-600"
                  }`}
                >
                  {status}
                </span>

              </div>

              <div className="mt-4 space-y-2">

                <p>
                  <strong>IP:</strong> {alert.ip}
                </p>

                <p>
                  <strong>Event:</strong> {alert.event}
                </p>

                <p>
                  <strong>Recommendation:</strong>{" "}
                  {alert.recommendation}
                </p>

              </div>

              <div className="flex gap-3 mt-5">

                <button
                  onClick={() =>
                    updateStatus(
                      alert.id,
                      "Investigating"
                    )
                  }
                  className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg"
                >
                  Investigating
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      alert.id,
                      "Resolved"
                    )
                  }
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
                >
                  Resolve
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      alert.id,
                      "Active"
                    )
                  }
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                >
                  Reopen
                </button>

              </div>

            </div>

          );
        })}

      </div>

    </div>
  );
}

export default Alerts;