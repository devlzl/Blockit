import { Element } from './_Element'
import * as Y from 'yjs'


export class CircleElement extends Element {
  constructor(x, y) {
    const element = new Y.Map()
    const id = Element.id++
    element.set('id', id)
    element.set('type', 'circle')
    element.set('left', x)
    element.set('right', x)
    element.set('top', y)
    element.set('bottom', y)
    return element
  }
}


export function circleRender(circleElement, context) {
  const left = circleElement.get('left')
  const right = circleElement.get('right')
  const top = circleElement.get('top')
  const bottom = circleElement.get('bottom')

  const x = (left + right) / 2
  const y = (top + bottom) / 2
  const radius = Math.abs((right - left) / 2)

  context.save()
  context.lineWidth = 2
  context.beginPath()
  context.arc(x, y, radius, 0, 2 * Math.PI)
  context.stroke()
  context.restore()
}
