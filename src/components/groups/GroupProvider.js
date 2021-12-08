export const getGroup = (groupId) => {
    return fetch(`http://localhost:8000/groups/${groupId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
        }
    })
        .then(res => res.json())
}

export const getQuotesByGroup = (groupId) => {
    return fetch(`http://localhost:8000/quotes?group=${groupId}`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
            }
        })
        .then(res => res.json())
}

export const addNewGroup = (groupObject) => {
    return fetch(`http://localhost:8000/groups`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
        },
        body: JSON.stringify(groupObject)
    }).then(res => res.json())
}

export const getUserGroups = () => {
    return fetch(`http://localhost:8000/groups?mygroups`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
        }
    })
        .then(res => res.json())
}

export const getAllGroups = () => {
    return fetch(`http://localhost:8000/groups`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
        },
    })
        .then(res => res.json())
}

export const joinGroup = (groupId) => {
    return fetch(`http://localhost:8000/groups/${groupId}/join`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
        },
    })
}

export const leaveGroup = (groupId) => {
    return fetch(`http://localhost:8000/groups/${groupId}/join`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
        },
    })
}

export const getCurrentUser = () => {
    return fetch(`http://localhost:8000/users`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
        },
    })
        .then(res => res.json())
}

