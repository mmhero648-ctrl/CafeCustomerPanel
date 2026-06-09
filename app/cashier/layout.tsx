'use client'

import { ReactNode } from 'react'
import { StoreProvider } from '@/lib/store'
import Link from 'next/link'

export default function CashierLayout({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <div className="border-b border-line bg-surface px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-xl text-ink">صندوق‌دار</h1>
            <Link href="/auth/login" className="text-sm text-ink-soft hover:text-ink">
              خروج
            </Link>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </div>
    </StoreProvider>
  )
}
