'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { StoreProvider, useStore, type Portal, type UserRole } from '@/lib/store'
import Link from 'next/link'

const PORTALS: Array<{ key: Portal; role: UserRole; label: string; description: string; color: string }> = [
  {
    key: 'customer',
    role: 'customer',
    label: 'مشتری',
    description: 'سفارش قهوه و غذا',
    color: 'bg-green',
  },
  {
    key: 'admin',
    role: 'admin',
    label: 'مدیریت',
    description: 'مدیریت کافه و سفارش‌ها',
    color: 'bg-blue-700',
  },
  {
    key: 'cashier',
    role: 'cashier',
    label: 'صندوق‌دار',
    description: 'پرداخت و تسویه',
    color: 'bg-purple-700',
  },
  {
    key: 'kds',
    role: 'kds_operator',
    label: 'آشپزخانه',
    description: 'نمایش سفارش‌های آماده‌سازی',
    color: 'bg-orange-700',
  },
  {
    key: 'driver',
    role: 'driver',
    label: 'راننده',
    description: 'مدیریت تحویل سفارش‌ها',
    color: 'bg-red-700',
  },
]

function AuthLoginContent() {
  const router = useRouter()
  const { portalLogin } = useStore()
  const [selectedPortal, setSelectedPortal] = useState<Portal | null>(null)
  const [showLogin, setShowLogin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)

  const handlePortalSelect = (portal: Portal) => {
    setSelectedPortal(portal)
    setShowLogin(true)
  }

  const handleSendOtp = async () => {
    if (!phone || !selectedPortal) return
    setLoading(true)
    // Simulate OTP sending
    await new Promise((r) => setTimeout(r, 500))
    setOtpSent(true)
    setLoading(false)
  }

  const handleLogin = async () => {
    if (!otp || !selectedPortal) return
    setLoading(true)
    // Simulate OTP verification
    await new Promise((r) => setTimeout(r, 500))
    
    const portal = PORTALS.find((p) => p.key === selectedPortal)!
    portalLogin(selectedPortal, portal.role, `token_${Date.now()}`)
    
    // Navigate to portal
    router.push(`/${selectedPortal}`)
    setLoading(false)
  }

  if (!showLogin) {
    return (
      <div className="min-h-screen bg-background px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-12 text-center">
            <h1 className="font-display text-4xl text-ink">کافه راوی</h1>
            <p className="mt-2 text-sm text-ink-soft">سیستم یکپارچهٔ مدیریت و سفارش‌گیری</p>
          </div>

          <div className="flex flex-col gap-3">
            {PORTALS.map((portal) => (
              <button
                key={portal.key}
                onClick={() => handlePortalSelect(portal.key)}
                className={`rounded-lg border-2 border-line p-6 text-left transition-all hover:shadow-md ${portal.color}/10`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display text-lg text-ink">{portal.label}</p>
                    <p className="mt-1 text-sm text-ink-soft">{portal.description}</p>
                  </div>
                  <div className={`h-12 w-12 rounded-lg ${portal.color}`} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const portal = PORTALS.find((p) => p.key === selectedPortal)!

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-md">
        <button
          onClick={() => {
            setShowLogin(false)
            setPhone('')
            setOtp('')
            setOtpSent(false)
          }}
          className="mb-8 text-sm text-ink-soft hover:text-ink"
        >
          ← بازگشت
        </button>

        <div className="mb-8 text-center">
          <div className={`mx-auto mb-4 h-16 w-16 rounded-lg ${portal.color}`} />
          <h1 className="font-display text-2xl text-ink">{portal.label}</h1>
          <p className="mt-2 text-sm text-ink-soft">وارد شدن به سیستم</p>
        </div>

        <div className="paper-card px-6 py-8">
          {!otpSent ? (
            <>
              <label className="block text-sm text-ink-soft">شماره تلفن</label>
              <input
                type="tel"
                placeholder="09123456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 w-full border-b border-line bg-background py-2 text-center font-mono text-lg text-ink placeholder:text-ink-faint focus:border-green focus:outline-none"
                dir="ltr"
              />
              <button
                onClick={handleSendOtp}
                disabled={!phone || loading}
                className="mt-8 w-full bg-green py-3 text-white disabled:opacity-50"
              >
                {loading ? 'ارسال...' : 'ارسال کد'}
              </button>
            </>
          ) : (
            <>
              <label className="block text-sm text-ink-soft">کد تأیید</label>
              <input
                type="text"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="mt-2 w-full border-b border-line bg-background py-2 text-center font-mono text-2xl tracking-[0.5em] text-ink placeholder:text-ink-faint focus:border-green focus:outline-none"
                dir="ltr"
              />
              <button
                onClick={handleLogin}
                disabled={otp.length !== 6 || loading}
                className="mt-8 w-full bg-green py-3 text-white disabled:opacity-50"
              >
                {loading ? 'تأیید...' : 'تأیید و ورود'}
              </button>
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="mt-4 w-full py-2 text-sm text-ink-soft hover:text-ink"
              >
                ارسال دوباره کد
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AuthLoginPage() {
  return (
    <StoreProvider>
      <AuthLoginContent />
    </StoreProvider>
  )
}
