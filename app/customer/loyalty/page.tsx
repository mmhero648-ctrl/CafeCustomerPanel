'use client'

import Link from 'next/link'

export default function LoyaltyPage() {
  const membershipTiers = [
    {
      name: 'رقه‌ای',
      color: 'bg-gray-400',
      benefits: ['۲٪ ارزش نقدی', 'تخفیف‌های ویژه'],
      reached: true,
    },
    {
      name: 'طلایی',
      color: 'bg-gold',
      benefits: ['۵٪ ارزش نقدی', 'قهوهٔ ماهانهٔ رایگان', 'اولویت سفارش'],
      reached: false,
    },
    {
      name: 'الماسی',
      color: 'bg-blue-400',
      benefits: ['۱۰٪ ارزش نقدی', 'دسترسی VIP', 'رویدادهای خصوصی'],
      reached: false,
    },
  ]

  return (
    <div className="min-h-screen bg-parchment pb-20">
      <div className="sticky top-0 z-20 border-b border-line bg-parchment px-4 py-4">
        <div className="flex items-center gap-3">
          <Link href="/customer" className="flex items-center justify-center">
            <span className="text-lg text-ink">←</span>
          </Link>
          <h1 className="font-display text-2xl text-ink">باشگاه وفاداری</h1>
        </div>
      </div>

      <div className="space-y-6 p-4">
        {/* Current Status */}
        <div className="paper-card px-6 py-6">
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest text-ink-faint">
              سطح فعلی
            </p>
            <p className="mt-2 font-display text-3xl text-gold">نقره‌ای</p>
            <p className="mt-2 text-sm text-ink-soft">۱,۲۴۰ امتیاز</p>
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-ink-soft">تا سطح طلایی</span>
              <span className="num text-ink">۷۶۰ / ۲۰۰۰</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-line">
              <div
                className="h-full bg-gold transition-all duration-500"
                style={{ width: '38%' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div>
          <p className="mb-3 px-1 text-xs uppercase tracking-widest text-ink-faint">
            مزایای سطح فعلی
          </p>
          <div className="space-y-2">
            {membershipTiers[0].benefits.map((benefit, i) => (
              <div
                key={i}
                className="paper-card flex items-center gap-3 px-4 py-3"
              >
                <span className="text-gold">✓</span>
                <span className="text-sm text-ink">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tier Progression */}
        <div>
          <p className="mb-3 px-1 text-xs uppercase tracking-widest text-ink-faint">
            سطح‌های عضویت
          </p>
          <div className="space-y-3">
            {membershipTiers.map((tier) => (
              <div
                key={tier.name}
                className={`paper-card px-4 py-4 border-l-4 ${
                  tier.reached ? 'border-gold' : 'border-line opacity-50'
                }`}
              >
                <p className="font-display text-lg text-ink">{tier.name}</p>
                <p className="mt-2 text-xs text-ink-soft">
                  {tier.benefits.join(' • ')}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <p className="mb-3 px-1 text-xs uppercase tracking-widest text-ink-faint">
            فعالیت اخیر
          </p>
          <div className="space-y-2">
            {[
              { desc: 'سفارش #2845', points: '+100' },
              { desc: 'سفارش #2844', points: '+85' },
              { desc: 'تخفیف اعمال شده', points: '-50' },
            ].map((item, i) => (
              <div key={i} className="paper-card flex items-center justify-between px-4 py-3">
                <span className="text-sm text-ink">{item.desc}</span>
                <span className="num text-sm text-green">{item.points}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
