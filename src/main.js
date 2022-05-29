import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin, AvatarPlugin } from 'bootstrap-vue'
import 'bootstrap-icons/font/bootstrap-icons.css'
import router from "./router/router"
import axios from 'axios'
import VueSocketIO from 'vue-socket.io'
import SocketIO from "socket.io-client"
import VueChatScroll from 'vue-chat-scroll'

axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(AvatarPlugin)
//Vue.use(VueSocketio, process.env.VUE_APP_API_URL);
Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO(process.env.VUE_APP_API_URL),
}));
Vue.use(VueChatScroll)


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
