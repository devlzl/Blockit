<script setup>
const emit = defineEmits(['tool-change'])


function changeTool(type) {
  emit('tool-change', type)
}
</script>

<template>
  <div class="tool-bar">
    <el-button class="pen" @click="changeTool('pen')">Pen</el-button>
  </div>
</template>

<style scoped lang="scss">
.tool-bar {
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
