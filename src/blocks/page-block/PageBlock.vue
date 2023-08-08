<script setup>
import { ref } from 'vue'
import Docs from './docs/Docs.vue'
import Whiteboard from './whiteboard/Whiteboard.vue'
import { Page, BlockType } from '@store'


const { page, pageBlock } = defineProps({
  page: Page,
  pageBlock: BlockType,
})


const mode = ref(pageBlock.get('props').get('mode'))
page.events.blockUpdate.on((update) => {
  const { blockId, part, event } = update
  if (blockId === pageBlock.get('id') && part === 'props' && event.keysChanged.has('mode')) {
    mode.value = pageBlock.get('props').get('mode')
  }
})
</script>

<template>
  <component
    class="page-block"
    :is="mode === 'docs' ? Docs : Whiteboard" 
    :page="page"
    :pageBlock="pageBlock">
  </component>
</template>
