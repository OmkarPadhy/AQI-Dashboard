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
  color: string;
  unit: string;
  data: AirQualityReading[];
}

export default function SensorLineChart({
  title,
  dataKey,
  color,
  unit,
  data,
}: Props) {
  return (
    <div className="glass-card p-4 ambient-card">
      <h3 className="text-sm font-medium mb-2 opacity-80">
        {title} ({unit})
      </h3>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <XAxis dataKey="timestamp" hide />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
