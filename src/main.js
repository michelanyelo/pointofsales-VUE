import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'
import { rootClasses } from '../formkit.theme.mjs'
import App from './App.vue'
import router from './router'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './config/firebase'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import es from 'element-plus/es/locale/lang/es';

// Configuración de FormKit
const config = defaultConfig({
  config: {
    rootClasses: rootClasses,
  },
})

const app = createApp(App)

app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
})

app.use(createPinia())
app.use(plugin, config)
app.use(router)
app.use(ElementPlus, {
  locale: es,
})
app.mount('#app')
