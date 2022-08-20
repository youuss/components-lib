<template>
  <div class="page-layout">
    <div class="page-layout_header">
      <slot name="header" />
    </div>
    <div class="page-layout_container">
      <slot name="container" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style scoped lang="scss">
.page-layout {
  background-color: var(--page-background);
  overflow: hidden;

  &_header {
    background-color: var(--background-white);
    box-shadow: var(--searchBox-box-shadow);
    padding: 16px 32px 24px 32px;
  }
  &_container {
    margin: var(--layoutContainer-padding);
    border-radius: 4px;
    background-color: var(--background-white);
    padding: 32px 30px 24px 30px;
  }
}
</style>
