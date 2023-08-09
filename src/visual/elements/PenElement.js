import { Element } from './_Element'
import * as Y from 'yjs'


export class PenElement extends Element {
  constructor() {
    const element = super()
    element.set('type', 'pen')
    element.set('points', new Y.Array())
    element.observeDeep(() => {
      const points = element.get('points').toArray()
      const left = Math.min(...points.map(point => point.x))
      const right = Math.max(...points.map(point => point.x))
      const top = Math.min(...points.map(point => point.y))
      const bottom = Math.max(...points.map(point => point.y))
      element.get('left') !== left && element.set('left', left)
      element.get('right') !== right && element.set('right', right)
      element.get('top') !== top && element.set('top', top)
      element.get('bottom') !== bottom && element.set('bottom', bottom)
    })
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
