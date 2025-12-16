import { RiskProfile } from "../types/database";

interface Props {
  value: RiskProfile;
  onChange: (v: RiskProfile) => void;
}

export default function RiskProfileSelector({ value, onChange }: Props) {
  return (
    <div className="flex gap-3 items-center">
      <span className="text-sm text-gray-400">Risk Profile:</span>
      {["normal", "asthma", "elderly", "child"].map(p => (
        <button
          key={p}
          onClick={() => onChange(p as RiskProfile)}
          className={`px-3 py-1 rounded ${
            value === p ? "bg-accent text-black" : "bg-card text-gray-300"
          }`}
        >
          {p.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
