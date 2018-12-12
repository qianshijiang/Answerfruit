// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

Vue.use(VueResource)



//vue-ydui
import YDUI from 'vue-ydui'; /* �൱��import YDUI from 'vue-ydui/ydui.rem.js' */
import 'vue-ydui/dist/ydui.px.css';
import 'vue-ydui/dist/ydui.base.css'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.use(YDUI)
Vue.use(Element)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
