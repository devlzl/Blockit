import { defineBlockSchema } from '@store'


export const TextBlockSchema = defineBlockSchema({
  type: 'text',
  props: {
    text: '', // new Text()
  },
  metadata: {},
})
