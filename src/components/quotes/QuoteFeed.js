import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { getQuotes } from "./QuoteProvider.js"
import { useParams } from "react-router"
import "./Quotes.css"

export const QuoteFeed = () => {
    const [quotes, setQuotes] = useState([])

    useEffect(() => {
        getQuotes()
            .then(res => setQuotes(res))
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
                            <h4>{`- ${quote.quoter}`}</h4>
                        </div>
                        <div className="quoteFooter">       
                            <div>
                                Posted by: {quote.user.username}<br/>
                                Posted in: {quote.group.name}
                            </div>
                        </div>
                    </section>
                </>
            })}
        </>
    )
}