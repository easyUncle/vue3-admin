import request from '@/utils/request.js'

export const getUserManageList = data => {
  return request({
    url: '/vue-element-admin/roles',
    params: data
  })
}
