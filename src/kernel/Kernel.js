import { EventService } from './service/EventService'
import { RangeService } from './service/RangeService'
import { AttributeService } from './service/AttributeService'
import { DeltaService } from './service/DeltaService'
import { EventEmitter } from '../store/EventEmitter'


export class Kernel {
  constructor(yText) {
    this.yText = yText
    this.rootElement = null
    this.rangeService = new RangeService(this)
    this.eventService = new EventService(this)
    this.attributeService = new AttributeService(this)
    this.deltaService = new DeltaService(this)
    this.events = {}
    // 
    this.getKernelRange = () => this.rangeService.getKernelRange()
    this.setKernelRange = (kernelRange) => this.rangeService.setKernelRange(kernelRange)
    this.toKernelRange = (range) => this.rangeService.toKernelRange(range)
    this.toRange = (kernelRange) => this.rangeService.toRange(kernelRange)
  }

  mount(rootElement) {
    this.yText.observe(() => {
      this.deltaService.render()
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
}
