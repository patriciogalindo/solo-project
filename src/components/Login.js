import {  useState, useEffect } from "react"
import React from 'react'
import {loginClient, fetchAllUsers} from '../services/services'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './loginRegister.css'


function Login() {
 const [password, setPassword] = useState('')
 const [username, setUsername] = useState('')
//  const [users, setUsers] = useState([]);


//  const getUsers = async () => {
//     const users = await fetchAllUsers()
//     setUsers(users)
//     return users
//   }

//   useEffect(() => {
//     getUsers()
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   },[]) 
  


    const handleClick = async (e) => {
        e.preventDefault()
        const combo = {
            "username": username.trim(),
            "password": password.trim()
        }        
        const data = await loginClient(combo)
        if(data) localStorage.setItem('token', data.token)
        window.location.reload()
    }

    const handleTouch = async (e) => {
      e.preventDefault()
      const combo = {
          "username": username,
          "password": password
      }        
      const data = await loginClient(combo)
      if(data) localStorage.setItem('token', data.token)
      window.location.reload()
  }

  return (
        <form className="login-register-div">
          <div className="username-password">
           <TextField
            id="outlined-basic"
             label="Username"
              variant="outlined"
              type="text" name="username"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)} 
                 />
                 </div>

              <div className="username-password">
             <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="text"
                name="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value) }
             />
             </div>
            <Button id='login-btn' variant="outlined" onClick={handleClick} onTouchStart={handleTouch}> Login </Button>
        </form>
  )
}

export default Login