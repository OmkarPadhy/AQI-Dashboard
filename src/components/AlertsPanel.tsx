import { timeToUnsafe } from "../utils/exposure";

export default function AlertsPanel({ cei }: { cei: number }) {
  const rate = cei / 60; // simplified growth rate
  const time = timeToUnsafe(cei, rate);

  return (
    <div className="bg-card p-4 rounded-lg">
      <h3 className="text-gray-300 mb-2">Exposure Alerts</h3>
      {time ? (
        <p className="text-yellow-400">
          ⚠ Unsafe exposure likely in {Math.round(time)} minutes
        </p>
      ) : (
        <p className="text-green-400">Exposure currently stable</p>
      )}
    </div>
  );
}
