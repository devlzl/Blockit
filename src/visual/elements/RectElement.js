import { Element } from './_Element'


export class RectElement extends Element {
  constructor(x, y) {
    super()
    this.x = x
    this.y = y
    this.width = 0
    this.height = 0
    this.radius = 2
  }

  render(context) {
    const { x, y, width, height, radius } = this
    context.save()
    context.lineWidth = 2
    context.beginPath()
    context.moveTo(x, y + radius)
    context.lineTo(x, y + height - radius)
    context.quadraticCurveTo(x, y + height, x + radius, y + height)
    context.lineTo(x + width - radius, y + height)
    context.quadraticCurveTo(x + width, y + height, x + width, y + height - radius)
    context.lineTo(x + width, y + radius)
    context.quadraticCurveTo(x + width, y, x + width - radius, y)
    context.lineTo(x + radius, y)
    context.quadraticCurveTo(x, y, x, y + radius)
    context.stroke()
    context.restore()
  }
}
