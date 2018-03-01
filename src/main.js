import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import { VueMasonryPlugin } from 'vue-masonry';
import 'vuetify/dist/vuetify.css'

Vue.use(Vuetify)
Vue.use(VueMasonryPlugin)

var data = {
}


new Vue({
  el: '#app',
  render: h => h(App),
  data: data,
})

