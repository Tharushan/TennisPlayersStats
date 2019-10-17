const axios = require('axios');

class PlayerController {
  static get requestManager() {
    if (!this._requestManager) {
      this._requestManager = axios;
    }
    return this._requestManager;
  }

  static sortPlayers(players) {
    return players.sort((a, b) => a.id > b.id);
  }

  static findPlayerById(players, id) {
    return players.find(player => player.id === id);
  }
}

module.exports = PlayerController;
