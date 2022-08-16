<script setup>
/**
 * @Description
 * @Author youus
 * @Date 22:33
 * @Version v1.0.0
 *
 * Hello, humor
 */
import demoRoutes from '../../router/demoRoutes';

const publicPath = import.meta.env.BASE_URL

</script>

<template>
  <div>
    <section class="image-group">
      <div class="image-wrapper" v-for="route in demoRoutes" :key="route.path">
        <a :href="route.path" class="item">
          <img :src="`${publicPath}component.png`" alt="">
          <p class="name">
            {{route.meta.title}} {{route.meta.zh}}
          </p>
          <el-progress :percentage="route.meta.process" color="#3c485c"/>
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.image-group {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  column-gap: 16px;
  row-gap: 16px;
  .image-wrapper {
    width: 220px;
    background: var(--bg-color-code);
    border-radius: 6px;
    padding: 12px;
    box-sizing: border-box;
    .item {
      background: var(--bg-color-card);
      border-radius: 3px;
      padding: 12px 16px;
      display: inline-block;
      width: 100%;
      box-sizing: border-box;
      cursor: pointer;
      text-decoration: none;
      transition: transform .24s cubic-bezier(.38,0,.24,1),box-shadow .24s linear,opacity .24s linear;

      &:hover {
        color: var(--text-primary);
        transform: translateY(-2px);
        box-shadow: 0 6px 30px 5px #0000000d, 0 16px 24px 2px #0000000a, 0 8px 10px -5px #00000014;
      }

      img {
        margin: 8px 0;
        max-width: 100%;
        height: auto;
        filter: none;
      }
      .name {
        line-height: 22px;
        color: var(--text-secondary);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: pre;
        transition: all .2s linear;
      }
    }
  }
}
</style>
