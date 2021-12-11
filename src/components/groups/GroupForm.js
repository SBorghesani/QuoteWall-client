import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { useParams } from "react-router"
import { getGroup, addNewGroup } from './GroupProvider.js'


export const GroupForm = () => {
    const [newGroup, setNewGroup] = useState({})
    const [privateToggle, togglePrivacy] = useState(false)
    const history = useHistory()


    const handleControlledInputChange = (event) => {
        const groupCopy = Object.assign({}, newGroup)
        groupCopy[event.target.name] = event.target.value
        setNewGroup(groupCopy)
    }

    const constructNewGroup = () => {
        const groupCopy = { ...newGroup }
        console.log(groupCopy)
        groupCopy.private = privateToggle
        addNewGroup(groupCopy)
            .then(res => history.push(`/groups/${res.id}`))
    }

    return (
        <form className="groupForm">
            <div className="panel-block">
                <form style={{ width: "100%" }}>
                    <div className="field">
                        <label htmlFor="groupName" className="groupName">Name your group: </label>
                        <div className="control">
                            <input type="text" name="name" required autoFocus className="input"
                                proptype="varchar"
                                placeholder="Enter group name here"
                                value={newGroup.name}
                                onChange={handleControlledInputChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="description" className="description">Provide a description for the group </label>
                        <div className="control">
                            <textarea
                                class="textarea"
                                name="description"
                                placeholder="Provide description"
                                value={newGroup.description}
                                onChange={handleControlledInputChange}
                            ></textarea>
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="setPrivate" className="setPrivate">Is this a private group? </label>
                        <div className="control">
                            <input type="checkbox" name="private" required autoFocus className="input"
                                proptype="varchar"
                                value={newGroup.private}
                                onChange={(e) => {
                                    e.preventDefault()
                                    togglePrivacy(true)}}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button type="submit"
                                onClick={evt => {
                                    evt.preventDefault()
                                    constructNewGroup()
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
