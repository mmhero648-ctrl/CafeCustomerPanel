'use client'

import Link from 'next/link'

export default function NotificationsPage() {
  const notifications = [
    {
      id: '1',
      type: 'order',
      title: 'سفارش شما آماده است',
      desc: 'سفارش #2845 برای تحویل آماده شده است',
      time: '۲ ساعت پیش',
      read: false,
    },
    {
      id: '2',
      type: 'promo',
      title: 'تخفیف ویژه برای شما',
      desc: '۲۰٪ تخفیف روی تمام قهوه‌ها امروز',
      time: '۱ روز پیش',
      read: true,
    },
    {
      id: '3',
      type: 'loyalty',
      title: 'شما سطح طلایی شدید',
      desc: 'تبریک! به سطح طلایی باشگاه رسیدید',
      time: '۳ روز پیش',
      read: true,
    },
  ]

  return (
    <div className="min-h-screen bg-parchment pb-20">
      <div className="sticky top-0 z-20 border-b border-line bg-parchment px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/customer" className="flex items-center justify-center">
              <span className="text-lg text-ink">←</span>
            </Link>
            <h1 className="font-display text-2xl text-ink">اطلاع‌رسانی‌ها</h1>
          </div>
          <button className="text-xs text-green hover:underline">
            پاک‌کردن همه
          </button>
        </div>
      </div>

      <div className="space-y-2 p-4">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`paper-card px-4 py-3 ${
              !notif.read ? 'border-green/30 bg-green/5' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-gold"></div>
              <div className="flex-1">
                <p className="font-display text-lg text-ink">{notif.title}</p>
                <p className="mt-1 text-sm text-ink-soft">{notif.desc}</p>
                <p className="mt-2 text-xs text-ink-faint">{notif.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
