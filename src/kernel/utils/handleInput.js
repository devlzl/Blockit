function handleInsertText(kernel, data) {
  kernel.setKernelRange({
    index: kernel.getKernelRange().index + data.length,
    length: 0,
  })
  kernel.insertText(data, {}, kernel.getKernelRange())
}

function handleInsertParagraph(kernel, data) {
  const { index } = kernel.getKernelRange()
  kernel.setKernelRange({
    index: kernel.getKernelRange().index,
    length: 0,
  })
  const slicedString = kernel.yText.toString().slice(index)
  kernel.deleteText({
    index: index,
    length: slicedString.length,
  })
  kernel.events.lineBreak.emit(slicedString)
}

function handleDeleteContentBackward(kernel, data) {
  const { index, length } = kernel.getKernelRange()
  if (index === 0) {
    return
  }
  if (length > 0) {
    kernel.setKernelRange({
      index: index,
      length: 0,
    })
    kernel.deleteText({ index, length })
    return
  } else {
    const originalString = kernel.yText.toString().slice(0, index)
    const segments = [...new Intl.Segmenter().segment(originalString)]
    const deletedLength = segments[segments.length - 1].segment.length
    kernel.setKernelRange({
      index: index - deletedLength,
      length: 0,
    })
    kernel.deleteText({
      index: index - deletedLength,
      length: deletedLength,
    })
  }
}

function handleDeleteContentForward(kernel, data) {
  const { index, length } = kernel.getKernelRange()
  if (index === kernel.yText.toString().length) {
    return
  }
  if (length > 0) {
    kernel.setKernelRange({
      index: index,
      length: 0,
    })
    editor.deleteText({ index, length })
  } else {
    const originalString = kernel.yText.toString()
    const segments = [...new Intl.Segmenter().segment(originalString)]
    const slicedString = originalString.slice(0, index)
    const slicedSegments = [...new Intl.Segmenter().segment(slicedString)]
    const deletedLength = segments[slicedSegments.length].segment.length
    kernel.setKernelRange({
      index: index,
      length: 0,
    })
    kernel.deleteText({
      index: index,
      length: deletedLength,
    })
  }
}

function handleDeleteWordBackward(kernel, data) {
  const { index, length } = kernel.getKernelRange()
  const result = /\S+\s*$/.exec(kernel.yText.toString().slice(0, index))?.[0]
  if (result) {
    const deletedLength = result.length
    kernel.setKernelRange({
      index: index - deletedLength,
      length: 0,
    })
    kernel.deleteText({
      index: index - deletedLength,
      length: deletedLength,
    })
  }
}

function handleDeleteWordForward(kernel, data) {
  const { index, length } = kernel.getKernelRange()
  const result = /^\s*\S+/.exec(kernel.yText.toString().slice(index))?.[0]
  if (result) {
    const deletedLength = result.length
    kernel.setKernelRange({
      index: index,
      length: 0,
    })
    kernel.deleteText({
      index: index,
      length: deletedLength,
    })
  }
}

function handleDeleteSoftLineBackward(kernel, data) {
  const { index, length } = kernel.getKernelRange()
  if (length > 0) {
    kernel.setKernelRange({
      index: index,
      length: 0,
    })
    kernel.deleteText({
      index: index,
      length: length,
    })
  } else {
    kernel.setKernelRange({
      index: 0,
      length: 0,
    })
    kernel.deleteText({
      index: 0,
      length: index,
    })
  }
}

export function handleInput(inputType, data, kernel) {
  const handlers = {
    insertText:             handleInsertText,
    insertParagraph:        handleInsertParagraph,
    deleteContentBackward:  handleDeleteContentBackward,
    deleteContentForward:   handleDeleteContentForward,
    deleteWordBackward:     handleDeleteWordBackward,
    deleteWordForward:      handleDeleteWordForward,
    deleteSoftLineBackward: handleDeleteSoftLineBackward,
  }
  handlers[inputType](kernel, data)
}
