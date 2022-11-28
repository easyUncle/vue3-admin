import { dateFilter } from './date'

export default app => {
  app.config.globalProperties.$filters = {
    dateFilter
  }
}
