import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'
import { rootClasses } from '../formkit.theme.mjs'
import App from './App.vue'
import router from './router'

// Configuración de FormKit
const config = defaultConfig({
  config: {
    rootClasses: rootClasses,
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(plugin, config)
app.use(router)

app.mount('#app')
