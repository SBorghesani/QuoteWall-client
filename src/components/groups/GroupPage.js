import React, { useState, useEffect, useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { getGroup, getQuotesByGroup, getCurrentUser } from "./GroupProvider.js"
import { useParams } from "react-router"


export const GroupPage = () => {
    const [quotes, setQuotes] = useState([])
    const [group, setGroup] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    const { groupId } = useParams()
    const history = useHistory()
    const user = localStorage.getItem('quotewall_user')

    useEffect(() => {
        getQuotesByGroup(groupId)
            .then(res => setQuotes(res))
    },
        [])

    useEffect(() => {
        getGroup(groupId)
            .then(res => setGroup(res))
    },
        {})

    useEffect(() => {
        getCurrentUser()
            .then(res => setCurrentUser(res))
    },
        {})

    //checks current user against quotes to determine if user can edit
    const verifyUser = (userId) => {
        if (currentUser.id === userId) {
            return true
        } else {
            return false
        }
    }


    return (
        <>
            <h2>{group?.name} Feed</h2>
            <button
                onClick={() => history.push(`/groups/${groupId}/newquote`)}
                    >New Quote</button>
            <section className="membersContainer">
                <div>
                    <h3> Group Members </h3>
                    <ul className="membersList"></ul>
                    {group?.members?.map(member => {
                        return <>
                            <li>{member?.username}</li>
                        </>
                    })}
                </div>
            </section>
            {quotes?.map(quote => {
                return <>
                    <section className="quoteContainer">
                        <div className="quoteHeader">
                            <h3>{`"${quote.quote_text}"`}</h3>
                            <h4>{`- ${quote.quoter}`}</h4>
                        </div>
                        <div className="quoteFooter">
                            <div>
                                Posted by: {quote.user.username}<br />
                                Posted in: {quote.group.name}
                                {
                                    verifyUser(quote.user.id)
                                        ? <><button onClick={() => {
                                            history.push(`/quotes/${quote.id}/edit`)
                                        }}>Edit</button></>
                                        : ""

                                }
                            </div>
                        </div>
                    </section>
                </>
            })}
        </>
    )
}