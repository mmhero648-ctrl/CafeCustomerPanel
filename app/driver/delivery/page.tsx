'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function DriverDeliveryPage() {
  const [status, setStatus] = useState<'picked' | 'in-transit' | 'delivered'>('in-transit')

  const delivery = {
    id: '#2847',
    customer: 'محمد رضا',
    address: 'تهران، خیابان کریم خان، پلاک ۲۳',
    phone: '09121234567',
    distance: '۵٫۲ کیلومتر',
    fare: '۵۰,۰۰۰ تومان',
  }

  return (
    <div className="min-h-screen bg-parchment p-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl text-green">{delivery.id}</h1>
        <Link href="/driver" className="text-green hover:underline">← بازگشت</Link>
      </div>

      {/* Delivery Details */}
      <div className="mb-8 max-w-2xl">
        <div className="paper-card mb-6 px-6 py-6">
          <p className="mb-4 font-display text-2xl text-ink">{delivery.customer}</p>
          <div className="space-y-3 border-t border-line pt-4">
            <div>
              <p className="text-xs text-ink-soft">آدرس</p>
              <p className="mt-1 text-sm text-ink">{delivery.address}</p>
            </div>
            <div>
              <p className="text-xs text-ink-soft">تلفن</p>
              <p className="mt-1 text-sm text-ink" dir="ltr">{delivery.phone}</p>
            </div>
            <div className="flex gap-8 border-t border-line pt-3">
              <div>
                <p className="text-xs text-ink-soft">فاصله</p>
                <p className="mt-1 text-sm text-ink">{delivery.distance}</p>
              </div>
              <div>
                <p className="text-xs text-ink-soft">نرخ</p>
                <p className="mt-1 font-display text-lg text-gold">{delivery.fare}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mb-8">
          <p className="mb-4 font-display text-lg text-ink">وضعیت تحویل</p>
          <div className="space-y-3">
            {[
              { value: 'picked', label: 'سفارش برداشته شد' },
              { value: 'in-transit', label: 'در مسیر' },
              { value: 'delivered', label: 'تحویل شد' },
            ].map((s) => (
              <button
                key={s.value}
                onClick={() => setStatus(s.value as any)}
                className={`w-full rounded-lg px-4 py-3 transition-colors ${
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
        {status === 'delivered' && (
          <button className="w-full rounded-lg bg-green px-6 py-4 font-display text-lg text-parchment transition-colors hover:bg-green/90">
            تایید تحویل
          </button>
        )}
      </div>
    </div>
  )
}
