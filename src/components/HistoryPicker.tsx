import { useState } from "react";
import { fetchHistory } from "../hooks/useSupabaseHistory";
import { AirQualityReading } from "../types/database";

export default function HistoryPicker({
  onLoad,
}: {
  onLoad: (data: AirQualityReading[]) => void;
}) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  async function load() {
    if (!from || !to) return;
    const data = await fetchHistory(from, to);
    onLoad(data);
  }

  return (
    <div className="glass-card p-3 space-y-2">
      <p className="text-sm font-medium">📅 Historical Data</p>

      <input
        type="datetime-local"
        className="input-primary w-full"
        onChange={(e) => setFrom(e.target.value)}
      />
      <input
        type="datetime-local"
        className="input-primary w-full"
        onChange={(e) => setTo(e.target.value)}
      />

      <button className="btn-primary w-full" onClick={load}>
        Load History
      </button>
    </div>
  );
}
