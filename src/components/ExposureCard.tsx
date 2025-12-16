interface Props {
  label: string;
  value: string;
  status?: "safe" | "moderate" | "unsafe";
}

export default function ExposureCard({ label, value, status }: Props) {
  const color =
    status === "unsafe"
      ? "text-red-400"
      : status === "moderate"
      ? "text-yellow-400"
      : "text-green-400";

  return (
    <div className="bg-card p-4 rounded-lg shadow">
      <p className="text-sm text-gray-400">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
