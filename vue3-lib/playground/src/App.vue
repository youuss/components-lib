<template>
  <div class="components-site">
    <aside class="components-aside">
      <div class="components-sidenav">
        <div class="components-sidenav-group">
          <p class="components-sidenav-group_title">开始</p>
          <div class="components-sidenav-group_children">
            <div class="components-sidenav_item">
              <p class="components-sidenav_link" :class="{active: currentPath === '/vue3-components'}" @click="routeChange('/vue3-components')">组件概览</p>
            </div>
          </div>
        </div>
        <div class="components-sidenav-group">
          <p class="components-sidenav-group_title">Components</p>
          <div class="components-sidenav-group_children">
            <div class="components-sidenav_item" v-for="route in demoRoutes" :key="route.path">
              <p class="components-sidenav_link" :class="{active: currentPath === route.path}" @click="routeChange(route.path)">
                {{ route.meta.title }} {{ route.meta.zh }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
    <div class="components-container_route">
      <router-view/>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import demoRoutes from '../router/demoRoutes';

const currentPath = ref('')

const router = useRouter()

onMounted(() => {
  currentPath.value = window.location.pathname
})

const routeChange = (path) => {
  if (this.currentPath === path) {
    return
  }
  router.push(path)
  currentPath.value = path
}
</script>
<style lang="scss">
#app, body {
  padding: 0;
  margin: 0;
  height: 100%
}
.components-site {
  display: flex;
  position: relative;
  height: 100vh;
  .components-aside {
    width: var(--aside-width);
    height: 100vh;
    padding-bottom: 32px;
    background-color: var(--bg-color-container);
    color: var(--text-secondary);
    box-sizing: border-box;
    box-shadow: var(--aside-box-shadow);
    transition: transform 0.2s var(--anim-time-fn-easing),outline 0.2s var(--anim-time-fn-easing);
    outline: transparent solid 9999px;
    .components-sidenav {
      height: 100%;
      padding: 0 12px;
      overflow: auto;
      .components-sidenav-group {
        .components-sidenav-group_title {
          display: flex;
          align-items: center;
          font-size: 12px;
          color: var(--text-placeholder);
          padding: 14px 12px 4px;
          height: 40px;
          box-sizing: border-box;
          position: relative;
          margin-top: 8px;
          border-radius: var(--border-radius);
        }
        .components-sidenav-group_children {
          overflow: hidden;
          .components-sidenav_item {
            position: relative;
            margin-top: 4px;
            max-width: calc(var(--aside-width) - 24px);
            .components-sidenav_link {
              cursor: pointer;
              display: block;
              height: 40px;
              padding: 0 12px;
              line-height: 40px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              color: var(--text-secondary);
              text-decoration: none;
              border-radius: var(--border-radius);
              transition: all 0.2s linear 0s;
            }
            .active {
              background-color: #29CCCC;
              color: var(--text-anti);
            }
          }
        }
      }
    }
  }
  .components-container_route {
    padding: 10px 40px;
    width: 100%;
    height: calc(100% - 20px);
    overflow: auto;
  }
}
</style>
