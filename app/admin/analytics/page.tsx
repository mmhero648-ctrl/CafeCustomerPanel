'use client'

import Link from 'next/link'

export default function AdminAnalyticsPage() {
  const metrics = [
    { label: 'میانگین رتبه', value: '4.8', unit: '★' },
    { label: 'میزان رضایت', value: '94%', unit: '' },
    { label: 'زمان تحویل متوسط', value: '۲۲ دقیقه', unit: '' },
    { label: 'تکمیل سفارش', value: '۹۸%', unit: '' },
  ]

  const topItems = [
    { name: 'کاپوچینو', sales: 145, trend: '+12%' },
    { name: 'اسپرسو', sales: 128, trend: '+5%' },
    { name: 'کیک شکلاتی', sales: 96, trend: '-3%' },
  ]

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl text-ink">تحلیل‌ها</h1>
        <Link href="/admin" className="text-green hover:underline">← بازگشت</Link>
      </div>

      {/* Key Metrics */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="paper-card px-4 py-6 text-center">
            <p className="text-xs uppercase tracking-widest text-ink-faint">{metric.label}</p>
            <p className="mt-2 font-display text-3xl text-gold">
              {metric.value}<span className="text-xl">{metric.unit}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Top Items */}
      <div className="mb-8">
        <h2 className="mb-4 font-display text-2xl text-ink">محبوب‌ترین اقلام</h2>
        <div className="space-y-3">
          {topItems.map((item) => (
            <div key={item.name} className="paper-card flex items-center justify-between px-4 py-4">
              <div>
                <p className="font-display text-lg text-ink">{item.name}</p>
                <p className="text-sm text-ink-soft">{item.sales} فروش</p>
              </div>
              <span className={`text-sm font-medium ${item.trend.startsWith('+') ? 'text-green' : 'text-burgundy'}`}>
                {item.trend}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="mb-8">
        <h2 className="mb-4 font-display text-2xl text-ink">فروش هفتگی</h2>
        <div className="paper-card flex items-end justify-around gap-2 px-4 py-8">
          {['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'].map((day, i) => (
            <div key={day} className="text-center">
              <div
                className="mx-auto mb-2 w-8 rounded-t bg-gold/50 transition-all"
                style={{ height: `${Math.random() * 100 + 40}px` }}
              ></div>
              <span className="text-xs text-ink-soft">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
