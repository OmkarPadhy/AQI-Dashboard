import { useEffect, useState } from "react";
import { AirQualityReading } from "../types/database";

function smooth(prev: number, delta: number, min: number, max: number) {
  const next = prev + (Math.random() - 0.5) * delta;
  return Math.min(max, Math.max(min, next));
}

export function useLiveMockSensors() {
  const [data, setData] = useState<AirQualityReading[]>(() => {
    const now = Date.now();
    return Array.from({ length: 30 }).map((_, i) => ({
      id: `mock-${i}`,
      timestamp: new Date(now - (30 - i) * 60000).toISOString(),
      pm25: 45,
      pm10: 80,
      temperature: 26,
      humidity: 55,
      gas: 210,
      light: 380,
      device_id: "demo-device",
      confidence: 0.9,
    }));
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const last = prev[prev.length - 1];

        const next: AirQualityReading = {
          ...last,
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          pm25: smooth(last.pm25, 4, 10, 150),
          pm10: smooth(last.pm10, 6, 20, 250),
          temperature: smooth(last.temperature, 0.4, 18, 40),
          humidity: smooth(last.humidity, 1.5, 30, 90),
          gas: smooth(last.gas, 10, 100, 600),
          light: smooth(last.light, 20, 50, 900),
        };

        return [...prev.slice(1), next];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return data;
}
