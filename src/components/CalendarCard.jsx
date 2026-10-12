import { useMemo } from 'react'

import { toArabicDigits } from '../lib/arabic.js'
import { getHeatmapDays } from '../lib/khatma.js'
import { useClockStore } from '../store/useClockStore.js'
import { useKhatmaStore } from '../store/useKhatmaStore.js'
import './CalendarCard.css'

export default function CalendarCard() {
  const plan = useKhatmaStore((state) => state.plan)
  const log = useKhatmaStore((state) => state.log)
  const today = useClockStore((state) => state.today)

  const days = useMemo(() => (plan ? getHeatmapDays(plan, log, today) : []), [plan, log, today])
  const hasMissed = days.some((day) => day.level === 'missed')

  return (
    <section className="calendar-card">
      <div className="calendar-card__head">
        <h2 className="calendar-card__title">تقويم الختمة</h2>
        <span className="calendar-card__hint">عدد الصفحات المقروءة في كل يوم</span>
      </div>

      <div className="heat-grid" role="list">
        {days.map(({ date, day, pages, level }) => (
          <div
            key={date}
            className={`heat-cell heat-cell--${level}`}
            role="listitem"
            aria-label={`اليوم ${toArabicDigits(day)}: ${toArabicDigits(pages)} صفحة`}
          >
            <span className="heat-cell__day">{toArabicDigits(day)}</span>
            <span className="heat-cell__pages">{level === 'future' ? '' : toArabicDigits(pages)}</span>
          </div>
        ))}
      </div>

      <div className="heat-legend">
        <span className="heat-legend__item">
          <span className="heat-legend__swatch heat-cell--partial" />
          أقل من الورد
        </span>
        <span className="heat-legend__item">
          <span className="heat-legend__swatch heat-cell--done" />
          أتممت الورد
        </span>
        <span className="heat-legend__item">
          <span className="heat-legend__swatch heat-cell--strong" />
          أكثر من الورد
        </span>
        {hasMissed && (
          <span className="heat-legend__item">
            <span className="heat-legend__swatch heat-cell--missed" />
            لم تقرأ
          </span>
        )}
        <span className="heat-legend__item">
          <span className="heat-legend__swatch heat-cell--today" />
          اليوم
        </span>
      </div>
    </section>
  )
}
