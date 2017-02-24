import Vue from 'Vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueResource);

import HomeIndex from './home/index.vue';

let routes = [{
  path: '/',
  component: HomeIndex
}, {
  path: '/user/login',
  component: function(resolve) {
    require(['./user/login.vue'], resolve);
  }
}, {
  path: '/user/register',
  component: function(resolve) {
    require(['./user/register.vue'], resolve);
  }
}];
const router = new VueRouter({ routes: routes });
const app = new Vue({ router: router }).$mount('#app');
