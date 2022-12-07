import React, {useContext, useState, useEffect} from "react";
import './navBar.css'
import logo from "../../images/Democratize-logos 2/logo.png"
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonIcon from '@mui/icons-material/Person';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import Logout from "../Logout";
import { navContext } from "../../helper/Context";
import { getInvitationsbyId } from "../../services/services";
import { useNavigate } from "react-router-dom";



export default function NavBar(){
    const {selectedNavContext, setSelectedNavContext} = useContext(navContext)
    const [requestNum, setRequestNum] = useState()
    const navigate = useNavigate()

    function handleClickReq(e){
        e === 'add-event' ? navigate('/addEvent') : navigate('/friends')
    }

    const getRequests= async () => {
        const reqs = await getInvitationsbyId()
        setRequestNum(reqs.length)
      }

      useEffect(() => {
        getRequests()
      },[])

      function handleclickLogo(){
        navigate('/')
      }



    return(
        <div className="navBar">
            <div className="logo1" onClick={handleclickLogo}>
                <img src={logo} alt="logo"/>
            </div>

            <div className="icons">
                    <div className="request-received"
                    onClick={() => handleClickReq("request-received")}
                    >
                <PersonIcon
                    id="request-received-icon"
                    sx={{
                    heigth: 150, 
                    width: 100
                    }}
                />
                <div className="box">
                <span className="circle">{requestNum}</span>
                </div>
                </div>

                <div className="add-event"
                onClick={() => handleClickReq("add-event")}
                >
                <InsertInvitationIcon 
                 id="add-event-icon"
                sx={{
                heigth: 150, 
                width: 100
                }}
                />
                </div>

                <div className="logout">
                <Logout
                sx={{
                    heigth: 150, 
                    width: 100
                }}
                />
                </div>
            </div>
            
        </div>

    )
}