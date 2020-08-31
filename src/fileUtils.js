export const generateFile = (cruiseAltitude, cruiseKTAS, legs, checkpoints, frequencies, notes, origin, destination) =>
  ({
    blob: new Blob(
      [JSON.stringify({ cruiseAltitude, cruiseKTAS, legs, checkpoints, frequencies, notes, origin, destination })],
      { type: 'application/json' }
    ),
    fileName: `flightplan-${origin.replace(/\s/g, '')}-to-${destination.replace(/\s/g, '')}`
  })

export const downloadBlobAsFile = (blob, filename = `flightplan-${new Date().toString()}`) => {
  const contentType = 'application/octet-stream'
  if (!blob) {
    console.error(' No data')
    return
  }

  const e = document.createEvent('MouseEvents')
  const a = document.createElement('a')

  a.download = filename
  a.href = window.URL.createObjectURL(blob)
  a.dataset.downloadurl = [contentType, a.download, a.href].join(':')
  e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  a.dispatchEvent(e)
}
