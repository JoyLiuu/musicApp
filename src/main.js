import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import getVant from '@/assets/plugins'
const app = createApp(App)
getVant(app)
app.use(store).use(router).mount('#app')
