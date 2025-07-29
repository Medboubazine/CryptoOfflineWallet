import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

///
/// Import tailwind css
///
import '@/assets/css/tailwind.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
///
/// DECLLLARE STORE
///
app.config.globalProperties.$store = {}

app.mount('#app')
