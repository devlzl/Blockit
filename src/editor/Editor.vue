<script setup>
import { onMounted, ref, watch } from 'vue'
import { Page, Text } from '@store'
import Toolbar from './components/Toolbar.vue'
import { builtinBlockSchemas, builtinBlockViews } from '@blocks'
import { Kernel } from '@kernel'


const { kernel } = defineProps({
  kernel: Kernel,
})
defineEmits(['update'])


const mode = ref('docs')

function createPageBlock() {
  const page = new Page()
  page.register(builtinBlockSchemas)
  page.events.addRoot.on(() => {
    console.log('root added')
  })

  const pageBlock = page.addBlock('page', {
    title: new Text('new page'),
    mode: mode.value,
  })
  watch(mode, (value) => {
    page.updateBlock(pageBlock.id, { mode: value })
  })

  const noteBlock = page.addBlock('note', {}, pageBlock)
  const textBlock = page.addBlock('text', { text: 'hello world' }, noteBlock)
  return pageBlock
}
// const pageBlock = createPageBlock()


const textRef = ref(null)
onMounted(() => {
  kernel.mount(textRef.value)
})
</script>

<template>
  <el-switch
    class="switch"
    v-model="mode"
    inactive-value="docs" inactive-text="Docs"
    active-value="whiteboard" active-text="Whiteboard"
  />
  <Toolbar :pageBlock="pageBlock" />
  <!-- <component
    :is="builtinBlockViews.page"
    :pageBlock="pageBlock">
  </component> -->
  <div class="text" ref="textRef"></div>
</template>

<style scoped>
.switch {
  position: fixed;
  top: 0;
  right: 0;
}
</style>
