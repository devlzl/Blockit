<script setup>
import { Kernel } from './Kernel'
import { nextTick, onMounted, ref } from 'vue'
import RichTextElement from './components/RichTextElement.vue'
import { Page, BlockType } from '@store'


const { page, textBlock, initFocus } = defineProps({
  page: Page,
  textBlock: BlockType,
  initFocus: String,
})

const yText = textBlock.get('props').get('text')
const kernel = new Kernel(yText)
const kernelRef = ref(null)
onMounted(() => {
  kernel.mount(kernelRef.value)
  const text = yText.toString()
  if (initFocus === 'start') {
    kernel.setKernelRange({ index: 0, length: 0 })
  } else if (initFocus === 'end') {
    kernel.setKernelRange({
      index: kernel.getKernelRange().index + text.length,
      length: 0,
    })
  }
})


const showPlaceholder = ref(false)
const deltas = ref([])
kernel.events.deltaUpdate.on(async () => {
  deltas.value = kernel.getDeltas()
  showPlaceholder.value = deltas.value.length === 0
  await nextTick()
  const kernelRange = kernel.getKernelRange()
  const range = kernel.toRange(kernelRange)
  kernel.setRange(range)
  page.events.deltaUpdate.emit()
})


kernel.events.selectionChange.on(() => {
  page.events.selectionChange.emit(kernel)
})


kernel.events.lineBreak.on((data) => {
  page.events.lineBreak.emit({
    blockId: textBlock.get('id'),
    data: data,
  })
})
kernel.events.lineDelete.on(() => {
  page.events.lineDelete.emit({
    blockId: textBlock.get('id'),
  })
})


page.events.focus.on(({ blockId }) => {
  if (blockId === textBlock.get('id')) {
    kernel.focusEnd()
  }
})
</script>

<template>
  <div class="rich-text" ref="kernelRef" style="white-space: break-spaces;">
    <RichTextElement v-for="delta of deltas" :delta="delta" />
    <div class="placeholder" v-if="showPlaceholder">Type something...</div>
  </div>
</template>

<style scoped lang="scss">
.rich-text {
  padding: 6px 0;
  .placeholder {
    color: lightgray;
  }
}
</style>
