import { defineBlockSchema } from '@store'


export const PageBlockSchema = defineBlockSchema({
  type: 'page',
  props: {
    title: '',
    mode: 'docs', // 'docs' | 'whiteboard'
  },
  metadata: {},
})
