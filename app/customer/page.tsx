'use client'

import { StoreProvider, useStore } from '@/lib/store'
import { TopNav } from '@/components/top-nav'
import { CartFooter } from '@/components/cart-footer'
import { LandingView } from '@/components/views/landing-view'
import { MenuView } from '@/components/views/menu-view'
import { CartView } from '@/components/views/cart-view'
import { CheckoutView } from '@/components/views/checkout-view'
import { TrackingView } from '@/components/views/tracking-view'
import { ProfileView } from '@/components/views/profile-view'
import { SurveySheet } from '@/components/survey-sheet'

function CustomerShell() {
  const { state } = useStore()
  const animClass =
    state.direction === 'left' ? 'anim-view-left' : 'anim-view-right'

  if (state.view === 'landing') {
    return (
      <div key="landing" className="anim-fade">
        <LandingView />
      </div>
    )
  }

  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      <TopNav />
      <div key={state.view} className={`flex-1 ${animClass}`}>
        {state.view === 'menu' && <MenuView />}
        {state.view === 'cart' && <CartView />}
        {state.view === 'checkout' && <CheckoutView />}
        {state.view === 'tracking' && <TrackingView />}
        {state.view === 'profile' && <ProfileView />}
      </div>
      <CartFooter />
      <SurveySheet />
    </div>
  )
}

export default function CustomerPage() {
  return <CustomerShell />
}
