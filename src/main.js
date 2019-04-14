import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import BaseIcon from '@/components/BaseIcon.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'

import 'nprogress/nprogress.css'

Vue.config.productionTip = false
Vue.component('BaseIcon', BaseIcon)
Vue.component('BaseInput', BaseInput)
Vue.component('BaseSelect', BaseSelect)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
