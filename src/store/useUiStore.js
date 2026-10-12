import { create } from 'zustand'

export const useUiStore = create((set) => ({
  planDialogOpen: false,
  openPlanDialog: () => set({ planDialogOpen: true }),
  closePlanDialog: () => set({ planDialogOpen: false }),
}))
