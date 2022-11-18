import { createI18n } from 'vue-i18n'
import ZhLang from './lang/zh.js'
import EnLang from './lang/en.js'
import store from '@/store'
const messages = {
  zh: {
    msg: {
      ...ZhLang
    }
  },
  en: {
    msg: {
      ...EnLang
    }
  }
}
const initLocale = () => store && store.getters && store.getters.language
const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  fallbackLocale: 'en',
  allowComposition: true,
  locale: initLocale(),
  messages
})

export default i18n
