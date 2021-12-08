import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { getMyQuotes, getQuotes, getSubscribedQuotes } from "./QuoteProvider.js"
import { getUserGroups } from '../groups/GroupProvider.js'
import { useParams } from "react-router"
import "./Quotes.css"

export const QuoteFeed = () => {
    const [quotes, setQuotes] = useState([])
    const [userGroups, setUserGroups] = useState([])
    const pathname = window.location.pathname

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
            <h2>Quote Feed</h2>
            {quotes?.map(quote => {
                return <>
                    <section className="quoteContainer">
                        <div className="quoteHeader">
                            <h3>{`"${quote.quote_text}"`}</h3>
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
            <h2>My Groups</h2>
            <ul>
                {userGroups?.map(group => {
                    return <>
                        <li>{group.name}</li>
                    </>
                })}
            </ul>
        </>
    )
}