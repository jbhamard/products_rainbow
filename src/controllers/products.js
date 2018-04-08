import Product from '../models/product'

const aggregate = async productId => {
  const p = await Product.findOne({ id: productId })
  const color = p.labColor

  //distance expression from https://docs.mongodb.com/manual/reference/operator/aggregation/sqrt/#exp._S_sqrt
  return Product.aggregate()
    .match({ id: { $ne: productId } })
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

const related = (req, res, next) => {
  aggregate(req.params.id)
    .then(products => {
      res.status(200)
      res.json(products)
    })
    .catch(next)
}

export { related }
