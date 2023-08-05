import { Element } from './_Element'


export class TriangleElement extends Element {
  constructor(left, top) {
    super()
    this.left = left
    this.top = top
    this.right = left
    this.bottom = top
  }

  render(context) {
    const { left, top, right, bottom } = this
    context.save()
    context.lineWidth = 2
    context.beginPath()
    context.moveTo(left, bottom)
    context.lineTo((left + right) / 2, top)
    context.lineTo(right, bottom)
    context.lineTo(left, bottom)
    context.stroke()
    context.restore()
  }
}
