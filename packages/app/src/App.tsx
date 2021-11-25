import React, {useState, useEffect, useRef} from 'react';
import './App.css';




function App() {

  const [messages, setMessages] = useState<Array<string>>([])

  const socket = useRef<WebSocket | null>(null)

  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")

  const sendGreet = () => {
    if(socket.current) {
      const greet = "Greetings from client !"
      socket.current.send(greet)
      setMessages(prev => [...prev, greet]);
    }
  }

  const sendMessage = () => {
    if(socket.current) {
      socket.current.send(message)
      setMessages(prev => [...prev, message]);
      setMessage("")
    }
  }

  useEffect(() => {
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

          Your message:
          <input type="text" value={message} onChange={event => setMessage(event.target.value)} />
          <button onClick={sendMessage} disabled={!open}>Send !</button>



        {messages.map((message)=> <p>{message}</p>)}
      </header>
    </div>
  );
}

export default App;
