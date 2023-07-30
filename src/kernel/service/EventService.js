import { handleInput } from '../utils/handleInput'


export class EventService {
  constructor(kernel) {
    this._kernel = kernel
  }

  _onSelectionChange() {
    const range = document.getSelection().getRangeAt(0)
    const kernelRange = this._kernel.toKernelRange(range)
    this._kernel.setKernelRange(kernelRange)
    this._kernel.events.selectionChange.emit()
  }

  _onBeforeInput(event) {
    event.preventDefault()
    const { inputType, data } = event
    handleInput(inputType, data, this._kernel)
  }

  mount() {
    const rootElement = this._kernel.rootElement
    document.addEventListener('selectionchange', this._onSelectionChange.bind(this))
    rootElement.addEventListener('beforeinput', this._onBeforeInput.bind(this))
  }
}
