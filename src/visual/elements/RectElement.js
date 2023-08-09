import { Element } from './_Element'
import * as Y from 'yjs'


export class RectElement extends Element {
  constructor(x, y) {
    const element = new Y.Map()
    const id = Element.id++
    element.set('id', id)
    element.set('type', 'rect')
    element.set('x', x)
    element.set('y', y)
    element.set('width', 0)
    element.set('height', 0)
    element.set('radius', 2)
    return element
  }
}


export function rectRender(rectElement, context) {
  const x = rectElement.get('x')
  const y = rectElement.get('y')
  const width = rectElement.get('width')
  const height = rectElement.get('height')
  const radius = rectElement.get('radius')

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
