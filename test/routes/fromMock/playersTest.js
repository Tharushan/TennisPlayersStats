const request = require('supertest');
const app = require('../../../index');

describe('Unit tests', () => {
  describe('json mock routes', () => {
    describe('List /players/ route', () => {
      it('should return 200', () => {
        request(app)
          .get('/api/fromMock/players')
          .end((err, res) => {
            if (err) throw err;
            res.statusCode.should.eql(200);
          });
      });
    });
    describe('Get /players/:id route', () => {
      it('should return 404', () => {
        request(app)
          .get('/api/fromMock/players/34334')
          .end((err, res) => {
            if (err) throw err;
            res.statusCode.should.eql(404);
          });
      });

      it('should return 200', () => {
        request(app)
          .get('/api/fromMock/players/17')
          .end((err, res) => {
            if (err) throw err;
            res.statusCode.should.eql(200);
            res.body.id.should.eql(17);
          });
      });
    });
  });
});
