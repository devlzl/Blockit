import { Block } from './Block'
import { EventEmitter } from './EventEmitter'


export class Page {
  constructor() {
    this.blockId = 0      // auto-generated id
    this.blockMap = {}    // id-block map
    this.root = {
      children: []
    }
    this.schemas = {}
    this.events = {
      addRoot: new EventEmitter(),
      deltaUpdate: new EventEmitter(),
      selectionChange: new EventEmitter(),
    }
    this.selection = {
      kernels: new Set()
    }

    this.events.selectionChange.on((kernel) => {
      if (kernel.getKernelRange().length > 0) {
        this.selection.kernels.add(kernel)
      } else {
        this.selection.kernels.delete(kernel)
      }
    })
  }

  register(schemas) {
    this.schemas = schemas
  }

  addBlock(type, props, parent=null, parentIndex=parent?.children.length) {
    this.blockId += 1
    const block = new Block(this.blockId, type, props, [], parent, this)
    this.blockMap[this.blockId] = block
    if (!parent) {
      this.root.children.push(block)
      this.events.addRoot.emit()
    } else {
      parent.children.splice(parentIndex, 0, block)
      parent.events.childrenUpdate.emit({
        type: 'add',
        index: parentIndex,
        block: block,
      })
    }
    return block
  }

  updateBlock(blockId, props) {
    const block = this.blockMap[blockId]
    Object.assign(block.props, props)
    block.events.propsUpdate.emit({ ...props })
  }

  deleteBlock(blockId) {
    const block = this.blockMap[blockId]
    const parent = block.parent
    const index = parent.children.indexOf(block)
    parent.children.splice(index, 1)
    delete this.blockMap[blockId]
    parent.events.childrenUpdate.emit({
      type: 'delete',
      index: index,
      block: block,
    })
  }

  getSelectedKernels() {
    return this.selection.kernels
  }

  undo() {

  }

  redo() {

  }

  captureSync() {
    // default: auto merge and generate a single history record every fixed time
    // captureSync: immediately add a history record
  }
}
