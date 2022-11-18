import React from "react";
import './navBar.css'
import logo from "../../images/Democratize-logos 2/logoblack.png"
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonIcon from '@mui/icons-material/Person';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import { Icon } from '@mui/material';
import Logout from "../Logout";


export default function NavBar(){



    return(
        <div className="navBar">
            <div className="logo1">
                <img src={logo}/>
            </div>

            <div className="icons">
                <div className="request">
                    <PersonAddAlt1Icon 
                    id="request-icon"
                    sx={{
                        heigth: 150, 
                        width: 100
                    }}/>
                </div>
                    <div className="request-received">
                <PersonIcon
                    id="request-received-icon"
                    sx={{
                    heigth: 150, 
                    width: 100
                    }}
                />
                <div className="box">
                <span className="circle">1</span>
                </div>
                </div>

                <div className="add-event">
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