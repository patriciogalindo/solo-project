
export function fetchAllEvents(){
    return fetch('http://localhost:3100/eventU', {headers:{authorization: localStorage.getItem('token')}})
    .then(response => {
        return response.json()
    }).then(data => {
        return data
    })
}

export function getEventById(id){
    return fetch(`http://localhost:3100/event/${id}`)
    .then(response => {
        return response.json()
    }).then(data => {
        return data
    })
}

export function fetchRecomendations(id){
    return fetch(`http://localhost:3100/event/recomendations/${id}`)
    .then(response => {
        return response.json()
    }).then(data => {
        return data
    })
}

export function addVote (vote){
    return fetch('http://localhost:3100/event/recomendation/addVote',{
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
    return fetch('http://localhost:3100/events',{
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
    return fetch('http://localhost:3100/login',{
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
    return fetch('http://localhost:3100/users',  {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(combo)
    }).then(response => {
        return response.json()
    }).then(data => {
        return data
    })
}

// export function fetchAllUsers(){
//     return fetch('http://localhost:3100/users')
//     .then(response => {
//         return response.json()
//     }).then(data => {
//         return data
//     })
// }

export function fetchAllUsers(){
    return fetch('https://solo-8od8.onrender.com/users')
    .then(response => {
        return response.json()
    }).then(data => {
        return data
    })
}

// export function fetchAllUsers(){
//     return fetch('https://charming-scone-af57ac.netlify.app/users')
//     .then(response => {
//         return response.json()
//     }).then(data => {
//         return data
//     })
// }


////////////////////////


export function addRecomendation (recomendation){
    return fetch('http://localhost:3100/event/addRecomendation',{
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
    return fetch('http://localhost:3100/invitation', {
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
    return fetch('http://localhost:3100/user/getbyId',  {headers:{authorization: localStorage.getItem('token')}})
    .then(response => {
        return response.json()
    }).then(data => {
        return data
    })
}

export function getInvitationsbyId(){
    return fetch('http://localhost:3100/invitation', {headers:{authorization: localStorage.getItem('token')}})
    .then(response => {
        return response.json()
    }).then(data => {
        return data
    })
}

export function votesByUserId(){
    return fetch('http://localhost:3100/event/votes/userId',  {headers:{authorization: localStorage.getItem('token')}})
    .then(response => {
        return response.json()
    }).then(data => {
        return data
    })
}

export function addVoteToRecomendation(voteToRec){
    return fetch('http://localhost:3100/addvote/recomendation',{
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
    return fetch('http://localhost:3100/invitation', {
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
    return fetch('http://localhost:3100/invitation', {
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
    return fetch(`http://localhost:3100/vote/${id}`)
    .then(response => {
        return response.json()
    }).then(data => {
        return data
    })
}

export function addWinner(winner){
    return fetch('http://localhost:3100/addWinner', {
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