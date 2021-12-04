import React, { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import Login from './Login';

import { IMessage, createMessage, loginKey } from '../../utils/src/message';

export type TSocket = WebSocket | null


const App = function () {
  const [messagesLocalHistory, setMessagesLocalHistory] = useState<IMessage[]>([]);
  const socket = useRef<TSocket>(null);

  const [open, setOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [cookie] = useCookies();
  const userName = cookie?.name;
  const [loginStatus, setLoginStatus] = useState(false)

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
      const parsedMessage = JSON.parse(receivedMessage.data)
      const { message, loginStatus } = parsedMessage
      if (message === loginKey && loginStatus) {
        console.log("You're logged in !!")
        setLoginStatus(true)
      }
      else {
        setMessagesLocalHistory((prev) => [...prev, parsedMessage]);
      }
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
        userName && loginStatus

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
                  <p key={message.date}>
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
          : <Login open={open} currentSocket={socket.current} />
      }
    </div>
  );
};

export default App;
