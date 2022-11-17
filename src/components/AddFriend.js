import Card from '@mui/material/Card';
import React, { useEffect, useState, useContext } from 'react'
import { fetchAllUsers, getInvitationsbyId, deleteInvitation, acceptInvitation } from '../services/services';
import { Button } from '@mui/material';
import { mainContext } from '../helper/Context';

function AddFriend(props){
    const [users, setUsers] = useState([]);
    const {userContext} = useContext(mainContext);
    const [filteredData, setFilteredData] = useState([]);
    const [word, setWord] = useState([]);
    const [invitations, setInvitations] = useState([])

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
     console.log(e)
    }

    const  handleClickInvitation = async (e, owner, invitee) => {
      const accepting = {
        id: owner._id
      }
    
      await acceptInvitation(accepting)

      // const invitation = {
      //   id: e
      // }
      // await deleteInvitation(invitation)
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
  <div>
    <div>
      <input
        type = "text"
        placeholder="Friends name"
        onChange={(e) => setWord(e.target.value)}
        />
    </div>

    <div>
        {filteredData.map((e) =>{
          return <p onClick={() =>  handleClickFiltered(e.username)} value= {e.username} name="invitation"> {e.username}  </p>
        })}
    </div>

    <div>
        {invitations.map((e) =>{
          return <p onClick={() =>  handleClickInvitation(e._id, e.owner, e.invitee)} name="invitation"> {e.owner.username}  </p>
        })}
    </div>

  </div>
  </>
)

}

export default AddFriend