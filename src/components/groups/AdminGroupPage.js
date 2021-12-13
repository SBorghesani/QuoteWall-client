import React, { useState, useEffect, useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { useParams } from "react-router"
import { adminLeaveGroup, getGroup, denyRequest, adminJoinGroup } from './GroupProvider.js'
import { deleteQuote, getQuotes } from '../quotes/QuoteProvider.js'
import '../quotes/Quotes.css'

export const AdminGroupPage = ({ quotes, groupId, verifyUser, contextHandler, contextToggle }) => {
    const [group, setGroup] = useState({})
    const history = useHistory()

    useEffect(() => {
        getGroup(groupId)
            .then(res => setGroup(res))
    },
        {})

    const renderComponent = () => {
        getGroup(groupId)
            .then(res => {
                setGroup(res)
            })
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
                            <li>{member?.username}
                                <Link onClick={(e) => {
                                    e.preventDefault()
                                    adminLeaveGroup(group.id, member.id)
                                        .then(renderComponent)
                                }}
                                >[X]</Link> </li>
                        </>
                    })}
                </div>
                <div className="members">
                    <h3> Requests </h3>
                    <ul className="membersList"></ul>
                    {group?.requests?.map(request => {
                        return <>
                            <li>{request?.username}
                                <Link onClick={(e) => {
                                    e.preventDefault()
                                    denyRequest(group.id, request.id)
                                        .then(renderComponent)
                                }}
                                >❌</Link>
                                <Link onClick={(e) => {
                                    e.preventDefault()
                                    adminJoinGroup(group.id, request.id)
                                        .then(denyRequest(group.id, request.id))
                                        .then(renderComponent)
                                }}
                                >✅</Link>
                            </li>
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
                                    <Link className="contextLink" onClick={(e) => {
                                        e.preventDefault()
                                        contextHandler(quote)
                                    }}>
                                        View Context
                                    </Link>
                                </div>
                                <div className="contextDrop">
                                    {
                                        (contextToggle === quote.id)
                                            ? quote.context
                                            : ""
                                    }
                                </div>
                                <section className="quoteFooter">
                                    <div className="quoteEdit">
                                        {
                                            verifyUser(quote.user.id)
                                                ? <Link to={`/quotes/${quote.id}/edit`} onClick={(e) => {
                                                    // e.preventDefault()
                                                }}>⚙️</Link>
                                                : ""
                                        }
                                        <Link onClick={(e) => {
                                            e.preventDefault()
                                            deleteQuote(quote.id)
                                                .then(renderComponent)
                                        }}
                                        >🗑️</Link>
                                    </div>
                                    <div>
                                        Posted by: {quote.user.username}<br />
                                        Posted in: {quote.group.name}
                                    </div>
                                </section>
                            </section>
                        </>
                    })}
                </section>
            </section>
        </>
    )
}