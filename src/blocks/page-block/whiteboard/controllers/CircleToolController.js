import { ToolController } from './_ToolController'
import { CircleElement } from '@visual'


export class CircleToolController extends ToolController {
  constructor(renderer) {
    super()
    this._renderer = renderer
    this._currentElement = null
  }

  handleMouseDown(event) {
    const element = new CircleElement(event.clientX, event.clientY)
    this._renderer.addElement(element)
    this._currentElement = element
  }

  handleMouseMove(event) {
    if (this._currentElement) {
      this._currentElement.right = event.clientX
      this._currentElement.bottom = event.clientY
      this._renderer.forceUpdate()
    }
  }

  handleMouseUp(event) {
    this._currentElement = null
  }
}
