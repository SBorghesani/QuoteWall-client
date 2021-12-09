import React, { useState, useEffect, useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { getGroup, getQuotesByGroup, getCurrentUser } from "./GroupProvider.js"
import { useParams } from "react-router"
import '../quotes/Quotes.css'


export const GroupPage = () => {
    const [quotes, setQuotes] = useState([])
    const [group, setGroup] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    const [contextToggle, setContextToggle] = useState(false)
    const { groupId } = useParams()
    const history = useHistory()
    const user = localStorage.getItem('quotewall_user')

    useEffect(() => {
        getQuotesByGroup(groupId)
            .then(res => setQuotes(res))
    },
        [quotes.length])

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

    const contextHandler = () => {
        if (contextToggle) {
            setContextToggle(false)
        } else {
            setContextToggle(true)
        }
    }


    return (
        <>
            <h2>{group?.name} Feed</h2>
            <button
                onClick={() => history.push(`/groups/${groupId}/newquote`)}
            >New Quote</button>
            <section className="membersContainer">
                <div className="members">
                    <h3> Group Members </h3>
                    <ul className="membersList"></ul>
                    {group?.members?.map(member => {
                        return <>
                            <li>{member?.username}</li>
                        </>
                    })}
                </div>
            </section>
            <section className="groupView">
                <section className="quotesDisplay">
                    {quotes?.map(quote => {
                        return <>
                            <section className="quoteContainer">
                                <div className="quoteHeader">
                                    <h3>{`"${quote.quote_text}"`}</h3>
                                    <div className="quoteHeader quoter">
                                        <h4>{`- ${quote.quoter}`}</h4>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={() => {
                                        contextHandler()
                                    }}>
                                        View Context
                                    </button>
                                </div>
                                <div>
                                    {
                                        (contextToggle)
                                            ? quote.context
                                            : ""
                                    }
                                </div>
                                <div className="quoteFooter">
                                    {/* <div className="quoteFooter user"> */}
                                        Posted by: {quote.user.username}<br />
                                    {/* </div> */}
                                    {/* <div className="quoteFooter group"> */}
                                        Posted in: {quote.group.name}
                                    {/* </div> */}
                                </div>
                                {
                                    verifyUser(quote.user.id)
                                        ? <><button onClick={() => {
                                            history.push(`/quotes/${quote.id}/edit`)
                                        }}>Edit</button></>
                                        : ""

                                }
                            </section>
                        </>
                    })}
                </section>
            </section>
        </>
    )
}