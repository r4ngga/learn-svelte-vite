import moment from 'moment'
/**
 * Format a date into a humanized time sentence if it's in the same
 * day or otherwise display a date in the YYYY/MM/DD format
 */
export const formatDate = (dateString) => {
  const date = moment(dateString, 'YYYYMMDDHHmmss')

  if (moment().isSame(date, 'day')) {
    return moment.duration(date.diff(moment(), 'milliseconds')).humanize(true)
  } else {
    return date.format('YYYY/MM/DD')
  }
}