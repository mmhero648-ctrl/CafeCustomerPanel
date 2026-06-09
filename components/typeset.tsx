import { cn } from '@/lib/utils'
import { type ReactNode } from 'react'

export function Price({
  value,
  className,
  showT = true,
}: {
  value: number | string
  className?: string
  showT?: boolean
}) {
  const display = typeof value === 'number' ? value.toLocaleString('en-US') : value
  return (
    <span className={cn('num', className)} dir="ltr">
      {display}
      {showT && <span className="text-ink-faint"> T</span>}
    </span>
  )
}

export function Stamp({
  children,
  tone = 'green',
  className,
}: {
  children: ReactNode
  tone?: 'green' | 'gold' | 'rose' | 'burgundy'
  className?: string
}) {
  const tones: Record<string, string> = {
    green: 'border-green/40 text-green',
    gold: 'border-gold/60 text-gold',
    rose: 'border-rose/50 text-rose',
    burgundy: 'border-burgundy/50 text-burgundy',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border px-2.5 py-0.5 text-[11px] tracking-wide uppercase',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function SectionRule({ className }: { className?: string }) {
  return <div className={cn('rule', className)} aria-hidden />
}

export function TagAnnotations({ tags }: { tags: string[] }) {
  if (!tags.length) return null
  const map: Record<string, { label: string; cls: string }> = {
    veg: { label: 'V', cls: 'text-green' },
    best: { label: '★', cls: 'text-gold' },
    new: { label: 'New', cls: 'text-rose italic' },
  }
  return (
    <span className="inline-flex items-center gap-2 align-middle text-[11px]">
      {tags.map((t) =>
        map[t] ? (
          <span key={t} className={cn('tracking-wide', map[t].cls)}>
            {map[t].label}
          </span>
        ) : null,
      )}
    </span>
  )
}
