export const deleteQuote = (id) => {
    return fetch(`http://127.0.0.1:8000/quotes/${id}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
            }
        })
}

export const getQuote = (id) => {
    return fetch(`http://localhost:8000/quotes/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
        }
    })
        .then(res => res.json())
}

export const addNewQuote = (quoteObject) => {
    return fetch(`http://localhost:8000/quotes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
        },
        body: JSON.stringify(quoteObject)
    }).then(res => res.json())
}

export const updateQuote = (updated) => {
    return fetch(`http://localhost:8000/quotes/${updated.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
        },
        body: JSON.stringify(updated)
    })
}

export const getQuotes = () => {
    return fetch(`http://localhost:8000/quotes`,
        {
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

export const getMyQuotes = () => {
    return fetch(`http://localhost:8000/quotes?myquotes`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
            }
        })
}

export const getSubscribedQuotes = () => {
    return fetch(`http://127.0.0.1:8000/quotes?myfeed`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("quotewall_user")}`

            }
        }).then((res) => res.json())
}