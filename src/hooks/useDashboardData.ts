import { useSupabaseRealtime } from "./useSupabaseRealtime";
import { AirQualityReading } from "../types/database";

const mockData: AirQualityReading[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `mock-${i}`,
  timestamp: new Date(Date.now() - (20 - i) * 60000).toISOString(),
  pm25: 45 + Math.sin(i / 3) * 10,
  pm10: 80 + Math.cos(i / 2) * 15,
  temperature: 26 + Math.sin(i / 4) * 2,
  humidity: 55 + Math.cos(i / 3) * 5,
  device_id: "mock-device",
  confidence: 0.6,
}));

export function useDashboardData() {
  const liveData = useSupabaseRealtime();

  const isLive = liveData.length > 0;

  return {
    data: isLive ? liveData : mockData,
    isLive,
  };
}
