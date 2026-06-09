'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])

  const allItems = [
    { id: '01', name: 'کاپوچینو', price: '65,000' },
    { id: '02', name: 'اسپرسو', price: '55,000' },
    { id: '03', name: 'فلت وایت', price: '60,000' },
    { id: '04', name: 'ماچیاتو', price: '70,000' },
    { id: '05', name: 'امریکانو', price: '50,000' },
  ]

  const handleSearch = (value: string) => {
    setQuery(value)
    if (value.trim()) {
      setResults(
        allItems.filter(
          (item) =>
            item.name.includes(value) || item.id.includes(value)
        )
      )
    } else {
      setResults([])
    }
  }

  return (
    <div className="min-h-screen bg-parchment pb-24">
      <div className="sticky top-0 z-20 bg-parchment px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/customer" className="flex items-center justify-center">
            <span className="text-lg text-ink">←</span>
          </Link>
          <h1 className="font-display text-2xl text-ink">جستجو</h1>
        </div>
        <input
          type="text"
          placeholder="نام قهوه یا کد را وارد کنید..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full rounded-lg border border-line bg-parchment px-4 py-3 text-right text-sm text-ink placeholder-ink-faint focus:border-green focus:outline-none"
        />
      </div>

      {query && results.length === 0 && (
        <div className="px-4 py-8 text-center">
          <p className="text-ink-soft">نتیجه‌ای برای "{query}" یافت نشد</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-2 p-4">
          {results.map((item) => (
            <div key={item.id} className="paper-card px-4 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-lg text-ink">{item.name}</p>
                  <p className="text-xs text-ink-soft">کد: {item.id}</p>
                </div>
                <div className="text-right">
                  <p className="num text-green">{item.price}ت</p>
                  <button className="mt-1 text-xs text-green hover:underline">
                    افزودن
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!query && (
        <div className="space-y-4 p-4">
          <p className="text-center text-sm text-ink-soft">
            برای جستجو شروع کنید
          </p>
        </div>
      )}
    </div>
  )
}
