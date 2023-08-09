import { Element } from './_Element'


export class TriangleElement extends Element {
  constructor(left, top) {
    const element = super()
    element.set('type', 'triangle')
    element.set('left', left)
    element.set('right', left)
    element.set('top', top)
    element.set('bottom', top)
    return element
  }
}


export function triangleRender(triangleElement, context) {
  const left = triangleElement.get('left')
  const right = triangleElement.get('right')
  const top = triangleElement.get('top')
  const bottom = triangleElement.get('bottom')

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
