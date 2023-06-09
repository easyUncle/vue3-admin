import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.scss'
import installElementPlus from './plugins/element'
import installSvgIcon from './icons/index'
import './permission'
import i18n from '@/i18n'
import installElIcon from './plugins/el-icon'
import installFilters from './filters'
import installDerective from './directive'

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
const app = createApp(App)
installElementPlus(app)
installSvgIcon(app)
installElIcon(app)
installFilters(app)
installDerective(app)
app.use(store).use(router).use(i18n).mount('#app')
