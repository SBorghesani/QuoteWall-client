import React, { useState, useEffect, useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { useParams } from "react-router"
import { adminLeaveGroup, getGroup } from './GroupProvider.js'
import '../quotes/Quotes.css'

export const AdminGroupPage = ({ quotes, groupId, verifyUser, contextHandler, contextToggle }) => {
    const [group, setGroup] = useState({})
    const history = useHistory()


    const removeUser = (groupId, userId) => {
        adminLeaveGroup(groupId, userId)
    }


    useEffect(() => {
        getGroup(groupId)
            .then(res => setGroup(res))
    },
        {})

    const renderComponent = (groupId) => {
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
                                    removeUser(group?.id, member.id)
                                        .then(renderComponent(group?.id))
                                }}
                                >[X]</Link> </li>
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
                                    {/* <div className="quoteFooterInfo"> */}
                                    {/* <div className="quoteFooter user"> */}
                                    <div className="quoteEdit">
                                        {
                                            verifyUser(quote.user.id)
                                                ? <Link to={`/quotes/${quote.id}/edit`} onClick={(e) => {
                                                    // e.preventDefault()
                                                }}>⚙️</Link>
                                                : ""
                                        }
                                    </div>
                                        Posted by: {quote.user.username}<br />
                                    {/* </div> */}
                                    {/* <div className="quoteFooter group"> */}
                                        Posted in: {quote.group.name}
                                    {/* </div> */}
                                    {/* </div> */}
                                </section>
                            </section>
                        </>
                    })}
                </section>
            </section>
        </>
    )
}