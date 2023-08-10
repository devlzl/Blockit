import { ToolController } from './_ToolController'
import { CircleElement } from '@visual'


export class CircleToolController extends ToolController {
  constructor(surfaceManager, toolChangeEvent) {
    super()
    this._surfaceManager = surfaceManager
    this._currentElement = null
    this._toolChangeEvent = toolChangeEvent
  }

  handleMouseDown(event) {
    const element = new CircleElement(event.x, event.y)
    this._surfaceManager.addElement(element)
    this._currentElement = element
  }

  handleMouseMove(event) {
    if (this._currentElement) {
      this._currentElement.doc.transact(() => {
        const left = this._currentElement.get('left')
        const top = this._currentElement.get('top')
        const offsetX = Math.abs(event.x - left)
        const signX = event.x - left > 0 ? 1 : -1
        const offsetY = Math.abs(event.y - top)
        const signY = event.y - top > 0 ? 1 : -1
        const diameter = Math.max(offsetX, offsetY)
        this._currentElement.set('right', left + diameter * signX)
        this._currentElement.set('bottom', top + diameter * signY)
      })
    }
  }

  handleMouseUp(event) {
    this._surfaceManager.fillGrid(this._currentElement)
    this._currentElement = null
    this._toolChangeEvent.emit('default')
  }
}
