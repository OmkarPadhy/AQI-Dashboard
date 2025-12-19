import { useEffect, useState } from "react";
import { AirQualityReading } from "../types/database";

const MAX_POINTS = 120;

export function useLiveSensorSimulator(): AirQualityReading[] {
  const [data, setData] = useState<AirQualityReading[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const now = new Date().toISOString();
        const t = prev.length;

        // ---- NORMAL BASELINE ----
        let pm25 = 25 + Math.random() * 5;
        let pm10 = 55 + Math.random() * 8;
        let temperature = 25 + Math.random();
        let humidity = 50 + Math.random() * 4;
        let gas = 150 + Math.random() * 20;
        let light = 300 + Math.random() * 100;

        // ---- INJECT ABNORMAL EVENTS ----
        // Every ~30–45 seconds
        if (t % 35 === 0 && t !== 0) {
          pm25 = 85 + Math.random() * 20;      // Critical PM2.5
          gas = 480 + Math.random() * 80;      // Gas spike
        }

        if (t % 50 === 0 && t !== 0) {
          temperature = 38 + Math.random() * 3; // High temp
          humidity = 75 + Math.random() * 8;    // High humidity
        }

        const newPoint: AirQualityReading = {
          id: crypto.randomUUID(),
          timestamp: now,
          pm25,
          pm10,
          temperature,
          humidity,
          gas,
          light,
        };

        const updated = [...prev, newPoint];
        return updated.length > MAX_POINTS
          ? updated.slice(updated.length - MAX_POINTS)
          : updated;
      });
    }, 1000); // 1 second update

    return () => clearInterval(interval);
  }, []);

  return data;
}
