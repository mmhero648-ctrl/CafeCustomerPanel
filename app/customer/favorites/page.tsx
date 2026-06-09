'use client'

import Link from 'next/link'

export default function FavoritesPage() {
  const favorites = [
    {
      id: '01',
      name: 'کاپوچینو',
      desc: 'شیر و فوم قهوه ایتالیایی',
      price: '65,000',
      category: 'اسپرسو',
    },
    {
      id: '08',
      name: 'ماچیاتو',
      desc: 'اسپرسو با مقدار کمی فوم شیر',
      price: '70,000',
      category: 'اسپرسو',
    },
    {
      id: '12',
      name: 'کیک شکلاتی',
      desc: 'شیرینی لذیذ مختص کافه',
      price: '45,000',
      category: 'شیرینی',
    },
  ]

  return (
    <div className="min-h-screen bg-parchment pb-24">
      <div className="sticky top-0 z-20 border-b border-line bg-parchment px-4 py-4">
        <div className="flex items-center gap-3">
          <Link href="/customer" className="flex items-center justify-center">
            <span className="text-lg text-ink">←</span>
          </Link>
          <h1 className="font-display text-2xl text-ink">علاقه‌مندی‌ها</h1>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
          <p className="text-xl text-ink-soft">هنوز محصولی را علاقه‌مند ننشانید</p>
          <Link
            href="/customer/menu"
            className="mt-4 rounded-lg bg-green px-6 py-2 text-sm text-parchment transition-colors hover:bg-green/90"
          >
            بازگشت به منو
          </Link>
        </div>
      ) : (
        <div className="space-y-3 p-4">
          {favorites.map((item) => (
            <div key={item.id} className="paper-card overflow-hidden">
              <div className="flex gap-4 p-4">
                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center bg-gold/10 text-3xl">
                  {item.id}
                </div>
                <div className="flex-1">
                  <p className="font-display text-lg text-ink">{item.name}</p>
                  <p className="text-xs text-ink-soft">{item.desc}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="num text-sm text-gold">{item.price}ت</p>
                    <button className="rounded bg-green/10 px-3 py-1 text-xs text-green transition-colors hover:bg-green/20">
                      سفارش
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
