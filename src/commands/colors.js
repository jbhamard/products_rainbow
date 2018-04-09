import Product from '../models/product'
import { dominantColors } from './google_vision_api'
import { mergeMap, catchError, bufferCount, mergeAll } from 'rxjs/operators'
import { streamToRx } from 'rxjs-stream'

const saveProduct = product => product.save()

const _setColors = (resolve, reject) => {
  let readCursor = Product.find({
    labColor: { $exists: true, $ne: [] }
  }).cursor()

  streamToRx(readCursor)
    .pipe(
      bufferCount(5),
      mergeMap(dominantColors, null, 5),
      mergeAll(),
      mergeMap(saveProduct),
      catchError(reject) //interrupt command if error
    )
    .finally(() => {
      resolve('done')
    })
    .subscribe()
}

const set = () => new Promise((resolve, reject) => _setColors(resolve, reject))

export { set }
