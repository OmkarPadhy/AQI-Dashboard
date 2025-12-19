import { supabase } from "../lib/supabase";
import { AirQualityReading } from "../types/database";

export async function fetchHistory(
  from: string,
  to: string
): Promise<AirQualityReading[]> {
  const { data } = await supabase
    .from("air_quality_readings")
    .select("*")
    .gte("timestamp", from)
    .lte("timestamp", to)
    .order("timestamp", { ascending: true });

  return data || [];
}
