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
  title: string;
  dataKey: keyof AirQualityReading;
  unit: string;
  color: string;
  data: AirQualityReading[];
}

export default function SensorLineChart({
  title,
  dataKey,
  unit,
  color,
  data,
}: Props) {
  return (
    <div className="glass-card p-4">
      <h3 className="mb-2 text-sm text-gray-300">
        {title} ({unit})
      </h3>

      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="timestamp" hide />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={false}
              isAnimationActive
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
