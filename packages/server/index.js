import express from 'express';
import ws_server from './ws/ws_server.js';

const app = express();
const port = 5000;

app.use(express.static('packages/app/build'));

app.get('/', function (req, res) {
  res.sendFile('packages/app/build', 'index.html');
});

console.log("running on port " + port)

ws_server()

app.listen(port);

