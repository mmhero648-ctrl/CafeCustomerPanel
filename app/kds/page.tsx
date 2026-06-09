'use client'

import { useState } from 'react'

const ACTIVE_ORDERS = [
  {
    id: '#2847',
    items: ['کاپوچینو x2', 'اسپرسو', 'بیسکویت'],
    priority: 'عادی',
    startTime: '5 دقیقه پیش',
    status: 'در آماده‌سازی',
  },
  {
    id: '#2846',
    items: ['ماچیاتو x3'],
    priority: 'فوری',
    startTime: '2 دقیقه پیش',
    status: 'فقط شروع شده',
  },
  {
    id: '#2845',
    items: ['کاپوچینو', 'لاته', 'شیرینی'],
    priority: 'عادی',
    startTime: '12 دقیقه پیش',
    status: 'آماده برای سرو',
  },
]

export default function KDSPage() {
  const [completedOrders, setCompletedOrders] = useState<string[]>([])

  const handleComplete = (orderId: string) => {
    setCompletedOrders([...completedOrders, orderId])
    setTimeout(() => {
      setCompletedOrders((prev) => prev.filter((id) => id !== orderId))
    }, 2000)
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {ACTIVE_ORDERS.map((order) => {
        const isCompleted = completedOrders.includes(order.id)
        
        return (
          <div
            key={order.id}
            className={`paper-card p-6 transition-all ${
              order.priority === 'فوری' ? 'ring-2 ring-burgundy' : ''
            } ${isCompleted ? 'opacity-50' : ''}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-2xl text-ink">{order.id}</h3>
              <span className={`text-xs px-2 py-1 rounded ${
                order.priority === 'فوری' 
                  ? 'bg-burgundy/20 text-burgundy'
                  : 'bg-ink-faint/20 text-ink-soft'
              }`}>
                {order.priority}
              </span>
            </div>

            <div className="space-y-2 mb-6">
              {order.items.map((item, i) => (
                <p key={i} className="text-sm text-ink">
                  ✓ {item}
                </p>
              ))}
            </div>

            <div className="mb-6 border-t border-line pt-4">
              <p className="text-xs text-ink-soft">شروع: {order.startTime}</p>
              <p className="text-sm text-ink mt-2">{order.status}</p>
            </div>

            <button
              onClick={() => handleComplete(order.id)}
              disabled={isCompleted}
              className="w-full bg-green py-3 text-white font-display text-sm disabled:opacity-50"
            >
              {isCompleted ? '✓ تمام شد' : 'نشان دادن آماده'}
            </button>
          </div>
        )
      })}
    </div>
  )
}
