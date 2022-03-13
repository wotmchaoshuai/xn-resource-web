
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import {router,RouterMount} from './router.js'
Vue.use(router)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
RouterMount(app,router,'#app')
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif