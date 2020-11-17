import Axios from 'axios';
import Vue from 'vue';
import store from './plugins/vuex';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import filter from './plugins/filter';

Vue.config.productionTip = false;
Vue.filter('dateFormat', filter.dateFormat);
Vue.filter('dateMonth', filter.dateMonth);
Vue.filter('formatMarked', filter.formatMarked);

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app');
