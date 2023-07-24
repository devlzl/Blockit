export class EventEmitter {
  constructor() {
    this.id = 0
    this.callbacks = {}
  }

  _cancel(id) {
    return () => {
      delete this.callbacks[id]
    }
  }

  on(callback) {
    this.callbacks[this.id] = callback
    return this._cancel(this.id++)
  }

  once(callback) {
    // todo
  }

  emit(data) {
    Object.values(this.callbacks).forEach(callback => callback(data))
  }
}
