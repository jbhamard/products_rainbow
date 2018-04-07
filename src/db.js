import mongoose from 'mongoose'
import * as config from './config'

const connect = () => {
  mongoose.Promise = global.Promise
  mongoose.connect(config.mongoConnexion).catch(err => console.log(err))
  mongoose.connection.on('error', err => {
    console.log('mongodb_connection_error')
    console.log(err)
  })
}

export { connect }
