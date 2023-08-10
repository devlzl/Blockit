import { Element } from './_Element'


export class CircleElement extends Element {
  constructor(left, top) {
    const element = super()
    element.set('type', 'circle')
    element.set('left', left)
    element.set('right', left)
    element.set('top', top)
    element.set('bottom', top)
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
  const radius = Math.max(Math.abs((right - left) / 2), Math.abs((bottom - top) / 2))

  context.save()
  context.lineWidth = 2
  context.beginPath()
  context.arc(x, y, radius, 0, 2 * Math.PI)
  context.stroke()
  context.restore()
}
