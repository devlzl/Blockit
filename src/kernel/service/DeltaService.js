export class DeltaService {
  constructor(kernel) {
    this._kernel = kernel
  }

  getDeltas() {
    return this._kernel.yText.toDelta()
  }

  getDeltasByKernalRange(kernelRange) {
    const { index, length } = kernelRange
    const result = []
    let currentIndex = 0
    for (const delta of this.getDeltas()) {
      const deltaIndex = [currentIndex, currentIndex + delta.insert.length]
      if (deltaIndex[1] > index && deltaIndex[0] < index + length) {
        result.push(delta)
      }
      currentIndex += delta.insert.length
    }
    return result
  }
}
