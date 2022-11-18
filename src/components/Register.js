import React, { useState } from 'react'
import {registerClient} from '../services/services'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Register() {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleClick = (e) => {
        e.preventDefault()
        const combo = {
            "username": username,
            "password": password
        }
        registerClient(combo)
        e.target.reset()    
    } 

  return (
    <form onSubmit={handleClick} className="login-register-div">
        <div className='username-password'>
       <TextField
            id="outlined-basic"
             label="Username"
              variant="outlined"
              type="text" name="username"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value) } 
                 />
                 </div>

                <div className='username-password'>
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
            <Button id='login-btn' type='submit' variant="outlined"> Register </Button>
        </form>
  )
}

export default Register