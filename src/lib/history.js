export function buildHistoryRecord(plan, log, endDate) {
  return {
    startDate: plan.startDate,
    endDate: log.at(-1)?.date ?? endDate,
    targetDays: plan.targetDays,
    totalPages: plan.totalPages,
  }
}
