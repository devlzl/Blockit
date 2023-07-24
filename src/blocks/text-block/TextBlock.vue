<script setup>
import RichText from '@rich-text'
import { Block } from '@store'


const { block } = defineProps({
  block: Block,
})
const text = block.props.text
</script>

<template>
  <div class="text-block">
    <RichText :text="text" />
  </div>
</template>

<style scoped>
</style>
