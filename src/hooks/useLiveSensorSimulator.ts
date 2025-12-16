import { useEffect, useState } from "react";
import { AirQualityReading } from "../types/database";

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function drift(prev: number, delta: number, min: number, max: number) {
  return clamp(prev + (Math.random() - 0.5) * delta, min, max);
}

export function useLiveSensorSimulator() {
  const [data, setData] = useState<AirQualityReading[]>(() => {
    const now = Date.now();
    return Array.from({ length: 60 }).map((_, i) => ({
      id: `init-${i}`,
      timestamp: new Date(now - (60 - i) * 1000).toISOString(),
      pm25: 35,
      pm10: 70,
      temperature: 26,
      humidity: 55,
      gas: 180,
      light: 420,
      device_id: "demo",
      confidence: 0.95,
    }));
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setData((prev) => {
        const last = prev[prev.length - 1];

        const next: AirQualityReading = {
          ...last,
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          pm25: drift(last.pm25, 3, 10, 120),
          pm10: drift(last.pm10, 4, 20, 200),
          temperature: drift(last.temperature, 0.3, 18, 40),
          humidity: drift(last.humidity, 1.2, 30, 90),
          gas: drift(last.gas, 8, 100, 600),
          light: drift(last.light, 25, 50, 900),
        };

        return [...prev.slice(1), next];
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return data;
}
