'use client'

import { useState } from 'react'

const AVAILABLE_DELIVERIES = [
  {
    id: '#2847',
    customer: 'علی احمدی',
    address: 'خیابان ولیعصر، پلاک 245',
    distance: '2.3 کیلومتر',
    payment: 'نقدی',
    items: 3,
    earnings: 25000,
  },
  {
    id: '#2846',
    customer: 'فاطمه محمدی',
    address: 'میدان ونک، خیابان پنجم',
    distance: '1.8 کیلومتر',
    payment: 'کارت',
    items: 2,
    earnings: 20000,
  },
  {
    id: '#2845',
    customer: 'مریم رضایی',
    address: 'دزاشیب، خیابان سه ام',
    distance: '4.2 کیلومتر',
    payment: 'نقدی',
    items: 5,
    earnings: 30000,
  },
]

const COMPLETED_DELIVERIES = [
  { id: '#2844', customer: 'حسن علیزاده', earnings: 25000, time: '1 ساعت پیش' },
  { id: '#2843', customer: 'نسرین جعفری', earnings: 20000, time: '2 ساعت پیش' },
]

export default function DriverPage() {
  const [activeTab, setActiveTab] = useState<'available' | 'completed'>('available')
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null)

  const selected = AVAILABLE_DELIVERIES.find((d) => d.id === selectedDelivery)
  const todayEarnings = AVAILABLE_DELIVERIES.reduce((sum, d) => sum + d.earnings, 0) +
    COMPLETED_DELIVERIES.reduce((sum, d) => sum + d.earnings, 0)

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="paper-card px-6 py-6">
          <p className="text-sm text-ink-soft">تحویل‌های امروز</p>
          <p className="font-display text-2xl text-ink mt-2">{COMPLETED_DELIVERIES.length + AVAILABLE_DELIVERIES.length}</p>
        </div>
        <div className="paper-card px-6 py-6">
          <p className="text-sm text-ink-soft">کل درآمد</p>
          <p className="font-display text-2xl text-gold mt-2 num">{todayEarnings.toLocaleString('en-US')}</p>
        </div>
        <div className="paper-card px-6 py-6">
          <p className="text-sm text-ink-soft">درخواست‌های فعال</p>
          <p className="font-display text-2xl text-ink mt-2">{AVAILABLE_DELIVERIES.length}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-line">
        <button
          onClick={() => setActiveTab('available')}
          className={`px-4 py-3 font-display text-sm ${
            activeTab === 'available'
              ? 'border-b-2 border-green text-green'
              : 'text-ink-soft'
          }`}
        >
          درخواست‌های فعال
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-3 font-display text-sm ${
            activeTab === 'completed'
              ? 'border-b-2 border-green text-green'
              : 'text-ink-soft'
          }`}
        >
          تحویل‌های انجام‌شده
        </button>
      </div>

      {/* Content */}
      {activeTab === 'available' ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* List */}
          <div className="lg:col-span-2 space-y-3">
            {AVAILABLE_DELIVERIES.map((delivery) => (
              <button
                key={delivery.id}
                onClick={() => setSelectedDelivery(delivery.id)}
                className={`w-full text-right paper-card px-6 py-4 transition-all ${
                  selectedDelivery === delivery.id ? 'ring-2 ring-green' : 'hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display text-lg text-ink">{delivery.id}</p>
                    <p className="mt-1 text-sm text-ink-soft">{delivery.customer}</p>
                    <p className="text-xs text-ink-faint mt-2">📍 {delivery.distance}</p>
                  </div>
                  <div className="text-right">
                    <p className="num font-display text-lg text-gold">{delivery.earnings.toLocaleString('en-US')}</p>
                    <p className="text-xs text-ink-soft mt-2">{delivery.items} قلم</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Detail Panel */}
          {selected ? (
            <div className="paper-card p-6">
              <h3 className="font-display text-lg text-ink">جزئیات تحویل</h3>
              
              <div className="mt-6 space-y-6">
                <div className="border-b border-line pb-4">
                  <p className="text-sm text-ink-soft">مشتری</p>
                  <p className="text-ink font-display mt-2">{selected.customer}</p>
                </div>

                <div className="border-b border-line pb-4">
                  <p className="text-sm text-ink-soft">آدرس</p>
                  <p className="text-sm text-ink mt-2">{selected.address}</p>
                </div>

                <div className="border-b border-line pb-4">
                  <p className="text-sm text-ink-soft">روش پرداخت</p>
                  <p className="text-sm text-ink mt-2">{selected.payment}</p>
                </div>

                <div>
                  <p className="text-sm text-ink-soft">کسب‌درآمد</p>
                  <p className="num font-display text-2xl text-gold mt-2">{selected.earnings.toLocaleString('en-US')}</p>
                </div>

                <button className="w-full bg-green py-3 text-white font-display">
                  شروع تحویل
                </button>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="space-y-3">
          {COMPLETED_DELIVERIES.map((delivery) => (
            <div key={delivery.id} className="paper-card px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-lg text-ink">{delivery.id}</p>
                  <p className="text-sm text-ink-soft mt-1">{delivery.customer}</p>
                </div>
                <div className="text-right">
                  <p className="num font-display text-lg text-gold">{delivery.earnings.toLocaleString('en-US')}</p>
                  <p className="text-xs text-ink-faint mt-2">{delivery.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
