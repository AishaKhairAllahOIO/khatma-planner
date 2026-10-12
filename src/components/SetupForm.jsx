import { useState } from 'react'

import { formatCount } from '../lib/arabic.js'
import { TOTAL_PAGES } from '../lib/mushaf.js'
import { useKhatmaStore } from '../store/useKhatmaStore.js'
import './SetupForm.css'

const PRESETS = [15, 30, 60, 90]

export default function SetupForm() {
  const createPlan = useKhatmaStore((state) => state.createPlan)
  const [days, setDays] = useState(30)

  const isValid = Number.isInteger(days) && days >= 1 && days <= 365
  const dailyWird = isValid ? Math.ceil(TOTAL_PAGES / days) : null

  const handleSubmit = (event) => {
    event.preventDefault()
    if (isValid) createPlan({ targetDays: days })
  }

  return (
    <form className="setup" onSubmit={handleSubmit}>
      <h1 className="setup__title">ابدأ ختمتك</h1>
      <p className="setup__text">
        اختر مدة الختمة، وسنحسب لك ورد كل يوم، ونعيد توزيعه تلقائياً إذا فاتتك أيام.
      </p>

      <div className="setup__presets" role="group" aria-label="مدة الختمة">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            className="setup__pill"
            aria-pressed={days === preset}
            onClick={() => setDays(preset)}
          >
            {formatCount(preset, 'day')}
          </button>
        ))}
      </div>

      <label className="field">
        <span className="field__label">أو اكتب عدد الأيام</span>
        <input
          className="field__input"
          type="number"
          inputMode="numeric"
          min={1}
          max={365}
          value={Number.isNaN(days) ? '' : days}
          onChange={(event) => setDays(event.target.valueAsNumber)}
        />
      </label>

      <div className="setup__preview" aria-live="polite">
        {dailyWird ? `وردك اليومي: ${formatCount(dailyWird, 'page')}` : 'اكتب عدداً بين ١ و٣٦٥ يوماً'}
      </div>

      <button type="submit" className="btn btn--primary" disabled={!isValid}>
        ابدأ الختمة
      </button>
    </form>
  )
}
