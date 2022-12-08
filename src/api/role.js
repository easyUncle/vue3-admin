import request from '@/utils/request.js'
export function getRoutes() {
  return request({
    url: '/vue-element-admin/routes',
    method: 'get'
  })
}
export function updateRole(id, data) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'put',
    data
  })
}
