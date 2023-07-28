export class RangeService {
  constructor(kernel) {
    this._kernel = kernel
    this._kernelRange = { index: 0, length: 0 }
  }

  getKernelRange() {
    return this._kernelRange
  }

  setKernelRange(kernelRange) {
    this._kernelRange = kernelRange
  }

  toKernelRange(range) {
    // TODO: need more precise
    return {
      index: range.startOffset,
      length: range.endOffset - range.startOffset
    }
  }

  toRange(kernelRange) {
    // TODO: need more precise
    const range = new Range()
    range.setStart(this._kernel.rootElement.childNodes[0], this._kernelRange.index)
    range.setEnd(this._kernel.rootElement.childNodes[0], this._kernelRange.index + this._kernelRange.length)
    return range
  }
}
