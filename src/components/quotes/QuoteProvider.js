export const deleteQuote = (id) => {
    return fetch(`https://quotewall.herokuapp.com/quotes/${id}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
            }
        })
}

export const getQuote = (id) => {
    return fetch(`https://quotewall.herokuapp.com/quotes/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
        }
    })
        .then(res => res.json())
}

export const addNewQuote = (quoteObject) => {
    return fetch(`https://quotewall.herokuapp.com/quotes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
        },
        body: JSON.stringify(quoteObject)
    }).then(res => res.json())
}

export const updateQuote = (updated) => {
    return fetch(`https://quotewall.herokuapp.com/quotes/${updated.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
        },
        body: JSON.stringify(updated)
    })
}

export const getQuotes = () => {
    return fetch(`https://quotewall.herokuapp.com/quotes`,
        {
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

export const getMyQuotes = () => {
    return fetch(`https://quotewall.herokuapp.com/quotes?myquotes`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("quotewall_user")}`
            }
        })
}

export const getSubscribedQuotes = () => {
    return fetch(`https://quotewall.herokuapp.com/quotes?myfeed`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("quotewall_user")}`

            }
        }).then((res) => res.json())
}