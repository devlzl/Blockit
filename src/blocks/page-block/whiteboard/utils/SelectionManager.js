import { DefaultToolController } from '../controllers/DefaultToolController'
import { PenToolController } from '../controllers/PenToolController'
import { RectToolController } from '../controllers/RectToolController'
import { TriangleToolController } from '../controllers/TriangleToolController'
import { CircleToolController } from '../controllers/CircleToolController'


export class SelectionManager {
  constructor(canvas, pageBlock, renderer) {
    this._canvas = canvas
    this._pageBlock = pageBlock
    this._currentToolType = 'default'
    this._controllers = {
      default: new DefaultToolController(renderer),
      pen: new PenToolController(renderer),
      rect: new RectToolController(renderer),
      triangle: new TriangleToolController(renderer),
      circle: new CircleToolController(renderer),
    }
    pageBlock.events.toolChange.on((type) => {
      this._currentToolType = type
    })
    this._bindEvents()
  }

  get currentController() {
    return this._controllers[this._currentToolType]
  }

  _bindEvents() {
    const eventNames = ['Click', 'MouseDown', 'MouseMove', 'MouseUp']
    const previousHandlerMap = {}
    const _addListener = () => {
      eventNames.forEach((eventName) => {
        const handlerName = `handle${eventName}`
        const handler = this.currentController[handlerName]?.bind(this.currentController)
        this._canvas.addEventListener(eventName.toLowerCase(), handler)
        previousHandlerMap[eventName] = handler
      })
    }
    const _removeListener = () => {
      eventNames.forEach((eventName) => {
        this._canvas.removeEventListener(eventName.toLowerCase(), previousHandlerMap[eventName])
      })
    }
    this._pageBlock.events.toolChange.on(() => {
      _removeListener()
      _addListener()
    })
    _addListener()
  }
}
