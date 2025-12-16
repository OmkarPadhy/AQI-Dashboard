import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AirQualityReading } from "../types/database";

interface Props {
  data: AirQualityReading[];
}

export default function ExposureCharts({ data }: Props) {
  const hasData = data && data.length > 0;

  return (
    <div className="bg-card p-4 rounded-lg">
      <h3 className="mb-3 text-gray-300 font-medium">
        PM2.5 Trend (µg/m³)
      </h3>

      {/* Chart Area */}
      <div className="w-full h-[250px] relative">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="timestamp"
                tick={false}
                axisLine={false}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#e5e7eb" }}
              />
              <Line
                type="monotone"
                dataKey="pm25"
                stroke="#38bdf8"
                strokeWidth={2}
                dot={false}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          /* Empty / Disconnected State */
          <div className="absolute inset-0 flex flex-col items-center justify-center border border-dashed border-white/20 rounded-lg">
            <p className="text-sm text-gray-400">
              No sensor data available
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Waiting for device connection…
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
