import Product from '../models/product'

const relatedProducts = product => {
  const color = product.labColor

  //all other products with a labColor attribute
  const matchQuery = {
    $and: [
      { id: { $ne: product.id } },
      {
        labColor: { $exists: true, $ne: [] }
      }
    ]
  }

  //distance expression from https://docs.mongodb.com/manual/reference/operator/aggregation/sqrt/#exp._S_sqrt
  return Product.aggregate()
    .match(matchQuery)
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

  //some products may not have a color attribute yet; return 404
  if (!product || !product.labColor || !product.labColor.length === 0) {
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
