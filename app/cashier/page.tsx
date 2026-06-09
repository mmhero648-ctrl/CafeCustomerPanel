'use client'

import { useState } from 'react'

const PENDING_PAYMENTS = [
  { id: '#2847', table: 'میز 5', amount: 245000, items: 3, status: 'منتظر پرداخت' },
  { id: '#2846', table: 'بیرون‌بری', amount: 180000, items: 2, status: 'منتظر پرداخت' },
  { id: '#2845', delivery: 'دوچرخه', amount: 320000, items: 5, status: 'منتظر پرداخت' },
]

export default function CashierPage() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'wallet'>('cash')

  const selected = PENDING_PAYMENTS.find((o) => o.id === selectedOrder)

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Orders List */}
      <div className="lg:col-span-2 space-y-4">
        <div className="paper-card px-6 py-4">
          <input
            type="text"
            placeholder="جستجوی شماره سفارش..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-b border-line bg-background py-2 text-right placeholder:text-ink-faint focus:border-green focus:outline-none"
          />
        </div>

        <div className="space-y-3">
          {PENDING_PAYMENTS.map((order) => (
            <button
              key={order.id}
              onClick={() => setSelectedOrder(order.id)}
              className={`w-full text-right transition-all paper-card px-6 py-4 ${
                selectedOrder === order.id ? 'ring-2 ring-green' : 'hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-lg text-ink">{order.id}</p>
                  <p className="mt-1 text-sm text-ink-soft">
                    {order.table || order.delivery} · {order.items} قلم
                  </p>
                </div>
                <div className="text-right">
                  <p className="num font-display text-lg text-gold">{order.amount.toLocaleString('en-US')}</p>
                  <p className="mt-1 text-xs text-ink-soft">{order.status}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Payment Panel */}
      {selected ? (
        <div className="paper-card p-6">
          <h2 className="font-display text-lg text-ink">تسویه سفارش</h2>
          
          <div className="mt-6 space-y-6">
            {/* Order Details */}
            <div className="border-t border-line pt-4">
              <p className="text-sm text-ink-soft">مبلغ کل</p>
              <p className="num font-display text-2xl text-ink mt-2">
                {selected.amount.toLocaleString('en-US')}
              </p>
            </div>

            {/* Payment Method */}
            <div className="border-t border-line pt-4">
              <p className="text-sm text-ink-soft mb-3">روش پرداخت</p>
              <div className="space-y-2">
                {(['cash', 'card', 'wallet'] as const).map((method) => (
                  <label key={method} className="flex items-center gap-3">
                    <input
                      type="radio"
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-ink">
                      {{
                        cash: 'نقدی',
                        card: 'کارت اعتباری',
                        wallet: 'کیف پول',
                      }[method]}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t border-line pt-4 space-y-3">
              <button className="w-full bg-green py-3 text-white font-display hover:opacity-90">
                تأیید پرداخت
              </button>
              <button className="w-full border border-burgundy py-3 text-burgundy hover:bg-burgundy/5">
                بازگشت پول
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="paper-card p-6 flex items-center justify-center h-full">
          <p className="text-center text-ink-soft">سفارشی را برای تسویه انتخاب کنید</p>
        </div>
      )}
    </div>
  )
}
