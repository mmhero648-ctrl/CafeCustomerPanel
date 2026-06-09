'use client'

import { ReactNode } from 'react'
import { StoreProvider } from '@/lib/store'

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      {children}
    </StoreProvider>
  )
}
