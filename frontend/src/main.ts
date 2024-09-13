import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import VClickOutside from '@/directives/vClickOutside.ts'
import vRipple from '@/directives/vRipple.ts'
import '@/assets/scss/main.scss'

const app = createApp(App)

app
  .directive('ripple', vRipple)
  .directive('outside', VClickOutside)
  .use(createPinia())
  .use(router)
  .mount('#app')
