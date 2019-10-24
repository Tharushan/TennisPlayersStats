const sinon = require('sinon');
const should = require('should');
const PlayerController = require('../../src/controllers/PlayerController');

describe('Unit tests', () => {
  let players;
  describe('PlayerController', () => {
    beforeEach(() => {
      players = [{ id: 5 }, { id: 3 }, { id: 8, name: 'Tharu' }];
    });

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
        PlayerController.sortPlayers(players).should.eql([
          { id: 3 },
          { id: 5 },
          { id: 8, name: 'Tharu' }
        ]);
      });
    });

    describe('PlayerController.findPlayerById(players, id)', () => {
      it('should find player id 8', () => {
        PlayerController.findPlayerById(players, 8).should.eql({
          id: 8,
          name: 'Tharu'
        });
      });

      it('should not find player id 9', () => {
        should.not.exist(PlayerController.findPlayerById(players, 9));
      });
    });

    describe('PlayerController.getPlayersFromAPI()', () => {
      it('should return empty players array', async () => {
        const requestManager = sinon
          .stub(PlayerController.requestManager, 'get')
          .resolves({ data: {} });
        const playersFromAPI = await PlayerController.getPlayersFromAPI();
        requestManager.calledOnce.should.be.true();
        requestManager.restore();
        playersFromAPI.should.eql([]);
      });

      it('should return  players array', async () => {
        const requestManager = sinon
          .stub(PlayerController.requestManager, 'get')
          .resolves({ data: { players: [{ id: 1 }, { id: 3 }] } });
        const playersFromApi = await PlayerController.getPlayersFromAPI();
        requestManager.calledOnce.should.be.true();
        requestManager.restore();
        playersFromApi.should.eql([{ id: 1 }, { id: 3 }]);
      });
    });

    describe('PlayerController.getPlayersFromJson()', () => {
      it('should return single player object', async () => {
        const playersFromJson = await PlayerController.getPlayersFromJson();
        playersFromJson.should.be.an.Object();
      });
    });
  });
});
