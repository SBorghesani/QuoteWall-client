import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { useParams } from "react-router"
import { getQuote, addNewQuote } from "./QuoteProvider"
import { getGroup } from "../groups/GroupProvider"

export const QuoteForm = ({quoteToModify, editQuote, updateQuotes}) => {
    const { quoteId } = useParams()
    const { groupId } = useParams()
    const [newQuote, setNewQuote] = useState({})
    const [group, setGroup] = useState({})
    const history = useHistory()


    useEffect(() => {
        getGroup(groupId)
            .then(res => setGroup(res))
    }, 
    [])

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const quoteCopy = Object.assign({}, newQuote)
        quoteCopy[event.target.name] = event.target.value
        setNewQuote(quoteCopy)
    }

    const constructNewQuote = () => {
        const quoteCopy = { ...newQuote }
        console.log(quoteCopy)
        quoteCopy.groupId = parseInt(groupId)
        addNewQuote(quoteCopy)
            .then(res => history.push(`/groups/${groupId}`))
    }

    
    return (
        <form className="quoteForm">
            {/* <h2 className="panel-heading">{editMode ? "Update Quote" : "New Quote"}</h2> */}
            <div className="panel-block">
                <form style={{ width: "100%" }}>
                    <div className="field">
                        <label htmlFor="quoteText" className="quoteText">Quote: </label>
                        <div className="control">
                            <textarea 
                                class="textarea" 
                                name="quoteText"
                                placeholder="Enter quote here"
                                value={newQuote.quoteText}
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
                                value={newQuote.quoter}
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
                                value={newQuote.context}
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
                        </div>
                    </div>
                </form>
            </div>
        </form>
    )
    
}