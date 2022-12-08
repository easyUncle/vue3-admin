import store from '@/store'

export default {
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}

const checkPermission = (el, binding) => {
  const { value } = binding
  const points = store.getters.points
  const hasPermission = () => {
    if (typeof value === 'string') {
      return points.includes(value)
    } else if (Array.isArray(value)) {
      return value.some(item => points.includes(item))
    } else {
      throw new Error('v-permission value binding required array or string')
    }
  }
  if (!hasPermission()) {
    el.parentNode && el.parentNode.removeChild(el)
  }
}
