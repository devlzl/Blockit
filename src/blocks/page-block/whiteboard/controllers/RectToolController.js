import { ToolController } from './_ToolController'
import { RectElement } from '@visual'


export class RectToolController extends ToolController {
  constructor(renderer) {
    super()
    this._renderer = renderer
    this._currentElement = null
    this._startX = 0
    this._startY = 0
  }

  handleMouseDown(event) {
    const element = new RectElement(event.clientX, event.clientY)
    this._renderer.addElement(element)
    this._currentElement = element
    this._startX = event.clientX
    this._startY = event.clientY
  }

  handleMouseMove(event) {
    if (this._currentElement) {
      this._currentElement.width = event.clientX - this._startX
      this._currentElement.height = event.clientY - this._startY
      this._renderer.forceUpdate()
    }
  }

  handleMouseUp(event) {
    this._currentElement = null
  }
}
