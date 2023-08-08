import * as Y from 'yjs'


function buildProps(originProps, id, page) {
  const props = new Y.Map()
  for (const [key, value] of Object.entries(originProps)) {
    props.set(key, value)
  }
  props.observe((event) => {
    page.events.blockUpdate.emit({
      blockId: id,
      part: 'props',
      event: event,
    })
  })
  return props
}

function buildChildren(id, page) {
  const children = new Y.Array()
  children.observe((event) => {
    page.events.blockUpdate.emit({
      blockId: id,
      part: 'children',
      event: event,
    })
  })
  return children
}

export class Block {
  static id = 1
  constructor(type, props, parentId, page) {
    const block = new Y.Map()
    const id = Block.id++
    block.set('id', id)
    block.set('type', type)
    block.set('props', buildProps(props, id, page))
    block.set('children', buildChildren(id, page))
    block.set('parentId', parentId)
    block.observe((event) => {
      page.events.blockUpdate.emit({
        blockId: id,
        part: 'block',
        event: event,
      })
    })
    return block
  }
}

export const BlockType = Y.Map
