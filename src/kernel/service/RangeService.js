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
    const { startContainer, startOffset, endContainer, endOffset } = range
    const rootElement = this._kernel.rootElement
    const richTextElements = rootElement.querySelectorAll('.rich-text-element')
    let kernelRangeIndex = 0
    let kernelRangeLength = 0
    let index = 0
    for (const element of richTextElements) {
      const textNode = element.childNodes[0]
      if (textNode === startContainer) {
        kernelRangeIndex = index + startOffset
      }
      if (textNode === endContainer) {
        kernelRangeLength = index + endOffset - kernelRangeIndex
        break
      }
      index += textNode.length
    }
    return {
      index: kernelRangeIndex,
      length: kernelRangeLength,
    }
  }

  toRange(kernelRange) {
    const rootElement = this._kernel.rootElement
    const richTextElements = rootElement.querySelectorAll('.rich-text-element')
    let startNode = null
    let startOffset = 0
    let endNode = null
    let endOffset = 0
    let currentIndex = 0
    for (const element of richTextElements) {
      const textNode = element.childNodes[0]  // get TextNode
      const textLength = textNode.length
      if (!startNode && (currentIndex + textLength >= kernelRange.index)) {
        startNode = textNode
        startOffset = kernelRange.index - currentIndex
      }
      if (!endNode && (currentIndex + textLength) >= kernelRange.index + kernelRange.length) {
        endNode = textNode
        endOffset = kernelRange.index + kernelRange.length - currentIndex
      }
      currentIndex += textLength
      if (startNode && endNode) {
        break
      }
    }
    startNode = startNode ?? rootElement
    endNode = endNode ?? rootElement
    const range = new Range()
    range.setStart(startNode, startOffset)
    range.setEnd(endNode, endOffset)
    return range
  }

  setRange(range) {
    const selection = window.getSelection()
    const currentRange = selection.getRangeAt(0)
    selection.removeRange(currentRange)
    selection.addRange(range)
  }
}
