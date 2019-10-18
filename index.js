const app = require('express')();
const { port, host } = require('config');

const PORT = process.env.PORT || port;
const HOST = process.env.HOST || host;
const fromMock = require('./src/routes/fromMock/players');
const fromApi = require('./src/routes/fromApi/players');

app.use('/api/fromMock/players', fromMock);
app.use('/players', fromApi);
app.listen(PORT, HOST, () => {
  console.log('App listening on %s:%i', HOST, PORT);
});

module.exports = app;
