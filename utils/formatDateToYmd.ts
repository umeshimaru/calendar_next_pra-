export const formatDateToYmd = (dateObj: Date | undefined): string => {
  if (!dateObj) return 'undefinedです'
  const year = dateObj.getFullYear()
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0') // 例：8 → "08"
  const day = dateObj.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}
