import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { TSocket } from './App';
import { loginMessage } from '../../utils/src/message';


const Login = ({ open, currentSocket }: { open: boolean, currentSocket: TSocket }) => {

  const [name, setName] = useState("")
  const [_, setCookie] = useCookies();

  const setUsername = () => {
    console.log(name)
    setCookie("name", name)
    if (open && currentSocket) {
      currentSocket.send(JSON.stringify(loginMessage(name)))
    }

  }


  return <div>
    <h2> Please login</h2>


    Enter your name:
    <input type="text" value={name} onChange={event => setName(event.target.value)} />
    <button onClick={setUsername} disabled={name === ''}>Go !</button>
  </div>
}

export default Login;