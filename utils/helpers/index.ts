const getPath = (file: File) => {
  const path = URL.createObjectURL(file)
  return path
}

const getImageDimensions = (file: File, callback: Function) => {
  const img = new Image()

  img.onload = () => {
    const width = img.width
    const height = img.height
    callback(null, { width, height })
  }

  img.onerror = () => {
    callback(new Error('Не вдалося завантажити зображення.'))
  }

  img.src = URL.createObjectURL(file)
}

export { getPath, getImageDimensions }
