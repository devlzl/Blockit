export class DeltaService {
  constructor(kernel) {
    this._kernel = kernel
  }

  get deltas() {
    return this._kernel.yText.toDelta()
  }
}
