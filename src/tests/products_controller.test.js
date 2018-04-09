import request from 'supertest'
import app from '../server.js'
import Product from '../models/product'

describe('products related route', () => {
  test('It should should response with 404 when product cannot be found', async () => {
    //mock Product.findOne() to return null, not_found
    Product.findOne = jest.fn().mockImplementation(() => Promise.resolve(null))
    expect.assertions(1)
    const response = await request(app).get('/products/not_found_id/related')
    expect(response.statusCode).toBe(404)
  })
})
