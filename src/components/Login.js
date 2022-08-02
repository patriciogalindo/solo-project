import {  useState } from "react"
import React from 'react'
import {loginClient} from '../services/services'




function Login() {
 const [password, setPassword] = useState('')
 const [username, setUsername] = useState('')


    const handleClick = async (e) => {
        e.preventDefault()
        const combo = {
            "username": username,
            "password": password
        }        
        const data = await loginClient(combo)
        localStorage.setItem('token', data.token)
    }

  return (
    <div>
        <form onSubmit={handleClick}>
            <input type="text" name="username" onChange={(e) => setUsername(e.target.value) }></input> 
            <input type="text" name="password" onChange={(e) => setPassword(e.target.value) }></input>
            <button type='submit'> Login </button>
        </form>
    </div>
  )
}

export default Login