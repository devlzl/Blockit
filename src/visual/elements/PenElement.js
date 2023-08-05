import { Element } from './_Element'


export class PenElement extends Element {
  constructor() {
    super()
    this.points = []
  }

  render(context) {
    if (this.points.length === 0) {
      return
    }
    context.save()
    context.strokeStyle = '#4F90FF'
    context.lineWidth = 2
    context.beginPath()
    context.moveTo(this.points[0].x,this.points[0].y)
    for (const point of this.points.slice(1)) {
      context.lineTo(point.x, point.y)
    }
    context.stroke()
    context.restore()
  }
}
