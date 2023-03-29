const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const port = process.env.port || process.env.npm_config_port || 9527 // dev port

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: true,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    before: require('./mock/mock-server.js')
  },
  //error:onMounted is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.
  // 问题原因：因为 Vue 被加载了两次。一次来自主项目,一次来自通过npm link(或本地安装的依赖项)导入的项目。
  // 发生情况，一般在引入第三方库时，该库也同样引入vue;造成vue被加载两次；所以两次加载vue造成的问题，可以尝试用这个方法解决
  configureWebpack: {
    resolve: {
      symlinks: false,
      alias: {
        vue: path.resolve(`./node_modules/vue`)
      }
    }
  },
  chainWebpack(config) {
    // 设置 svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    config.module
      .rule('pdf')
      .test(/\.pdf$/)
      .use('url-loader')
      .loader('url-loader')
      .end()
    config.module
      .rule('sourcemap')
      .test(/\.js$/)
      .enforce()
      .pre()
      .use('source-map-loader')
      .loader('source-map-loader')
      .end()
    // pdf-dist
    config.module
      .rule('pdfjs-dist')
      .test({
        test: /\.js$/,
        include: path.join(__dirname, 'node_modules/pdfjs-dist')
      })
      .use('babel-loader')
      .loader('babel-loader')
      .options({
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-optional-chaining']
      })
      .end()
  }
}
