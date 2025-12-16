import { useUnifiedSensorData } from "../hooks/useUnifiedSensorData";
import SensorLineChart from "../components/SensorLineChart";

export default function Dashboard() {
  const { data, source } = useUnifiedSensorData();
  const latest = data[data.length - 1];

  return (
    <div className="min-h-screen p-6 space-y-6 bg-air">
      {/* Top status banner */}
      <div className="glass-card p-3 text-sm text-blue-300">
        {source === "mock"
          ? "🟡 Demo Mode — Simulated live sensor data (1s update)"
          : "🟢 Live Mode — Real-time data from Supabase"}
      </div>

      {/* Live Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Stat label="PM2.5" value={`${latest.pm25.toFixed(1)} µg/m³`} />
        <Stat label="PM10" value={`${latest.pm10.toFixed(1)} µg/m³`} />
        <Stat label="Temperature" value={`${latest.temperature.toFixed(1)} °C`} />
        <Stat label="Humidity" value={`${latest.humidity.toFixed(1)} %`} />
        <Stat label="Gas" value={`${latest.gas.toFixed(0)} ppm`} />
        <Stat label="Light" value={`${latest.light.toFixed(0)} lux`} />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <SensorLineChart title="PM2.5" dataKey="pm25" unit="µg/m³" color="#38bdf8" data={data} />
        <SensorLineChart title="PM10" dataKey="pm10" unit="µg/m³" color="#22c55e" data={data} />
        <SensorLineChart title="Temperature" dataKey="temperature" unit="°C" color="#f97316" data={data} />
        <SensorLineChart title="Humidity" dataKey="humidity" unit="%" color="#a855f7" data={data} />
        <SensorLineChart title="Gas Level" dataKey="gas" unit="ppm" color="#ef4444" data={data} />
        <SensorLineChart title="Light Intensity" dataKey="light" unit="lux" color="#facc15" data={data} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-card p-3 text-center">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}
