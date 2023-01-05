export function blobToString(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => {
      const result = e.target.result
      const res = result
        .split('')
        .map(w => w.charCodeAt())
        .map(d => d.toString(16).toUpperCase())
        .map(v => v.padStart(2, '0'))
        .join(' ')
      resolve(res)
    }
    reader.readAsBinaryString(blob)
  })
}

export async function isGIF(file) {
  const ret = await blobToString(file.slice(0, 6))
  return ret === '47 49 46 38 39 61' || ret === '47 49 46 38 37 61'
}

export async function isPNG(file) {
  const ret = await blobToString(file.slice(0, 8))
  return ret === '89 50 4E 47 0D 0A 1A 0A'
}

export async function isJPG(file) {
  const len = file.size
  const start = await this.blobToString(file.slice(0, 2))
  const tail = await this.blobToString(file.slice(-2, len))
  return start === 'FF D8' && tail === 'FF D9'
}

export async function isImage(file) {
  return (await isGIF(file)) || (await isPNG(file)) || (await isJPG(file))
}
