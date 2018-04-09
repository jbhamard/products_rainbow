import dotenv from 'dotenv'

dotenv.config()

const mongoConnexion = process.env.MONGO_CONNECTION
const googleVisionApiUrl = process.env.GOOGLE_API_VISION_URL
const googleVisionApiKey = process.env.GOOGLE_API_KEY
const nodePort = process.env.NODE_PORT
const nodeEnv = process.env.NODE_ENV

export {
  mongoConnexion,
  googleVisionApiUrl,
  googleVisionApiKey,
  nodePort,
  nodeEnv
}
