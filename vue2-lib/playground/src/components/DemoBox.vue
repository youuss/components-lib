<script setup>
import Prism from 'prismjs';
import Code from './svg/Code.vue'
import { onMounted, onUpdated, ref, watch, computed } from "vue";
import 'prismjs/components/prism-typescript.js'
import 'prismjs/components/prism-json.js'
import 'prismjs/plugins/toolbar/prism-toolbar.js'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js'


const props = defineProps({
  type: {
    type: String,
    default: 'html'
  },
  languageType: {
    type: String,
    default: 'html'
  },
  code: {
    type: String,
    default: ''
  }
});
Prism.manual = true;

const languageType = ref('language-');
const innerCode = ref('');
const element = ref(null);
const collapse = ref(true)
watch(props, () => {
  initHtml();
});

let firstFlag = false;

const initHtml = () => {
  languageType.value = ` language-${props.type}`;
  innerCode.value = `${props.code}`
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  element.value.innerHTML = innerCode.value;
  Prism.highlightAll();
}

const showCode = () => collapse.value = !collapse.value

onMounted(() => {
  element.value = document.getElementById('code');
  initHtml();
})

onUpdated(() => {
  if (!firstFlag) {
    firstFlag = true;
    initHtml();
  }
})

const preStyle = computed(() => {
  return collapse.value ? {
    padding: '0 1em',
    transitionDuration: '0.2s',
    maxHeight: 0,
    transitionTimingFunction: 'ease'
  } : {
    padding: '1em',
    transitionDuration: '0.2s',
    maxHeight: '600px',
    transitionTimingFunction: 'cubic-bezier(0.82, 0, 1, 0.9)'
  }
})
</script>

<template>
    <div class="demo-box">
        <div class="demo-box_content">
            <slot></slot>
        </div>
        <div class="demo-box_action">
            <!-- <el-button type="text" @click="showCode">code</el-button> -->
            <Code @click="showCode"/>
        </div>
        <pre :style="preStyle" class="demo-box_code" :class="[languageType]"><code id="code" :class="[languageType]"/></pre>
    </div>
</template>

<style scoped lang="scss">
.demo-box {
    margin: 24px 0px 48px;
    background-color: var(--bg-color-demo);
    color: var(--text-primary);
    border: 1px solid var(--component-border);
    border-radius: 6px;
    .demo-box_content {
        padding: 40px;
        // background-color: #f2f4f9;
    }
    .demo-box_code {
        margin: 0;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
    }
    .demo-box_action {
        height: 40px;
        line-height: 40px;
        padding-right: 20px;
        .el-button {
            float: right;
        }
    }
}
</style>
