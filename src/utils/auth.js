import { setItem, getItem, removeItem } from './storage'
import { TOKEN_KEY, TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant/index'
// 设置token
export const setToken = value => {
  setItem(TOKEN_KEY, value)
}
// 获取token
export const getToken = () => {
  return getItem(TOKEN_KEY)
}
// 移除token
export const removeToken = () => {
  removeItem(TOKEN_KEY)
}

/**
 * 获取时间戳
 */

export const getTimestamp = () => {
  return getItem(TIME_STAMP)
}
/**
 * 设置时间戳
 */
export const setTimestamp = () => {
  setItem(TIME_STAMP, Date.now())
}
/**
 * token是否过期
 */
export const checkIsTimeout = () => {
  const currentTime = Date.now()
  const preTime = getTimestamp()
  return currentTime - preTime > TOKEN_TIMEOUT_VALUE
}
