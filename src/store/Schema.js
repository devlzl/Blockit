class Schema {
  constructor(config) {
    const { type, props, metadata } = config
    this.type = type
    this.props = props
    this.metadata = metadata
  }
}


export function defineBlockSchema(config) {
  return new Schema(config)
}
