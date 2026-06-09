'use client'

import { Search, ShoppingBag, User, Menu } from 'lucide-react'
import { useStore } from '@/lib/store'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export function TopNav() {
  const { state, navigate, cartCount } = useStore()
  const [bounce, setBounce] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const prev = useRef(cartCount)

  useEffect(() => {
    if (cartCount > prev.current) {
      setBounce(true)
      const t = setTimeout(() => setBounce(false), 300)
      return () => clearTimeout(t)
    }
    prev.current = cartCount
  }, [cartCount])

  useEffect(() => {
    prev.current = cartCount
  }, [cartCount])

  const onMenu = state.view !== 'landing'

  return (
    <header className="sticky top-0 z-30 bg-green text-green-foreground">
      <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-4 md:px-8">
        <button
          onClick={() => navigate(onMenu ? 'menu' : 'landing', 'right')}
          className="flex items-baseline gap-2 transition-opacity hover:opacity-80"
        >
          <span className="font-display text-2xl leading-none tracking-tight">
            راوی
          </span>
          <span className="hidden text-[11px] tracking-[0.2em] text-gold-muted uppercase sm:inline">
            Café Ravi
          </span>
        </button>

        {onMenu && (
          <span className="hidden font-display text-sm text-gold-muted italic md:block">
            {viewTitle(state.view)}
          </span>
        )}

        <nav className="flex items-center gap-1">
          <div className="relative">
            <button
              aria-label="منو"
              className="grid size-9 place-items-center text-green-foreground/80 transition-colors hover:text-gold-muted"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu className="size-[18px]" strokeWidth={1.6} />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 rounded-lg border border-gold/20 bg-parchment shadow-lg">
                <div className="py-2">
                  <Link href="/customer/orders" className="block px-4 py-2 text-sm text-ink hover:bg-gold/10">سفارش‌های من</Link>
                  <Link href="/customer/favorites" className="block px-4 py-2 text-sm text-ink hover:bg-gold/10">علاقه‌مندی‌ها</Link>
                  <Link href="/customer/loyalty" className="block px-4 py-2 text-sm text-ink hover:bg-gold/10">باشگاه</Link>
                  <Link href="/customer/notifications" className="block px-4 py-2 text-sm text-ink hover:bg-gold/10">اطلاع‌رسانی‌ها</Link>
                </div>
              </div>
            )}
          </div>
          <Link
            href="/customer/search"
            aria-label="جستجو"
            className="grid size-9 place-items-center text-green-foreground/80 transition-colors hover:text-gold-muted"
          >
            <Search className="size-[18px]" strokeWidth={1.6} />
          </Link>
          <button
            aria-label="سفارش"
            onClick={() => navigate('cart')}
            className="relative grid size-9 place-items-center text-green-foreground/80 transition-colors hover:text-gold-muted"
          >
            <ShoppingBag className="size-[18px]" strokeWidth={1.6} />
            {cartCount > 0 && (
              <span
                className={cn(
                  'num absolute -top-0.5 left-0 grid min-w-[18px] place-items-center bg-gold px-1 text-[10px] leading-[16px] text-green',
                  bounce && 'anim-badge',
                )}
                dir="ltr"
              >
                {cartCount}
              </span>
            )}
          </button>
          <button
            aria-label="پروفایل"
            onClick={() => navigate('profile')}
            className="grid size-9 place-items-center text-green-foreground/80 transition-colors hover:text-gold-muted"
          >
            <User className="size-[18px]" strokeWidth={1.6} />
          </button>
        </nav>
      </div>
    </header>
  )
}

function viewTitle(view: string): string {
  switch (view) {
    case 'menu':
      return 'منو'
    case 'cart':
      return 'بازبینی سفارش'
    case 'checkout':
      return 'پرداخت'
    case 'tracking':
      return 'پیگیری سفارش'
    case 'profile':
      return 'حساب من'
    default:
      return ''
  }
}
