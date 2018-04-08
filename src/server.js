import express from 'express'
import * as config from './config'
import * as db from './db'
import * as controllers from './controllers'

// Initialize the app
const app = express()
db.connect()

app.get('/products/:id/related', controllers.products.related)

app.use((err, req, res, next) => {
  res.status(500)
  res.json({
    error: err
  })
})

let server = app.listen(config.nodePort, () => {
  console.log(`Server is UP and listening on ${config.nodePort}`)
})

process.on('SIGINT', () => {
  server.close(() => {
    console.log('SIGINT EXIT Closed out remaining connections.')
    db.close()
    setTimeout(() => {
      process.exit(0)
    }, 100)
  })
})
