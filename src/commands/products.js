import csv from 'fast-csv'
import request from 'request'
import Product from '../models/product'

const _saveProducts = products => {
  return products.reduce((promise, product) => {
    return promise.then(() => product.save()).catch(err => {
      console.log(`product ${product.id} save error : ${err.message}`)
    })
  }, Promise.resolve())
}

const _loadCsv = (catalogUrl, resolve, reject) => {
  let products = []

  let csvStream = csv({ headers: true, delimiter: ';' })
    .on('data', data => products.push(new Product(data)))
    .on('end', () => resolve(products))
    .on('error', err => {
      reject(err)
    })

  try {
    request
      .get(catalogUrl)
      .on('response', function(resp) {
        if (resp.statusCode !== 200) {
          this.emit(
            'error',
            Error(`csv_download_failed_with_http_status ${resp.statusCode}`)
          )
        }
      })
      .on('error', function(err) {
        reject(err)
      })
      .pipe(csvStream)
  } catch (err) {
    reject(err)
  }
}

const load = catalogUrl =>
  new Promise((resolve, reject) => _loadCsv(catalogUrl, resolve, reject)).then(
    _saveProducts
  )

export { load }
