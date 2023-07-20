<script setup>
import Docs from '@blocks/page-block/docs/Docs.vue'
import Whiteboard from '@blocks/page-block/whiteboard/Whiteboard.vue'
import { ref } from 'vue'


const mode = ref('docs')
</script>

<template>
  <el-switch
    class="switch"
    v-model="mode"
    inactive-value="docs" inactive-text="docs"
    active-value="whiteboard" active-text="whiteboard"
  />
  <Docs v-if="mode === 'docs'"/>
  <Whiteboard v-if="mode === 'whiteboard'" />
</template>

<style scoped>
.switch {
  position: fixed;
  top: 0;
  right: 0;
}
</style>
