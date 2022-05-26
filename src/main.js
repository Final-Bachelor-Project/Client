import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin, AvatarPlugin } from 'bootstrap-vue'
import 'bootstrap-icons/font/bootstrap-icons.css'
import router from "./router/router"
import axios from 'axios'

axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(AvatarPlugin)


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
