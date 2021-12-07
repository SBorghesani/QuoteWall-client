import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { getGroup, getQuotesByGroup } from "./GroupProvider.js"
import { useParams } from "react-router"


export const GroupPage = () => {
    const [quotes, setQuotes] = useState([])
    const [group, setGroup] = useState({})
    const { groupId } = useParams()

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


    return (
        <>
            <h2>{group?.name} Feed</h2>
            <button>New Quote</button>
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
                            </div>
                        </div>
                    </section>
                </>
            })}
        </>
    )
}