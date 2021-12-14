import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { getMyQuotes, getQuotes, getSubscribedQuotes } from "./QuoteProvider.js"
import { getUserGroups } from '../groups/GroupProvider.js'
import { useHistory, useParams } from "react-router"
import "./Quotes.css"

export const QuoteFeed = () => {
    const [quotes, setQuotes] = useState([])
    const [userGroups, setUserGroups] = useState([])
    const pathname = window.location.pathname
    const history = useHistory()

    useEffect(() => {
        if (pathname === '/myfeed') {
            getSubscribedQuotes()
                .then(res => setQuotes(res))
        } else {
            getQuotes()
                .then(res => setQuotes(res))
        }
    },
        [])

    useEffect(() => {
        getUserGroups()
            .then(res => setUserGroups(res))
    },
        [])


    return (
        <>
            <h2>{(pathname === '/myfeed') ? "My Feed" : "Recent Quotes"} </h2>
            <section className="feedContainer">
                {(pathname === '/myfeed')
                    ? <section className="groupsContainer">
                        <div className="groupList">
                            <h3>My Groups</h3>
                            {/* <ul> */}
                            {userGroups?.map(group => {
                                return <>
                                    <li><Link className="myGroupList" to={`groups/${group.id}`}>{group.name}</Link></li>
                                </>
                            })}
                            {/* </ul> */}
                        </div>
                    </section>
                    : ""}
                <section className="myQuotesView">
                    <section className="myQuotesDisplay">
                        {quotes?.map(quote => {
                            return <>
                                <section className="quoteContainer">
                                    <div className="quoteHeader">
                                        <h3 className="quoteText">{`"${quote.quote_text}"`}</h3>
                                        <h4 className="quoteHeader quoter">{`- ${quote.quoter}`}</h4>
                                    </div>
                                    <div className="quoteFooter">
                                        <div>
                                            Posted by: {quote.user.username}<br />
                                            Posted in: {quote.group.name}
                                        </div>
                                    </div>
                                </section>
                            </>
                        })}
                    </section>
                </section>
            </section>
        </>
    )
}