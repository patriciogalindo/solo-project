import React from 'react'
import Button from '@mui/material/Button';


function Logout() {
    const logoutButton = () => {
        localStorage.clear()
        window.location.reload()
    }


  return (
    <Button variant='contained' onClick={logoutButton}>
        Logout
    </Button>
  )
}

export default Logout