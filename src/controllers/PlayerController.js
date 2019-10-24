const axios = require('axios');
const { API_URL } = require('config');
const playersJson = require('../../data/headtohead.json');

class PlayerController {
  static get requestManager() {
    if (!PlayerController._requestManager) {
      PlayerController._requestManager = axios;
    }
    return PlayerController._requestManager;
  }

  static sortPlayers(players) {
    return players.sort((a, b) => (a.id >= b.id ? 1 : -1));
  }

  static findPlayerById(players, id) {
    return players.find(player => player.id === id);
  }

  static async getPlayersFromAPI() {
    const {
      data: { players }
    } = await PlayerController.requestManager.get(API_URL);
    return players || [];
  }

  static getPlayersFromJson() {
    return playersJson;
  }
}

module.exports = PlayerController;
