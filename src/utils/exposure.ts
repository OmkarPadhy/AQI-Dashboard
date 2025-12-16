import { RiskProfile } from "../types/database";

export const vulnerabilityFactor: Record<RiskProfile, number> = {
  normal: 1.0,
  asthma: 1.4,
  elderly: 1.3,
  child: 1.2
};

export function computeCEI(readings: { pm25: number }[]): number {
  if (readings.length < 2) return 0;
  return readings.reduce((sum, r) => sum + r.pm25, 0);
}

export function computeRisk(cei: number, profile: RiskProfile) {
  return cei * vulnerabilityFactor[profile];
}

export function riskLevel(cei: number): "Safe" | "Moderate" | "Unsafe" {
  if (cei < 200) return "Safe";
  if (cei < 400) return "Moderate";
  return "Unsafe";
}

export function timeToUnsafe(cei: number, rate: number) {
  if (rate <= 0) return null;
  return Math.max(0, (400 - cei) / rate);
}
