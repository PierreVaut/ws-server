import express from 'express';
import ws_server from './ws/ws_server.js';

const app = express();
const port = 3000;

app.use(express.static('../../packages/app/build'));

app.get('/', (req, res) => {
  res.sendFile('packages/app/build/index.html', { root: '../..' });
});

console.log(`running on port ${port}`);

ws_server();

app.listen(port);
