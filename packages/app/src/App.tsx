import React, { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import Login from './Login';

import { IMessage, createMessage } from '../../utils/src/message';

const App = function () {
  const [messagesLocalHistory, setMessagesLocalHistory] = useState<IMessage[]>([]);
  const socket = useRef<WebSocket | null>(null);

  const [open, setOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [cookie] = useCookies();
  const userName = cookie?.name;

  const sendGreet = () => {
    if (socket.current) {
      const greet = createMessage('Greetings from client !', userName);
      socket.current.send(JSON.stringify(greet));
      setMessagesLocalHistory((prev) => [...prev, greet]);
    }
  };

  const sendMessage = () => {
    if (socket.current) {
      const message = createMessage(currentMessage, userName);
      socket.current.send(JSON.stringify(message));
      setMessagesLocalHistory((prev) => [...prev, message]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.current = new WebSocket(`ws://${window.location.hostname}:8080`);
    socket.current.onmessage = (receivedMessage) => {
      setMessagesLocalHistory((prev) => [...prev, receivedMessage.data]);
    };
    socket.current.onopen = (() => {
      if (socket.current) {
        setOpen(true);
        console.log('Open !');
      }
    });

    return () => { if (socket.current) { socket.current.close(); } };
  }, []);

  return (
    <div className="App">
      {
        userName

          ? (
            <div>

              <button onClick={sendGreet}>
                Greet the server!
              </button>

              Your message:
              <input type="text" value={currentMessage} onChange={(event) => setCurrentMessage(event.target.value)} />
              <button onClick={sendMessage} disabled={!open}> Send! </button>

              {
                messagesLocalHistory.map((message) => (
                  <p>
                    {
                      new Date(message.date).toLocaleTimeString()
                    }
                    {' '}
                    :
                    {message.userName}
                    {' '}
                    -
                    {message.message}
                  </p>
                ))
              }
            </div>
          )
          : <Login />
      }
    </div>
  );
};

export default App;
