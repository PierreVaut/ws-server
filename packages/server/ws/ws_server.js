import WebSocket, { WebSocketServer } from 'ws';

const ws_server = () => {
  const wss = new WebSocketServer({ port: 8080, clientTracking: true });
  console.log("wss start !")

  wss.on('connection', function connection(ws, req, client) {

    ws.on('message', function message(data, isBinary) {
      console.log("message :" + data)
      if(data.includes("greet")){
        ws.send("Hello from server")
      } else{
        wss.clients.forEach(function each(client) {
          console.log("client - " + client)
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data, { binary: isBinary });
          }
        });

      }

    });
  });
}

export default ws_server;