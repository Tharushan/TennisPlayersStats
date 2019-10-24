const sinon = require('sinon');
const request = require('supertest');
const app = require('../../../index');
const PlayerController = require('../../../src/controllers/PlayerController');

describe('API routes', () => {
  let getPlayersFromAPI;
  beforeEach(() => {
    getPlayersFromAPI = sinon
      .stub(PlayerController, 'getPlayersFromAPI')
      .returns([{ id: 1 }, { id: 5 }]);
  });

  afterEach(() => {
    getPlayersFromAPI.restore();
  });
  describe('List /players/ route', () => {
    it('should return 200', async () => {
      const res = await request(app).get('/players');
      res.statusCode.should.eql(200);
      res.body.should.be.an.Array();
    });

    it('should return 500', async () => {
      getPlayersFromAPI.throws('Unexpected error');
      const res = await request(app).get('/players');
      res.statusCode.should.eql(500);
    });
  });
  describe('Get /players/:id route', () => {
    it('should return 404', async () => {
      const res = await request(app).get('/players/34334');
      res.statusCode.should.eql(404);
    });

    it('should return 200', async () => {
      const res = await request(app).get('/players/5');
      res.statusCode.should.eql(200);
      res.body.id.should.eql(5);
    });

    it('should return 500', async () => {
      getPlayersFromAPI.throws('Unexpected error');
      const res = await request(app).get('/players/5');
      res.statusCode.should.eql(500);
    });
  });
});
