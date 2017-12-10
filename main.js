'use strict'
import routes from './routes.js';

const router = new VueRouter({
  routes
})

new Vue({
  router,
}).$mount('#app');
