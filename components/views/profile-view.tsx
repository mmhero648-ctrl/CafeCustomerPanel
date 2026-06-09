'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { Price, Stamp, SectionRule } from '@/components/typeset'
import { WALLET_TX, CAMPAIGNS, type PastOrder } from '@/lib/data'

type Tab = 'overview' | 'orders' | 'wallet' | 'rewards'

const TABS: { key: Tab; label: string }[] = [
  { key: 'overview', label: 'نمای کلی' },
  { key: 'orders', label: 'سفارش‌ها' },
  { key: 'wallet', label: 'کیف پول' },
  { key: 'rewards', label: 'باشگاه' },
]

const MODE_LABEL: Record<string, string> = {
  table: 'سر میز',
  takeaway: 'بیرون‌بر',
  delivery: 'ارسال',
}

export function ProfileView() {
  const { state, navigate } = useStore()
  const { customer } = state
  const [tab, setTab] = useState<Tab>('overview')

  if (!customer.loggedIn) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-2xl text-ink">هنوز وارد نشده‌اید</p>
        <p className="mt-2 text-sm text-ink-soft">
          برای دیدن پروفایل، سفارش‌ها و کیف پول، ابتدا وارد شوید.
        </p>
        <button
          onClick={() => navigate('menu', 'right')}
          className="mt-6 border border-green px-7 py-2.5 text-sm text-green transition-colors hover:bg-green hover:text-green-foreground"
        >
          بازگشت به منو
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-xl px-5 pb-32 pt-6">
      <ProfileHeader />

      {/* tabs */}
      <nav className="mt-5 flex items-center gap-5 border-b border-line">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`relative -mb-px pb-3 text-sm transition-colors ${
              tab === t.key
                ? 'border-b-2 border-green font-display text-green'
                : 'border-b-2 border-transparent text-ink-faint hover:text-ink-muted'
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div key={tab} className="anim-fade mt-5">
        {tab === 'overview' && <OverviewTab />}
        {tab === 'orders' && <OrdersTab orders={state.pastOrders} />}
        {tab === 'wallet' && <WalletTab />}
        {tab === 'rewards' && <RewardsTab />}
      </div>
    </div>
  )
}

function ProfileHeader() {
  const { state } = useStore()
  const { customer } = state
  return (
    <header className="paper-card relative overflow-hidden px-6 py-7">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-gold/10">
          <span className="font-display text-2xl text-gold">
            {customer.name.slice(0, 1)}
          </span>
        </div>
        <div className="flex-1">
          <p className="font-display text-2xl text-ink">{customer.name}</p>
          <p className="num mt-0.5 text-sm text-ink-soft" dir="ltr">
            {customer.phone || '0912 000 0000'}
          </p>
        </div>
        <Stamp tone="gold">عضو {customer.tierFa}</Stamp>
      </div>

      <SectionRule className="my-5" />

      <div className="flex items-stretch divide-x divide-x-reverse divide-line text-center">
        <Stat label="امتیاز باشگاه" value={customer.points.toLocaleString('en-US')} tone="gold" />
        <Stat label="موجودی کیف پول" value={customer.wallet.toLocaleString('en-US')} suffix="T" />
      </div>
    </header>
  )
}

function Stat({
  label,
  value,
  suffix,
  tone = 'ink',
}: {
  label: string
  value: string
  suffix?: string
  tone?: 'ink' | 'gold'
}) {
  return (
    <div className="flex-1 px-4">
      <p
        className={`num font-display text-2xl ${tone === 'gold' ? 'text-gold' : 'text-ink'}`}
        dir="ltr"
      >
        {value}
        {suffix && <span className="text-sm text-ink-faint"> {suffix}</span>}
      </p>
      <p className="mt-1 text-[11px] uppercase tracking-wide text-ink-faint">
        {label}
      </p>
    </div>
  )
}

function OverviewTab() {
  const { state } = useStore()
  const recent = state.pastOrders.slice(0, 2)
  return (
    <div className="flex flex-col gap-4">
      {state.activeOrder && (
        <ActiveOrderCard />
      )}
      <div className="paper-card px-6 py-5">
        <p className="text-[11px] uppercase tracking-[0.25em] text-ink-faint">
          آخرین سفارش‌ها
        </p>
        <SectionRule className="my-3" />
        <ul className="flex flex-col gap-3">
          {recent.map((o) => (
            <li key={o.id} className="flex items-baseline justify-between text-sm">
              <span className="text-ink">
                <span className="num text-ink-soft" dir="ltr">
                  #{o.id}
                </span>{' '}
                · {MODE_LABEL[o.mode]}
              </span>
              <Price value={o.total} className="text-ink-soft" />
            </li>
          ))}
        </ul>
      </div>
      <FavoriteCard />
    </div>
  )
}

function ActiveOrderCard() {
  const { state, navigate } = useStore()
  const o = state.activeOrder!
  const stage = o.stages[o.currentStage]
  return (
    <button
      onClick={() => navigate('tracking', 'left')}
      className="paper-card flex items-center gap-4 px-6 py-5 text-right transition-shadow hover:shadow-lg"
    >
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green/60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green" />
      </span>
      <div className="flex-1">
        <p className="font-display text-ink">سفارش در جریان</p>
        <p className="text-xs text-ink-soft">{stage.label}</p>
      </div>
      <span className="num text-sm text-green" dir="ltr">
        #{o.number} ←
      </span>
    </button>
  )
}

function FavoriteCard() {
  return (
    <div className="paper-card px-6 py-5">
      <p className="text-[11px] uppercase tracking-[0.25em] text-ink-faint">
        نوشیدنی همیشگی شما
      </p>
      <SectionRule className="my-3" />
      <div className="flex items-baseline justify-between">
        <div>
          <p className="font-display text-lg text-ink">کاپوچینو</p>
          <p className="text-xs text-ink-soft">شیر بدون لاکتوز · بدون شکر</p>
        </div>
        <Price value={88000} className="text-green" />
      </div>
    </div>
  )
}

function OrdersTab({ orders }: { orders: PastOrder[] }) {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <ul className="flex flex-col gap-3">
      {orders.map((o) => {
        const expanded = open === o.id
        return (
          <li key={o.id} className="paper-card overflow-hidden">
            <button
              onClick={() => setOpen(expanded ? null : o.id)}
              className="flex w-full items-center justify-between px-6 py-4 text-right"
            >
              <div>
                <p className="font-display text-ink">
                  <span className="num" dir="ltr">
                    #{o.id}
                  </span>{' '}
                  · {MODE_LABEL[o.mode]}
                </p>
                <p className="num mt-0.5 text-xs text-ink-faint" dir="ltr">
                  {o.date} · {o.itemCount} قلم
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Price value={o.total} className="text-sm text-ink-soft" />
                <span
                  className={`text-ink-faint transition-transform ${expanded ? 'rotate-180' : ''}`}
                  aria-hidden
                >
                  ⌄
                </span>
              </div>
            </button>
            {expanded && (
              <div className="anim-fade border-t border-line px-6 py-4">
                <ul className="flex flex-col gap-2">
                  {o.lines.map((l, i) => (
                    <li
                      key={i}
                      className="flex items-baseline justify-between text-sm"
                    >
                      <span className="text-ink-soft">
                        <span className="num" dir="ltr">
                          {l.qty}×
                        </span>{' '}
                        {l.name}
                      </span>
                      <Price value={l.price} className="text-ink-faint" />
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex items-center justify-between">
                  <Stamp tone="green">{o.status}</Stamp>
                  <button className="text-[13px] text-green hover:underline">
                    سفارش دوباره
                  </button>
                </div>
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

function WalletTab() {
  const { state } = useStore()
  return (
    <div className="flex flex-col gap-4">
      <div className="paper-card px-6 py-7 text-center">
        <p className="text-[11px] uppercase tracking-[0.25em] text-ink-faint">
          موجودی کیف پول
        </p>
        <p className="num mt-3 font-display text-4xl text-green" dir="ltr">
          {state.customer.wallet.toLocaleString('en-US')}
          <span className="text-lg text-ink-faint"> T</span>
        </p>
        <button className="mt-5 border border-green px-7 py-2.5 text-sm text-green transition-colors hover:bg-green hover:text-green-foreground">
          افزایش موجودی
        </button>
      </div>
      <div className="paper-card px-6 py-5">
        <p className="text-[11px] uppercase tracking-[0.25em] text-ink-faint">
          گردش حساب
        </p>
        <SectionRule className="my-3" />
        <ul className="flex flex-col gap-3">
          {WALLET_TX.map((tx) => (
            <li key={tx.id} className="flex items-baseline justify-between">
              <div>
                <p className="text-sm text-ink">{tx.description}</p>
                <p className="num text-xs text-ink-faint" dir="ltr">
                  {tx.date}
                </p>
              </div>
              <span
                className={`num text-sm ${tx.amount >= 0 ? 'text-green' : 'text-burgundy'}`}
                dir="ltr"
              >
                {tx.amount >= 0 ? '+' : '−'}
                {Math.abs(tx.amount).toLocaleString('en-US')}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function RewardsTab() {
  const { state } = useStore()
  const { customer } = state
  const nextTierAt = 2000
  const pct = Math.min(100, (customer.points / nextTierAt) * 100)
  return (
    <div className="flex flex-col gap-4">
      <div className="paper-card px-6 py-6">
        <div className="flex items-baseline justify-between">
          <p className="font-display text-lg text-ink">
            سطح {customer.tierFa}
          </p>
          <span className="num text-sm text-gold" dir="ltr">
            {customer.points.toLocaleString('en-US')} / {nextTierAt.toLocaleString('en-US')}
          </span>
        </div>
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-gold transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-3 text-xs text-ink-soft">
          {(nextTierAt - customer.points).toLocaleString('en-US')} امتیاز تا سطح
          طلایی و دریافت قهوهٔ ماهانهٔ مهمان
        </p>
      </div>

      <div>
        <p className="px-1 text-[11px] uppercase tracking-[0.25em] text-ink-faint">
          کمپین‌های فعال
        </p>
        <ul className="mt-3 flex flex-col gap-3">
          {CAMPAIGNS.map((c) => (
            <li key={c.id} className="paper-card px-6 py-5">
              <div className="flex items-center justify-between">
                <p className="font-display text-lg text-ink">{c.title}</p>
                <Stamp tone="rose">{c.tag}</Stamp>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {c.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
