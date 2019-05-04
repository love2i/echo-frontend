import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './plugins/element.js'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import './permission'
import '@/styles/index.css'
import i18n from './i18n'

// Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
