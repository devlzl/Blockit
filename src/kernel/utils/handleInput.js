function handleInsertText(kernel, data) {
  kernel.setKernelRange({
    index: kernel.getKernelRange().index + data.length,
    length: 0,
  })
  kernel.insertText(data, {}, kernel.getKernelRange())
}

function handleDeleteContentBackward() {
  
}

function handleDeleteContentForward() {
  
}

function handleDeleteWordBackward() {
  
}

function handleDeleteWordForward() {
  
}

export function handleInput(inputType, data, kernel) {
  const handlers = {
    insertText:             handleInsertText,
    deleteContentBackward:  handleDeleteContentBackward,
    deleteContentForward:   handleDeleteContentForward,
    deleteWordBackward:     handleDeleteWordBackward,
    deleteWordForward:      handleDeleteWordForward,
  }
  handlers[inputType](kernel, data)
}
