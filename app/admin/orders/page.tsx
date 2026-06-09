'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function AdminOrdersPage() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all')

  const orders = [
    { id: '#2847', customer: 'محمد', amount: '245,000', status: 'delivering', time: '۱۲ دقیقه پیش' },
    { id: '#2846', customer: 'سارا', amount: '180,000', status: 'preparing', time: '۲۵ دقیقه پیش' },
    { id: '#2845', customer: 'علی', amount: '320,000', status: 'completed', time: '۴۵ دقیقه پیش' },
    { id: '#2844', customer: 'فاطمه', amount: '95,000', status: 'pending', time: '۱ ساعت پیش' },
  ]

  const filtered = orders.filter(order => {
    if (filter === 'pending') return ['pending', 'preparing'].includes(order.status)
    if (filter === 'completed') return ['completed', 'delivering'].includes(order.status)
    return true
  })

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl text-ink">سفارش‌ها</h1>
        <Link href="/admin" className="text-green hover:underline">← بازگشت</Link>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2">
        {['all', 'pending', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`rounded-lg px-4 py-2 text-sm transition-colors ${
              filter === f
                ? 'bg-green text-parchment'
                : 'border border-line text-ink hover:bg-line/50'
            }`}
          >
            {f === 'all' ? 'همه' : f === 'pending' ? 'در انتظار' : 'تکمیل‌شده'}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full text-right text-sm">
          <thead className="border-b border-line bg-gold/10">
            <tr>
              <th className="px-4 py-3 font-display text-ink">شماره سفارش</th>
              <th className="px-4 py-3 font-display text-ink">مشتری</th>
              <th className="px-4 py-3 font-display text-ink">مبلغ</th>
              <th className="px-4 py-3 font-display text-ink">وضعیت</th>
              <th className="px-4 py-3 font-display text-ink">زمان</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} className="border-b border-line hover:bg-gold/5">
                <td className="px-4 py-3 font-display text-green">{order.id}</td>
                <td className="px-4 py-3">{order.customer}</td>
                <td className="px-4 py-3 num">{order.amount}ت</td>
                <td className="px-4 py-3">
                  <span className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                    order.status === 'completed' ? 'bg-green/10 text-green' :
                    order.status === 'preparing' ? 'bg-gold/10 text-gold' :
                    order.status === 'delivering' ? 'bg-blue-500/10 text-blue-600' :
                    'bg-orange-500/10 text-orange-600'
                  }`}>
                    {order.status === 'completed' ? 'تکمیل' :
                     order.status === 'preparing' ? 'تهیه' :
                     order.status === 'delivering' ? 'تحویل' : 'منتظر'}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-ink-soft">{order.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
