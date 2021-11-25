import WebSocket, { WebSocketServer } from 'ws';

const ws_server = () => {
  const wss = new WebSocketServer({ port: 8080, clientTracking: true });
  console.log("wss start !")

  wss.on('connection', function connection(ws, req, client) {
    console.log("connection - " + client)

    ws.on('message', function message(data, isBinary) {
      console.log("message :" + data)
      ws.send("Hello from server")

    });
  });
}

export default ws_server;