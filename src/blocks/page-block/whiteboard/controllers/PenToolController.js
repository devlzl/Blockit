import { ToolController } from './_ToolController'
import { PenElement } from '@visual'


export class PenToolController extends ToolController {
  constructor(surfaceManager, toolChangeEvent) {
    super()
    this._surfaceManager = surfaceManager
    this._currentElement = null
    this._toolChangeEvent = toolChangeEvent
  }

  handleMouseDown(event) {
    const element = new PenElement()
    this._surfaceManager.addElement(element)
    this._currentElement = element
  }

  handleMouseMove(event) {
    if (this._currentElement) {
      this._currentElement.get('points').push([{
        x: event.x,
        y: event.y,
      }])
    }
  }

  handleMouseUp(event) {
    this._surfaceManager.fillGrid(this._currentElement)
    this._currentElement = null
    this._toolChangeEvent.emit('default')
  }
}
