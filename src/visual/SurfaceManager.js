import { Renderer } from './Renderer'


export class SurfaceManager {
  constructor(canvas) {
    this.elements = []
    this.renderer = new Renderer(canvas, this.elements)
  }

  addElement(element) {
    this.elements.push(element)
    this.renderer.forceUpdate()
  }

  forceUpdate() {
    this.renderer.forceUpdate()
  }
}
