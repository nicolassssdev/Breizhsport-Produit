const request = require('supertest')
const app = require('../../src/app')


describe('Get Endpoints', () => {
  it('should return product', async () => {
    const res = await request(app)
      .get('/product')
    expect(res.statusCode).toEqual(200)
    res.body.forEach((product) => {
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('prix');
      expect(product).toHaveProperty('stock');
    });
  })
})