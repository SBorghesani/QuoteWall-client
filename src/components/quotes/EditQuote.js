import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { useParams } from "react-router"
import { getQuote, updateQuote, deleteQuote } from "./QuoteProvider"

export const EditQuote = () => {
    const { quoteId } = useParams()
    const [quote, setQuote] = useState({})
    const history = useHistory()

    useEffect(() => {
        getQuote(quoteId)
            .then(res => setQuote(res))
    },
        {})

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const quoteCopy = Object.assign({}, quote)
        quoteCopy[event.target.name] = event.target.value
        setQuote(quoteCopy)
    }

    const constructNewQuote = () => {
        const quoteCopy = { ...quote }
        console.log(quoteCopy)
        quoteCopy.groupId = parseInt(quoteCopy.group.id)
        quoteCopy.quoteText = quoteCopy.quote_text
        updateQuote(quoteCopy)
            .then(history.push(`/groups/${quoteCopy.group.id}`))
    }

    const quoteDelete = (quoteId) => {
        const quoteCopy = { ...quote }
        deleteQuote(quoteId)
            .then(history.push(`/groups/${quoteCopy.group.id}`))
    }

    return (
        <form className="quoteForm">
            <div className="panel-block">
                <form style={{ width: "100%" }}>
                    <div className="field">
                        <label htmlFor="quoteText" className="quoteText">Quote: </label>
                        <div className="control">
                            <textarea
                                class="textarea"
                                name="quoteText"
                                placeholder="Enter quote here"
                                value={quote.quote_text}
                                onChange={handleControlledInputChange}
                            ></textarea>
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="quoter" className="quoter">Who are you quoting: </label>
                        <div className="control">
                            <input type="text" name="quoter" required autoFocus className="input"
                                proptype="varchar"
                                placeholder="Who are you quoting?"
                                value={quote.quoter}
                                onChange={handleControlledInputChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="context" className="context">Provide Context about quote: </label>
                        <div className="control">
                            <textarea
                                class="textarea"
                                name="context"
                                placeholder="Provide Context"
                                value={quote.context}
                                onChange={handleControlledInputChange}
                            ></textarea>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button type="submit"
                                onClick={evt => {
                                    evt.preventDefault()
                                    constructNewQuote()
                                }}
                                className="button is-link">
                                {"Save"}
                            </button>
                            <button type="delete"
                                onClick={evt => {
                                    evt.preventDefault()
                                    quoteDelete(quote.id)
                                }}
                                className="button is-link">
                                {"Delete"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </form>
    )

}