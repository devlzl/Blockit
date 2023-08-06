import { doc } from './doc'


export class Text {
  static id = 0
  constructor(text='') {
    const yText = doc.getText(Text.id++)
    yText.insert(0, text)
    return yText
  }
}
