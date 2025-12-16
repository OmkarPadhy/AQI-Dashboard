export interface AirQualityReading {
  id: string;
  timestamp: string;
  pm25: number;
  pm10: number;
  temperature: number;
  humidity: number;
  device_id: string;
  confidence: number;
}

export type RiskLevel = "Safe" | "Moderate" | "Unsafe";

export type RiskProfile = "normal" | "asthma" | "elderly" | "child";
