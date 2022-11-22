import Card from '@mui/material/Card';
import React, { useEffect, useState, useContext } from 'react'
import { fetchAllUsers, getInvitationsbyId, deleteInvitation, acceptInvitation, sendInvitation } from '../../services/services';
import { Button } from '@mui/material';
import { mainContext } from '../../helper/Context';
import { set } from 'mongoose';

function AddFriend(props){
    const [users, setUsers] = useState([]);
    const {userContext} = useContext(mainContext);
    const [filteredData, setFilteredData] = useState([]);
    const [word, setWord] = useState([]);
    const [invitations, setInvitations] = useState([])
    const [acceptRejectReq, setAcceptRejectReq] = useState(false)
    const [sendReq, setSendReq] = useState(false)
    const [selectedFriend, setSelectedFriend] = useState()
    const [selectedReq, setSelectedReq] = useState()

    const getUsers = async () => {
      const users = await fetchAllUsers()
      setUsers(users)
      return users
    }

    const getInvitations = async () => {
      const invitationArray = await getInvitationsbyId()
      setInvitations(invitationArray)
      return invitationArray
    }

    function filtered(){
      const newA = users.filter(e => e.username.slice(0, (word.length)) === word && e.username !== userContext.username)
      if(word.length > 0 ) {
        setFilteredData(newA)
      }else{
        setFilteredData([])
      }
    }

    function handleClickFiltered(e){
     setSendReq(true)
     setAcceptRejectReq(false)
     setSelectedFriend(e)
    }

    function sendRequestBtn(){
      const invitation = {
        invitee: selectedFriend._id
      }
      sendInvitation(invitation)
      setSendReq(false)
    }

    function dontSendRequestBtn(){
      setSendReq(false)
    }

    const  handleClickInvitation = async (e) => {
      setSelectedReq(e)
      setAcceptRejectReq(true)
      setSendReq(false)
     }


     const acceptReq = () => {
      const invitation = {
        id: selectedReq.owner._id
      }

      const deleteInv = {
        id: selectedReq._id
      }
      acceptInvitation(invitation)
      deleteInvitation(deleteInv)
      setAcceptRejectReq(false)
      getInvitations()
     }


     function rejectReq(){
      const deleteInv = {
        id: selectedReq._id
      }
      deleteInvitation(deleteInv)
      setAcceptRejectReq(false)
      getInvitations()
     }

    
    useEffect(() => {
        getUsers()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]) 

      useEffect(() => {
        filtered()
      }, [word])

      useEffect(() => {
        getInvitations()
      }, [])


return (
  <>
  <Card
  sx={{
    height: 600, 
    width: 600,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }}
  >

  <div className='addfriend-container'>
    <h1>Friends</h1>
    <div className='add-friend'>
      <h3> Add a Friend</h3>
    <div className='input-search'>
      <input
        type = "text"
        placeholder="Search"
        onChange={(e) => setWord(e.target.value)}
        />
    </div>

    <div>
        {filteredData.map((e) =>{
          return <p onClick={() =>  handleClickFiltered(e)} value= {e.username} name="invitation" key={e._id}> {e.username}  </p>
        })}
    </div>

    {sendReq === true && 
    <div>
     <p> Do you want to send a friend request to {selectedFriend.username}?</p>
     <Button onClick={sendRequestBtn}  >Yes</Button>
     <Button onClick={dontSendRequestBtn}> No</Button>
    </div>
    }

    </div>

    

    <div className='manage-request'>

    <div>
      <h3> Pending Invitations</h3>
    </div>

    <div>
        {invitations.map((e) =>{
          return <p onClick={() =>  handleClickInvitation(e)} name="invitation" key={e._id}> {e.owner.username}  </p>
        })}
        {acceptRejectReq === true &&
        <>
        <p>Do you want to aceept the friend request of {selectedReq.owner.username}</p>
        <Button onClick={acceptReq}  >Yes</Button>
        <Button onClick={rejectReq}> No</Button>
        </>
        }

    </div>

    </div>

  </div>
  </Card>
  </>
)

}

export default AddFriend