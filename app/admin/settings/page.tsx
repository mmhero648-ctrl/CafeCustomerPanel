'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    name: 'کافه راوی',
    phone: '09121234567',
    address: 'تهران، خیابان انقلاب',
    openTime: '08:00',
    closeTime: '22:00',
  })

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl text-ink">تنظیمات</h1>
        <Link href="/admin" className="text-green hover:underline">← بازگشت</Link>
      </div>

      {/* Settings Form */}
      <div className="max-w-2xl space-y-6">
        {/* Basic Info */}
        <div className="paper-card px-6 py-6">
          <h2 className="mb-4 font-display text-xl text-ink">اطلاعات پایه</h2>
          <div className="space-y-4">
            {[
              { label: 'نام کافه', key: 'name' },
              { label: 'تلفن', key: 'phone' },
              { label: 'آدرس', key: 'address' },
            ].map((field) => (
              <div key={field.key}>
                <label className="mb-2 block text-sm text-ink-soft">{field.label}</label>
                <input
                  type="text"
                  value={settings[field.key as keyof typeof settings]}
                  onChange={(e) => setSettings({...settings, [field.key]: e.target.value})}
                  className="w-full rounded-lg border border-line bg-parchment px-4 py-2 text-right text-ink focus:border-green focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Hours */}
        <div className="paper-card px-6 py-6">
          <h2 className="mb-4 font-display text-xl text-ink">ساعات کاری</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: 'زمان باز شدن', key: 'openTime' },
              { label: 'زمان بسته شدن', key: 'closeTime' },
            ].map((field) => (
              <div key={field.key}>
                <label className="mb-2 block text-sm text-ink-soft">{field.label}</label>
                <input
                  type="time"
                  value={settings[field.key as keyof typeof settings]}
                  onChange={(e) => setSettings({...settings, [field.key]: e.target.value})}
                  className="w-full rounded-lg border border-line bg-parchment px-4 py-2 text-ink focus:border-green focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button className="w-full rounded-lg bg-green px-6 py-3 text-parchment transition-colors hover:bg-green/90">
          ذخیره تغییرات
        </button>
      </div>
    </div>
  )
}
