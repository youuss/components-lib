<template>
  <div>
    {{ name }} - {{ text }}
  </div>
</template>
<script>
import helloWorldProps from "../../../props/HelloWorldProps";
export default {
  name: 'HelloWorld',
  props: {
    ...helloWorldProps
  }
}
</script>
