const app = require('express')();
const { port, host } = require('config');

const PORT = process.env.PORT || port;
const HOST = process.env.HOST || host;
const v1 = require('./src/routes/v1/players');
const v2 = require('./src/routes/v2/players');

app.use('/api/v1/players', v1);
app.use('/players', v2);
app.listen(PORT, HOST, () => {
  console.log('App listening on %s:%i', HOST, PORT);
});
