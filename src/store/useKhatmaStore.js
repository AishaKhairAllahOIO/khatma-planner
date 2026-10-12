import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { toDateKey } from '../lib/dates.js'
import { buildHistoryRecord } from '../lib/history.js'
import { clampToRemaining, sumPages } from '../lib/khatma.js'
import { TOTAL_PAGES } from '../lib/mushaf.js'

export const useKhatmaStore = create()(
  persist(
    (set) => ({
      plan: null,
      log: [],
      history: [],

      createPlan: ({ targetDays, startDate = toDateKey() }) =>
        set({ plan: { startDate, targetDays, totalPages: TOTAL_PAGES }, log: [] }),

      updateTargetDays: (targetDays) =>
        set(
          (state) => (state.plan ? { plan: { ...state.plan, targetDays } } : state),
        ),

      logPages: (pages, date = toDateKey()) =>
        set(
          (state) => {
            if (!state.plan) return state
            const allowed = clampToRemaining(state.plan, state.log, pages)
            if (allowed === 0) return state
            return { log: [...state.log, { id: crypto.randomUUID(), date, pages: allowed }] }
          },
        ),

      undoLastEntry: () => set((state) => ({ log: state.log.slice(0, -1) })),

      completeKhatma: () =>
        set(
          (state) => {
            if (!state.plan || sumPages(state.log) < state.plan.totalPages) return state
            const record = { id: crypto.randomUUID(), ...buildHistoryRecord(state.plan, state.log, toDateKey()) }
            return { history: [record, ...state.history], plan: null, log: [] }
          },
        ),

      resetPlan: () => set({ plan: null, log: [] }),
    }),
    {
      name: 'khatma-storage',
      version: 1,
      partialize: (state) => ({ plan: state.plan, log: state.log, history: state.history }),
    },
  ),
)
