import { EventEmitter } from './EventEmitter'


export class Block {
  constructor(id, type, props, children, parent, page) {
    this.id = id
    this.type = type
    this.props = props
    this.children = children
    this.parent = parent
    this.page = page
    this.events = {
      propsUpdate: new EventEmitter(),
      childrenUpdate: new EventEmitter(),
    }
  }
}
