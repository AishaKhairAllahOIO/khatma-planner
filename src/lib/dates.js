const DAY_MS = 86_400_000
const LOCALE = 'ar-EG-u-ca-gregory-nu-arab'
const pad = (n) => String(n).padStart(2, '0')

export const WEEKDAY_NAMES = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
export const WEEKDAY_SHORT = ['أحد', 'إثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت']

function toUtc(key) {
  const [year, month, day] = key.split('-').map(Number)
  return Date.UTC(year, month - 1, day)
}

export function toDateKey(date = new Date()) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function diffInDays(fromKey, toKey) {
  return Math.round((toUtc(toKey) - toUtc(fromKey)) / DAY_MS)
}

export function addDays(key, amount) {
  const date = new Date(toUtc(key) + amount * DAY_MS)
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`
}

export const weekdayOf = (key) => new Date(toUtc(key)).getUTCDay()

export const dayOfMonth = (key) => Number(key.slice(8))

export function lastDays(endKey, count) {
  return Array.from({ length: count }, (_, index) => addDays(endKey, index - count + 1))
}

function formatParts(key, options) {
  const parts = new Intl.DateTimeFormat(LOCALE, { ...options, timeZone: 'UTC' }).formatToParts(new Date(toUtc(key)))
  return (type) => parts.find((part) => part.type === type)?.value
}

export function formatDate(key, { withYear = false } = {}) {
  const pick = formatParts(key, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: withYear ? 'numeric' : undefined,
  })
  return [pick('weekday'), pick('day'), pick('month'), withYear ? pick('year') : null].filter(Boolean).join(' ')
}

export function formatShortDate(key, { withYear = false } = {}) {
  const pick = formatParts(key, { day: 'numeric', month: 'long', year: withYear ? 'numeric' : undefined })
  return [pick('day'), pick('month'), withYear ? pick('year') : null].filter(Boolean).join(' ')
}

export function formatDateRange(startKey, endKey) {
  const sameYear = startKey.slice(0, 4) === endKey.slice(0, 4)
  return `${formatShortDate(startKey, { withYear: !sameYear })} ← ${formatShortDate(endKey, { withYear: true })}`
}
