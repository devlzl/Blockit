import { ToolController } from './_ToolController'
import { PenElement } from '@visual'


export class PenToolController extends ToolController {
  constructor(renderer) {
    super()
    this._renderer = renderer
    this._currentElement = null
  }

  handleMouseDown(event) {
    const element = new PenElement()
    this._renderer.addElement(element)
    this._currentElement = element
  }

  handleMouseMove(event) {
    if (this._currentElement) {
      this._currentElement.points.push({
        x: event.clientX,
        y: event.clientY,
      })
      this._renderer.forceUpdate()
    }
  }

  handleMouseUp(event) {
    this._currentElement = null
  }
}
