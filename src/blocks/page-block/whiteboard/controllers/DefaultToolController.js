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
    // drag
    this._dragging = false
    this._offsetX = 0
    this._offsetY = 0
    // resize
    this._resizing = false
    this._startX = 0
    this._startY = 0
    this._corner = []
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
    } else if (target.classList.contains('corner')) {
      this._resizing = true
      this._startX = event.x
      this._startY = event.y
      this._origin = {
        left: this._currentElement.get('left'),
        right: this._currentElement.get('right'),
        top: this._currentElement.get('top'),
        bottom: this._currentElement.get('bottom'),
      }
      this._corner = Array.from(target.classList).filter(className => ['left', 'right', 'top', 'bottom'].includes(className))
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
        if (this._resizing) {
          const offsetX = event.x - this._startX
          const offsetY = event.y - this._startY
          this._currentElement.doc.transact(() => {
            this._corner.forEach((direction) => {
              if (direction === 'left') {
                this._currentElement.set('left', this._origin.left + offsetX)
              } else if (direction === 'right') {
                this._currentElement.set('right', this._origin.right + offsetX)
              } else if (direction === 'top') {
                this._currentElement.set('top', this._origin.top + offsetY)
              } else if (direction === 'bottom') {
                this._currentElement.set('bottom', this._origin.bottom + offsetY)
              }
            })
          })
        } else {
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
  }

  handleMouseUp(event) {
    if (isVisualElement(this._currentElement)) {
      this._surfaceManager.fillGrid(this._currentElement)
    }
    this._dragging = false
    this._resizing = false
    this._currentElement = null
  }
}
