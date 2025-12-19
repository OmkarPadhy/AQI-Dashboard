import { useEffect, useState } from "react";
import { Alert } from "../utils/alertEngine";

export default function AlertsPanel({ alerts }: { alerts: Alert[] }) {
  const [activeAlerts, setActiveAlerts] = useState<Alert[]>([]);

  // Append new alerts (do not overwrite old ones)
  useEffect(() => {
    if (alerts.length === 0) return;

    setActiveAlerts((prev) => {
      const existingIds = new Set(prev.map((a) => a.id));
      const newOnes = alerts.filter((a) => !existingIds.has(a.id));
      return [...newOnes, ...prev].slice(0, 20); // keep last 20
    });
  }, [alerts]);

  const clearAll = () => setActiveAlerts([]);

  return (
    <div className="glass-card p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold">⚠ Alerts</h3>

        {activeAlerts.length > 0 && (
          <button
            onClick={clearAll}
            className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-600 hover:bg-red-500/30 transition"
          >
            Clear All
          </button>
        )}
      </div>

      {activeAlerts.length === 0 ? (
        <p className="text-xs text-gray-400">No active alerts</p>
      ) : (
        <ul className="space-y-2 overflow-y-auto text-xs">
          {activeAlerts.map((a) => (
            <li
              key={a.id}
              className={`p-2 rounded border ${
                a.type === "critical"
                  ? "bg-red-500/20 text-red-700 border-red-400/30"
                  : "bg-yellow-400/20 text-yellow-700 border-yellow-400/30"
              }`}
            >
              <div className="font-medium">{a.message}</div>
              <div className="opacity-70">{a.timestamp}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
