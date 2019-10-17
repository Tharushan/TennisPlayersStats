const app = require('express')();
const { port, host } = require('config');
const v1 = require('./src/routes/v1/players');
const v2 = require('./src/routes/v2/players');

app.use('/api/v1/players', v1);
app.use('/players', v2);
app.listen(port, host, () => {
  console.log('App listening on %s:%i', host, port);
});
