export interface AirQualityReading {
  id?: number;
  timestamp: string;

  pm25: number;
  pm10: number;

  temperature: number;
  humidity: number;

  gas: number;     
  light: number;   
}


export type RiskLevel = "Safe" | "Moderate" | "Unsafe";

export type RiskProfile = "normal" | "asthma" | "elderly" | "child";
