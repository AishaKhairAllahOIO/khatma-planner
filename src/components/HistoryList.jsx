import { formatCount, khatmaName } from '../lib/arabic.js'
import { diffInDays, formatDateRange } from '../lib/dates.js'
import { useKhatmaStore } from '../store/useKhatmaStore.js'
import './HistoryList.css'

export default function HistoryList() {
  const history = useKhatmaStore((state) => state.history)

  return (
    <section className="history" aria-labelledby="history-title">
      <h2 id="history-title">سجل الختمات</h2>
      {history.length === 0 ? (
        <p className="history__empty">ستظهر ختماتك هنا بعد إكمالها وحفظها.</p>
      ) : (
        <ul className="history__list">
          {history.map((record, index) => (
            <li className="history__record" key={record.id}>
              <div>
                <h3>{khatmaName(history.length - index)}</h3>
                <p>{formatDateRange(record.startDate, record.endDate)}</p>
              </div>
              <span>{formatCount(Math.max(diffInDays(record.startDate, record.endDate) + 1, 1), 'day')}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
