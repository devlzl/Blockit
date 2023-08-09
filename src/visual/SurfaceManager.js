import { Renderer } from './Renderer'


export class SurfaceManager {
  constructor(canvas, surfaceBlock) {
    this.surfaceBlock = surfaceBlock
    this.renderer = new Renderer(canvas, surfaceBlock)
  }

  addElement(element) {
    this.surfaceBlock.get('children').push([element])
  }
}
