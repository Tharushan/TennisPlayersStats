const sinon = require('sinon');
const request = require('supertest');
const app = require('../../../index');
const PlayerController = require('../../../src/controllers/PlayerController');

describe('Unit tests', () => {
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
      it('should return 200', () => {
        request(app)
          .get('/players')
          .end((err, res) => {
            if (err) throw err;
            res.statusCode.should.eql(200);
            res.body.should.be.an.Array();
          });
      });

      it('should return 500', () => {
        getPlayersFromAPI.throws('Unexpected error');
        request(app)
          .get('/players')
          .end((err, res) => {
            if (err) throw err;
            res.statusCode.should.eql(500);
          });
      });
    });
    describe('Get /players/:id route', () => {
      it('should return 404', () => {
        request(app)
          .get('/players/34334')
          .end((err, res) => {
            if (err) throw err;
            res.statusCode.should.eql(404);
          });
      });

      it('should return 200', () => {
        request(app)
          .get('/players/5')
          .end((err, res) => {
            if (err) throw err;
            res.statusCode.should.eql(200);
            res.body.id.should.eql(5);
          });
      });

      it('should return 500', () => {
        getPlayersFromAPI.throws('Unexpected error');
        request(app)
          .get('/players/5')
          .end((err, res) => {
            if (err) throw err;
            res.statusCode.should.eql(500);
          });
      });
    });
  });
});
