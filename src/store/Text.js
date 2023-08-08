import * as Y from 'yjs'


export class Text {
  constructor(text='') {
    const yText = new Y.Text()
    yText.insert(0, text)
    return yText
  }
}
