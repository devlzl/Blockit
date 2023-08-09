import { circleRender, penRender, rectRender, triangleRender } from '@visual'


export class Renderer {
  constructor(canvas, surfaceBlock) {
    this._canvas = canvas
    this._context = canvas.getContext('2d')
    this._surfaceBlock = surfaceBlock
    this._shouldUpdate = false
    this._surfaceBlock.observeDeep(() => {
      this._shouldUpdate = true
    })
    this._launch()
  }

  get elements() {
    return this._surfaceBlock.get('children').toArray()
  }

  _getRender(type) {
    return {
      circle: circleRender,
      pen: penRender,
      rect: rectRender,
      triangle: triangleRender,
    }[type]
  }

  _resize() {
    const width = window.innerWidth
    const height = window.innerHeight
    const dpr = window.devicePixelRatio
    this._canvas.width = width * dpr
    this._canvas.height = height * dpr
    this._canvas.style.width = `${width}px`
    this._canvas.style.height = `${height}px`
    this._context.scale(dpr, dpr)
    this._shouldUpdate = true
  }

  _render() {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height)
    for (const element of this.elements) {
      const render = this._getRender(element.get('type'))
      render(element, this._context)
    }
  }

  _mainloop() {
    requestAnimationFrame(() => {
      if (this._shouldUpdate) {
        this._render()
        this._shouldUpdate = false
      }
      this._mainloop()
    })
  }

  _launch() {
    this._resize()
    this._mainloop()
  }
}
