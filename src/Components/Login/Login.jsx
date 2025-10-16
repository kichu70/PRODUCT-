import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import "./Login.css"
import axios from 'axios';
import { useAuth } from '../../auth/Authcontext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
const[username,setUsername]=useState("")
const[email,setEmail]=useState("")
const[password,setPassword]=useState("")
const{login}=useAuth()
const navigate =useNavigate()
  const handleLogin=async(e)=>{
    e.preventDefault();
   login(email,password)
   const token =localStorage.getItem("token")
   if(token){
    navigate("/")
    console.log("hello")
   }
  }
  return (
    <div className='login'>
      <form>
        <h1>Login Page</h1>
      <div className="login-sub">
                <TextField
          error
          id="standard-error"
          label="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}

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
