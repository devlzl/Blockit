import { ToolController } from './_ToolController'


function isVisualElement(element) {
  return ['pen', 'rect', 'triangle', 'circle'].includes(element?.get('type'))
}


export class DefaultToolController extends ToolController {
  constructor(surfaceManager, page, selectedChangeEvent) {
    super()
    this._surfaceManager = surfaceManager
    this._page = page
    this._selectedChangeEvent = selectedChangeEvent
    this._currentElement = null
    this._dragging = false
    this._offsetX = 0
    this._offsetY = 0
  }

  handleClick(event) {
    const selected = this._surfaceManager.pick(event.x, event.y)
    this._selectedChangeEvent.emit(selected)
    if (selected) {
      // selected might be undefined
      this._currentElement = selected
    }
  }

  handleMouseDown(event) {
    this._dragging = true
    const target = event.target
    if (target.classList.contains('note-block-container')) {
      const blockId = target.getAttribute('blockid')
      const noteBlock = this._page.getBlockById(blockId)
      const { x, y } = target.getBoundingClientRect()
      this._currentElement = noteBlock
      this._offsetX = event.x - x
      this._offsetY = event.y - y
    } else if (target.classList.contains('selected-box')) {
      this._offsetX = event.x - this._currentElement.get('left')
      this._offsetY = event.y - this._currentElement.get('top')
    }
  }

  handleMouseMove(event) {
    if (this._dragging && this._currentElement) {
      const type = this._currentElement.get('type')
      if (type === 'note') {
        const blockId = this._currentElement.get('id')
        this._page.updateBlock(blockId, {
          position: {
            x: event.x - this._offsetX,
            y: event.y - this._offsetY,
          }
        })
      } else if (isVisualElement(this._currentElement)) {
        const left = event.x - this._offsetX
        const top = event.y - this._offsetY
        const width = this._currentElement.get('right') - this._currentElement.get('left')
        const height = this._currentElement.get('bottom') - this._currentElement.get('top')
        this._currentElement.doc.transact(() => {
          this._currentElement.set('left', left)
          this._currentElement.set('right', left + width)
          this._currentElement.set('top', top)
          this._currentElement.set('bottom', top + height)
        })
      }
    }
  }

  handleMouseUp(event) {
    if (isVisualElement(this._currentElement)) {
      this._surfaceManager.fillGrid(this._currentElement)
    }
    this._dragging = false
    this._currentElement = null
  }
}
