export const getGroup = (groupId) => {
    return fetch(`https://quotewall.herokuapp.com/groups/${groupId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
        }
    })
        .then(res => res.json())
}

export const getQuotesByGroup = (groupId) => {
    return fetch(`https://quotewall.herokuapp.com/quotes?group=${groupId}`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
            }
        })
        .then(res => res.json())
}

export const addNewGroup = (groupObject) => {
    return fetch(`https://quotewall.herokuapp.com/groups`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
        },
        body: JSON.stringify(groupObject)
    }).then(res => res.json())
}

export const getUserGroups = () => {
    return fetch(`https://quotewall.herokuapp.com/groups?mygroups`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
        }
    })
        .then(res => res.json())
}

export const getAllGroups = () => {
    return fetch(`https://quotewall.herokuapp.com/groups`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
        },
    })
        .then(res => res.json())
}

export const joinGroup = (groupId) => {
    return fetch(`https://quotewall.herokuapp.com/groups/${groupId}/join`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
        },
    })
}

export const leaveGroup = (groupId) => {
    return fetch(`https://quotewall.herokuapp.com/groups/${groupId}/join`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
        },
    })
}

export const adminJoinGroup = (groupId, userId) => {
    return fetch(`https://quotewall.herokuapp.com/groups/${groupId}/join?groupuser=${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
        },
    })
}

export const adminLeaveGroup = (groupId, userId) => {
    return fetch(`https://quotewall.herokuapp.com/groups/${groupId}/join?groupuser=${userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
        },
    })
}

export const getCurrentUser = () => {
    return fetch(`https://quotewall.herokuapp.com/users`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
        },
    })
        .then(res => res.json())
}

export const requestToJoin = (groupId) => {
    return fetch(`https://quotewall.herokuapp.com/groups/${groupId}/join?userrequest`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
        },
    })
}

export const denyRequest = (groupId, userId) => {
    return fetch(`https://quotewall.herokuapp.com/groups/${groupId}/join?userrequest=${userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
        },
    })
}

export const searchGroups= (q, searchTerm) => {
    return fetch(`https://quotewall.herokuapp.com/groups?${q}=${searchTerm}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
        }
    })
        .then(res => res.json())
}

export const searchQuotes= (groupId, q, searchTerm) => {
    return fetch(`https://quotewall.herokuapp.com/quotes?group=${groupId}&${q}=${searchTerm}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
        }
    })
        .then(res => res.json())
}



