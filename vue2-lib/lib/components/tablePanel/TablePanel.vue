<template>
  <div class="table-panel">
    <div class="table-panel_title">
      {{ title }}
    </div>
    <div class="table-panel_actions">
      <el-button type="primary">新增</el-button>
    </div>
  </div>
</template>

<script>
import props from './props';

export default {
  name: 'TablePanel',
  props
}
</script>

<style scoped lang="scss">
.table-panel {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;

  .table-panel_title {
    position: relative;
    font-size: 16px;
    color: #2D3040;
    line-height: 24px;
    display: flex;
    align-items: center;
    flex: 1 auto;

    &:after {
      position: absolute;
      content: '';
      width: 6px;
      height: 20px;
      background: #12B3B3;
      border-radius: 3px;
      left: -30px;
    }
  }
  .table-panel_actions {
    flex: 1 auto;
    display: flex;
    flex-direction: row-reverse;

    .el-button {
      min-width: 100px;
    }
  }
}
</style>
