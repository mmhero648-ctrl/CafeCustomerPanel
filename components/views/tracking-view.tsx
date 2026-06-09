'use client'

import { useEffect, useRef, useState } from 'react'
import { useStore } from '@/lib/store'
import { Price, Stamp, SectionRule } from '@/components/typeset'

const MODE_LABEL: Record<string, string> = {
  table: 'سرو سر میز',
  takeaway: 'بیرون‌بر',
  delivery: 'ارسال با پیک',
}

export function TrackingView() {
  const { state, advanceStage, openSurvey, navigate } = useStore()
  const order = state.activeOrder
  const [elapsed, setElapsed] = useState(0)
  const surveyFired = useRef(false)

  const stageCount = order?.stages.length ?? 0
  const current = order?.currentStage ?? 0
  const done = current >= stageCount - 1

  // advance one stage every ~6s
  useEffect(() => {
    if (!order || done) return
    const t = setTimeout(() => advanceStage(), 6000)
    return () => clearTimeout(t)
  }, [order, done, current, advanceStage])

  // elapsed clock
  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(t)
  }, [])

  // fire survey shortly after final stage
  useEffect(() => {
    if (!order || !done) return
    if (surveyFired.current || state.surveyDone) return
    surveyFired.current = true
    const t = setTimeout(() => openSurvey(), 2200)
    return () => clearTimeout(t)
  }, [order, done, openSurvey, state.surveyDone])

  if (!order) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-xl text-ink-muted italic">
          سفارش فعالی برای پیگیری نیست
        </p>
        <button
          onClick={() => navigate('menu', 'right')}
          className="mt-6 border border-green px-7 py-2.5 text-sm text-green transition-colors hover:bg-green hover:text-green-foreground"
        >
          مشاهدهٔ منو
        </button>
      </div>
    )
  }

  const mins = String(Math.floor(elapsed / 60)).padStart(2, '0')
  const secs = String(elapsed % 60).padStart(2, '0')

  return (
    <div className="mx-auto w-full max-w-xl px-5 pb-32 pt-6">
      {/* receipt header */}
      <header className="paper-card relative px-6 py-7 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-ink-faint">
          رسید سفارش
        </p>
        <p className="mt-3 font-display text-5xl text-green num" dir="ltr">
          #{order.number}
        </p>
        <div className="mt-3 flex items-center justify-center gap-3">
          <Stamp tone="green">{MODE_LABEL[order.mode]}</Stamp>
          {order.table && <Stamp tone="gold">میز {order.table}</Stamp>}
        </div>
        <p className="mt-4 text-xs text-ink-faint">
          زمان سپری‌شده{' '}
          <span className="num text-ink-soft" dir="ltr">
            {mins}:{secs}
          </span>
        </p>
      </header>

      {/* live status banner */}
      <div className="paper-card mt-4 flex items-center gap-4 px-6 py-5">
        <span className="relative flex h-3 w-3 shrink-0">
          {!done && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green/60" />
          )}
          <span
            className={`relative inline-flex h-3 w-3 rounded-full ${
              done ? 'bg-gold' : 'bg-green'
            }`}
          />
        </span>
        <div>
          <p className="font-display text-lg text-ink">
            {order.stages[current].label}
          </p>
          <p className="text-sm text-ink-soft">
            {order.stages[current].descriptor}
          </p>
        </div>
      </div>

      {/* vertical stepper */}
      <div className="paper-card mt-4 px-6 py-7">
        <ol className="relative">
          {order.stages.map((s, i) => {
            const reached = i <= current
            const isActive = i === current
            const isLast = i === stageCount - 1
            return (
              <li key={s.key} className="relative flex gap-4 pb-8 last:pb-0">
                {!isLast && (
                  <span
                    aria-hidden
                    className={`absolute right-[7px] top-5 h-full w-px ${
                      i < current ? 'bg-green/50' : 'bg-line'
                    }`}
                  />
                )}
                <span
                  className={`relative z-10 mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                    reached ? 'border-green bg-green' : 'border-line bg-paper'
                  } ${isActive && !done ? 'ring-4 ring-green/15' : ''}`}
                >
                  {reached && (
                    <span className="h-1.5 w-1.5 rounded-full bg-paper" />
                  )}
                </span>
                <div className="flex flex-1 items-start justify-between gap-3">
                  <div>
                    <p
                      className={`font-display ${
                        reached ? 'text-ink' : 'text-ink-faint'
                      }`}
                    >
                      {s.label}
                    </p>
                    <p className="text-xs text-ink-faint">{s.descriptor}</p>
                  </div>
                  {s.time && (
                    <span className="num text-xs text-ink-soft" dir="ltr">
                      {s.time}
                    </span>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      {/* order lines summary */}
      <div className="paper-card mt-4 px-6 py-6">
        <p className="text-[11px] uppercase tracking-[0.25em] text-ink-faint">
          اقلام سفارش
        </p>
        <SectionRule className="my-3" />
        <ul className="flex flex-col gap-2.5">
          {order.lines.map((l) => (
            <li
              key={l.lineId}
              className="flex items-baseline justify-between text-sm"
            >
              <span className="text-ink">
                <span className="num text-ink-soft" dir="ltr">
                  {l.quantity}×
                </span>{' '}
                {l.name}
              </span>
              <Price
                value={l.unitPrice * l.quantity}
                className="text-ink-soft"
              />
            </li>
          ))}
        </ul>
        <SectionRule className="my-3" />
        <div className="flex items-baseline justify-between">
          <span className="font-display text-ink">مبلغ پرداختی</span>
          <Price value={order.total} className="text-lg text-green" />
        </div>
      </div>

      {done && (
        <div className="anim-fade mt-6 text-center">
          <p className="font-display text-lg text-green">نوش جان</p>
          <button
            onClick={() => navigate('menu', 'right')}
            className="mt-4 border border-green px-8 py-2.5 text-sm text-green transition-colors hover:bg-green hover:text-green-foreground"
          >
            سفارش دوباره از منو
          </button>
        </div>
      )}
    </div>
  )
}
