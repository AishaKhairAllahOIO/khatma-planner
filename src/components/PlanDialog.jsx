import { useEffect, useRef, useState } from 'react'

import { useKhatmaStore } from '../store/useKhatmaStore.js'
import { useUiStore } from '../store/useUiStore.js'
import './PlanDialog.css'

const MIN_DAYS = 1
const MAX_DAYS = 365

export default function PlanDialog() {
  const open = useUiStore((state) => state.planDialogOpen)
  const closePlanDialog = useUiStore((state) => state.closePlanDialog)
  const currentDays = useKhatmaStore((state) => state.plan?.targetDays ?? 30)
  const updateTargetDays = useKhatmaStore((state) => state.updateTargetDays)
  const resetPlan = useKhatmaStore((state) => state.resetPlan)

  const dialogRef = useRef(null)
  const [days, setDays] = useState(currentDays)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      setDays(currentDays)
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  const isValid = Number.isInteger(days) && days >= MIN_DAYS && days <= MAX_DAYS

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!isValid) return
    updateTargetDays(days)
    closePlanDialog()
  }

  const handleReset = () => {
    if (window.confirm('سيُحذف سجل القراءة الحالي وتبدأ ختمة جديدة من الصفر. هل أنت متأكد؟')) {
      resetPlan()
      closePlanDialog()
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="dialog"
      onClose={closePlanDialog}
      onClick={(event) => event.target === dialogRef.current && closePlanDialog()}
    >
      <form className="dialog__form" onSubmit={handleSubmit}>
        <h2 className="dialog__title">تعديل الخطة</h2>

        <label className="field">
          <span className="field__label">مدة الختمة بالأيام</span>
          <input
            className="field__input"
            type="number"
            inputMode="numeric"
            min={MIN_DAYS}
            max={MAX_DAYS}
            value={Number.isNaN(days) ? '' : days}
            onChange={(event) => setDays(event.target.valueAsNumber)}
          />
        </label>

        <p className="dialog__hint">يُعاد حساب الورد اليومي تلقائياً من الصفحات المتبقية، وسجل قراءتك يبقى كما هو.</p>

        <div className="dialog__actions">
          <button type="submit" className="btn btn--primary" disabled={!isValid}>
            حفظ
          </button>
          <button type="button" className="btn btn--soft" onClick={closePlanDialog}>
            إلغاء
          </button>
        </div>

        <button type="button" className="dialog__danger" onClick={handleReset}>
          بدء ختمة جديدة من الصفر
        </button>
      </form>
    </dialog>
  )
}
