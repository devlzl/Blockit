import { DefaultToolController } from '../controllers/DefaultToolController'
import { PenToolController } from '../controllers/PenToolController'
import { RectToolController } from '../controllers/RectToolController'
import { TriangleToolController } from '../controllers/TriangleToolController'
import { CircleToolController } from '../controllers/CircleToolController'


export class SelectionManager {
  constructor(page, surfaceManager, events) {
    this._currentToolType = 'default'
    this._events = events
    this._controllers = {
      default: new DefaultToolController(surfaceManager, page, events.selectedChangeEvent),
      pen: new PenToolController(surfaceManager, events.toolChangeEvent),
      rect: new RectToolController(surfaceManager, events.toolChangeEvent),
      triangle: new TriangleToolController(surfaceManager, events.toolChangeEvent),
      circle: new CircleToolController(surfaceManager, events.toolChangeEvent),
    }
    this._events.toolChangeEvent.on((type) => {
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
        document.addEventListener(eventName.toLowerCase(), handler)
        previousHandlerMap[eventName] = handler
      })
    }
    const _removeListener = () => {
      eventNames.forEach((eventName) => {
        document.removeEventListener(eventName.toLowerCase(), previousHandlerMap[eventName])
      })
    }
    this._events.toolChangeEvent.on(() => {
      _removeListener()
      _addListener()
    })
    _addListener()
  }
}
