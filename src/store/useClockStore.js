import { create } from 'zustand'

import { toDateKey } from '../lib/dates.js'

export const useClockStore = create(() => ({ today: toDateKey() }))

function syncToday() {
  const today = toDateKey()
  if (useClockStore.getState().today !== today) useClockStore.setState({ today })
}

export function startClock() {
  const scheduleMidnight = () => {
    const now = new Date()
    const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    setTimeout(() => {
      syncToday()
      scheduleMidnight()
    }, nextMidnight - now + 1000)
  }

  scheduleMidnight()
  document.addEventListener('visibilitychange', syncToday)
}
