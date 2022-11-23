import React from 'react'
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom'


function Logout() {
  const navigate = useNavigate()
    const logoutButton = () => {
        localStorage.clear()
        navigate('/')
        window.location.reload()
    }


  return (
    <Button variant='contained' onClick={logoutButton}>
        Logout
    </Button>
  )
}

export default Logout