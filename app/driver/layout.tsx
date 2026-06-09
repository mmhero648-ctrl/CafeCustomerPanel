'use client'

import { ReactNode } from 'react'
import { StoreProvider } from '@/lib/store'

export default function DriverLayout({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <div className="border-b border-line bg-surface px-6 py-4">
          <h1 className="font-display text-xl text-ink">پنل راننده</h1>
        </div>
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </div>
    </StoreProvider>
  )
}
