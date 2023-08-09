import { ToolController } from './_ToolController'
import { PenElement } from '@visual'


export class PenToolController extends ToolController {
  constructor(surfaceManager) {
    super()
    this._surfaceManager = surfaceManager
    this._currentElement = null
  }

  handleMouseDown(event) {
    const element = new PenElement()
    this._surfaceManager.addElement(element)
    this._currentElement = element
  }

  handleMouseMove(event) {
    if (this._currentElement) {
      this._currentElement.points.push({
        x: event.x,
        y: event.y,
      })
      this._surfaceManager.forceUpdate()
    }
  }

  handleMouseUp(event) {
    this._currentElement = null
  }
}
