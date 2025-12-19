export function getSensorStatus(timestamp: string): "online" | "offline" {
  const last = new Date(timestamp).getTime();
  const now = Date.now();

  return now - last < 10_000 ? "online" : "offline";
}
