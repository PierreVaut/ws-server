import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

const Login = () => {

  const [name, setName] = useState("")
  const [_, setCookie] = useCookies();


  return <div>
    <h2> Please login</h2>


    Enter your name:
    <input type="text" value={name} onChange={event => setName(event.target.value)} />
    <button onClick={() => setCookie("name", name)} disabled={!name}>Go !</button>
  </div>
}

export default Login;