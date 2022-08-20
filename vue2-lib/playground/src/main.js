import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import CMLib from '../../lib'
import DemoBox from './components/DemoBox.vue'
import routes from '../router/demoRoutes'
import '../style.scss'
import '../../style.scss'
import '../../design-token.scss'

Vue.use(ElementUI, { size: 'small' })
Vue.use(VueRouter);
Vue.use(CMLib)
Vue.component('DemoBox', DemoBox)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/vue2-components',
      alias: '/',
      component: () => import('./components/OverView.vue')
    },
    ...routes
  ]
});


new Vue({
  el: '#app',
  render: (h) => h(App),
  router
});
