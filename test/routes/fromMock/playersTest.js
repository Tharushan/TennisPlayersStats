const request = require('supertest');
const app = require('../../../index');

describe('json mock routes', () => {
  describe('List /players/ route', () => {
    it('should return 200', async () => {
      const res = await request(app).get('/api/fromMock/players');
      res.statusCode.should.eql(200);
    });
  });
  describe('Get /players/:id route', () => {
    it('should return 404', async () => {
      const res = await request(app).get('/api/fromMock/players/34334');
      res.statusCode.should.eql(404);
    });

    it('should return 200', async () => {
      const res = await request(app).get('/api/fromMock/players/17');
      res.statusCode.should.eql(200);
      res.body.id.should.eql(17);
    });
  });
});
