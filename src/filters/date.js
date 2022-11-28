import dayjs from 'dayjs'

export const dateFilter = (val, format = 'YYYY-MM-DD') => {
  return dayjs(val).format(format)
}
