import { EventService } from './service/EventService'
import { RangeService } from './service/RangeService'
import { AttributeService } from './service/AttributeService'
import { DeltaService } from './service/DeltaService'
import { EventEmitter } from '@store'


export class Kernel {
  constructor(yText) {
    this.yText = yText
    this.rootElement = null
    this.rangeService = new RangeService(this)
    this.eventService = new EventService(this)
    this.attributeService = new AttributeService(this)
    this.deltaService = new DeltaService(this)
    this.events = {
      deltaUpdate: new EventEmitter(),
      selectionChange: new EventEmitter(),
    }
    // 
    this.getKernelRange = this.rangeService.getKernelRange.bind(this.rangeService)
    this.setKernelRange = this.rangeService.setKernelRange.bind(this.rangeService)
    this.toKernelRange = this.rangeService.toKernelRange.bind(this.rangeService)
    this.toRange = this.rangeService.toRange.bind(this.rangeService)
    this.setRange = this.rangeService.setRange.bind(this.rangeService)
    this.getDeltas = this.deltaService.getDeltas.bind(this.deltaService)
    this.getDeltasByKernelRange = this.deltaService.getDeltasByKernelRange.bind(this.deltaService)
  }

  mount(rootElement) {
    this.yText.observe(() => {
      this.events.deltaUpdate.emit()
    })
    this.rootElement = rootElement
    this.rootElement.contentEditable = 'true'
    this.eventService.mount()
  }

  insertText(text, attribute, kernelRange) {
    this.yText.doc.transact(() => {
      const { index, length } = kernelRange
      this.yText.delete(index, length)
      this.yText.insert(index, text)
    })
  }

  deleteText(kernelRange) {
    this.yText.doc.transact(() => {
      const { index, length } = kernelRange
      this.yText.delete(index, length)
    })
  }

  formatText(kernelRange, format) {
    this.yText.doc.transact(() => {
      const { index, length } = kernelRange
      this.yText.format(index, length, format)
    })
  }

  toggleSelectedFormat(attributeName) {
    const kernelRange = this.getKernelRange()
    const deltas = this.getDeltasByKernelRange(kernelRange)
    const formatted = deltas.every(delta => delta.attributes?.[attributeName])
    this.formatText(kernelRange, {
      [attributeName]: !formatted,
    })
  }
}
