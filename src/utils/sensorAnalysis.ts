export function analyzePM25(value: number) {
  if (value <= 30) return { level: "Good", color: "text-green-400", msg: "Air quality is safe." };
  if (value <= 60) return { level: "Moderate", color: "text-yellow-400", msg: "Sensitive groups should reduce exposure." };
  return { level: "Unhealthy", color: "text-red-400", msg: "High pollution detected. Avoid outdoor activity." };
}

export function analyzeTemp(value: number) {
  if (value < 18) return { level: "Low", msg: "Cool environment detected." };
  if (value <= 30) return { level: "Normal", msg: "Temperature is within comfort range." };
  return { level: "High", msg: "High temperature detected." };
}

export function analyzeHumidity(value: number) {
  if (value < 35) return { level: "Dry", msg: "Low humidity may cause discomfort." };
  if (value <= 65) return { level: "Normal", msg: "Humidity is optimal." };
  return { level: "Humid", msg: "High humidity detected." };
}
