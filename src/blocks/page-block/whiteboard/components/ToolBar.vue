<script setup>
import { ref } from 'vue'


const emit = defineEmits(['tool-change'])


const tool = ref('')
function changeTool(type) {
  tool.value = type
  emit('tool-change', type)
}
</script>

<template>
  <div class="tool-bar">
    <el-button class="pen" :type="tool === 'pen' ? 'primary' : ''" @click="changeTool('pen')">Pen</el-button>
  </div>
</template>

<style scoped lang="scss">
.tool-bar {
  position: fixed;
  z-index: 1;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  padding: 10px;
  box-shadow: 1px 1px 5px lightgray;
  border-radius: 7px;
}
</style>
