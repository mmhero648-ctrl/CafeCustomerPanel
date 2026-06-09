'use client'

import { useStore } from '@/lib/store'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'

export function LandingView() {
  const { navigate, setMode } = useStore()
  const [tableMode, setTableMode] = useState(false)
  const [table, setTable] = useState('')

  function startTable() {
    if (!tableMode) {
      setTableMode(true)
      return
    }
    setMode('table', table || '۷')
    navigate('menu', 'left')
  }

  function startTakeaway() {
    setMode('takeaway')
    navigate('menu', 'left')
  }

  function browse() {
    navigate('menu', 'left')
  }

  return (
    <main className="relative z-10 mx-auto flex min-h-screen max-w-[760px] flex-col items-center justify-center px-6 py-16 text-center">
      <p className="mb-6 text-[11px] tracking-[0.4em] text-gold uppercase">
        Est. 1947 · Café Ravi
      </p>
      <h1 className="font-display text-6xl leading-[0.95] text-green text-balance sm:text-7xl md:text-8xl">
        کافه راوی
      </h1>
      <p className="mt-6 max-w-md font-display text-lg text-ink-muted italic text-pretty">
        قهوهٔ دم‌آوری‌شده با حوصله، در فضایی که بوی کاغذ و دانهٔ تازه می‌دهد.
      </p>

      <div className="mt-12 h-px w-24 bg-gold/50" aria-hidden />

      <div className="mt-12 flex w-full max-w-sm flex-col gap-5">
        {tableMode ? (
          <div className="anim-fade flex flex-col gap-3">
            <label className="text-right text-sm text-ink-muted">
              شمارهٔ میز خود را وارد کنید
            </label>
            <div className="flex items-center gap-3">
              <input
                autoFocus
                value={table}
                onChange={(e) => setTable(e.target.value.replace(/[^0-9۰-۹]/g, ''))}
                placeholder="مثلاً ۷"
                className="num w-full border-b border-line-strong bg-transparent pb-2 text-center text-2xl text-ink outline-none placeholder:text-ink-faint focus:border-gold"
                dir="ltr"
              />
              <button
                onClick={startTable}
                className="flex shrink-0 items-center gap-2 bg-green px-5 py-2.5 font-display text-green-foreground transition-colors hover:bg-green/90"
              >
                ورود
                <ArrowLeft className="size-4" strokeWidth={1.6} />
              </button>
            </div>
          </div>
        ) : (
          <ActionLine label="سفارش از میز شما" onClick={startTable} primary />
        )}

        {!tableMode && (
          <>
            <ActionLine label="بیرون‌بر یا ارسال" onClick={startTakeaway} primary />
            <button
              onClick={browse}
              className="mt-2 inline-flex items-center justify-center gap-2 font-display text-sm text-ink-muted underline decoration-gold/50 underline-offset-4 transition-colors hover:text-green"
            >
              تماشای منو
              <ArrowLeft className="size-3.5" strokeWidth={1.6} />
            </button>
          </>
        )}
      </div>
    </main>
  )
}

function ActionLine({
  label,
  onClick,
  primary,
}: {
  label: string
  onClick: () => void
  primary?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center justify-between border-b border-line-strong py-4 text-right transition-colors hover:border-gold"
    >
      <span className="font-display text-2xl text-green">{label}</span>
      <ArrowLeft
        className="size-5 text-gold transition-transform group-hover:-translate-x-1"
        strokeWidth={1.6}
      />
    </button>
  )
}
