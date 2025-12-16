import { AirQualityReading } from "../types/database";

export default function AIInsights({ data }: { data: AirQualityReading[] }) {
  if (data.length < 5) {
    return <div className="bg-card p-4 rounded-lg">Collecting data…</div>;
  }

  const last = data[data.length - 1];

  let insight = "Air quality remains stable.";
  if (last.pm25 > 60) insight = "PM2.5 levels have been elevated for a prolonged period.";
  if (last.pm25 > 90) insight = "Severe particulate exposure detected. Avoid outdoor activity.";

  return (
    <div className="bg-card p-4 rounded-lg">
      <h3 className="text-gray-300 mb-2">AI Analysis</h3>
      <p className="text-gray-200">{insight}</p>
    </div>
  );
}
