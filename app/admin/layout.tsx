'use client'

import { ReactNode, useState } from 'react'
import { StoreProvider } from '@/lib/store'
import Link from 'next/link'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const ADMIN_MENU = [
    { label: 'داشبورد', href: '/admin', icon: '📊' },
    { label: 'سفارش‌ها', href: '/admin/orders', icon: '📋' },
    { label: 'منو', href: '/admin/menu', icon: '🍽️' },
    { label: 'تحلیل‌ها', href: '/admin/analytics', icon: '📈' },
    { label: 'مالی', href: '/admin/financials', icon: '💰' },
    { label: 'کارکنان', href: '/admin/staff', icon: '👥' },
    { label: 'تنظیمات', href: '/admin/settings', icon: '⚙️' },
  ]

  return (
    <StoreProvider>
      <div className="flex min-h-screen bg-background">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-20'} border-l border-line bg-surface transition-all duration-300 ${sidebarOpen ? 'px-4' : 'px-2'} py-6`}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mb-8 w-full py-2 text-sm text-ink-soft hover:text-ink"
          >
            {sidebarOpen ? '← کوچک' : '→'}
          </button>
          <nav className="flex flex-col gap-2">
            {ADMIN_MENU.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-ink hover:bg-gold/10"
              >
                <span className="text-lg">{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="border-b border-line px-8 py-4">
            <h1 className="font-display text-2xl text-ink">پنل مدیریت</h1>
          </div>
          <div className="p-8">
            {children}
          </div>
        </div>
      </div>
    </StoreProvider>
  )
}
