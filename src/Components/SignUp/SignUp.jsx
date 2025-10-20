import React, { useState } from "react";
import { TextField, Button, Typography, Link } from "@mui/material";
import "./SignUp.css"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SignUp = () => {
    const navigate =useNavigate()
    const[username,setUsername]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[conformpassword,setConformpassword]=useState('')
    const[savePassword,setSavePassword]=useState('')
    const token =localStorage.getItem("token")


    
    
    
    
    
    const addUser=async(e) => {
        try{
            e.preventDefault();
            if(password!==conformpassword)
            {
                return toast.error("passwords dont match")
            }
          
            const res =await axios.post("https://backendofproducts.onrender.com/user/add-user",
                {
                    username,
                    email,
                    password
                },
                {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            console.log("added user", res.data)
            setConformpassword('')
            setEmail('')
            setUsername('')
            setPassword('')
            setSavePassword('')
            navigate('/')
        }
        catch(err){
            if(err.response){
                const errors=err.response.data.msg
                for(const key in errors){
                    if(errors.hasOwnProperty(key)){
                         toast.error(errors[key])
                    }
                }
            }
            else{
                console.error(err,"error in the sigup page")
                toast.error("sothing went wrong in the adding product")
            }
        }
    }






  return (
    <div className="signup-container">
      <div className="signup-box">
        <Typography variant="h5" gutterBottom className="signup-title">
          Create your account
        </Typography>
        <form className="signup-form">
          <TextField onChange={(e)=>setUsername(e.target.value)} label="Username" fullWidth margin="normal" variant="outlined" />
          <TextField className="email" onChange={(e)=>setEmail(e.target.value)} label="Email" fullWidth margin="normal" variant="outlined" />
          <TextField onChange={(e)=>setPassword(e.target.value)} label="Password" fullWidth margin="normal" variant="outlined" />
          <TextField onChange={(e)=>setConformpassword(e.target.value)} label="Confirm Password"  fullWidth margin="normal" variant="outlined" />

          <Button type="submit" onClick={addUser} variant="contained" fullWidth className="signup-button">
            Sign Up
          </Button>

          <Typography variant="body2" className="signin-text">
            Already have an account?{" "}
            <button onClick={()=>navigate("/login")} >login</button>
          </Typography>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
