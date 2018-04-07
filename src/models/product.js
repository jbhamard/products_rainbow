import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  title: { type: String },
  gender_id: { type: String },
  composition: { type: String },
  sleeve: { type: String },
  photo: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  color: { type: String }
})

const Product = mongoose.model('Product', productSchema)

export default Product
