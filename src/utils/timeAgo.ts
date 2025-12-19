export function timeAgo(timestamp: string): string {
  const diff = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);

  if (diff < 5) return "Just now";
  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;

  return `${Math.floor(diff / 3600)} hr ago`;
}
