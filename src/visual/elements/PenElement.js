import { Element } from './_Element'
import * as Y from 'yjs'


export class PenElement extends Element {
  constructor() {
    const element = new Y.Map()
    const id = Element.id++
    element.set('id', id)
    element.set('type', 'pen')
    element.set('points', new Y.Array())
    return element
  }
}


export function penRender(penElement, context) {
  const points = penElement.get('points').toArray()
  if (points.length === 0) {
    return
  }
  context.save()
  context.strokeStyle = '#4F90FF'
  context.lineWidth = 2
  context.beginPath()
  context.moveTo(points[0].x, points[0].y)
  for (const point of points.slice(1)) {
    context.lineTo(point.x, point.y)
  }
  context.stroke()
  context.restore()
}
