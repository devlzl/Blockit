import { Element } from './_Element'


export class CircleElement extends Element {
  constructor(left, top) {
    super()
    this.left = left
    this.top = top
    this.right = left
    this.bottom = top
  }

  get x() {
    return (this.left + this.right) / 2
  }

  get y() {
    return (this.top + this.bottom) / 2
  }

  get radius() {
    return Math.abs((this.right - this.left) / 2)
  }

  render(context) {
    const { x, y, radius } = this
    context.save()
    context.lineWidth = 2
    context.beginPath()
    context.arc(x, y, radius, 0, 2 * Math.PI)
    context.stroke()
    context.restore()
  }
}
