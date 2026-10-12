import { formatDate } from '../lib/dates.js'
import { useClockStore } from '../store/useClockStore.js'
import { useKhatmaStore } from '../store/useKhatmaStore.js'
import { useUiStore } from '../store/useUiStore.js'
import { BookIcon, SlidersIcon } from './Icons.jsx'
import './Header.css'

export default function Header() {
  const today = useClockStore((state) => state.today)
  const hasPlan = useKhatmaStore((state) => state.plan !== null)
  const openPlanDialog = useUiStore((state) => state.openPlanDialog)

  return (
    <header className="header">
      <div className="header__brand">
        <div className="header__logo">
          <BookIcon size={26} />
        </div>
        <div>
          <div className="header__title">
            مخطط الختمة
          </div>
          <div className="header__date">{formatDate(today, { withYear: true })}</div>
        </div>
      </div>

      {hasPlan && (
        <button type="button" className="header__settings" aria-label="الإعدادات" onClick={openPlanDialog}>
          <SlidersIcon size={20} />
        </button>
      )}
    </header>
  )
}
