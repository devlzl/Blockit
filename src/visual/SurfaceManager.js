import { Renderer } from './Renderer'


export class SurfaceManager {
  constructor(canvas) {
    this.renderer = new Renderer(canvas)
  }
}
