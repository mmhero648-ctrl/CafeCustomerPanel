'use client'

import { useEffect, useState } from 'react'
import { useStore } from '@/lib/store'
import { BottomSheet } from '@/components/bottom-sheet'
import { cn } from '@/lib/utils'

const REWARD_POINTS = 50

type Question = {
  id: string
  prose: string
  options: string[]
}

function getQuestionsForMode(mode: 'table' | 'takeaway' | 'delivery'): Question[] {
  if (mode === 'table') {
    return [
      {
        id: 'coffee',
        prose: 'قهوهٔ امروز چطور بود؟',
        options: ['دقیقاً همان‌طور که دوست دارم', 'خوب بود، اما جای بهتر شدن داشت', 'این بار به دلم ننشست'],
      },
      {
        id: 'ambiance',
        prose: 'فضای کافه امروز چطور بود؟',
        options: ['آرام و دنج', 'خیلی پر و شلوغ', 'ایده‌آل بود'],
      },
      {
        id: 'return',
        prose: 'دوباره به ما سر می‌زنید؟',
        options: ['حتماً، اینجا را دوست دارم', 'شاید گاهی', 'مطمئن نیستم'],
      },
    ]
  } else if (mode === 'takeaway') {
    return [
      {
        id: 'coffee',
        prose: 'قهوهٔ امروز چطور بود؟',
        options: ['دقیقاً همان‌طور که دوست دارم', 'خوب بود، اما جای بهتر شدن داشت', 'این بار به دلم ننشست'],
      },
      {
        id: 'packaging',
        prose: 'کیفیت بسته‌بندی چطور بود؟',
        options: ['عالی و مناسب', 'کافی بود', 'نیاز به بهتری داشت'],
      },
      {
        id: 'speed',
        prose: 'سرعت سرویس چطور بود؟',
        options: ['سریع‌تر از انتظارم', 'به‌اندازهٔ معمول', 'کمی بیش از حد طول کشید'],
      },
    ]
  } else {
    // delivery
    return [
      {
        id: 'delivery_time',
        prose: 'زمان تحویل چطور بود؟',
        options: ['سریع‌تر از انتظارم', 'به‌اندازهٔ معمول', 'کمی تاخیر داشت'],
      },
      {
        id: 'packaging',
        prose: 'کیفیت و بسته‌بندی محصول؟',
        options: ['عالی و ایمن', 'کافی بود', 'نیاز به بهتری داشت'],
      },
      {
        id: 'courier',
        prose: 'رفتار پیک‌تان چطور بود؟',
        options: ['دوست‌داشتنی و حرفه‌ای', 'خوب بود', 'نیاز به بهتری داشت'],
      },
    ]
  }
}

export function SurveySheet() {
  const { state, closeSurvey, completeSurvey } = useStore()
  const open = state.surveyOpen

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [comment, setComment] = useState('')
  const [done, setDone] = useState(false)

  const mode = state.activeOrder?.mode ?? 'table'
  const QUESTIONS = getQuestionsForMode(mode)

  // Reset the card whenever it is (re)opened
  useEffect(() => {
    if (open) {
      setStep(0)
      setAnswers({})
      setComment('')
      setDone(false)
    }
  }, [open])

  const close = () => closeSurvey()

  const pick = (qid: string, opt: string) => {
    setAnswers((a) => ({ ...a, [qid]: opt }))
    setTimeout(() => {
      if (step < QUESTIONS.length - 1) setStep((s) => s + 1)
      else setStep(QUESTIONS.length) // comment step
    }, 260)
  }

  const submit = () => {
    setDone(true)
    completeSurvey(REWARD_POINTS)
    setTimeout(() => closeSurvey(), 2400)
  }

  const onComment = step === QUESTIONS.length
  const q = QUESTIONS[step]

  return (
    <BottomSheet open={open} onClose={close}>
      <div className="px-6 pb-10 pt-2 sm:px-10">
        {done ? (
          <div className="anim-fade py-10 text-center">
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold">
              با سپاس
            </p>
            <h2 className="mt-4 font-display text-3xl leading-snug text-green text-balance">
              یادداشت‌تان به دست‌مان رسید
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-ink-muted">
              هر فنجان را با همین بازخوردها بهتر می‌کنیم.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 border border-gold/60 px-4 py-1.5 text-[13px] text-gold">
              <span className="num" dir="ltr">
                +{REWARD_POINTS}
              </span>
              <span>امتیاز باشگاه به حساب شما اضافه شد</span>
            </div>
          </div>
        ) : (
          <>
            {/* header */}
            <div className="flex items-baseline justify-between">
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-gold">
                کارت نظر
              </span>
              <span className="num text-xs text-ink-faint" dir="ltr">
                {Math.min(step + 1, QUESTIONS.length)} / {QUESTIONS.length}
              </span>
            </div>
            <div className="rule-double mt-3" />

            {onComment ? (
              <div key="comment" className="anim-fade mt-7">
                <h2 className="font-display text-2xl leading-snug text-green text-balance">
                  چیزی هست که دوست داشته باشید برای‌مان بنویسید؟
                </h2>
                <p className="mt-2 font-sans text-sm text-ink-faint">اختیاری</p>
                <input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="یادداشت شما…"
                  className="mt-5 w-full border-b border-line-strong bg-transparent pb-2 font-sans text-base text-ink outline-none placeholder:text-ink-faint focus:border-gold"
                />
                <button
                  onClick={submit}
                  className="mt-8 w-full bg-green py-4 font-display text-lg text-green-foreground transition-opacity hover:opacity-90"
                >
                  ثبت بازخورد
                </button>
              </div>
            ) : (
              <div key={q.id} className="anim-stage mt-7">
                <h2 className="font-display text-2xl leading-snug text-green text-balance">
                  {q.prose}
                </h2>
                <ul className="mt-6 flex flex-col">
                  {q.options.map((opt, i) => {
                    const selected = answers[q.id] === opt
                    return (
                      <li key={i}>
                        <button
                          onClick={() => pick(q.id, opt)}
                          className={cn(
                            'flex w-full items-center justify-between gap-3 border-b border-line py-4 text-right font-sans text-base transition-colors',
                            selected ? 'text-gold' : 'text-ink hover:text-green',
                          )}
                        >
                          <span>{opt}</span>
                          <span
                            className={cn(
                              'h-2 w-2 shrink-0 rounded-full border transition-colors',
                              selected ? 'border-gold bg-gold' : 'border-line-strong',
                            )}
                          />
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </BottomSheet>
  )
}
