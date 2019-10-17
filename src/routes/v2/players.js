const routes = require('express').Router();
const PlayerController = require('../../controllers/PlayerController');

routes.get('/', async (req, res) => {
  try {
    const players = await PlayerController.getPlayersFromAPI();
    return res.status(200).json(PlayerController.sortPlayers(players));
  } catch (error) {
    console.error('Failed to fetch players %j', error);
    return res.status(500).json({});
  }
});

routes.get('/:id', async (req, res) => {
  try {
    const players = await PlayerController.getPlayersFromAPI();
    const playerId = parseInt(req.params.id, 10);
    const player = PlayerController.findPlayerById(players, playerId);
    if (!player) {
      return res.status(404).json({});
    }
    return res.status(200).json(player);
  } catch (error) {
    console.error('Failed to fetch players %j', error);
    return res.status(500).json({});
  }
});

module.exports = routes;
