const QRCode = require('qrcode')

const drawLogo = (src: any, canvas: any) => {
  const img = document.createElement('img')
  img.src = src
  img.width = canvas.width * 0.21
  img.height = canvas.height * 0.21

  const ctx = canvas.getContext('2d')
  const x = (canvas.width - img.width) / 2
  const y = (canvas.height - img.height) / 2
  ctx.drawImage(img, x, y, img.width, img.height)
}

const changeColor = (r: any, g: any, b: any, canvas: any) => {
	const ctx = canvas.getContext('2d')
	const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	for (var i = 0, ii = imgData.data.length; i < ii; i += 4) {
		imgData.data[i] = r | imgData.data[i];
		imgData.data[i + 1] = g | imgData.data[i + 1];
		imgData.data[i + 2] = b | imgData.data[i + 2];
	}
	ctx.putImageData(imgData, 0, 0);
	return canvas
};

export const createQrCode = async (text: any, options: any = {}) => {
  try {
    let canvas = await QRCode.toCanvas(text, { errorCorrectLevel: 'max', width: options.width || 350 })
		if (options.r || options.g || options.b)
			canvas = changeColor(options.r, options.g, options.b, canvas);
		if (options.logoPath)
      drawLogo(options.logoPath, canvas);
    return canvas.toDataURL()
  } catch (e) {
    console.log(e)
  }
}