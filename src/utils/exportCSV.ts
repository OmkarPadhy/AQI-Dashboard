import { AirQualityReading } from "../types/database";

export function exportCSV(data: AirQualityReading[]) {
  const header = Object.keys(data[0]).join(",");
  const rows = data.map((d) => Object.values(d).join(","));
  const csv = [header, ...rows].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "air_quality_data.csv";
  a.click();

  URL.revokeObjectURL(url);
}
