import WebSocket, { WebSocketServer } from 'ws';

const ws_server = () => {
  const wss = new WebSocketServer({ port: 8080 });
  console.log("wss start !")

  wss.on('connection', function connection(ws) {
    console.log("connection !")

    ws.on('message', function message(data, isBinary) {
      console.log("message :" + data)

      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data, { binary: isBinary });
        }
      });
    });
  });
}

export default ws_server;