const sinon = require('sinon');
const should = require('should');
const PlayerController = require('../../src/controllers/PlayerController');

describe('Unit tests', () => {
  describe('PlayerController', () => {
    describe('PlayerController.requestManager', () => {
      it('should return requestManager object', () => {
        PlayerController.requestManager.should.be.a.Function();
      });

      it('should return requestManager string', () => {
        PlayerController._requestManager = 'requestManager';
        PlayerController.requestManager.should.eql('requestManager');
        PlayerController._requestManager = undefined; // To reset it
      });
    });

    describe('PlayerController.sortPlayers(players)', () => {
      it('should sort by id', () => {
        const players = [{ id: 5 }, { id: 3 }, { id: 8 }];
        PlayerController.sortPlayers(players).should.eql([
          { id: 3 },
          { id: 5 },
          { id: 8 }
        ]);
      });
    });

    describe('PlayerController.findPlayerById(players, id)', () => {
      it('should find player id 8', () => {
        const players = [{ id: 5 }, { id: 3 }, { id: 8, name: 'Tharu' }];
        PlayerController.findPlayerById(players, 8).should.eql({
          id: 8,
          name: 'Tharu'
        });
      });

      it('should not find player id 9', () => {
        const players = [{ id: 5 }, { id: 3 }, { id: 8, name: 'Tharu' }];
        should.not.exist(PlayerController.findPlayerById(players, 9));
      });
    });

    describe('PlayerController.getPlayersFromAPI()', () => {
      it('should return empty players array', async () => {
        const requestManager = sinon
          .stub(PlayerController.requestManager, 'get')
          .resolves({ data: {} });
        const players = await PlayerController.getPlayersFromAPI();
        requestManager.calledOnce.should.be.true();
        requestManager.restore();
        players.should.eql([]);
      });

      it('should return  players array', async () => {
        const requestManager = sinon
          .stub(PlayerController.requestManager, 'get')
          .resolves({ data: { players: [{ id: 1 }, { id: 3 }] } });
        const players = await PlayerController.getPlayersFromAPI();
        requestManager.calledOnce.should.be.true();
        requestManager.restore();
        players.should.eql([{ id: 1 }, { id: 3 }]);
      });
    });

    describe('PlayerController.getPlayersFromJson()', () => {
      it('should return players array', async () => {
        const players = await PlayerController.getPlayersFromJson();
        players.should.be.an.Object();
      });
    });
  });
});
