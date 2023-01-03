import SvgIcon from '@/components/SvgIcon'
// https://webpack.docschina.org/guides/dependency-management/#requirecontext
const svgRequire = require.context('./svg', false, /.svg$/)

svgRequire.keys().forEach(svg => svgRequire(svg))

export default app => {
  app.component('svg-icon', SvgIcon)
}
