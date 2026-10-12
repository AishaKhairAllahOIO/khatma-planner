import { diffInDays } from '../lib/dates.js'
import { formatCount, toArabicDigits } from '../lib/arabic.js'
import { useStats } from '../hooks/useStats.js'
import { useKhatmaStore } from '../store/useKhatmaStore.js'
import { BookIcon, CheckIcon, PlusIcon, UndoIcon } from './Icons.jsx'
import './TodayCard.css'

const QUICK_PAGES = 5

export default function TodayCard() {
  const stats = useStats()
  const startDate = useKhatmaStore((state) => state.plan?.startDate)
  const endDate = useKhatmaStore((state) => state.log.at(-1)?.date)
  const hasEntries = useKhatmaStore((state) => state.log.length > 0)
  const logPages = useKhatmaStore((state) => state.logPages)
  const undoLastEntry = useKhatmaStore((state) => state.undoLastEntry)
  const completeKhatma = useKhatmaStore((state) => state.completeKhatma)

  const {
    totalPages, targetDays, dayNumber, todayTarget, pagesToday, todayRemaining, todayPercent,
    isComplete, started, positionPage, positionJuz, positionSurah,
  } = stats

  if (isComplete) {
    return (
      <section id="today" className="today-card today-card--done">
        <span className="today-card__chip">الحمد لله</span>
        <h2 className="today-card__done-title">أتممت الختمة</h2>
        <p className="today-card__text">تقبّل الله منك. قرأت المصحف كاملاً في {formatCount(Math.max(diffInDays(startDate, endDate) + 1, 1), 'day')}.</p>
        <div className="today-card__actions">
          <button type="button" className="btn btn--primary" onClick={completeKhatma}>
            احفظ الختمة وابدأ من جديد
          </button>
          <button type="button" className="btn btn--ghost" onClick={undoLastEntry}>
            <UndoIcon size={18} />
            تراجع عن آخر تسجيل
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="today" className="today-card">
      <div className="today-card__top">
        <span className="today-card__chip">
          ورد اليوم · اليوم {toArabicDigits(dayNumber)} من {toArabicDigits(targetDays)}
        </span>
        <span className="today-card__mushaf only-desktop">مصحف المدينة · {toArabicDigits(totalPages)} صفحة</span>
      </div>

      <div className="today-card__amount">
        <span className="today-card__number">{toArabicDigits(todayTarget)}</span>
        <span className="today-card__unit">صفحة</span>
      </div>

      <p className="today-card__text">
        قرأت {formatCount(pagesToday, 'page')}
        <span className="only-desktop"> حتى الآن</span>، وبقي {formatCount(todayRemaining, 'page')} لإكمال ورد اليوم.
      </p>

      <div
        className="progress"
        role="progressbar"
        aria-label="تقدّم ورد اليوم"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={todayPercent}
      >
        <div className="progress__fill" style={{ width: `${todayPercent}%` }} />
      </div>

      <div className="today-card__actions">
        <button type="button" className="btn btn--primary" onClick={() => logPages(QUICK_PAGES)}>
          <PlusIcon size={20} strokeWidth={2} />
          سجّل {formatCount(QUICK_PAGES, 'page')}
        </button>
        <button
          type="button"
          className="btn btn--white"
          disabled={todayRemaining === 0}
          onClick={() => logPages(todayRemaining)}
        >
          <CheckIcon size={20} strokeWidth={2} />
          أتممت ورد اليوم
        </button>
        <button type="button" className="btn btn--ghost" disabled={!hasEntries} onClick={undoLastEntry}>
          <UndoIcon size={18} />
          تراجع عن آخر تسجيل
        </button>
      </div>

      <div className="today-card__position only-desktop">
        <BookIcon size={24} />
        <div>
          <div className="today-card__position-label">{started ? 'أنت الآن عند' : 'ابدأ من'}</div>
          <div className="today-card__position-value">
            {started
              ? `سورة ${positionSurah} · الجزء ${toArabicDigits(positionJuz)} · صفحة ${toArabicDigits(positionPage)}`
              : 'سورة الفاتحة · الجزء ١ · صفحة ١'}
          </div>
        </div>
      </div>
    </section>
  )
}
