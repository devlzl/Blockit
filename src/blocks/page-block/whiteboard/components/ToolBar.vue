<script setup>
import { ref } from 'vue'


const emit = defineEmits(['tool-change'])


const tool = ref('')
function changeTool(type) {
  if (tool.value !== type) {
    tool.value = type
  } else {
    tool.value = 'default'
  }
  emit('tool-change', tool.value)
}
function activeIcon(type) {
  return tool.value === type ? 'primary' : ''
}
</script>

<template>
  <div class="tool-bar">
    <el-button :type="activeIcon('pen')" @click="changeTool('pen')"><i class="bi bi-pencil"></i></el-button>
    <el-divider direction="vertical" />
    <el-button :type="activeIcon('rect')" @click="changeTool('rect')"><i class="bi bi-square"></i></el-button>
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
