import { formatCount, toArabicDigits } from '../lib/arabic.js'
import { formatDate } from '../lib/dates.js'
import { getBaseWird } from '../lib/khatma.js'
import { useKhatmaStore } from '../store/useKhatmaStore.js'
import { useUiStore } from '../store/useUiStore.js'
import './PlanCard.css'

export default function PlanCard() {
  const plan = useKhatmaStore((state) => state.plan)
  const openPlanDialog = useUiStore((state) => state.openPlanDialog)

  if (!plan) return null

  const rows = [
    ['مدة الختمة', formatCount(plan.targetDays, 'day')],
    ['تاريخ البداية', formatDate(plan.startDate)],
    ['المصحف', `المدينة · ${toArabicDigits(plan.totalPages)} صفحة`],
    ['الورد عند البداية', formatCount(getBaseWird(plan), 'page')],
  ]

  return (
    <section className="plan-card">
      <h2 className="plan-card__title">الخطة</h2>

      <dl className="plan-card__rows">
        {rows.map(([label, value]) => (
          <div key={label} className="plan-card__row">
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <p className="plan-card__note">يُعاد حساب ورد اليوم تلقائياً إذا فاتتك أيام، فلا تضيع الخطة.</p>

      <button type="button" className="plan-card__button" onClick={openPlanDialog}>
        تعديل الخطة
      </button>
    </section>
  )
}
