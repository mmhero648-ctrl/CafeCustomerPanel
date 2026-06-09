'use client'

import { useMemo, useState } from 'react'
import { BottomSheet } from './bottom-sheet'
import { Price, TagAnnotations } from './typeset'
import { type MenuItem, type CartLine } from '@/lib/data'
import { useStore } from '@/lib/store'
import { uid } from '@/lib/format'
import { Check, Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

type Selections = Record<string, string[]> // groupId -> choiceIds

export function ItemSheet({
  item,
  editLine,
  onClose,
}: {
  item: MenuItem | null
  editLine?: CartLine | null
  onClose: () => void
}) {
  const { addLine, updateLine } = useStore()
  const [qty, setQty] = useState(editLine?.quantity ?? 1)
  const [selections, setSelections] = useState<Selections>(() =>
    initSelections(item, editLine),
  )

  // reset when item changes
  const key = item?.id + (editLine?.lineId ?? '')
  const [lastKey, setLastKey] = useState(key)
  if (item && key !== lastKey) {
    setLastKey(key)
    setQty(editLine?.quantity ?? 1)
    setSelections(initSelections(item, editLine))
  }

  const unitPrice = useMemo(() => {
    if (!item) return 0
    let p = item.price
    for (const group of item.options) {
      const chosen = selections[group.id] ?? []
      for (const cid of chosen) {
        const c = group.choices.find((x) => x.id === cid)
        if (c) p += c.priceDelta
      }
    }
    return p
  }, [item, selections])

  if (!item) return null

  function toggle(groupId: string, choiceId: string, type: 'single' | 'multi') {
    setSelections((prev) => {
      const cur = prev[groupId] ?? []
      if (type === 'single') return { ...prev, [groupId]: [choiceId] }
      return {
        ...prev,
        [groupId]: cur.includes(choiceId)
          ? cur.filter((c) => c !== choiceId)
          : [...cur, choiceId],
      }
    })
  }

  function submit() {
    if (!item) return
    const selLabels: { groupTitle: string; label: string }[] = []
    for (const group of item.options) {
      for (const cid of selections[group.id] ?? []) {
        const c = group.choices.find((x) => x.id === cid)
        if (c) selLabels.push({ groupTitle: group.title, label: c.label })
      }
    }
    const line: CartLine = {
      lineId: editLine?.lineId ?? uid(),
      itemId: item.id,
      name: item.name,
      number: item.number,
      basePrice: item.price,
      unitPrice,
      quantity: qty,
      selections: selLabels,
    }
    if (editLine) updateLine(line)
    else addLine(line)
    onClose()
  }

  return (
    <BottomSheet open={!!item} onClose={onClose}>
      <div className="px-5 pb-6 sm:px-7">
        {/* drawn placeholder */}
        <div
          className="relative mb-5 h-40 w-full overflow-hidden border border-line"
          style={{
            background: `repeating-linear-gradient(135deg, ${item.swatch}, ${item.swatch} 14px, color-mix(in oklab, ${item.swatch}, white 8%) 14px, color-mix(in oklab, ${item.swatch}, white 8%) 28px)`,
          }}
        >
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-display text-5xl text-background/70">
              {item.name.charAt(0)}
            </span>
          </div>
          <span className="num absolute top-3 right-3 text-xs text-background/80">
            {item.number}
          </span>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl text-green">{item.name}</h2>
            <div className="mt-1">
              <TagAnnotations tags={item.tags} />
            </div>
          </div>
          <Price value={item.price} className="mt-2 text-lg text-gold" />
        </div>

        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          {item.description}
        </p>
        {item.allergens && (
          <p className="mt-2 text-[12px] text-ink-faint italic">
            {item.allergens}
          </p>
        )}

        <div className="my-5 rule" />

        {item.options.map((group) => (
          <div key={group.id} className="mb-5">
            <h3 className="mb-2 font-display text-base text-ink">
              {group.title}
              {group.required && (
                <span className="mr-2 text-[11px] text-ink-faint">(الزامی)</span>
              )}
            </h3>
            <ul className="flex flex-col">
              {group.choices.map((choice) => {
                const selected = (selections[group.id] ?? []).includes(choice.id)
                return (
                  <li key={choice.id}>
                    <button
                      onClick={() => toggle(group.id, choice.id, group.type)}
                      className="flex w-full items-center justify-between border-b border-line py-2.5 text-right transition-colors hover:text-green"
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            'grid size-4 place-items-center border',
                            selected ? 'border-gold' : 'border-line-strong',
                          )}
                        >
                          {selected && (
                            <Check className="size-3 text-gold" strokeWidth={2.4} />
                          )}
                        </span>
                        <span
                          className={cn(
                            'text-sm',
                            selected ? 'text-ink' : 'text-ink-muted',
                          )}
                        >
                          {choice.label}
                        </span>
                      </span>
                      {choice.priceDelta > 0 && (
                        <Price
                          value={`+${choice.priceDelta.toLocaleString('en-US')}`}
                          className="text-xs text-ink-faint"
                        />
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}

        {/* quantity */}
        <div className="mb-6 flex items-center justify-between">
          <span className="font-display text-base text-ink">تعداد</span>
          <div className="flex items-center gap-4 border border-line-strong px-3 py-1.5">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="text-ink-muted transition-colors hover:text-green disabled:opacity-30"
              disabled={qty <= 1}
              aria-label="کاهش"
            >
              <Minus className="size-4" strokeWidth={1.8} />
            </button>
            <span className="num w-6 text-center text-base" dir="ltr">
              {qty}
            </span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="text-ink-muted transition-colors hover:text-green"
              aria-label="افزایش"
            >
              <Plus className="size-4" strokeWidth={1.8} />
            </button>
          </div>
        </div>

        <button
          onClick={submit}
          className="flex w-full items-center justify-center gap-2 rounded-[4px] bg-green py-3.5 font-display text-base text-green-foreground transition-colors hover:bg-green/90"
        >
          {editLine ? 'به‌روزرسانی سفارش' : 'افزودن به سفارش'}
          <span className="text-gold-muted">·</span>
          <Price value={unitPrice * qty} className="text-gold-muted" />
        </button>
      </div>
    </BottomSheet>
  )
}

function initSelections(
  item: MenuItem | null,
  editLine?: CartLine | null,
): Selections {
  if (!item) return {}
  const sel: Selections = {}
  for (const group of item.options) {
    if (editLine) {
      // match by label
      const matched = group.choices
        .filter((c) =>
          editLine.selections.some(
            (s) => s.groupTitle === group.title && s.label === c.label,
          ),
        )
        .map((c) => c.id)
      if (matched.length) {
        sel[group.id] = matched
        continue
      }
    }
    if (group.required && group.choices.length) {
      sel[group.id] = [group.choices[0].id]
    } else {
      sel[group.id] = []
    }
  }
  return sel
}
