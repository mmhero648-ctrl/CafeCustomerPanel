'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function KDSOrderDetailPage() {
  const [status, setStatus] = useState<'new' | 'preparing' | 'ready'>('preparing')

  const orderDetails = {
    id: '#2847',
    time: '۱۲ دقیقه',
    priority: 'عادی',
    items: [
      { name: 'کاپوچینو', qty: 2, notes: 'کمتر شکر' },
      { name: 'اسپرسو', qty: 1, notes: '' },
      { name: 'کیک شکلاتی', qty: 1, notes: '' },
    ],
  }

  return (
    <div className="min-h-screen bg-parchment p-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl text-green">{orderDetails.id}</h1>
        <Link href="/kds" className="text-green hover:underline">← بازگشت</Link>
      </div>

      {/* Order Items */}
      <div className="mb-8 max-w-2xl space-y-3">
        {orderDetails.items.map((item, i) => (
          <div key={i} className="paper-card px-6 py-6">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-display text-xl text-ink">{item.name}</p>
              <p className="num text-2xl text-gold">×{item.qty}</p>
            </div>
            {item.notes && (
              <p className="text-sm text-burgundy">یادداشت: {item.notes}</p>
            )}
          </div>
        ))}
      </div>

      {/* Status Buttons */}
      <div className="mb-8 space-y-3 max-w-2xl">
        <p className="font-display text-lg text-ink">وضعیت</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { value: 'new', label: 'جدید' },
            { value: 'preparing', label: 'در حال تهیه' },
            { value: 'ready', label: 'آماده' },
          ].map((s) => (
            <button
              key={s.value}
              onClick={() => setStatus(s.value as any)}
              className={`rounded-lg px-4 py-3 transition-colors ${
                status === s.value
                  ? 'bg-green text-parchment'
                  : 'border border-line text-ink hover:bg-line/30'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Complete Button */}
      {status === 'ready' && (
        <button className="max-w-2xl w-full rounded-lg bg-green px-6 py-4 font-display text-lg text-parchment transition-colors hover:bg-green/90">
          آماده برای تحویل
        </button>
      )}
    </div>
  )
}
