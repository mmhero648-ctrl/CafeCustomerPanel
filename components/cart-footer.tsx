'use client'

import { useStore } from '@/lib/store'
import { Price } from './typeset'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export function CartFooter() {
  const { state, cartCount, cartSubtotal, navigate } = useStore()
  const [pulse, setPulse] = useState(false)
  const prevCount = useRef(cartCount)

  useEffect(() => {
    if (cartCount !== prevCount.current && cartCount > 0) {
      setPulse(true)
      const t = setTimeout(() => setPulse(false), 260)
      prevCount.current = cartCount
      return () => clearTimeout(t)
    }
    prevCount.current = cartCount
  }, [cartCount])

  // hide on cart/checkout/tracking/landing
  const hidden =
    cartCount === 0 ||
    ['cart', 'checkout', 'tracking', 'landing'].includes(state.view)

  if (hidden) return null

  return (
    <div className="anim-slide-up fixed inset-x-0 bottom-0 z-30">
      <button
        onClick={() => navigate('cart')}
        className="mx-auto flex w-full max-w-[1280px] items-center justify-between bg-green px-5 py-3.5 text-green-foreground transition-colors hover:bg-green/95"
      >
        <span
          className={cn(
            'flex items-baseline gap-2 font-display text-base',
            pulse && 'anim-fade',
          )}
        >
          <span className="num" dir="ltr">
            {cartCount}
          </span>
          <span className="text-sm">قلم</span>
          <span className="text-gold-muted">·</span>
          <Price value={cartSubtotal} className="text-gold-muted" />
        </span>
        <span className="flex items-center gap-2 font-display text-sm">
          مشاهدهٔ سفارش
          <ArrowLeft className="size-4" strokeWidth={1.6} />
        </span>
      </button>
    </div>
  )
}
