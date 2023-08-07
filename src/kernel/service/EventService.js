import { handleInput } from '../utils/handleInput'


export class EventService {
  constructor(kernel) {
    this._kernel = kernel
    this._isCurrentElement = false
    this._isComposing = false
  }

  _onSelectionChange() {
    const range = document.getSelection().getRangeAt(0)
    this._isCurrentElement = range.intersectsNode(this._kernel.rootElement)
    if (this._isComposing) {
      return
    }
    const kernelRange = this._kernel.toKernelRange(range)
    this._kernel.setKernelRange(kernelRange)
    this._kernel.events.selectionChange.emit()
  }

  _onBeforeInput(event) {
    if (!this._isCurrentElement) {
      return
    }
    event.preventDefault()
    if (this._isComposing) {
      return
    }
    const { inputType, data } = event
    handleInput(inputType, data, this._kernel)
  }

  _onCompositionStart() {
    if (!this._isCurrentElement) {
      return
    }
    this._isComposing = true
  }

  _onCompositionEnd(event) {
    if (!this._isCurrentElement) {
      return
    }
    this._isComposing = false
    const data = event.data
    const range = window.getSelection().getRangeAt(0)
    range.setStart(range.startContainer, range.startOffset - data.length)
    range.deleteContents()
    handleInput('insertText', data, this._kernel)
  }

  mount() {
    // outer `contenteditable` will consume input events,
    // so cannot bind events to `this._kernel.rootElement`
    document.addEventListener('selectionchange', this._onSelectionChange.bind(this))
    document.addEventListener('beforeinput', this._onBeforeInput.bind(this))
    document.addEventListener('compositionstart', this._onCompositionStart.bind(this))
    document.addEventListener('compositionend', this._onCompositionEnd.bind(this))
  }
}
