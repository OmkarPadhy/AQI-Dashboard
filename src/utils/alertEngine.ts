import { AirQualityReading } from "../types/database";

export type Alert = {
  id: string;
  type: "warning" | "critical";
  message: string;
  timestamp: string;
};

function nowTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function generateAlerts(latest: AirQualityReading): Alert[] {
  const alerts: Alert[] = [];

  if (latest.pm25 > 60) {
    alerts.push({
      id: crypto.randomUUID(),
      type: "critical",
      message: "Unhealthy PM2.5 level detected",
      timestamp: nowTime(),
    });
  }

  if (latest.gas > 400) {
    alerts.push({
      id: crypto.randomUUID(),
      type: "critical",
      message: "Smoke / Gas concentration spike detected",
      timestamp: nowTime(),
    });
  }

  if (latest.temperature > 35) {
    alerts.push({
      id: crypto.randomUUID(),
      type: "critical",
      message: "High temperature detected",
      timestamp: nowTime(),
    });
  }

  if (latest.humidity > 70) {
    alerts.push({
      id: crypto.randomUUID(),
      type: "warning",
      message: "High humidity level detected",
      timestamp: nowTime(),
    });
  }

  return alerts;
}
