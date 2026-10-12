import { useMemo } from 'react'

import { formatCount, formatPercent, toArabicDigits } from '../lib/arabic.js'
import { getJuzProgress } from '../lib/khatma.js'
import { useStats } from '../hooks/useStats.js'
import './JuzMap.css'

const pick = (s) => ({
  pagesRead: s.pagesRead,
  completedJuz: s.completedJuz,
  currentJuz: s.currentJuz,
  isComplete: s.isComplete,
})

export default function JuzMap() {
  const { pagesRead, completedJuz, currentJuz, isComplete } = useStats(pick)
  const juz = useMemo(() => getJuzProgress(pagesRead), [pagesRead])

  let summary = `أنت في الجزء ${toArabicDigits(currentJuz)}`
  if (isComplete) summary = 'أنهيت الأجزاء الثلاثين'
  else if (completedJuz > 0) summary = `أنهيت ${formatCount(completedJuz, 'juz')}، وأنت في الجزء ${toArabicDigits(currentJuz)}`

  return (
    <section className="juz-card">
      <div className="juz-card__head">
        <h2 className="juz-card__title">خريطة الأجزاء</h2>
        <span className="juz-card__summary">
          <span className="only-desktop">{summary}</span>
          <span className="only-mobile">{isComplete ? summary : `أنت في الجزء ${toArabicDigits(currentJuz)}`}</span>
        </span>
      </div>

      <div className="juz-grid" role="list">
        {juz.map(({ number, percent }) => (
          <div
            key={number}
            className="juz-cell"
            role="listitem"
            aria-label={`الجزء ${toArabicDigits(number)}: ${formatPercent(percent)}`}
          >
            <div className="juz-cell__fill" style={{ width: `${percent}%` }} />
            <span className={`juz-cell__num${percent >= 50 ? ' juz-cell__num--filled' : ''}`}>
              {toArabicDigits(number)}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
