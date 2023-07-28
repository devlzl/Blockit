<script setup>
import Editor from '@editor'
import * as Y from 'yjs'
import { Kernel } from '@kernel'


const yDoc = new Y.Doc()
const yText = yDoc.getText()
const kernel = new Kernel(yText)
</script>

<template>
  <Editor :kernel="kernel" />
</template>

<style scoped>
</style>
