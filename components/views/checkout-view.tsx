'use client'

import { useEffect, useRef, useState } from 'react'
import { useStore } from '@/lib/store'
import { Price } from '@/components/typeset'
import { ArrowLeft, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

type Step = 'login' | 'pay' | 'processing'

const SLOTS = ['۱۲:۳۰', '۱۳:۰۰', '۱۳:۳۰', '۱۴:۰۰', '۱۴:۳۰', '۱۵:۰۰']

export function CheckoutView() {
  const { state, login, placeOrder, total } = useStore()
  const [step, setStep] = useState<Step>(
    state.customer.loggedIn ? 'pay' : 'login',
  )

  if (step === 'processing') {
    return <Processing onDone={placeOrder} />
  }

  return (
    <main className="mx-auto max-w-[560px] overflow-hidden px-5 pt-6 pb-24">
      <div className="border border-line bg-surface px-6 py-7 sm:px-9">
        {step === 'login' ? (
          <LoginStep
            onDone={(phone) => {
              login(phone)
              setStep('pay')
            }}
          />
        ) : (
          <PayStep onPay={() => setStep('processing')} total={total} />
        )}
      </div>
    </main>
  )
}

function LoginStep({ onDone }: { onDone: (phone: string) => void }) {
  const [phase, setPhase] = useState<'phone' | 'otp'>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const otpRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (phase === 'otp') otpRef.current?.focus()
  }, [phase])

  return (
    <div className="anim-view-left">
      <h2 className="font-display text-2xl text-green">ورود به حساب</h2>
      <p className="mt-1 text-sm text-ink-muted">
        برای ثبت سفارش، شماره موبایل خود را وارد کنید.
      </p>
      <div className="my-5 rule" />

      {phase === 'phone' ? (
        <div className="anim-fade flex flex-col gap-5">
          <div>
            <label className="text-sm text-ink-muted">شماره موبایل</label>
            <input
              autoFocus
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="09xxxxxxxxx"
              dir="ltr"
              className="num mt-2 w-full border-b border-line-strong bg-transparent pb-2 text-lg text-ink outline-none placeholder:text-ink-faint focus:border-gold"
            />
          </div>
          <button
            onClick={() => phone.length >= 10 && setPhase('otp')}
            disabled={phone.length < 10}
            className="flex w-full items-center justify-center gap-2 rounded-[4px] bg-green py-3 font-display text-green-foreground transition-colors hover:bg-green/90 disabled:opacity-40"
          >
            دریافت کد تأیید
          </button>
        </div>
      ) : (
        <div className="anim-view-left flex flex-col gap-5">
          <div>
            <label className="text-sm text-ink-muted">
              کد چهار رقمی ارسال‌شده را وارد کنید
            </label>
            <input
              ref={otpRef}
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))
              }
              placeholder="····"
              dir="ltr"
              className="num mt-2 w-full border-b border-line-strong bg-transparent pb-2 text-center text-3xl tracking-[0.6em] text-ink outline-none placeholder:text-ink-faint focus:border-gold"
            />
          </div>
          <button
            onClick={() => otp.length === 4 && onDone(phone)}
            disabled={otp.length !== 4}
            className="flex w-full items-center justify-center gap-2 rounded-[4px] bg-green py-3 font-display text-green-foreground transition-colors hover:bg-green/90 disabled:opacity-40"
          >
            تأیید و ادامه
            <ArrowLeft className="size-4" strokeWidth={1.6} />
          </button>
          <button
            onClick={() => setPhase('phone')}
            className="text-center text-xs text-ink-faint underline underline-offset-4"
          >
            اصلاح شماره
          </button>
        </div>
      )}
    </div>
  )
}

