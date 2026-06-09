'use client'

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from 'react'
import {
  type CartLine,
  type OrderMode,
  type MenuItem,
  type PastOrder,
  PAST_ORDERS,
} from './data'
import { uid, genOrderNumber, nowTime } from './format'

export type View =
  | 'landing'
  | 'menu'
  | 'cart'
  | 'checkout'
  | 'tracking'
  | 'profile'

export type Customer = {
  name: string
  phone: string
  tier: 'Bronze' | 'Silver' | 'Gold'
  tierFa: string
  points: number
  wallet: number
  loggedIn: boolean
}

export type TrackStage = {
  key: string
  label: string
  descriptor: string
  time?: string
}

export type ActiveOrder = {
  number: string
  mode: OrderMode
  table?: string
  lines: CartLine[]
  total: number
  stages: TrackStage[]
  currentStage: number
}

type State = {
  view: View
  direction: 'left' | 'right'
  mode: OrderMode | null
  table: string | null
  address: string | null
  cart: CartLine[]
  walletApplied: boolean
  promo: string | null
  customer: Customer
  activeOrder: ActiveOrder | null
  pastOrders: PastOrder[]
  surveyOpen: boolean
  surveyDone: boolean
}

const STAGES: Record<OrderMode, Omit<TrackStage, 'time'>[]> = {
  table: [
    { key: 'received', label: 'دریافت شد', descriptor: 'سفارش شما ثبت شد' },
    { key: 'prep', label: 'آشپزخانه · در حال آماده‌سازی', descriptor: 'کاپوچینوی شما در حال دم آمدن است' },
    { key: 'ready', label: 'آشپزخانه · آماده', descriptor: 'سفارش آمادهٔ سرو است' },
    { key: 'served', label: 'سرو شد', descriptor: 'نوش جان؛ به میز شما رسید' },
  ],
  takeaway: [
    { key: 'received', label: 'دریافت شد', descriptor: 'سفارش شما ثبت شد' },
    { key: 'prep', label: 'در حال آماده‌سازی', descriptor: 'سفارش شما آمادهٔ تحویل می‌شود' },
    { key: 'ready', label: 'آمادهٔ تحویل', descriptor: 'لطفاً به کانتر مراجعه کنید' },
  ],
  delivery: [
    { key: 'received', label: 'دریافت شد', descriptor: 'سفارش شما ثبت شد' },
    { key: 'prep', label: 'در حال آماده‌سازی', descriptor: 'سفارش شما بسته‌بندی می‌شود' },
    { key: 'rider', label: 'تحویل به پیک', descriptor: 'پیک سفارش را تحویل گرفت' },
    { key: 'enroute', label: 'در مسیر', descriptor: 'پیک به سمت شما حرکت کرد' },
    { key: 'delivered', label: 'تحویل شد', descriptor: 'سفارش به دست شما رسید' },
  ],
}

type Action =
  | { type: 'NAVIGATE'; view: View; direction?: 'left' | 'right' }
  | { type: 'SET_MODE'; mode: OrderMode; table?: string }
  | { type: 'ADD_LINE'; line: CartLine }
  | { type: 'UPDATE_LINE'; line: CartLine }
  | { type: 'REMOVE_LINE'; lineId: string }
  | { type: 'SET_QTY'; lineId: string; qty: number }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_WALLET' }
  | { type: 'APPLY_PROMO'; code: string }
  | { type: 'SET_ADDRESS'; address: string }
  | { type: 'LOGIN'; phone: string }
  | { type: 'PLACE_ORDER'; order: ActiveOrder }
  | { type: 'ADVANCE_STAGE' }
  | { type: 'OPEN_SURVEY' }
  | { type: 'CLOSE_SURVEY' }
  | { type: 'COMPLETE_SURVEY'; points: number }

const initialCustomer: Customer = {
  name: 'سارا',
  phone: '',
  tier: 'Silver',
  tierFa: 'نقره‌ای',
  points: 1240,
  wallet: 69000,
  loggedIn: false,
}

const initialState: State = {
  view: 'landing',
  direction: 'left',
  mode: null,
  table: null,
  address: null,
  cart: [],
  walletApplied: false,
  promo: null,
  customer: initialCustomer,
  activeOrder: null,
  pastOrders: PAST_ORDERS,
  surveyOpen: false,
  surveyDone: false,
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'NAVIGATE':
      return { ...state, view: action.view, direction: action.direction ?? 'left' }
    case 'SET_MODE':
      return { ...state, mode: action.mode, table: action.table ?? state.table }
    case 'ADD_LINE':
      return { ...state, cart: [...state.cart, action.line] }
    case 'UPDATE_LINE':
      return {
        ...state,
        cart: state.cart.map((l) =>
          l.lineId === action.line.lineId ? action.line : l,
        ),
      }
    case 'REMOVE_LINE':
      return { ...state, cart: state.cart.filter((l) => l.lineId !== action.lineId) }
    case 'SET_QTY':
      return {
        ...state,
        cart: state.cart.map((l) =>
          l.lineId === action.lineId
            ? { ...l, quantity: Math.max(1, action.qty) }
            : l,
        ),
      }
    case 'CLEAR_CART':
      return { ...state, cart: [], walletApplied: false, promo: null }
    case 'TOGGLE_WALLET':
      return { ...state, walletApplied: !state.walletApplied }
    case 'APPLY_PROMO':
      return { ...state, promo: action.code }
    case 'SET_ADDRESS':
      return { ...state, address: action.address }
    case 'LOGIN':
      return {
        ...state,
        customer: { ...state.customer, loggedIn: true, phone: action.phone },
      }
    case 'PLACE_ORDER': {
      const earned = Math.round(action.order.total / 1000)
      return {
        ...state,
        activeOrder: action.order,
        cart: [],
        walletApplied: false,
        promo: null,
        customer: state.customer.loggedIn
          ? { ...state.customer, points: state.customer.points + earned }
          : state.customer,
      }
    }
    case 'ADVANCE_STAGE': {
      if (!state.activeOrder) return state
      const next = state.activeOrder.currentStage + 1
      if (next >= state.activeOrder.stages.length) return state
      const stages = state.activeOrder.stages.map((s, i) =>
        i === next ? { ...s, time: nowTime() } : s,
      )
      return {
        ...state,
        activeOrder: { ...state.activeOrder, currentStage: next, stages },
      }
    }
    case 'OPEN_SURVEY':
      return { ...state, surveyOpen: true }
    case 'CLOSE_SURVEY':
      return { ...state, surveyOpen: false }
    case 'COMPLETE_SURVEY':
      return {
        ...state,
        surveyOpen: false,
        surveyDone: true,
        customer: state.customer.loggedIn
          ? { ...state.customer, points: state.customer.points + action.points }
          : state.customer,
      }
    default:
      return state
  }
}

