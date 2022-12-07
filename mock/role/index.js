const Mock = require('mockjs')
const { deepClone } = require('../utils')
const { asyncRoutes, constantRoutes } = require('./routes.js')

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [
  {
    id: '1',
    key: 'admin',
    name: 'admin',
    description: 'Super Administrator. Have access to view all pages.',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    mobile: '13420111353',
    openTime: 1669618224372,
    routes: routes
  },
  {
    id: '2',
    key: 'editor',
    name: 'editor',
    mobile: '13420111353',
    description: 'Normal Editor. Can see all pages except permission page',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    openTime: 1669618224372,
    routes: routes.filter(i => i.path !== '/permission') // just a mock
  },
  {
    id: '3',
    key: 'visitor',
    name: 'visitor',
    mobile: '13420111353',
    openTime: 1669618224372,
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    description:
      'Just a visitor. Can only see the home page and the document page',
    routes: [
      {
        path: '',
        redirect: 'dashboard',
        children: [
          {
            path: 'dashboard',
            name: 'Dashboard',
            meta: { title: 'dashboard', icon: 'dashboard' }
          }
        ]
      }
    ]
  }
]

module.exports = [
  // mock get all routes form server
  {
    url: '/vue-element-admin/routes',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: routes
      }
    }
  },

  // mock get all roles form server
  {
    url: '/vue-element-admin/roles',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: roles
      }
    }
  },

  // add role
  {
    url: '/vue-element-admin/role',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },

  // update role
  {
    url: '/vue-element-admin/role/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },

  // delete role
  {
    url: '/vue-element-admin/role/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }
]
