import { countParts, formatCount, formatWithBa } from '../lib/arabic.js'
import { useStats } from '../hooks/useStats.js'
import { CalendarIcon, FlameIcon, TrendIcon } from './Icons.jsx'
import './StatCards.css'

const pick = (s) => ({
  daysLeft: s.daysLeft,
  targetDays: s.targetDays,
  streak: s.streak,
  dayNumber: s.dayNumber,
  pagesToday: s.pagesToday,
  paceDiff: s.paceDiff,
})

function StatCard({ tone, modifier = '', icon, label, shortLabel, note, textual = false, children }) {
  return (
    <div className={`stat-card stat-card--${tone} ${modifier}`}>
      <div className="stat-card__head">
        {icon}
        <span className="stat-card__label">{label}</span>
      </div>
      <div className={`stat-card__value${textual ? ' stat-card__value--text' : ''}`}>{children}</div>
      <div className="stat-card__note">{note}</div>
      {shortLabel && <div className="stat-card__short">{shortLabel}</div>}
    </div>
  )
}

function CountValue({ count, unit }) {
  const { number, word } = countParts(count, unit)
  return (
    <>
      {number && `${number} `}
      <span className="stat-card__unit">{word}</span>
    </>
  )
}

function paceText(paceDiff) {
  if (paceDiff > 0) return `متقدّم ${formatWithBa(paceDiff, 'page')}`
  if (paceDiff < 0) return `متأخر ${formatWithBa(-paceDiff, 'page')}`
  return 'على الخطة تماماً'
}

export default function StatCards() {
  const { daysLeft, targetDays, streak, dayNumber, pagesToday, paceDiff } = useStats(pick)

  const daysCounted = pagesToday > 0 ? dayNumber : dayNumber - 1
  const neverMissed = streak > 0 && streak >= daysCounted

  let streakNote = 'ابدأ اليوم لتبدأ سلسلة جديدة'
  if (neverMissed) streakNote = 'لم يفتك يوم منذ بداية الخطة'
  else if (streak > 0) streakNote = 'واصل لتحافظ على سلسلتك'

  return (
    <div className="stats">
      <StatCard
        tone="butter"
        modifier="stat-card--compact stat-card--days"
        icon={<CalendarIcon size={22} />}
        label="الأيام المتبقية"
        shortLabel="متبقية"
        note={`حتى اكتمال الخطة (${formatCount(targetDays, 'day')})`}
      >
        <CountValue count={daysLeft} unit="day" />
      </StatCard>

      <StatCard
        tone="rose"
        modifier="stat-card--compact stat-card--streak"
        icon={<FlameIcon size={22} />}
        label="أيام متتالية"
        shortLabel="متتالية"
        note={streakNote}
      >
        <CountValue count={streak} unit="day" />
      </StatCard>

      <StatCard
        tone="lavender"
        modifier="stat-card--pace"
        icon={<TrendIcon size={22} />}
        label="وتيرتك"
        note={paceDiff === 0 ? 'أنت تسير كما خططت' : 'عن الخطة المقررة حتى أمس'}
        textual
      >
        {paceText(paceDiff)}
      </StatCard>
    </div>
  )
}
