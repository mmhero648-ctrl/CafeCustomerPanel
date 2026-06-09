'use client'

const DASHBOARD_STATS = [
  { label: 'سفارش‌های امروز', value: '24', change: '+12%', icon: '📊' },
  { label: 'درآمد امروز', value: '8.5M تومان', change: '+8%', icon: '💰' },
  { label: 'میانگین رتبه', value: '4.8 ⭐', change: '+0.2', icon: '⭐' },
  { label: 'مشتریان فعال', value: '342', change: '+15%', icon: '👥' },
]

const RECENT_ORDERS = [
  { id: '#2847', customer: 'علی احمدی', total: '245,000', status: 'تحویل شد', time: '5 دقیقه پیش' },
  { id: '#2846', customer: 'فاطمه محمدی', total: '180,000', status: 'در آماده‌سازی', time: '12 دقیقه پیش' },
  { id: '#2845', customer: 'مریم رضایی', total: '320,000', status: 'در انتظار', time: '25 دقیقه پیش' },
  { id: '#2844', customer: 'حسن علیزاده', total: '215,000', status: 'تحویل شد', time: '1 ساعت پیش' },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {DASHBOARD_STATS.map((stat) => (
          <div key={stat.label} className="paper-card px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-ink-soft">{stat.label}</p>
                <p className="mt-2 font-display text-2xl text-ink">{stat.value}</p>
              </div>
              <span className="text-3xl">{stat.icon}</span>
            </div>
            <p className="mt-4 text-xs text-green">{stat.change} نسبت به دیروز</p>
          </div>
        ))}
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="paper-card px-6 py-8">
          <h3 className="font-display text-lg text-ink">فروش هفتگی</h3>
          <div className="mt-6 h-48 bg-gold/5 rounded-lg flex items-center justify-center text-ink-faint">
            📊 نمودار فروش (نیاز به بیاد‌آوری)
          </div>
        </div>
        <div className="paper-card px-6 py-8">
          <h3 className="font-display text-lg text-ink">محبوب‌ترین اقلام</h3>
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink">کاپوچینو</span>
              <span className="num text-sm text-gold">145</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink">اسپرسو</span>
              <span className="num text-sm text-gold">128</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink">شیرینی</span>
              <span className="num text-sm text-gold">96</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="paper-card px-6 py-8">
        <h3 className="font-display text-lg text-ink">آخرین سفارش‌ها</h3>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-line">
                <th className="px-4 py-3 text-left text-sm text-ink-soft">شماره</th>
                <th className="px-4 py-3 text-left text-sm text-ink-soft">مشتری</th>
                <th className="px-4 py-3 text-left text-sm text-ink-soft">مبلغ</th>
                <th className="px-4 py-3 text-left text-sm text-ink-soft">وضعیت</th>
                <th className="px-4 py-3 text-left text-sm text-ink-soft">زمان</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map((order) => (
                <tr key={order.id} className="border-b border-line hover:bg-gold/5">
                  <td className="px-4 py-3 text-sm font-mono text-ink">{order.id}</td>
                  <td className="px-4 py-3 text-sm text-ink">{order.customer}</td>
                  <td className="px-4 py-3 text-sm text-ink">{order.total}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs ${
                      order.status === 'تحویل شد' ? 'bg-green/20 text-green' :
                      order.status === 'در آماده‌سازی' ? 'bg-gold/20 text-gold' :
                      'bg-ink-faint/20 text-ink-soft'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-ink-soft">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
