import { useMemo, useState } from "react";
import SensorLineChart from "../components/SensorLineChart";
import AlertsPanel from "../components/AlertsPanel";
import { useUnifiedSensorData } from "../hooks/useUnifiedSensorData";
import { AirQualityReading } from "../types/database";
import { generateAlerts } from "../utils/alertEngine";

/* ---------------- TIME RANGE ---------------- */
type RangeKey = "1m" | "1h" | "1w" | "1y";

const RANGE_MS: Record<RangeKey, number> = {
  "1m": 60 * 1000,
  "1h": 60 * 60 * 1000,
  "1w": 7 * 24 * 60 * 60 * 1000,
  "1y": 365 * 24 * 60 * 60 * 1000,
};

export default function Dashboard() {
  const { data } = useUnifiedSensorData();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [range, setRange] = useState<RangeKey>("1h");

  /* SAFETY GUARD */
  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading sensor data…
      </div>
    );
  }

  const latest = data[data.length - 1];
  const alerts = generateAlerts(latest);

  /* FILTER DATA BY TIME RANGE */
  const filteredData: AirQualityReading[] = useMemo(() => {
    const now = Date.now();
    return data.filter(
      (d) => now - new Date(d.timestamp).getTime() <= RANGE_MS[range]
    );
  }, [data, range]);

  return (
    <div className={`${theme} min-h-screen transition-colors duration-300`}>
      <div className="dashboard-bg min-h-screen p-4 flex flex-col">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold gradient-text">
            Air Quality Monitoring Dashboard
          </h1>

          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="glass-card px-4 py-2 text-sm hover:scale-105 transition"
          >
            {theme === "light" ? "🌙 Dark Mode" : "☀ Light Mode"}
          </button>
        </div>

        {/* RANGE SELECTOR */}
        <div className="flex gap-2 mb-4">
          {(["1m", "1h", "1w", "1y"] as RangeKey[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-1 rounded-full text-sm transition ${
                range === r
                  ? "bg-blue-500 text-white"
                  : "glass-card hover:scale-105"
              }`}
            >
              {r === "1m" && "1 Min"}
              {r === "1h" && "1 Hour"}
              {r === "1w" && "1 Week"}
              {r === "1y" && "1 Year"}
            </button>
          ))}
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-5 gap-4 flex-1">

          {/* LEFT — 80% */}
          <div className="col-span-4 space-y-4">

            {/* STATS */}
            <div className="grid grid-cols-6 gap-3">
              <Stat label="PM2.5" value={`${latest.pm25.toFixed(1)} µg/m³`} />
              <Stat label="PM10" value={`${latest.pm10.toFixed(1)} µg/m³`} />
              <Stat label="Temperature" value={`${latest.temperature.toFixed(1)} °C`} />
              <Stat label="Humidity" value={`${latest.humidity.toFixed(1)} %`} />
              <Stat label="Gas" value={`${latest.gas.toFixed(0)} ppm`} />
              <Stat label="Light" value={`${latest.light.toFixed(0)} lux`} />
            </div>

            {/* GRAPHS */}
            <div className="grid grid-cols-2 gap-4">
              <SensorLineChart
                title="PM2.5"
                dataKey="pm25"
                unit="µg/m³"
                color="#0ea5e9"
                data={filteredData}
              />

              <SensorLineChart
                title="PM10"
                dataKey="pm10"
                unit="µg/m³"
                color="#22c55e"
                data={filteredData}
              />

              <SensorLineChart
                title="Temperature"
                dataKey="temperature"
                unit="°C"
                color="#f97316"
                data={filteredData}
              />

              <SensorLineChart
                title="Humidity"
                dataKey="humidity"
                unit="%"
                color="#8b5cf6"
                data={filteredData}
              />

              <SensorLineChart
                title="Gas Level"
                dataKey="gas"
                unit="ppm"
                color="#ef4444"
                data={filteredData}
              />

              <SensorLineChart
                title="Light Intensity"
                dataKey="light"
                unit="lux"
                color="#eab308"
                data={filteredData}
              />
            </div>
          </div>

          {/* RIGHT — 20% */}
          <div className="col-span-1">
            <AlertsPanel alerts={alerts} />
          </div>
        </div>

        {/* FOOTER */}
        <footer className="text-center text-xs opacity-70 mt-6">
          © {new Date().getFullYear()} Air Quality Monitoring System — Academic & Research Use
        </footer>
      </div>
    </div>
  );
}

/* ---------------- STAT CARD ---------------- */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-card ambient-card p-3 text-center">
      <p className="text-xs opacity-70 mb-1">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}