function PayStep({ onPay, total }: { onPay: () => void; total: number }) {
  const { state, setAddress } = useStore()
  const [payChoice, setPayChoice] = useState<'online' | 'counter'>('online')
  const [slot, setSlot] = useState(SLOTS[0])
  const [addr, setAddr] = useState(state.address ?? '')
  const earned = Math.round(total / 1000)

  const canPay =
    state.mode !== 'delivery' || addr.trim().length > 4

  return (
    <div className="anim-view-left">
      <h2 className="font-display text-2xl text-green">پرداخت</h2>
      <p className="mt-1 text-sm text-ink-muted">
        {state.mode === 'table'
          ? `میز ${state.table ?? '۷'} · حضوری`
          : state.mode === 'delivery'
            ? 'ارسال به آدرس'
            : 'تحویل بیرون‌بر'}
      </p>
      <div className="my-5 rule" />

      {state.mode === 'table' && (
        <div className="flex flex-col">
          <SelectRow
            label="پرداخت آنلاین"
            hint="هم‌اکنون از طریق درگاه"
            selected={payChoice === 'online'}
            onClick={() => setPayChoice('online')}
          />
          <SelectRow
            label="پرداخت در کانتر"
            hint="هنگام تحویل سفارش"
            selected={payChoice === 'counter'}
            onClick={() => setPayChoice('counter')}
          />
        </div>
      )}

      {state.mode === 'takeaway' && (
        <div>
          <h3 className="mb-3 font-display text-base text-ink">زمان تحویل</h3>
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {SLOTS.map((s) => (
              <button
                key={s}
                onClick={() => setSlot(s)}
                className={cn(
                  'num shrink-0 border px-3 py-1.5 text-sm transition-colors',
                  slot === s
                    ? 'border-gold bg-gold/10 text-green'
                    : 'border-line-strong text-ink-muted hover:border-ink-faint',
                )}
                dir="ltr"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {state.mode === 'delivery' && (
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-ink-muted">نشانی تحویل</label>
            <input
              value={addr}
              onChange={(e) => {
                setAddr(e.target.value)
                setAddress(e.target.value)
              }}
              placeholder="خیابان، کوچه، پلاک، واحد"
              className="mt-2 w-full border-b border-line-strong bg-transparent pb-2 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-gold"
            />
          </div>
          <div className="relative h-32 w-full overflow-hidden border border-line bg-surface-tint">
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
            <span className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-burgundy ring-4 ring-burgundy/20" />
            <span className="absolute bottom-2 right-2 font-display text-xs text-ink-faint italic">
              نقشهٔ تقریبی
            </span>
          </div>
        </div>
      )}

      <div className="my-5 rule-double" />

      <div className="flex items-baseline justify-between">
        <span className="font-display text-xl text-green">مبلغ قابل پرداخت</span>
        <Price value={total} className="text-lg text-green" />
      </div>

      {state.customer.loggedIn && earned > 0 && (
        <p className="anim-fade mt-3 text-center font-display text-sm text-gold italic">
          {`+${earned.toLocaleString('en-US')} امتیاز با این سفارش`}
        </p>
      )}

      <button
        onClick={onPay}
        disabled={!canPay}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-[4px] bg-green py-3.5 font-display text-base text-green-foreground transition-colors hover:bg-green/90 disabled:opacity-40"
      >
        {state.mode === 'table' && payChoice === 'counter'
          ? 'ثبت سفارش'
          : 'پرداخت و ثبت سفارش'}
        <ArrowLeft className="size-4" strokeWidth={1.6} />
      </button>
    </div>
  )
}

function SelectRow({
  label,
  hint,
  selected,
  onClick,
}: {
  label: string
  hint: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between border-b border-line py-3.5 text-right"
    >
      <span>
        <span className="block font-display text-lg text-ink">{label}</span>
        <span className="text-[12px] text-ink-muted">{hint}</span>
      </span>
      <span
        className={cn(
          'grid size-5 place-items-center rounded-full border',
          selected ? 'border-gold' : 'border-line-strong',
        )}
      >
        {selected && <Check className="size-3 text-gold" strokeWidth={2.6} />}
      </span>
    </button>
  )
}

function Processing({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <main className="relative z-10 grid min-h-[70vh] place-items-center px-6">
      <div className="flex flex-col items-center">
        <div className="relative" style={{ animation: 'cup-tilt 1.2s ease-in-out infinite' }}>
          {/* steam */}
          <div className="absolute inset-x-0 -top-4 flex justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-4 w-0.5 rounded-full bg-gold/60"
                style={{
                  animation: `cup-steam 1.6s ease-out ${i * 0.3}s infinite`,
                }}
              />
            ))}
          </div>
          {/* cup */}
          <svg width="64" height="56" viewBox="0 0 64 56" fill="none" aria-hidden>
            <path
              d="M8 14h40v20a14 14 0 0 1-14 14H22A14 14 0 0 1 8 34V14Z"
              stroke="var(--green)"
              strokeWidth="2.5"
            />
            <path
              d="M48 18h6a6 6 0 0 1 0 12h-6"
              stroke="var(--green)"
              strokeWidth="2.5"
            />
            <path d="M8 14h40" stroke="var(--gold)" strokeWidth="2.5" />
          </svg>
        </div>
        <p className="mt-6 font-display text-lg text-green italic">
          در حال اتصال به درگاه پرداخت…
        </p>
      </div>
    </main>
  )
}
