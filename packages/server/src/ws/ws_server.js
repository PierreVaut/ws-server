import WebSocket, { WebSocketServer } from 'ws';
import { createMessage, loginKey, validLoginResponse } from '@ws-server/utils';

const ws_server = () => {
  const wss = new WebSocketServer({ port: 8080, clientTracking: true });
  console.log('wss start !');

  wss.on('connection', (ws) => {
    ws.on('message', (data, isBinary) => {
      const { message, userName } = JSON.parse(data)

      if ((message).toLowerCase().includes('greet')) {
        ws.send(JSON.stringify(createMessage('Hello from server !', 'server')));
      }
      else if (message == loginKey) {
        console.log("login from  " + userName)
        ws.send(JSON.stringify(validLoginResponse()));
      }
      else {
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
