import Card from '@mui/material/Card';
import React, { useEffect, useState, useContext } from 'react'
import { fetchAllUsers, getInvitationsbyId, deleteInvitation, acceptInvitation, sendInvitation, getUserById, addAvatar } from '../../services/services';
import { Button} from '@mui/material';
import { navContext } from '../../helper/Context';
import './AddFriend.css'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Axios from "axios";
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage, responsive} from '@cloudinary/react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

function AddFriend(props){
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState()
    const [filteredData, setFilteredData] = useState([]);
    const [word, setWord] = useState([]);
    const [invitations, setInvitations] = useState([])
    const [sendReq, setSendReq] = useState(false)
    const [selectedFriend, setSelectedFriend] = useState()
    const {numberNavContext, setNumberNavContext} = useContext(navContext)
    const [pictureInput, setPictureInput] = useState()
    const [picture, setPicture] = useState()
    const [avBanner, setAvBanner] = useState(false)

    const getUser = async () => {
      const user = await getUserById()
      setUser(user)    
    }

    const cld = new Cloudinary({
      cloud: {
        cloudName: 'djspbi0jk'
      }
    }); 
    

    const getUsers = async () => {
      const users = await fetchAllUsers()
      setUsers(users)
    }

    const getInvitations = async () => {
      const invitationArray = await getInvitationsbyId()
      setInvitations(invitationArray)
    }



    function filtered(){
      const nonfriends = users.filter(e => user.friends.some(a => a._id === e._id) === false)
      const newA = nonfriends.filter(e => e.username.slice(0, (word.length)) === word && e.username !== user.username) 
      if(word.length > 0 ) {
        setFilteredData(newA)
      }else{
        setFilteredData([])
      }
    }
     
    function handleClickFiltered(e){
     setSendReq(true)
     setSelectedFriend(e)
    }

    function sendRequestBtn(){
      const invitation = {
        invitee: selectedFriend._id
      }
      sendInvitation(invitation)
      setSendReq(false)
      document.getElementById('input-search-id').value = ""
      setWord('')
    }

    function dontSendRequestBtn(){
      setSendReq(false)
      document.getElementById('input-search-id').value = ""
      setWord('')
    }

    const  handleClickInvitation = async (e) => {
      setSendReq(false)
     }


     const acceptReq =  async (e) => {
      const invitation = { id: e.owner._id }
      const deleteInv = { id: e._id }
      await acceptInvitation(invitation)
      await deleteInvitation(deleteInv)
      getInvitations()
      numberNavContext === false ? setNumberNavContext(true) : setNumberNavContext(false)
      getUser()
     }

      const rejectReq = async (e) =>{
      const deleteInv = { id: e._id }
      await deleteInvitation(deleteInv)
      getInvitations()
      numberNavContext === false ? setNumberNavContext(true) : setNumberNavContext(false)
     }

     useEffect(() => {
        getUser()
     }, [])
    
    useEffect(() => {
        getUsers()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]) 

      useEffect(() => {
        filtered()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [word])

      useEffect(() => {
        getInvitations()
      }, [])

      const handleClickPic = async (e) => {
        let responseUrl
        e.preventDefault()
        const formData = new FormData();
        formData.append('file', pictureInput)
        formData.append("upload_preset", "em2qqxhv")
        await Axios.post(
          "https://api.cloudinary.com/v1_1/djspbi0jk/image/upload", 
          formData
        ).then((response) => {
          responseUrl = response.data.public_id
        })
        const newP = {
          "avatar": responseUrl
        }
        await addAvatar(newP)
        getUser()
        setAvBanner(false)

      }

      function handleClickAvButton(){
        setAvBanner(true)
      }


return (  
<>

  <div className='main-container-addfriend'>

  {avBanner === false && user &&
  <Card className="addfriend-card"
  >

    <div className='avatar-setup'>
    <AdvancedImage className='ind-avatar' alt='eventPicture' title='Add or Change Avatar' 
    cldImg={cld.image(`${user.avatar}`)}  plugins={[responsive({steps:200})]}
    onClick={handleClickAvButton}
    />
    </div> 

    
  <div className='addfriend-container' data-testid="af-1">
    <div className='add-friend'>
      <h1 className='add-friend-h2'> Add a Friend</h1>
    <div className='input-search'>
      <input
        type = "text"
        variant='outlined'
        id='input-search-id'
        placeholder="Search"
        onChange={(e) => setWord(e.target.value)}
        />
    </div>
    </div>

    {/* {filteredData.length > 0 &&
    <div className='dropdown-list-af'>
       <select size="4"  className="dropdown" >
        {filteredData.map((e) =>{
          return <option id='dropdown-id' className='ind-friend'
          onClick={() =>  handleClickFiltered(e)} value= {e.username} name="invitation" key={e._id}>
             {e.username}  
             </option>
        })}
        </select>
    </div>
  } */}

{filteredData.length > 0 &&
    <div className='dropdown-list-af'>
        {filteredData.map((e) =>{
          return <div id='dropdown-id' className='ind-friend'
          onClick={() =>  handleClickFiltered(e)} value= {e.username} name="invitation" key={e._id}>
             <p className='username-af-dropdown'>{e.username}</p>  
             <AdvancedImage className='ind-avatar-af' alt='eventPicture' title='Add or Change Avatar' 
          cldImg={cld.image(`${e.avatar}`)}  plugins={[responsive({steps:200})]}
          />
             </div>
        })}
    </div>
  }

    {sendReq === true && 
    <div>
     <p> Do you want to send a friend request to {selectedFriend.username}?</p>
     <Button onClick={sendRequestBtn} sx={{fontSize:"1.2em"}} >Yes</Button>
     <Button onClick={dontSendRequestBtn} sx={{fontSize:"1.2em"}}> No</Button>
    </div>
    }

    

    

    <div className='manage-request'>

      <h1 className='pending'> Pending Invitations</h1>
    

    <div className='invitation-list'>
        {invitations.map((e) =>{
          return (
          <div className='ind-invitation' >
          <p onClick={() =>  handleClickInvitation(e)} 
          name="invitation" key={e._id} className="ind-invitation-content"> {e.owner.username}  </p>
          <div className='accept-reject'>
            <CheckOutlinedIcon 
            onClick= {() => acceptReq(e)}
            sx={{ height: '50%', 
            color: 'blue',
            borderBottom: '1px solid',
            cursor:'pointer'
            
          }}/>
            <CloseOutlinedIcon 
            onClick= {() => rejectReq(e)}
            sx={{ height: '50%',
            color: 'red',
            cursor:'pointer'
            }}/>
          </div>
          </div>
          )
        })}
    </div>

    </div>

  </div>
  </Card>
  }

  {avBanner === true &&  

  <Card className='addfriend-card2'>
    <form className='form-avatar' onSubmit={handleClickPic}>
        <div className='pic-input-af'>
            <input type="file" 
          onChange={(e) => {
            setPictureInput(e.target.files[0])
            setPicture(URL.createObjectURL(e.target.files[0]))
          }}
          />

          {picture &&
          <div className='picture-eventform-div'>
            <img className='picture-eventform' src={picture}/>
          </div>
          }

          <Button type='submit' variant='contained'> Send </Button>
        </div>
        </form>
      </Card>
    }



  
  </div>
  </>
)

}

export default AddFriend