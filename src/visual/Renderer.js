export class Renderer {
  constructor(canvas, elements) {
    this._canvas = canvas
    this._context = canvas.getContext('2d')
    this._elements = elements
    this._shouldUpdate = false
    this._launch()
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
    for (const element of this._elements) {
      element.render(this._context)
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

  forceUpdate() {
    this._shouldUpdate = true
  }
}
