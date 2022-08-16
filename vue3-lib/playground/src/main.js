/**
 * @Description
 * @Author youus
 * @Date 2022/8/16 22:52
 * @Version v1.0.0
 *
 * Hello, humor
 */
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '../router/demoRoutes'
import elementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import DemoBox from './components/DemoBox.vue'
import '../style.scss'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/vue3-components',
            alias: '/',
            component: () => import('./components/OverView.vue')
        },
        ...routes
    ]
})

const app = createApp(App)

app.use(router).use(elementPlus).component('DemoBox', DemoBox).mount('#app')
