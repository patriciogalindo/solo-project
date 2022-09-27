
export function fetchAllEvents(){
    return fetch('http://localhost:5000/eventU', {headers:{authorization: localStorage.getItem('token')}})
    .then(response => {
        return response.json()
    }).then(data => {
        return data
    })
}

export function fetchRecomendations(id){
    return fetch(`http://localhost:5000/event/recomendations/${id}`)
    .then(response => {
        return response.json()
    }).then(data => {
        return data
    })
}

export function addVote (vote){
    return fetch('http://localhost:5000/event/recomendation/addVote',{
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
    return fetch('http://localhost:5000/events',{
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
    return fetch('http://localhost:5000/login',{
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
    return fetch('http://localhost:5000/users',  {
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

export function fetchAllUsers(){
    return fetch('http://localhost:5000/users')
    .then(response => {
        return response.json()
    }).then(data => {
        return data
    })
}


////////////////////////


export function addRecomendation (recomendation){
    return fetch('http://localhost:5000/event/addRecomendation',{
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

export function getUserById(){
    return fetch('http://localhost:5000/user/getbyId',  {headers:{authorization: localStorage.getItem('token')}})
    .then(response => {
        return response.json()
    }).then(data => {
        return data
    })
}

export function votesByUserId(){
    return fetch('http://localhost:5000/event/votes/userId',  {headers:{authorization: localStorage.getItem('token')}})
    .then(response => {
        return response.json()
    }).then(data => {
        return data
    })
}

export function addVoteToRecomendation(voteToRec){
    return fetch('http://localhost:5000/addvote/recomendation',{
        method: 'PUT', 
        body: JSON.stringify(voteToRec)
    }
    ).then(response => {
        return response.json()
    }).then(data => {
       return data
    })
}