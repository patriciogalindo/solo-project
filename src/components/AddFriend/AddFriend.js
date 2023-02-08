import Card from '@mui/material/Card';
import React, { useEffect, useState, useContext } from 'react'
import { fetchAllUsers, getInvitationsbyId, deleteInvitation, acceptInvitation, sendInvitation, getUserById } from '../../services/services';
import { Button} from '@mui/material';
import { mainContext } from '../../helper/Context';
import './AddFriend.css'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

function AddFriend(props){
    const [users, setUsers] = useState([]);
    const {userContext} = useContext(mainContext);
    const [user, setUser] = useState()
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

    const getUser = async () => {
      const user = await getUserById()
      setUser(user)    
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
     setAcceptRejectReq(false)
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
      setSelectedReq(e)
      setAcceptRejectReq(true)
      setSendReq(false)
     }


     const acceptReq = (e) => {
      const invitation = {
        id: e.owner._id
      }

      const deleteInv = {
        id: e._id
      }
      acceptInvitation(invitation)
      deleteInvitation(deleteInv)
      getInvitations()
     }

     function rejectReq(e){
      const deleteInv = {
        id: e._id
      }
      deleteInvitation(deleteInv)
      getInvitations()
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
      }, [word])

      useEffect(() => {
        getInvitations()
      }, [])



return (
  <div className='main-container-addfriend'>
  <Card className="addfriend-card"
  >

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

    {filteredData.length > 0 &&
    <div className='dropdown-list-af'>
       <select size="4"  className="dropdown" >
        {filteredData.map((e) =>{
          return <option id='dropdown-id' className='ind-friend' onClick={() =>  handleClickFiltered(e)} value= {e.username} name="invitation" key={e._id}> {e.username}  </option>
        })}
        </select>
    </div>
  }

    {sendReq === true && 
    <div>
     <p> Do you want to send a friend request to {selectedFriend.username}?</p>
     <Button onClick={sendRequestBtn} sx={{fontSize:"1.2em"}} >Yes</Button>
     <Button onClick={dontSendRequestBtn} sx={{fontSize:"1.2em"}}> No</Button>
    </div>
    }

    </div>

    

    <div className='manage-request'>

    <div>
      <h1 className='pending'> Pending Invitations</h1>
    </div>

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
        {acceptRejectReq === true &&
        <>
        <p>Do you want to accept the friend request of {selectedReq.owner.username}</p>
        <Button onClick={acceptReq}  >Yes</Button>
        <Button onClick={rejectReq} > No</Button>
        </>
        }

    </div>

    </div>

  </div>
  </Card>
  </div>
)

}

export default AddFriend