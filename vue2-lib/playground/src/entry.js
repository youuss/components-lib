import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import CMLib from '../../lib'
import DemoBox from './components/DemoBox.vue'
import routes from '../router/demoRoutes'
import singleSpaVue from 'single-spa-vue';
import '../style.scss'
import '../../style.scss'
import '../../design-token.scss'

Vue.use(ElementUI, { size: 'small' })
Vue.use(VueRouter);
Vue.use(CMLib)
Vue.component('DemoBox', DemoBox)

routes.forEach(r => r.path = `/components-lib/vue2-components${r.path}`)
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/components-lib/vue2-components/',
      component: OverView
    },
    ...routes
  ]
});


const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render(h) {
      return h(App);
    },
    router,
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;

