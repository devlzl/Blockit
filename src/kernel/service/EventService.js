import { handleInput } from '../utils/handleInput'


export class EventService {
  constructor(kernel) {
    this._kernel = kernel
    this._isComposing = false
  }

  _onSelectionChange() {
    if (this._isComposing) {
      return
    }
    const range = document.getSelection().getRangeAt(0)
    const kernelRange = this._kernel.toKernelRange(range)
    this._kernel.setKernelRange(kernelRange)
    this._kernel.events.selectionChange.emit()
  }

  _onBeforeInput(event) {
    event.preventDefault()
    if (this._isComposing) {
      return
    }
    const { inputType, data } = event
    handleInput(inputType, data, this._kernel)
  }

  _onCompositionStart() {
    this._isComposing = true
  }

  _onCompositionEnd(event) {
    this._isComposing = false
    const data = event.data
    const range = window.getSelection().getRangeAt(0)
    range.setStart(range.startContainer, range.startOffset - data.length)
    range.deleteContents()
    handleInput('insertText', data, this._kernel)
  }

  mount() {
    const rootElement = this._kernel.rootElement
    document.addEventListener('selectionchange', this._onSelectionChange.bind(this))
    rootElement.addEventListener('beforeinput', this._onBeforeInput.bind(this))
    rootElement.addEventListener('compositionstart', this._onCompositionStart.bind(this))
    rootElement.addEventListener('compositionend', this._onCompositionEnd.bind(this))
  }
}
