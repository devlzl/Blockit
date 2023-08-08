import { Block } from './Block'
import { EventEmitter } from './EventEmitter'
import * as Y from 'yjs'


export class Page {
  constructor() {
    const doc = new Y.Doc()
    this.blockTree = doc.getMap()
    this.blockMap = {}
    this.history = new Y.UndoManager(this.blockTree)
    // 
    this.schemas = {}
    this.events = {
      deltaUpdate: new EventEmitter(),
      selectionChange: new EventEmitter(),
      blockUpdate: new EventEmitter(),
    }
    this.selection = {
      kernels: new Set()
    }
    // 
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

  addBlock(type, props, parentId, parentIndex) {
    const block = new Block(type, props, parentId, this)
    if (parentId === undefined) {
      this.blockTree.set('root', block)
    } else {
      const parent = this.blockMap[parentId]
      const peers = parent.get('children')
      parentIndex = parentIndex ?? peers.length
      peers.insert(parentIndex, [block])
    }
    this.blockMap[block.get('id')] = block
    return block.get('id')
  }

  updateBlock(blockId, props) {
    const block = this.blockMap[blockId]
    for (const [key, value] of Object.entries(props)) {
      block.get('props').set(key, value)
    }
  }

  deleteBlock(blockId) {
    const block = this.blockMap[blockId]
    const parent = this.blockMap[block.get('parentId')]
    const peers = parent.get('children')
    const index = peers.toArray().indexOf(block)
    peers.delete(index, 1)
    delete this.blockMap[blockId]
  }

  getBlockById(blockId) {
    return this.blockMap[blockId]
  }

  getSelectedKernels() {
    return this.selection.kernels
  }

  undo() {
    this.history.undo()
  }

  redo() {
    this.history.redo()
  }

  captureSync() {
    // default: auto merge and generate a single history record every fixed time
    // captureSync: immediately add a history record
    this.history.stopCapturing()
  }
}
