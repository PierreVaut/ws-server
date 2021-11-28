import WebSocket, { WebSocketServer } from 'ws';
import { createMessage } from '@ws-server/utils';

const ws_server = () => {
  const wss = new WebSocketServer({ port: 8080, clientTracking: true });
  console.log('wss start !');

  wss.on('connection', (ws) => {
    ws.on('message', (data, isBinary) => {
      console.log(`message :${data}`);
      if ((`${data}`).toLowerCase().includes('greet')) {
        ws.send(JSON.stringify(createMessage('Hello from server !', 'server')));
      } else {
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data, { binary: isBinary });
          }
        });
      }
    });
  });
};

export default ws_server;
