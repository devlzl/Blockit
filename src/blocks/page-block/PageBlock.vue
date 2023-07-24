<script setup>
import { ref } from 'vue'
import Docs from './docs/Docs.vue'
import Whiteboard from './whiteboard/Whiteboard.vue'
import { Block } from '@store'


const { pageBlock } = defineProps({
  pageBlock: Block,
})


const mode = ref(pageBlock.props.mode)
pageBlock.events.propsUpdate.on((props) => {
  mode.value = props.mode
})
</script>

<template>
  <component
    class="page-block"
    :is="mode === 'docs' ? Docs : Whiteboard" 
    :pageBlock="pageBlock">
  </component>
</template>
