import { defineBlockSchema, Text } from '@store'


export const TextBlockSchema = defineBlockSchema({
  type: 'text',
  props: {
    text: Text,
  },
  metadata: {},
})
