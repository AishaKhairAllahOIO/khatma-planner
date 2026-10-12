import { formatCount, formatPercent, toArabicDigits } from '../lib/arabic.js'
import { useStats } from '../hooks/useStats.js'
import './ProgressCard.css'

const RADIUS = 92
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const pick = (s) => ({
  percent: s.percent,
  pagesRead: s.pagesRead,
  totalPages: s.totalPages,
  remainingPages: s.remainingPages,
})

export default function ProgressCard() {
  const { percent, pagesRead, totalPages, remainingPages } = useStats(pick)
  const arc = (CIRCUMFERENCE * percent) / 100
  const countText = `${toArabicDigits(pagesRead)} من ${toArabicDigits(totalPages)} صفحة`

  return (
    <section className="ring-card">
      <h2 className="ring-card__title only-desktop">التقدّم الكلي</h2>

      <div className="ring">
        <svg className="ring__svg" viewBox="0 0 220 220" role="img" aria-label={`${formatPercent(percent)} من الختمة`}>
          <circle className="ring__track" cx="110" cy="110" r={RADIUS} />
          {percent > 0 && (
            <circle
              className="ring__arc"
              cx="110"
              cy="110"
              r={RADIUS}
              strokeDasharray={`${arc} ${CIRCUMFERENCE}`}
              transform="rotate(-90 110 110)"
            />
          )}
        </svg>
        <div className="ring__center">
          <span className="ring__percent">{formatPercent(percent)}</span>
          <span className="ring__count only-desktop">{countText}</span>
        </div>
      </div>

      <span className="ring-card__count only-mobile">{countText}</span>
      <span className="ring-card__remaining only-desktop">متبقٍ {formatCount(remainingPages, 'page')}</span>
    </section>
  )
}
