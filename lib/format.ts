export function formatT(n: number): string {
  return n.toLocaleString('en-US')
}

export function nowTime(): string {
  const d = new Date()
  const hh = d.getHours().toString().padStart(2, '0')
  const mm = d.getMinutes().toString().padStart(2, '0')
  return `${hh}:${mm}`
}

export function genOrderNumber(): string {
  return (10500 + Math.floor(Math.random() * 499)).toString()
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10)
}
