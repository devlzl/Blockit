import { ToolController } from './_ToolController'
import { CircleElement } from '@visual'


export class CircleToolController extends ToolController {
  constructor(surfaceManager) {
    super()
    this._surfaceManager = surfaceManager
    this._currentElement = null
  }

  handleMouseDown(event) {
    const element = new CircleElement(event.x, event.y)
    this._surfaceManager.addElement(element)
    this._currentElement = element
  }

  handleMouseMove(event) {
    if (this._currentElement) {
      this._currentElement.right = event.x
      this._currentElement.bottom = event.y
      this._surfaceManager.forceUpdate()
    }
  }

  handleMouseUp(event) {
    this._currentElement = null
  }
}
