import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createYmaps } from 'vue-yandex-maps'
import App from './App.vue'
import router from './router'
import VClickOutside from '@/directives/vClickOutside.ts'
import vRipple from '@/directives/vRipple.ts'
import '@/assets/scss/main.scss'

const app = createApp(App)
const yandexMap = createYmaps({
  apikey: 'c200d3a3-9f6d-43eb-b89e-0f9fc4b5f962',
})

app
  .directive('ripple', vRipple)
  .directive('outside', VClickOutside)
  .use(createPinia())
  .use(router)
  .use(yandexMap)
  .mount('#app')
