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

const app = createApp(App)
installElementPlus(app)
installSvgIcon(app)
installElIcon(app)
installFilters(app)
app.use(store).use(router).use(i18n).mount('#app')
