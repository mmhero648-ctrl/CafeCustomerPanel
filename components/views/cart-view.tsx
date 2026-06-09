'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { findItem } from '@/lib/data'
import { Price } from '@/components/typeset'
import { ItemSheet } from '@/components/item-sheet'
import type { CartLine } from '@/lib/data'
import { ArrowLeft, Pencil } from 'lucide-react'
import { cn } from '@/lib/utils'

const MODES = [
  { key: 'table', label: 'حضوری' },
  { key: 'takeaway', label: 'بیرون‌بر' },
  { key: 'delivery', label: 'ارسالی' },
] as const

export function CartView() {
  const {
    state,
    navigate,
    removeLine,
    setMode,
    cartSubtotal,
    discount,
    deliveryFee,
    walletDeduction,
    total,
    applyPromo,
    toggleWallet,
  } = useStore()
  const [editLine, setEditLine] = useState<CartLine | null>(null)
  const [promoInput, setPromoInput] = useState('')

  const empty = state.cart.length === 0

  return (
    <main className="mx-auto max-w-[560px] px-5 pb-24 pt-6">
      <div className="border border-line bg-surface px-6 py-7 sm:px-9">
        {/* mode tabs */}
        <div className="flex items-center justify-center gap-5 pb-4">
          {MODES.map((m) => (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              className={cn(
                'border-b pb-0.5 font-display text-base transition-colors',
                state.mode === m.key
                  ? 'border-gold text-green'
                  : 'border-transparent text-ink-faint hover:text-ink-muted',
              )}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="rule-double" />

        {/* header line */}
        <div className="flex items-baseline justify-between py-3">
          <span className="font-display text-sm tracking-wide text-green uppercase">
            {state.mode === 'table'
              ? `میز ${state.table ?? '۷'}`
              : state.mode === 'delivery'
                ? 'ارسال'
                : 'بیرون‌بر'}
          </span>
          <span className="num text-xs text-ink-faint" dir="ltr">
            {new Date().toLocaleDateString('en-GB')} · {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <div className="rule" />

        {empty ? (
          <div className="py-12 text-center">
            <p className="font-display text-xl text-ink-muted italic">
              دفتر سفارش خالی است
            </p>
            <button
              onClick={() => navigate('menu', 'right')}
              className="mt-4 inline-flex items-center gap-2 font-display text-sm text-green underline decoration-gold/50 underline-offset-4"
            >
              بازگشت به منو
              <ArrowLeft className="size-3.5" strokeWidth={1.6} />
            </button>
          </div>
        ) : (
          <>
            <ul className="py-1">
              {state.cart.map((line) => (
                <li key={line.lineId} className="border-b border-line py-3.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="flex items-baseline gap-2">
                      <span className="num text-sm text-gold" dir="ltr">
                        {line.quantity}×
                      </span>
                      <span className="font-display text-lg text-ink">
                        {line.name}
                      </span>
                    </div>
                    <Price
                      value={line.unitPrice * line.quantity}
                      className="text-sm text-ink"
                    />
                  </div>

                  {line.selections.length > 0 && (
                    <p className="mt-1 pr-7 text-[12px] text-ink-muted">
                      — {line.selections.map((s) => s.label).join('، ')}
                    </p>
                  )}

                  <div className="mt-1.5 flex items-center gap-4 pr-7">
                    <button
                      onClick={() => setEditLine(line)}
                      className="inline-flex items-center gap-1 text-[12px] text-ink-faint transition-colors hover:text-green"
                    >
                      <Pencil className="size-3" strokeWidth={1.6} />
                      ویرایش
                    </button>
                    <button
                      onClick={() => removeLine(line.lineId)}
                      className="text-[13px] text-ink-faint transition-colors hover:text-burgundy"
                      aria-label="حذف"
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* promo */}
            <div className="flex items-center gap-3 py-4">
              <input
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="کد تخفیف یا معرف"
                className="flex-1 border-b border-line-strong bg-transparent pb-1.5 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-gold"
              />
              <button
                onClick={() => promoInput && applyPromo(promoInput)}
                className="font-display text-sm text-green underline decoration-gold/50 underline-offset-4"
              >
                اعمال
              </button>
            </div>

            {/* wallet toggle */}
            <button
              onClick={toggleWallet}
              className="flex w-full items-center justify-between py-2"
            >
              <span className="text-sm text-ink-muted">
                استفاده از موجودی کیف پول (
                <span className="num" dir="ltr">
                  {state.customer.wallet.toLocaleString('en-US')}
                </span>{' '}
                T موجود)
              </span>
              <span
                className={cn(
                  'relative h-5 w-9 border transition-colors',
                  state.walletApplied
                    ? 'border-green bg-green/10'
                    : 'border-line-strong',
                )}
              >
                <span
                  className={cn(
                    'absolute top-0.5 size-3.5 bg-green transition-all',
                    state.walletApplied ? 'left-0.5' : 'right-0.5 bg-ink-faint',
                  )}
                />
              </span>
            </button>

            <div className="my-3 rule-double" />

            {/* totals */}
            <dl className="space-y-2 text-sm">
              <Row label="جمع جزء" value={cartSubtotal} />
              {discount > 0 && (
                <Row label="تخفیف" value={-discount} tone="gold" />
              )}
              {deliveryFee > 0 && <Row label="هزینهٔ ارسال" value={deliveryFee} />}
              {walletDeduction > 0 && (
                <Row label="کیف پول" value={-walletDeduction} tone="gold" />
              )}
            </dl>

            <div className="my-3 rule" />

            <div className="flex items-baseline justify-between">
              <span className="font-display text-xl text-green">مجموع</span>
              <Price value={total} className="text-lg text-green" />
            </div>

            <button
              onClick={() => navigate('checkout', 'left')}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-[4px] bg-green py-3.5 font-display text-base text-green-foreground transition-colors hover:bg-green/90"
            >
              تأیید سفارش
              <ArrowLeft className="size-4" strokeWidth={1.6} />
            </button>
          </>
        )}
      </div>

      <ItemSheet item={editLine ? findItem(editLine.itemId) ?? null : null} editLine={editLine} onClose={() => setEditLine(null)} />
    </main>
  )
}

function Row({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone?: 'gold'
}) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-ink-muted">{label}</dt>
      <dd>
        <Price
          value={value}
          className={cn(tone === 'gold' ? 'text-gold' : 'text-ink')}
        />
      </dd>
    </div>
  )
}
