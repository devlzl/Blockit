import { defineBlockSchema, Text } from '@store'


export const TextBlockSchema = defineBlockSchema({
  type: 'text',
  props: {
    text: Text,
    initFocus: 'end', // 'start' | 'end'
    level: 0,         // 0(plain) | 1(H1) | 2(H2) | 3(H3)
  },
  metadata: {},
})
