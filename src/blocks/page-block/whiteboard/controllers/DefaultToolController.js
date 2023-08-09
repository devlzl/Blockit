import { ToolController } from './_ToolController'


export class DefaultToolController extends ToolController {
  constructor(surfaceManager, page) {
    super()
    this._surfaceManager = surfaceManager
    this._page = page
    this._currentElement = null
    this._offsetX = 0
    this._offsetY = 0
  }

  handleMouseDown(event) {
    const target = event.target
    if (target.classList.contains('note-block-container')) {
      const blockId = target.getAttribute('blockid')
      const noteBlock = this._page.getBlockById(blockId)
      const { x, y } = target.getBoundingClientRect()
      this._currentElement = noteBlock
      this._offsetX = event.x - x
      this._offsetY = event.y - y
    }
  }

  handleMouseMove(event) {
    if (this._currentElement) {
      const blockId = this._currentElement.get('id')
      this._page.updateBlock(blockId, {
        position: {
          x: event.x - this._offsetX,
          y: event.y - this._offsetY,
        }
      })
    }
  }

  handleMouseUp(event) {
    this._currentElement = null
  }
}
