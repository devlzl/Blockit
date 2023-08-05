import { ToolController } from './_ToolController'
import { PenElement } from '@visual'


export class PenToolController extends ToolController {
  constructor(renderer) {
    super()
    this._renderer = renderer
  }
  handleMouseDown(event) {
    const element = new PenElement()
    this._renderer.addElement(element)
  }

  handleMouseMove(event) {

  }

  handleMouseUp(event) {

  }
}
