const DIGITS = '٠١٢٣٤٥٦٧٨٩'

export const toArabicDigits = (value) => String(value).replace(/\d/g, (d) => DIGITS[d])

export const formatPercent = (value) => `${toArabicDigits(value)}٪`

export const formatNumber = (value) => new Intl.NumberFormat('ar-EG-u-nu-arab').format(value)

const FORMS = {
  page: { one: 'صفحة واحدة', two: 'صفحتان', twoGen: 'صفحتين', few: 'صفحات', many: 'صفحة' },
  day: { one: 'يوم واحد', two: 'يومان', twoGen: 'يومين', few: 'أيام', many: 'يوماً' },
  juz: { one: 'جزءاً واحداً', two: 'جزأين', twoGen: 'جزأين', few: 'أجزاء', many: 'جزءاً' },
  wird: { one: 'ورد واحد', two: 'وردان', twoGen: 'وردين', few: 'أوراد', many: 'ورداً' },
  khatma: { one: 'ختمة واحدة', two: 'ختمتان', twoGen: 'ختمتين', few: 'ختمات', many: 'ختمة' },
}

export function countParts(count, unit, genitive = false) {
  const forms = FORMS[unit]
  if (count === 1) return { number: null, word: forms.one }
  if (count === 2) return { number: null, word: genitive ? forms.twoGen : forms.two }
  const rest = count % 100
  const word = rest >= 3 && rest <= 10 ? forms.few : forms.many
  return { number: toArabicDigits(count), word }
}

export function formatCount(count, unit, genitive = false) {
  const { number, word } = countParts(count, unit, genitive)
  return number ? `${number} ${word}` : word
}

export function formatWithBa(count, unit) {
  const { number, word } = countParts(count, unit, true)
  return number ? `بـ ${number} ${word}` : `ب${word}`
}

const ORDINALS = ['الأولى', 'الثانية', 'الثالثة', 'الرابعة', 'الخامسة', 'السادسة', 'السابعة', 'الثامنة', 'التاسعة', 'العاشرة']

export const ordinal = (n) => ORDINALS[n - 1] ?? `رقم ${toArabicDigits(n)}`

export const khatmaName = (n) => `الختمة ${ordinal(n)}`