type StoreCtx = {
  state: State
  navigate: (view: View, direction?: 'left' | 'right') => void
  setMode: (mode: OrderMode, table?: string) => void
  addLine: (line: CartLine) => void
  updateLine: (line: CartLine) => void
  removeLine: (lineId: string) => void
  setQty: (lineId: string, qty: number) => void
  clearCart: () => void
  toggleWallet: () => void
  applyPromo: (code: string) => void
  setAddress: (address: string) => void
  login: (phone: string) => void
  placeOrder: () => void
  advanceStage: () => void
  openSurvey: () => void
  closeSurvey: () => void
  completeSurvey: (points: number) => void
  cartCount: number
  cartSubtotal: number
  discount: number
  walletDeduction: number
  deliveryFee: number
  total: number
}

const Ctx = createContext<StoreCtx | null>(null)

const PROMO_DISCOUNT = 0.1
const DELIVERY_FEE = 45000

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const cartCount = state.cart.reduce((s, l) => s + l.quantity, 0)
  const cartSubtotal = state.cart.reduce(
    (s, l) => s + l.unitPrice * l.quantity,
    0,
  )
  const discount = state.promo ? Math.round(cartSubtotal * PROMO_DISCOUNT) : 0
  const deliveryFee = state.mode === 'delivery' ? DELIVERY_FEE : 0
  const preWallet = cartSubtotal - discount + deliveryFee
  const walletDeduction = state.walletApplied
    ? Math.min(state.customer.wallet, preWallet)
    : 0
  const total = Math.max(0, preWallet - walletDeduction)

  const navigate = useCallback(
    (view: View, direction: 'left' | 'right' = 'left') =>
      dispatch({ type: 'NAVIGATE', view, direction }),
    [],
  )
  const setMode = useCallback(
    (mode: OrderMode, table?: string) => dispatch({ type: 'SET_MODE', mode, table }),
    [],
  )
  const addLine = useCallback((line: CartLine) => dispatch({ type: 'ADD_LINE', line }), [])
  const updateLine = useCallback((line: CartLine) => dispatch({ type: 'UPDATE_LINE', line }), [])
  const removeLine = useCallback((lineId: string) => dispatch({ type: 'REMOVE_LINE', lineId }), [])
  const setQty = useCallback((lineId: string, qty: number) => dispatch({ type: 'SET_QTY', lineId, qty }), [])
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), [])
  const toggleWallet = useCallback(() => dispatch({ type: 'TOGGLE_WALLET' }), [])
  const applyPromo = useCallback((code: string) => dispatch({ type: 'APPLY_PROMO', code }), [])
  const setAddress = useCallback((address: string) => dispatch({ type: 'SET_ADDRESS', address }), [])
  const login = useCallback((phone: string) => dispatch({ type: 'LOGIN', phone }), [])
  const advanceStage = useCallback(() => dispatch({ type: 'ADVANCE_STAGE' }), [])
  const openSurvey = useCallback(() => dispatch({ type: 'OPEN_SURVEY' }), [])
  const closeSurvey = useCallback(() => dispatch({ type: 'CLOSE_SURVEY' }), [])
  const completeSurvey = useCallback(
    (points: number) => dispatch({ type: 'COMPLETE_SURVEY', points }),
    [],
  )

  const placeOrder = useCallback(() => {
    const mode = state.mode ?? 'table'
    const baseStages = STAGES[mode]
    const stages: TrackStage[] = baseStages.map((s, i) =>
      i === 0 ? { ...s, time: nowTime() } : { ...s },
    )
    const order: ActiveOrder = {
      number: genOrderNumber(),
      mode,
      table: state.table ?? undefined,
      lines: state.cart,
      total,
      stages,
      currentStage: 0,
    }
    dispatch({ type: 'PLACE_ORDER', order })
    dispatch({ type: 'NAVIGATE', view: 'tracking', direction: 'left' })
  }, [state.mode, state.table, state.cart, total])

  const value: StoreCtx = {
    state,
    navigate,
    setMode,
    addLine,
    updateLine,
    removeLine,
    setQty,
    clearCart,
    toggleWallet,
    applyPromo,
    setAddress,
    login,
    placeOrder,
    advanceStage,
    openSurvey,
    closeSurvey,
    completeSurvey,
    cartCount,
    cartSubtotal,
    discount,
    walletDeduction,
    deliveryFee,
    total,
  }

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}

export type { MenuItem }
