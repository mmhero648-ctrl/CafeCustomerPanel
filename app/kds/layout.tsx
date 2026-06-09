'use client'

import { ReactNode } from 'react'
import { StoreProvider } from '@/lib/store'

export default function KDSLayout({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <div className="border-b border-line bg-surface px-8 py-4">
          <h1 className="font-display text-2xl text-ink">نمایشگر آشپزخانه</h1>
        </div>
        <div className="flex-1 overflow-auto p-4">
          {children}
        </div>
      </div>
    </StoreProvider>
  )
}
