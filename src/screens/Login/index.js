import Login from '../../components/Login';
import Register from '../../components/Register';
import './index.css'
import logo from "../../images/Democratize-logos 2/logo.png"
import Card from '@mui/material/Card';
import {useEffect, useState} from "react"


function ScreenLogin(){
  const [login, setLogin] = useState(true)

  function handleClick(){
    login === true ? setLogin(false) : setLogin(true)
  }

  function handleTouch(){
    login === true ? setLogin(false) : setLogin(true)
  }

  useEffect(() =>{

  }, [login] )

  return (
    <div className='login-container'>
      {/* <div className='loginPage'>  */}
       <Card
       className="card-login"
       >   
        <div className='logo-div'>
          <img src={logo} className="logo" />
        </div>


       {login === true && 
            <div className='login'>
          <Login/>
          </div>
        }

        {login === false &&
          <div className='register'>
          <Register/>
          </div>
        }

        <div className='are-you-registered'>
        <a onClick={handleClick} onTouchStart={handleTouch}>  Are you not registered? Click here  </a>

        </div>
          </Card>
     </div> 
    //  </div>
  ) 
}

export default ScreenLogin