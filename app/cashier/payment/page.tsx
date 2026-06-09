'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function CashierPaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'wallet'>('cash')
  
  const order = {
    id: '#2847',
    total: '245,000',
    items: ['کاپوچینو', 'اسپرسو'],
  }

  return (
    <div className="min-h-screen bg-parchment p-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl text-ink">پرداخت</h1>
        <Link href="/cashier" className="text-green hover:underline">← بازگشت</Link>
      </div>

      {/* Order Summary */}
      <div className="mb-8 max-w-2xl">
        <div className="paper-card mb-6 px-6 py-6">
          <p className="font-display text-2xl text-green">{order.id}</p>
          <div className="mt-4 space-y-2 border-t border-line pt-4">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-ink-soft">{item}</span>
                <span className="num">۶۵,۰۰۰ت</span>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-line pt-4">
            <div className="flex justify-between">
              <span className="font-display text-lg text-ink">کل</span>
              <span className="num font-display text-2xl text-gold">{order.total}ت</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-8">
          <p className="mb-4 font-display text-xl text-ink">روش پرداخت</p>
          <div className="space-y-3">
            {[
              { value: 'cash', label: 'نقدی' },
              { value: 'card', label: 'کارت بانکی' },
              { value: 'wallet', label: 'کیف پول دیجیتالی' },
            ].map((method) => (
              <label key={method.value} className="paper-card flex items-center gap-4 px-4 py-4 cursor-pointer hover:bg-gold/5">
                <input
                  type="radio"
                  value={method.value}
                  checked={paymentMethod === method.value}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="cursor-pointer"
                />
                <span className="text-ink">{method.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Confirm Button */}
        <button className="w-full rounded-lg bg-green px-6 py-4 font-display text-lg text-parchment transition-colors hover:bg-green/90">
          تایید پرداخت
        </button>
      </div>
    </div>
  )
}
