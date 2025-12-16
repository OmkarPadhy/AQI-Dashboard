import { useLiveSensorSimulator } from "./useLiveSensorSimulator";
import { useSupabaseRealtime } from "./useSupabaseRealtime";
import { AirQualityReading } from "../types/database";

const MOCK_MODE = import.meta.env.VITE_MOCK_MODE === "true";

export function useUnifiedSensorData(): {
  data: AirQualityReading[];
  source: "mock" | "supabase";
} {
  const mockData = useLiveSensorSimulator();
  const supabaseData = useSupabaseRealtime();

  if (MOCK_MODE) {
    return { data: mockData, source: "mock" };
  }

  if (supabaseData.length > 0) {
    return { data: supabaseData, source: "supabase" };
  }

  // Fallback: if Supabase empty, still show mock
  return { data: mockData, source: "mock" };
}
