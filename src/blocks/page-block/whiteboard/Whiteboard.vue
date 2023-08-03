<script setup>
import { onMounted, ref } from 'vue'
import { SurfaceManager } from '@visual'


const canvasRef = ref(null)
onMounted(() => {
  const surface = new SurfaceManager(canvasRef.value)
})
</script>

<template>
  <div mode="whiteboard">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style scoped lang="scss">
canvas {
  position: fixed;
  left: 0;
  top: 0;
}
</style>
