import { Renderer } from './Renderer'
import { GridManager } from './GridManager'


export class SurfaceManager {
  constructor(canvas, surfaceBlock) {
    this.surfaceBlock = surfaceBlock
    this.renderer = new Renderer(canvas, surfaceBlock)
    this.gridManager = new GridManager()
  }

  addElement(element) {
    this.surfaceBlock.get('children').push([element])
  }

  fillGrid(element) {
    this.gridManager.addElement(element)
  }

  pick(x, y) {
    return this.gridManager.pick(x, y)
  }
}
