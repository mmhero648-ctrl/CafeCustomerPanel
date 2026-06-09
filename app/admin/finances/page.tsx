'use client'

import Link from 'next/link'

export default function AdminFinancesPage() {
  const revenue = [
    { date: '۲۰ شهریور', amount: '8,500,000' },
    { date: '۱۹ شهریور', amount: '7,200,000' },
    { date: '۱۸ شهریور', amount: '9,100,000' },
    { date: '۱۷ شهریور', amount: '6,800,000' },
  ]

  const expenses = [
    { category: 'دستمزد کارکنان', amount: '3,500,000', pct: 35 },
    { category: 'مواد اولیه', amount: '2,800,000', pct: 28 },
    { category: 'اجاره', amount: '2,000,000', pct: 20 },
    { category: 'سایر', amount: '1,700,000', pct: 17 },
  ]

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl text-ink">مالی</h1>
        <Link href="/admin" className="text-green hover:underline">← بازگشت</Link>
      </div>

      {/* Summary */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: 'درآمد امروز', value: '8.5M' },
          { label: 'درآمد ماه', value: '247M' },
          { label: 'هزینه‌ها', value: '102M' },
          { label: 'سود خالص', value: '145M' },
        ].map((metric) => (
          <div key={metric.label} className="paper-card px-4 py-6 text-center">
            <p className="text-xs text-ink-soft">{metric.label}</p>
            <p className="mt-2 font-display text-2xl text-gold">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Daily Revenue */}
      <div className="mb-8">
        <h2 className="mb-4 font-display text-2xl text-ink">درآمد روزانه</h2>
        <div className="space-y-2">
          {revenue.map((item) => (
            <div key={item.date} className="paper-card flex items-center justify-between px-4 py-3">
              <span className="text-sm text-ink">{item.date}</span>
              <span className="num text-green">{item.amount}ت</span>
            </div>
          ))}
        </div>
      </div>

      {/* Expense Breakdown */}
      <div className="mb-8">
        <h2 className="mb-4 font-display text-2xl text-ink">هزینه‌ها</h2>
        <div className="space-y-3">
          {expenses.map((exp) => (
            <div key={exp.category} className="paper-card px-4 py-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-ink">{exp.category}</span>
                <span className="num text-ink">{exp.amount}ت</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-line">
                <div className="h-full bg-burgundy" style={{ width: `${exp.pct}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
