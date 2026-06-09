'use client'

import { type ReactNode, useEffect } from 'react'
import { cn } from '@/lib/utils'

export function BottomSheet({
  open,
  onClose,
  children,
  className,
}: {
  open: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}) {
  useEffect(() => {
    if (open) {
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
      window.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
      return () => {
        window.removeEventListener('keydown', onKey)
        document.body.style.overflow = ''
      }
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        aria-label="بستن"
        onClick={onClose}
        className="anim-overlay absolute inset-0 bg-ink/40"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'anim-sheet relative z-10 max-h-[88vh] w-full max-w-[600px] overflow-y-auto border-t border-gold/30 bg-background',
          className,
        )}
      >
        <div className="sticky top-0 flex justify-center bg-background/95 pt-3 pb-1">
          <span className="h-1 w-10 bg-line-strong" aria-hidden />
        </div>
        {children}
      </div>
    </div>
  )
}
