import React, {useState, useEffect, useRef} from 'react';
import './App.css';




function App() {

  const [messages, setMessages] = useState<Array<string>>([])

  const socket = useRef<WebSocket | null>(null)

  const [open, setOpen] = useState(false)

  const sendGreet = () => {
    if(socket.current) {
      const greet = "Greetings from client !"
      socket.current.send(greet)
      setMessages(prev => [...prev, greet]);
    }
  }

  useEffect(() => {
    console.log("useEffect !")

    socket.current = new WebSocket(`ws://${window.location.hostname}:8080`);
    socket.current.onmessage = (message) => {
        setMessages(prev => [...prev, message.data]);
    };
    socket.current.onopen = (() => {
      if(socket.current) {
        setOpen(true)
        console.log("Open !")
      }
    })

    return () => {if(socket.current) { socket.current.close() }};
}, []);

  console.log(open)


  return (
    <div className="App">
      <header className="App-header">
        <button onClick={sendGreet} disabled={!open}>
          Greet the server !
        </button>
        {messages.map((message)=> <p>{message}</p>)}
      </header>
    </div>
  );
}

export default App;
