import request from '@/utils/request'

/**
 * 登录
 */

export const login = data => {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}

export const getUserInfo = token => {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}
