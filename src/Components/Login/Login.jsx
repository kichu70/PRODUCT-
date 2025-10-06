import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import {useAuth} from  "../../Context/Auth"
import "./Login.css"

const Login = () => {
  const {login}= useAuth();
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")

    const handleLogin =(e)=>{
        login(username,password)
        e.preventDefault();
    }
  return (
    <div className='login'>
      <form>
        <h1>Login Page</h1>
      <div className="login-sub">
                <TextField
          error
          id="standard-error"
          label="username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}

          variant="standard"
        />
                <TextField
          error
          id="standard-error"
          label="password"
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
          variant="standard"
        />
        <Button type='submit' variant='contained' onClick={handleLogin}> login</Button>
      </div>
      </form>
    </div>
  )
}

export default Login
