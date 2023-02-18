
export function fetchAllEvents(){
    return fetch('https://solo-8od8.onrender.com/eventU', {headers:{authorization: localStorage.getItem('token')}})
    .then(response => {
        return response.json()
    }).then(data => {
        return data
    })
}


export function getEventById(id){
    return fetch(`https://solo-8od8.onrender.com/event/${id}`)
    .then(response => {
        return response.json()
    }).then(data => {
        return data
    })
}

export function fetchRecomendations(id){
    return fetch(`https://solo-8od8.onrender.com/event/recomendations/${id}`)
    .then(response => {
        return response.json()
    }).then(data => {
        return data
    })
}

export function addVote (vote){
    return fetch('https://solo-8od8.onrender.com/event/recomendation/addVote',{
        method: 'POST', 
        headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem('token')
        }, 
        body: JSON.stringify(vote)
    } 
    ).then(response => {
        return response.json()
    }).then(data => {
       return data
    })
}



export function newEvent(event){
    console.log(event)
    return fetch('https://solo-8od8.onrender.com/events',{
        method:'POST', 
        headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem('token')
        }, 
        body: JSON.stringify(event)
    }
    ).then(response=> {
        return response.json()
    }).then(data => {
        return data
    })
}

export function loginClient(combo){
    return fetch('https://solo-8od8.onrender.com/login',{
        method:'POST', 
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(combo)
    }
    ).then(response=> {
        return response.json()
    }).then(data => {
        return data
    })
}

export function registerClient(combo){
    return fetch('https://solo-8od8.onrender.com/users',  {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(combo)
    }).then(response => {
        return response.json()
    }).then(data => {
        console.log(data)
        return data
    })
}

export function fetchAllUsers(){
    return fetch('https://solo-8od8.onrender.com/users')
    .then(response => {
        return response.json()
    }).then(data => {
        return data
    })
}

////////////////////////


export function addRecomendation (recomendation){
    return fetch('https://solo-8od8.onrender.com/event/addRecomendation',{
        method: 'POST', 
        headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem('token')
        }, 
        body: JSON.stringify(recomendation)
    }
    ).then(response => {
        return response.json()
    }).then(data => {
       return data
    })
}

export function sendInvitation(invitation){
    return fetch('https://solo-8od8.onrender.com/invitation', {
        method: 'POST', 
        headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem('token')
        }, 
        body: JSON.stringify(invitation)
    }).then(response => {
        return response.json()
    }).then(data => {
        return data
    })
}



export function getUserById(){
    return fetch('https://solo-8od8.onrender.com/user/getbyId',  {headers:{authorization: localStorage.getItem('token')}})
    .then(response => {
        return response.json()
    }).then(data => {
        return data
    })
}

export function getInvitationsbyId(){
    return fetch('https://solo-8od8.onrender.com/invitation', {headers:{authorization: localStorage.getItem('token')}})
    .then(response => {
        return response.json()
    }).then(data => {
        return data
    })
}

export function votesByUserId(){
    return fetch('https://solo-8od8.onrender.com/event/votes/userId',  {headers:{authorization: localStorage.getItem('token')}})
    .then(response => {
        return response.json()
    }).then(data => {
        return data
    })
}

export function addVoteToRecomendation(voteToRec){
    return fetch('https://solo-8od8.onrender.com/addvote/recomendation',{
        method: 'PUT', 
        body: JSON.stringify(voteToRec)
    }
    ).then(response => {
        return response.json()
    }).then(data => {
       return data
    })
}

export function deleteInvitation(id){
    return fetch('https://solo-8od8.onrender.com/invitation', {
        method: 'DELETE', 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(id)
    }).then(response => {
        return response.json()
    }).then(data => {
        return data
    })
}

export function acceptInvitation(id){
    return fetch('https://solo-8od8.onrender.com/invitation', {
        method: 'PATCH', 
        headers: {"Content-Type": "application/json", 
        authorization: localStorage.getItem('token')
    },
        body: JSON.stringify(id)
    }).then(response => {
        return response.json()
    }).then(data => {
        return data
    })
}

export function getVotesByEventId(id){
    return fetch(`https://solo-8od8.onrender.com/vote/${id}`)
    .then(response => {
        return response.json()
    }).then(data => {
        return data
    })
}

export function addWinner(winner){
    return fetch('https://solo-8od8.onrender.com/addWinner', {
        method: 'PATCH', 
        headers: {'Content-type': 'application/json', 
    }, 
    body: JSON.stringify(winner)
    }).then(response => {
        return response.json()
    }).then(data=> {
        return data
    })
}