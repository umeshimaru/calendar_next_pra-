import { getYear, getMonth ,getDate} from 'date-fns'

export const dates = () => {


const today = new Date()
const thisYear = getYear(today)
const thisMonth = getMonth(today) + 1
const todayDay = getDate(today)
  
 

return {
  thisYear,
  thisMonth,
  today,
  todayDay
} 
}