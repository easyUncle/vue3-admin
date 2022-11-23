import i18n from '@/i18n'
import store from '@/store'
import { watch } from 'vue'
export function generateTitle(title) {
  return i18n.global.t('msg.route.' + title)
}

// 监听语言的变化
export function watchLangSwitch(...cbs) {
  watch(
    () => store.getters.language,
    newVal => {
      cbs.forEach(cb => {
        cb(newVal)
      })
    }
  )
}
