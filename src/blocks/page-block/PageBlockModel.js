import { defineBlockSchema, Text } from '@store'


export const PageBlockSchema = defineBlockSchema({
  type: 'page',
  props: {
    title: Text,
    mode: 'docs', // 'docs' | 'whiteboard'
  },
  metadata: {},
})
