'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MyOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const orders = [
    {
      id: '#2845',
      date: '۱۴۰۳/۰۳/۱۵',
      time: '۱۲:۳۰',
      total: '245,000',
      status: 'تحویل‌شده',
      items: ['کاپوچینو', 'اسپرسو', 'شیرینی'],
      mode: 'حضوری',
    },
    {
      id: '#2844',
      date: '۱۴۰۳/۰۳/۱۴',
      time: '۱۶:۴۵',
      total: '180,000',
      status: 'تحویل‌شده',
      items: ['ماچیاتو', 'کیک شکلاتی'],
      mode: 'حضوری',
    },
    {
      id: '#2843',
      date: '۱۴۰۳/۰۳/۱۳',
      time: '۱۰:۱۵',
      total: '320,000',
      status: 'لغو‌شده',
      items: ['کاپوچینو', 'فلت وایت', 'دونات'],
      mode: 'تحویل',
    },
  ]

  return (
    <div className="min-h-screen bg-parchment pb-24">
      <div className="sticky top-0 z-20 border-b border-line bg-parchment px-4 py-4">
        <div className="flex items-center gap-3">
          <Link href="/customer" className="flex items-center justify-center">
            <span className="text-lg text-ink">←</span>
          </Link>
          <h1 className="font-display text-2xl text-ink">سفارش‌های من</h1>
        </div>
      </div>

      <div className="space-y-3 p-4">
        {orders.map((order) => (
          <div key={order.id} className="paper-card px-4 py-4">
            <button
              onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
              className="w-full text-right"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-lg text-ink">{order.id}</p>
                  <p className="mt-1 text-xs text-ink-soft">
                    {order.date} · {order.time}
                  </p>
                </div>
                <div className="text-right">
                  <p className="num text-lg text-green">{order.total}ت</p>
                  <p
                    className={`mt-1 text-xs font-medium ${
                      order.status === 'تحویل‌شده'
                        ? 'text-green'
                        : 'text-burgundy'
                    }`}
                  >
                    {order.status}
                  </p>
                </div>
              </div>
            </button>

            {selectedOrder === order.id && (
              <div className="mt-4 border-t border-line pt-4">
                <p className="mb-2 text-xs uppercase tracking-widest text-ink-faint">
                  اقلام
                </p>
                <ul className="mb-4 space-y-1">
                  {order.items.map((item, i) => (
                    <li key={i} className="text-sm text-ink">
                      • {item}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2">
                  <button className="flex-1 rounded-lg border border-green bg-green/5 px-3 py-2 text-sm text-green transition-colors hover:bg-green/10">
                    سفارش مجدد
                  </button>
                  <button className="flex-1 rounded-lg border border-gold bg-gold/5 px-3 py-2 text-sm text-gold transition-colors hover:bg-gold/10">
                    جزئیات
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
