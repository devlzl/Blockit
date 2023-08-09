import * as Y from 'yjs'


export class Element {
  static id = 1
  constructor() {
    const element = new Y.Map()
    const id = Element.id++
    element.set('id', id)
    element.set('left', 0)
    element.set('right', 0)
    element.set('top', 0)
    element.set('bottom', 0)
    return element
  }
}

export const ElementType = Y.Map
