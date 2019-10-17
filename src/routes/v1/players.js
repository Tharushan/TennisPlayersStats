const routes = require('express').Router();
const PlayerController = require('../../controllers/PlayerController');

const data = require('../../../data/headtohead.json');

routes.get('/', (req, res) => {
  return res.status(200).json(PlayerController.sortPlayers(data.players));
});

routes.get('/:id', (req, res) => {
  const playerId = parseInt(req.params.id, 10);
  const player = PlayerController.findPlayerById(data.players, playerId);
  if (!player) {
    return res.status(404).json({});
  }
  return res.status(200).json(player);
});

module.exports = routes;
