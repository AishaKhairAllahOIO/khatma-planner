import { addDays, diffInDays } from './dates.js'
import { JUZ_COUNT, TOTAL_PAGES, getJuzOfPage, getJuzRange, getSurahNameOfPage } from './mushaf.js'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export const sumPages = (log) => log.reduce((total, entry) => total + entry.pages, 0)

export function pagesByDate(log) {
  const byDate = new Map()
  for (const { date, pages } of log) byDate.set(date, (byDate.get(date) ?? 0) + pages)
  return byDate
}

export function clampToRemaining(plan, log, pages) {
  if (!Number.isFinite(pages)) return 0
  return clamp(Math.floor(pages), 0, Math.max(plan.totalPages - sumPages(log), 0))
}

export function getStreak(log, today) {
  const readDays = new Set(log.filter((entry) => entry.pages > 0).map((entry) => entry.date))
  let cursor = readDays.has(today) ? today : addDays(today, -1)
  let streak = 0
  while (readDays.has(cursor)) {
    streak += 1
    cursor = addDays(cursor, -1)
  }
  return streak
}

export function getStats(plan, log, today) {
  const { startDate, targetDays, totalPages } = plan

  const pagesRead = sumPages(log)
  const pagesToday = pagesByDate(log).get(today) ?? 0
  const readBeforeToday = pagesRead - pagesToday
  const isComplete = pagesRead >= totalPages

  const daysPassed = Math.max(diffInDays(startDate, today), 0)
  const dayNumber = Math.min(daysPassed + 1, targetDays)
  const daysLeft = Math.max(targetDays - daysPassed, 1)

  const todayTarget = Math.ceil(Math.max(totalPages - readBeforeToday, 0) / daysLeft)
  const todayRemaining = Math.max(todayTarget - pagesToday, 0)
  const todayPercent =
    todayTarget === 0 ? 100 : Math.min(Math.round((pagesToday / todayTarget) * 100), 100)

  const expectedBeforeToday = Math.ceil((totalPages * Math.min(daysPassed, targetDays)) / targetDays)
  const paceDiff = readBeforeToday - expectedBeforeToday

  const lastReadPage = clamp(pagesRead, 1, totalPages)
  const nextPage = Math.min(pagesRead + 1, totalPages)

  let completedJuz = 0
  for (let juz = 1; juz <= JUZ_COUNT; juz++) {
    if (getJuzRange(juz).end <= pagesRead) completedJuz += 1
  }

  return {
    totalPages,
    targetDays,
    pagesRead,
    remainingPages: totalPages - pagesRead,
    percent: isComplete ? 100 : Math.min(Math.round((pagesRead / totalPages) * 100), 99),
    isComplete,
    started: pagesRead > 0,
    dayNumber,
    daysLeft,
    pagesToday,
    todayTarget,
    todayRemaining,
    todayPercent,
    paceDiff,
    streak: getStreak(log, today),
    positionPage: lastReadPage,
    positionJuz: getJuzOfPage(lastReadPage),
    positionSurah: getSurahNameOfPage(lastReadPage),
    currentJuz: getJuzOfPage(nextPage),
    completedJuz,
  }
}

export const EMPTY_STATS = getStats(
  { startDate: '2000-01-01', targetDays: 30, totalPages: TOTAL_PAGES },
  [],
  '2000-01-01',
)

export const getBaseWird = (plan) => Math.ceil(plan.totalPages / plan.targetDays)

export function classifyPages(pages, base) {
  if (pages === 0) return 'missed'
  if (pages >= Math.ceil(base * 1.15)) return 'strong'
  if (pages >= base) return 'done'
  return 'partial'
}

export function getHeatmapDays(plan, log, today) {
  const base = getBaseWird(plan)
  const byDate = pagesByDate(log)

  return Array.from({ length: plan.targetDays }, (_, index) => {
    const date = addDays(plan.startDate, index)
    const pages = byDate.get(date) ?? 0

    let level = classifyPages(pages, base)
    if (date === today) level = 'today'
    else if (date > today) level = 'future'

    return { date, day: index + 1, pages, level }
  })
}

export function getJuzProgress(pagesRead) {
  return Array.from({ length: JUZ_COUNT }, (_, index) => {
    const number = index + 1
    const { start, end } = getJuzRange(number)
    const size = end - start + 1
    const read = clamp(pagesRead - start + 1, 0, size)
    return { number, percent: Math.round((read / size) * 100) }
  })
}
