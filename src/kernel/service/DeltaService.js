export class DeltaService {
  constructor(kernel) {
    this._kernel = kernel
  }

  get delta() {
    return this._kernel.yText.toDelta()
  }

  render() {
    const value = this.delta[0].insert
    const rootElement = this._kernel.rootElement
    rootElement.innerText = value

    const kernelRange = this._kernel.getKernelRange()
    const range = this._kernel.toRange(kernelRange)

    const selection = window.getSelection()
    const currentRange = selection.getRangeAt(0)
    selection.removeRange(currentRange)
    selection.addRange(range)
  }
}
