import { useEffect, useState } from "react";
import { supabase } from "../contexts/SupabaseContext";
import { AirQualityReading } from "../types/database";

export function useSupabaseRealtime() {
  const [data, setData] = useState<AirQualityReading[]>([]);

  useEffect(() => {
    supabase
      .from("air_quality_readings")
      .select("*")
      .then(({ data }) => {
        if (data) setData(data);
      });

    const channel = supabase
      .channel("aqi-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "air_quality_readings" },
        payload => {
          setData(prev => [...prev, payload.new as AirQualityReading]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return data;
}
