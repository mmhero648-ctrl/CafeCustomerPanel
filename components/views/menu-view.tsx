'use client'

import { useEffect, useRef, useState } from 'react'
import { MENU, type MenuItem } from '@/lib/data'
import { useStore } from '@/lib/store'
import { Price, Stamp, TagAnnotations } from '@/components/typeset'
import { ItemSheet } from '@/components/item-sheet'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MenuView() {
  const { state } = useStore()
  const [active, setActive] = useState(MENU[0].id)
  const [sheetItem, setSheetItem] = useState<MenuItem | null>(null)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  const stripRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) {
          const id = visible[0].target.getAttribute('data-cat')
          if (id) {
            setActive(id)
            stripRefs.current[id]?.scrollIntoView({
              behavior: 'smooth',
              inline: 'center',
              block: 'nearest',
            })
          }
        }
      },
      { rootMargin: '-120px 0px -65% 0px', threshold: [0, 0.25, 0.5] },
    )
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  function scrollTo(id: string) {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="mx-auto max-w-[1280px] px-4 pb-28 md:px-8">
      {/* table badge */}
      <div className="flex items-center justify-between border-b border-line py-3">
        <Stamp tone="green">
          {state.mode === 'table'
            ? `میز ${state.table ?? '۷'} · حضوری`
            : state.mode === 'delivery'
              ? 'سفارش ارسالی'
              : state.mode === 'takeaway'
                ? 'سفارش بیرون‌بر'
                : 'تماشای منو'}
        </Stamp>
        <span className="font-display text-xs text-ink-faint italic">
          باز · ۸ صبح تا ۱۱ شب
        </span>
      </div>

      {/* category strip */}
      <nav className="no-scrollbar sticky top-14 z-20 -mx-4 flex gap-6 overflow-x-auto bg-background/95 px-4 py-3 backdrop-blur md:-mx-8 md:px-8">
        {MENU.map((cat) => (
          <button
            key={cat.id}
            ref={(el) => {
              stripRefs.current[cat.id] = el
            }}
            onClick={() => scrollTo(cat.id)}
            className={cn(
              'shrink-0 border-b-2 pb-1 font-display text-lg whitespace-nowrap transition-colors',
              active === cat.id
                ? 'border-gold text-green'
                : 'border-transparent text-ink-faint hover:text-ink-muted',
            )}
          >
            {cat.name}
          </button>
        ))}
      </nav>

      {/* sections */}
      <div className="mt-4">
        {MENU.map((cat) => (
          <section
            key={cat.id}
            data-cat={cat.id}
            ref={(el) => {
              sectionRefs.current[cat.id] = el
            }}
            className="scroll-mt-32 pt-8"
          >
            <h2 className="font-display text-4xl text-green md:text-5xl">
              {cat.name}
            </h2>
            <p className="mt-1.5 font-display text-sm text-ink-muted italic">
              {cat.descriptor}
            </p>
            <div className="mt-4 mb-2 rule" />

            <ul className="md:grid md:grid-cols-2 md:gap-x-12">
              {cat.items.map((item) => (
                <li key={item.id}>
                  <ItemRow item={item} onOpen={() => item.available && setSheetItem(item)} onAdd={() => setSheetItem(item)} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <ItemSheet item={sheetItem} onClose={() => setSheetItem(null)} />
    </main>
  )
}

function ItemRow({
  item,
  onOpen,
  onAdd,
}: {
  item: MenuItem
  onOpen: () => void
  onAdd: () => void
}) {
  const [pressed, setPressed] = useState(false)

  return (
    <div
      className={cn(
        'group flex items-start gap-3 border-b border-line py-4',
        !item.available && 'opacity-55',
      )}
    >
      <span className="num mt-1 w-6 shrink-0 text-xs text-ink-faint" dir="ltr">
        {item.number}
      </span>

      <button
        onClick={onOpen}
        disabled={!item.available}
        className="flex-1 text-right disabled:cursor-default"
      >
        <div className="flex items-baseline gap-2">
          <h3 className="font-display text-xl text-ink transition-colors group-hover:text-green">
            {item.name}
          </h3>
          <TagAnnotations tags={item.tags} />
          {!item.available && (
            <span className="border border-rose/50 px-1.5 text-[10px] text-rose uppercase">
              ناموجود
            </span>
          )}
        </div>
        <p className="mt-1 max-w-md text-[13px] leading-relaxed text-ink-muted">
          {item.description}
        </p>
      </button>

      <div className="flex shrink-0 flex-col items-end gap-2">
        <Price value={item.price} className="text-sm text-gold" />
        {item.available && (
          <button
            aria-label={`افزودن ${item.name}`}
            onClick={(e) => {
              e.stopPropagation()
              setPressed(true)
              setTimeout(() => setPressed(false), 200)
              onAdd()
            }}
            className={cn(
              'grid size-7 place-items-center border border-green/40 text-green transition-colors hover:border-green hover:bg-green hover:text-green-foreground',
              pressed && 'anim-press',
            )}
          >
            <Plus className="size-4" strokeWidth={1.8} />
          </button>
        )}
      </div>
    </div>
  )
}
