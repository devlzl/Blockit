import { Element } from './_Element'


export class RectElement extends Element {
  constructor(left, top) {
    const element = super()
    element.set('type', 'rect')
    element.set('left', left)
    element.set('top', top)
    element.set('width', 0)
    element.set('height', 0)
    element.set('radius', 2)
    return element
  }
}


export function rectRender(rectElement, context) {
  const left = rectElement.get('left')
  const right = rectElement.get('right')
  const top = rectElement.get('top')
  const bottom = rectElement.get('bottom')
  const radius = rectElement.get('radius')

  context.save()
  context.lineWidth = 2
  context.beginPath()
  context.moveTo(left, top + radius)
  context.lineTo(left, bottom - radius)
  context.quadraticCurveTo(left, bottom, left + radius, bottom)
  context.lineTo(right - radius, bottom)
  context.quadraticCurveTo(right, bottom, right, bottom - radius)
  context.lineTo(right, top + radius)
  context.quadraticCurveTo(right, top, right - radius, top)
  context.lineTo(left + radius, top)
  context.quadraticCurveTo(left, top, left, top + radius)
  context.stroke()
  context.restore()
}
