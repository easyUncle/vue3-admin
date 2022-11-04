import SvgIcon from '@/components/SvgIcon'

const svgRequire = require.context('./svg', false, /.svg$/)

console.log(svgRequire.keys())
svgRequire.keys().forEach(svg => svgRequire(svg))

export default app => {
  app.component('svg-icon', SvgIcon)
}
