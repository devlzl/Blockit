<script setup>
import { builtinBlockViews } from '@blocks'
import { Page, BlockType } from '@store'
import { ref, shallowRef, triggerRef } from 'vue'


const { page, pageBlock } = defineProps({
  page: Page,
  pageBlock: BlockType,
})


const title = ref(pageBlock.get('props').get('title').toString())


function getNoteBlocks() {
  return pageBlock.get('children').toArray().filter(block => block.get('type') === 'note')
}
const noteBlocks = shallowRef(getNoteBlocks())
page.events.blockUpdate.on((update) => {
  const { blockId, part } = update
  if (blockId === pageBlock.get('id') && part === 'children') {
    triggerRef(noteBlocks)
  }
})
</script>

<template>
  <div class="docs">
    <input class="title" v-model="title" placeholder="Untitled">
    <component
      v-for="block of noteBlocks"
      :is="builtinBlockViews[block.get('type')]"
      :page="page"
      :noteBlock="block">
    </component>
  </div>
</template>

<style scoped lang="scss">
.docs {
  width: 750px;
  margin: 0 auto;
  .title {
    border: none;
    outline: none;
    width: 100%;
    padding: 30px 0;
    font-size: 36px;
    font-weight: bold;
    font-family: system-ui;
    color: #424149;
  }
  .title::placeholder {
    color: lightgray;
  }
}
</style>
