import { useShallow } from 'zustand/react/shallow'

import { EMPTY_STATS, getStats } from '../lib/khatma.js'
import { useClockStore } from '../store/useClockStore.js'
import { useKhatmaStore } from '../store/useKhatmaStore.js'

const everything = (stats) => stats

export function useStats(pick = everything) {
  const today = useClockStore((state) => state.today)

  return useKhatmaStore(
    useShallow((state) => pick(state.plan ? getStats(state.plan, state.log, today) : EMPTY_STATS)),
  )
}
