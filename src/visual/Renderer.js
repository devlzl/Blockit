export class Renderer {
  constructor(canvas) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this._shouldUpdate = false
    this._launch()
  }

  _resize() {
    const width = window.innerWidth
    const height = window.innerHeight
    const dpr = window.devicePixelRatio
    this.canvas.width = width * dpr
    this.canvas.height = height * dpr
    this.canvas.style.width = `${width}px`
    this.canvas.style.height = `${height}px`
    this.context.scale(dpr, dpr)
    this._shouldUpdate = true
  }

  _render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
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
