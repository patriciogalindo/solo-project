import React, { useState } from 'react'
import {registerClient} from '../services/services'

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
    <form onSubmit={handleClick}>
    <input type="text" name="username" onChange={(e) => setUsername(e.target.value) }></input> 
    <input type="text" name="password" onChange={(e) => setPassword(e.target.value) }></input>
    <button type='submit'> Register </button>
</form>
  )
}

export default Register