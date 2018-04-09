import Product from '../models/product'

const relatedProducts = product => {
  const color = product.labColor
  //distance expression from https://docs.mongodb.com/manual/reference/operator/aggregation/sqrt/#exp._S_sqrt
  return Product.aggregate()
    .match({ id: { $ne: product.id } })
    .addFields({
      colorProximity: {
        $sqrt: {
          $add: [
            { $pow: [{ $subtract: [color[0], '$color[0]'] }, 2] },
            { $pow: [{ $subtract: [color[1], '$color[1]'] }, 2] },
            { $pow: [{ $subtract: [color[2], '$color[1]'] }, 2] }
          ]
        }
      }
    })
    .sort({ colorProximity: 'desc' })
    .limit(5)
    .project('id title gender_id composition sleeve photo url -_id')
}

const related = async (req, res, next) => {
  const product = await Product.findOne({ id: req.params.id })
  if (!product) {
    res.sendStatus(404)
  } else {
    relatedProducts(product)
      .then(products => {
        res.status(200)
        res.json(products)
      })
      .catch(next)
  }
}

export { related }
