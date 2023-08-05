import { Element } from './_Element'


export class PenElement extends Element {
  render(context) {
    // TODO
    const path = new Path2D('M10 10 h 80 v 80 h -80 Z')
    context.fill(path)
  }
}
