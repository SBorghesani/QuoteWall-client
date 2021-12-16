import React, { useState, useEffect, useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { getGroup, getQuotesByGroup, getCurrentUser, searchQuotes } from "./GroupProvider.js"
import { useParams } from "react-router"
import { Button, TextField } from "@mui/material"
import '../quotes/Quotes.css'
import { AdminGroupPage } from "./AdminGroupPage.js"


export const GroupPage = () => {
    const [quotes, setQuotes] = useState([])
    const [group, setGroup] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    const [contextToggle, setContextToggle] = useState(0)
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
    console.log(group)

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

    //context dropdown
    const contextHandler = (quote) => {
        if (contextToggle !== quote.id) {
            setContextToggle(quote.id)
        } else {
            setContextToggle(0)
        }
    }

    const quoteSearch = (event) => {
        searchQuotes(groupId, event.target.name, event.target.value).then(res => setQuotes(res))
    }

    return (
        <>
            {group?.admin?.id === currentUser.id ?
                <AdminGroupPage groupId={groupId} quotes={quotes} verifyUser={verifyUser}
                    contextHandler={contextHandler} contextToggle={contextToggle} quoteSearch={quoteSearch} />
                : <>
                    <h2>{group?.name} Feed</h2>
                    <fieldset className="search">
                        <div>
                            <label className="search--icon" htmlFor="q">🔎</label>
                            <TextField variant="standard" name="q" type="text" onChange={quoteSearch} />
                        </div>
                    </fieldset>
                    <div className="newQuote--button">
                        <Button color="secondary" variant="contained"
                            onClick={() => history.push(`/groups/${groupId}/newquote`)}
                        >New Quote</Button>
                    </div>
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
                                            <h3 className="quoteText">{`"${quote.quote_text}"`}</h3>
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
                                            Posted by: {quote.user.username}<br />
                                            {/* Posted in: {quote.group.name} */}
                                        </section>
                                        <div className="quoteEdit">
                                            {
                                                verifyUser(quote.user.id)
                                                    ? <Link className="editLink" to={`/quotes/${quote.id}/edit`} onClick={(e) => {
                                                        // e.preventDefault()
                                                    }}>⚙️</Link>
                                                    : ""
                                            }
                                        </div>
                                    </section>
                                </>
                            })}
                        </section>
                    </section>
                </>
            }
        </>
    )
}
