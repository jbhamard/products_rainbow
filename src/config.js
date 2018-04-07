import dotenv from 'dotenv'

dotenv.config()

const mongoConnexion = process.env.MONGO_CONNECTION

export { mongoConnexion }
