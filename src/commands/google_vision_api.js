import rp from 'request-promise-native'
import { rgb2lab } from 'colour-proximity'
import * as config from '../config'

const _googleVisionUrl = `${config.googleVisionApiUrl}?key=${
  config.googleVisionApiKey
}`

const _imageRequest = product => {
  return {
    image: {
      source: {
        imageUri: `http:${product.photo}`
      }
    },
    features: [
      {
        type: 'IMAGE_PROPERTIES'
      }
    ]
  }
}

const dominantColors = async products => {
  let options = {
    method: 'POST',
    uri: _googleVisionUrl,
    body: {
      requests: products.map(_imageRequest)
    },
    json: true
  }

  let googleResponse = await rp(options)

  return googleResponse.responses.map((r, i) => {
    let product = products[i]
    if (r.error) {
      //skip; some images are not accessible sometimes ...
      return product
    } else {
      let googleRgb = r.imagePropertiesAnnotation.dominantColors.colors[0].color
      let rgb = [googleRgb.red, googleRgb.green, googleRgb.blue]
      product.rgbColor = rgb
      product.labColor = rgb2lab(rgb)
      return product
    }
  })
}

export { dominantColors }
