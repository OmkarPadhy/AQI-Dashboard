// src/utils/format.ts
// Utility formatting helpers used across the dashboard (dates, numbers, vitals, etc.)

/**
 * Formats a Date or ISO string to a readable local string.
 * Example: "2025-10-02T12:34:56Z" -> "Oct 2, 2025 • 5:04 PM"
 */
export function formatDateTime(value: string | Date | null | undefined): string {
  if (!value) return '—'
  const d = typeof value === 'string' ? new Date(value) : value
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

/** Short time (HH:MM) used in small charts footers */
export function formatTimeShort(value: string | Date): string {
  const d = typeof value === 'string' ? new Date(value) : value
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

/** Return a number or '—' for invalid */
export function safeNumber(v: unknown, decimals = 2): string {
  const n = typeof v === 'number' ? v : Number(v as any)
  if (!isFinite(n)) return '—'
  return Number(n.toFixed(decimals)).toString()
}

/** Temperature format: keep 1 decimal and add °C */
export function formatTemperature(v: unknown): string {
  const n = Number(v)
  if (!isFinite(n)) return '—'
  return `${n.toFixed(1)} °C`
}

/** SpO2 format: percent with 1 decimal */
export function formatPercent(v: unknown): string {
  const n = Number(v)
  if (!isFinite(n)) return '—'
  return `${n.toFixed(1)} %`
}

/** BPM format for heart rate */
export function formatBPM(v: unknown): string {
  const n = Number(v)
  if (!isFinite(n)) return '—'
  return `${Math.round(n)} BPM`
}

/** Respiratory rate format (per minute) */
export function formatRR(v: unknown): string {
  const n = Number(v)
  if (!isFinite(n)) return '—'
  return `${Math.round(n)} /min`
}

/**
 * Blood pressure formatting.
 * Accepts array [systolic, diastolic] or object {systolic, diastolic} or "s/d" string.
 */
export function formatBloodPressure(v: any): string {
  if (!v && v !== 0) return '—'
  if (Array.isArray(v) && v.length >= 2) {
    const s = Number(v[0]); const d = Number(v[1])
    if (!isFinite(s) || !isFinite(d)) return '—'
    return `${Math.round(s)} / ${Math.round(d)}`
  }
  if (typeof v === 'object' && v !== null) {
    const s = Number(v.systolic ?? v.sys ?? NaN)
    const d = Number(v.diastolic ?? v.dia ?? NaN)
    if (!isFinite(s) || !isFinite(d)) return '—'
    return `${Math.round(s)} / ${Math.round(d)}`
  }
  if (typeof v === 'string') {
    // try to parse "120.3/80.2" etc
    const parts = v.split(/[\/,]/).map((p) => p.trim())
    if (parts.length >= 2) {
      const s = Number(parts[0]); const d = Number(parts[1])
      if (!isFinite(s) || !isFinite(d)) return v
      return `${Math.round(s)} / ${Math.round(d)}`
    }
    return v
  }
  return '—'
}

/** Format elapsed time: human friendly "5m ago" etc. */
export function timeAgo(value: string | Date | number | null | undefined): string {
  if (!value) return '—'
  const t = typeof value === 'number' ? value : new Date(value).getTime()
  if (!isFinite(t)) return '—'
  const seconds = Math.floor((Date.now() - t) / 1000)
  if (seconds < 0) return 'just now'
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

/** Determine alert display class or color by alert type/level */
export function alertSeverityClass(type?: string, level?: string) {
  // returns small token used for tailwind class decisions in components
  if (!type && !level) return 'info'
  const t = (type || '').toLowerCase()
  const l = (level || '').toLowerCase()
  if (t === 'critical' || l === 'critical' || l === 'high') return 'critical'
  if (t === 'warning' || l === 'warning' || l === 'medium') return 'warning'
  return 'info'
}
