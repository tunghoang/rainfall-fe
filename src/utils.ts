export const calcStartDate = (endDate) => {
    const now = new Date(endDate)
    now.setDate(now.getDate() - 23)
    return now
}

export const calcCurrentDate = (ndays) => {
    console.log('calcCurrentDate', ndays)
    const startDate = calcCurrentDate()
    const currentDate = currentDate.setDate(startDate.getDate() + ndays)
    return currentDate
}

export function formatDate(d:Date) {
  if (typeof d.getFullYear !== 'function') return ""
  return `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')}`
}
export function formatDateTime(d:Date) {
  if (typeof d.getFullYear !== 'function') return ""
  let s = `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')}`
  let s1 = `${(d.getHours()).toString().padStart(2,'0')}:00:00`
  return `${s}T${s1}`
}

// Pad a number to 2 digits
const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
// Get timezone offset in ISO format (+hh:mm or -hh:mm)
const getTimezoneOffset = date => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  return diff + pad(tzOffset / 60) + ':' + pad(tzOffset % 60);
};

export const toISOStringWithTimezone = date => {
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    getTimezoneOffset(date);
};
