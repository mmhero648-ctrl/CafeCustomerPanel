'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function AdminMenuPage() {
  const [items, setItems] = useState([
    { id: '01', name: 'کاپوچینو', price: '65,000', category: 'اسپرسو', available: true },
    { id: '02', name: 'اسپرسو', price: '55,000', category: 'اسپرسو', available: true },
    { id: '12', name: 'کیک شکلاتی', price: '45,000', category: 'شیرینی', available: false },
  ])

  const toggleAvailability = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ))
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl text-ink">منو</h1>
        <div className="flex gap-2">
          <button className="rounded-lg bg-green px-4 py-2 text-sm text-parchment hover:bg-green/90">
            + اضافه کردن
          </button>
          <Link href="/admin" className="text-green hover:underline">← بازگشت</Link>
        </div>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full text-right text-sm">
          <thead className="border-b border-line bg-gold/10">
            <tr>
              <th className="px-4 py-3 font-display text-ink">کد</th>
              <th className="px-4 py-3 font-display text-ink">نام</th>
              <th className="px-4 py-3 font-display text-ink">دسته</th>
              <th className="px-4 py-3 font-display text-ink">قیمت</th>
              <th className="px-4 py-3 font-display text-ink">دسترس‌پذیری</th>
              <th className="px-4 py-3 font-display text-ink">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-line hover:bg-gold/5">
                <td className="px-4 py-3 num font-display">{item.id}</td>
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3 text-xs text-ink-soft">{item.category}</td>
                <td className="px-4 py-3 num">{item.price}ت</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleAvailability(item.id)}
                    className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                      item.available
                        ? 'bg-green/10 text-green'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {item.available ? 'در دسترس' : 'موجود نیست'}
                  </button>
                </td>
                <td className="px-4 py-3 text-xs">
                  <button className="text-blue-600 hover:underline">ویرایش</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
