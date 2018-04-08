import dotenv from 'dotenv'

dotenv.config()

const mongoConnexion = process.env.MONGO_CONNECTION
const googleVisionApiUrl = process.env.GOOLGE_API_VISION_URL
const googleVisionApiKey = process.env.GOOGLE_API_KEY
const nodePort = process.env.NODE_PORT

export { mongoConnexion, googleVisionApiUrl, googleVisionApiKey, nodePort }
