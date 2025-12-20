import { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ================= TYPES ================= */

type Reading = {
  time: string;
  pm25: number;
  pm10: number;
  temperature: number;
  humidity: number;
  gas: number;
  light: number;
};

type Alert = {
  time: string;
  text: string;
};

/* ================= HELPERS ================= */

// HH:MM:SS format
const nowLabel = () =>
  new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

/* ================= COMPONENT ================= */

export default function Dashboard() {
  const [dark, setDark] = useState(false);
  const [range, setRange] = useState<"1m" | "1h" | "1d" | "1w">("1m");
  const [data, setData] = useState<Reading[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [tick, setTick] = useState(1);

  /* ============ STABLE DEMO DATA GENERATOR ============ */
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);

      setData((prev) => {
        const isSpike = tick % 10 === 0;

        const last = prev[prev.length - 1] ?? {
          pm25: 28,
          pm10: 65,
          temperature: 25,
          humidity: 52,
          gas: 160,
          light: 420,
        };

        const base = isSpike
          ? {
              pm25: last.pm25 + (Math.random() - 0.5) * 15,
              pm10: last.pm10 + (Math.random() - 0.5) * 20,
              temperature: last.temperature + (Math.random() - 0.5) * 4,
              humidity: last.humidity + (Math.random() - 0.5) * 12,
              gas: last.gas + (Math.random() - 0.5) * 80,
              light: last.light,
            }
          : last;

        const next: Reading = {
          time: nowLabel(),
          pm25: +(base.pm25 + (Math.random() - 0.5) * 0.6).toFixed(2),
          pm10: +(base.pm10 + (Math.random() - 0.5) * 0.8).toFixed(2),
          temperature: +(base.temperature + (Math.random() - 0.5) * 0.15).toFixed(2),
          humidity: +(base.humidity + (Math.random() - 0.5) * 0.4).toFixed(2),
          gas: +(base.gas + (Math.random() - 0.5) * 2).toFixed(2),
          light: +(base.light + (Math.random() - 0.5) * 5).toFixed(2),
        };

        /* ===== ALERTS ===== */
        const newAlerts: Alert[] = [];

        if (next.pm25 > 35)
          newAlerts.push({
            time: next.time,
            text: "High PM2.5 — respiratory risk increased.",
          });

        if (next.temperature > 32)
          newAlerts.push({
            time: next.time,
            text: "High temperature — possible heat stress.",
          });

        if (next.humidity > 70)
          newAlerts.push({
            time: next.time,
            text: "High humidity — mold & discomfort risk.",
          });

        if (next.gas > 220)
          newAlerts.push({
            time: next.time,
            text: "Smoke / gas spike detected — ventilate immediately.",
          });

        if (newAlerts.length) {
          setAlerts((a) => [...newAlerts, ...a].slice(0, 20));
        }

        return [...prev.slice(-9000), next];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [tick]);

  /* ============ RANGE FILTER ============ */
  const filteredData = useMemo(() => {
    const map = { "1m": 60, "1h": 3600, "1d": 86400, "1w": 604800 };
    return data.slice(-map[range]);
  }, [data, range]);

  const latest = filteredData.at(-1);

  /* ============ CHART COMPONENT ============ */
  const Chart = ({
    title,
    dataKey,
    color,
    unit,
  }: {
    title: string;
    dataKey: keyof Reading;
    color: string;
    unit: string;
  }) => (
    <div
      className="rounded-xl p-4 backdrop-blur-md"
      style={{
        background: dark
          ? "rgba(2,6,23,0.65)"
          : "rgba(255,255,255,0.75)",
      }}
    >
      <h3
        className="mb-2 text-sm font-semibold"
        style={{ color: dark ? "#ffffff" : "#020617" }}
      >
        {title} ({unit})
      </h3>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={filteredData}>
          <defs>
            <linearGradient
              id={`${dataKey}-grad`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor={color} stopOpacity={0.4} />
              <stop offset="95%" stopColor={color} stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <XAxis dataKey="time" hide />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: dark ? "#020617" : "#ffffff",
              color: dark ? "#ffffff" : "#020617",
              borderRadius: "8px",
              border: "none",
            }}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={false}
            fill={`url(#${dataKey}-grad)`}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  /* ============ UI ============ */

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1501785888041-af3ef285b470)",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1
            className="text-2xl font-bold"
            style={{ color: dark ? "#ffffff" : "#020617" }}
          >
            Air Quality Monitoring Dashboard
          </h1>

          <div className="flex gap-2">
            {["1m", "1h", "1d", "1w"].map((r) => (
              <button
                key={r}
                onClick={() => setRange(r as any)}
                className={`px-3 py-1 rounded text-sm ${
                  range === r
                    ? "bg-sky-500 text-white"
                    : "bg-white/70 text-slate-800"
                }`}
              >
                {r}
              </button>
            ))}
            <button
              onClick={() => setDark((d) => !d)}
              className="px-3 py-1 rounded bg-black/60 text-white"
            >
              {dark ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>

        {/* STATS */}
        {latest && (
          <div className="grid grid-cols-6 gap-3 mb-6">
            {[
              ["PM2.5", latest.pm25, "µg/m³"],
              ["PM10", latest.pm10, "µg/m³"],
              ["Temp", latest.temperature, "°C"],
              ["Humidity", latest.humidity, "%"],
              ["Gas", latest.gas, "ppm"],
              ["Light", latest.light, "lux"],
            ].map(([l, v, u]) => (
              <div
                key={l as string}
                className="rounded-xl p-3 text-center backdrop-blur-md"
                style={{
                  background: dark
                    ? "rgba(2,6,23,0.65)"
                    : "rgba(255,255,255,0.75)",
                  color: dark ? "#ffffff" : "#020617",
                }}
              >
                <div className="text-xs opacity-70">{l}</div>
                <div className="text-lg font-bold">
                  {Number(v).toFixed(1)} {u}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MAIN GRID */}
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-4 grid grid-cols-2 gap-4">
            <Chart title="PM2.5" dataKey="pm25" color="#0ea5e9" unit="µg/m³" />
            <Chart title="PM10" dataKey="pm10" color="#22c55e" unit="µg/m³" />
            <Chart title="Temperature" dataKey="temperature" color="#f97316" unit="°C" />
            <Chart title="Humidity" dataKey="humidity" color="#a855f7" unit="%" />
            <Chart title="Gas" dataKey="gas" color="#ef4444" unit="ppm" />
            <Chart title="Light" dataKey="light" color="#eab308" unit="lux" />
          </div>

          {/* ALERTS */}
          <div
            className="rounded-xl p-4 backdrop-blur-md"
            style={{
              background: dark
                ? "rgba(2,6,23,0.75)"
                : "rgba(255,255,255,0.85)",
              color: dark ? "#ffffff" : "#020617",
            }}
          >
            <div className="flex justify-between mb-2">
              <h3 className="font-semibold">Alerts</h3>
              <button
                onClick={() => setAlerts([])}
                className="text-xs text-red-500"
              >
                Clear
              </button>
            </div>

            {alerts.length === 0 ? (
              <div className="text-sm opacity-70">No active alerts</div>
            ) : (
              <ul className="space-y-2 text-sm">
                {alerts.map((a, i) => (
                  <li key={i}>
                    <span className="font-mono text-xs">{a.time}</span> —{" "}
                    {a.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <footer className="text-center text-xs text-white/70 mt-8">
          © {new Date().getFullYear()} Air Quality Monitoring System
        </footer>
      </div>
    </div>
  );
}
