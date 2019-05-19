import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/msgs'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false


require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkNocmlzdGlhbiIsImVtYWlsIjoiY2hyaXN0aWFucmlxdWVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU1Njk3OTQxMywiZXhwIjoxNTU3MDY1ODEzfQ.waCSa5QkxhzEbXDWTjdn97bQBAx7OQo-1-xLYMH4TKU'
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')