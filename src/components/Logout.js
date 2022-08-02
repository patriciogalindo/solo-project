import React from 'react'

function Logout() {
    const logoutButton = () => {
        localStorage.clear()
    }


  return (
    <button onClick={logoutButton}>
        Logout
    </button>
  )
}

export default Logout