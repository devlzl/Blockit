import { defineBlockSchema } from '@store'


export const NoteBlockSchema = defineBlockSchema({
  type: 'note',
  props: {
    position: {
      x: 100,
      y: 100,
    },
  },
  metadata: {},
})
