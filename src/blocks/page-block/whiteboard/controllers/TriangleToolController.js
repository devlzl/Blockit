import { ToolController } from './_ToolController'
import { TriangleElement } from '@visual'


export class TriangleToolController extends ToolController {
  constructor(surfaceManager, toolChangeEvent) {
    super()
    this._surfaceManager = surfaceManager
    this._currentElement = null
    this._toolChangeEvent = toolChangeEvent
  }

  handleMouseDown(event) {
    const element = new TriangleElement(event.x, event.y)
    this._surfaceManager.addElement(element)
    this._currentElement = element
  }

  handleMouseMove(event) {
    if (this._currentElement) {
      this._currentElement.doc.transact(() => {
        this._currentElement.set('right', event.x)
        this._currentElement.set('bottom', event.y)
      })
    }
  }

  handleMouseUp(event) {
    this._surfaceManager.fillGrid(this._currentElement)
    this._currentElement = null
    this._toolChangeEvent.emit('default')
  }
}
