import { formatDate } from '../../../helpers/formatDate'
import { nd } from '../../../data/nd'
import { nde } from '../../../data/nde'

export const getNameDayByDate = (dateFromMsg?: { short: string; full: string }) => {
  let date = formatDate()
  if (dateFromMsg) {
    date = dateFromMsg
  }

  const names = (nd[date.short] || []).join(', ')

  if (!names.length) {
    return
  }

  let reply = `Vārda dienu ${dateFromMsg ? '' : 'šodien, '}${date.full}${dateFromMsg ? ' ' : ', '}svin **${names}**`

  let extended = nde[date.short]
  if (extended && extended.length > 0) {
    extended = extended.join(', ')
  }

  if (extended) {
    reply += `, kā arī ${extended}`
  }
  return reply
}
