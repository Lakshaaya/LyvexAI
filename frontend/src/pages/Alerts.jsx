import { useEffect, useState } from "react";

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/alerts")
      .then((res) => res.json())
      .then((data) => setAlerts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-6xl font-bold text-red-400 mb-10">
        Security Alerts
      </h1>

      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="bg-slate-900 p-6 rounded-xl mb-4 border border-red-500"
        >
          <h2>{alert.alert_type}</h2>
          <p>{alert.ip}</p>
          <p>{alert.message}</p>
        </div>
      ))}

    </div>
  );
}

export default Alerts;