/**
 * @Description
 * @Author youus
 * @Date 2022/8/16 22:52
 * @Version v1.0.0
 *
 * Hello, humor
 */
 import { createApp, h } from 'vue'
 import App from './App.vue'
 import { createRouter, createWebHistory } from 'vue-router'
 import singleSpaVue from 'single-spa-vue'
 import routes from '../router/demoRoutes'
 import elementPlus from 'element-plus'
 import 'element-plus/dist/index.css'
 import DemoBox from './components/DemoBox.vue'
 import '../style.scss'
 

 routes.forEach(r => r.path = `/components-lib/vue3-components${r.path}`)
 const router = createRouter({
     history: createMemoryHistory('/components-lib/'),
     routes: [
         {
             path: '/components-lib/vue3-components',
             alias: '/',
             component: () => import('./components/OverView.vue')
         },
         ...routes
     ]
 })
 
 const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App)
    },
  },
  handleInstance: (app) => {
    app.use(router)
    app.use(router).use(elementPlus).component('DemoBox', DemoBox)
  },
})


export const bootstrap = vueLifecycles.bootstrap
export const mount = vueLifecycles.mount
export const unmount = vueLifecycles.unmount
