import Vue from 'vue'
import underscore from 'vue-underscore'
import Vuex from 'vuex'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.use(underscore);
//Vue.use(Vuex)



new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})