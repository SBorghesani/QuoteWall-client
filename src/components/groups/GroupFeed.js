import React, { useState, useEffect, useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { getAllGroups, getUserGroups, joinGroup, leaveGroup } from "./GroupProvider.js"
import { useParams } from "react-router"


export const GroupFeed = () => {
    const [groups, setGroups] = useState([])
    const [userGroups, setUserGroups] = useState([])
    const user = localStorage.getItem('quotewall_user')
    const history = useHistory()


    useEffect(() => {
        getAllGroups()
            .then(res => setGroups(res))
    },
        [])

    useEffect(() => {
        getUserGroups()
            .then(res => setUserGroups(res))
    },
        [])

    //returns true if current user is joined to group
    const isUserMember = (groupId) => {
        const groupArray = []
        for (const ug of userGroups) {
            if (ug.id === groupId) {
                groupArray.push(ug)
            }
        }
        if (groupArray[0]) {
            return true
        } else {
            return false
        }
    }

    const renderComponent = () => {
        getUserGroups()
            .then(res => {
                setUserGroups(res)
            })
    }

    return (
        <>
            <h2>All Groups:</h2>
            {groups?.map(group => {
                return <>
                    <section className="groupContainer">
                        <div className="groupHeader">
                            <h3>{`${group.name}`}</h3>
                            <h4>{`${group.description}`}</h4>
                        </div>
                        {
                            isUserMember(group.id)
                                ? <button className="leaveButton"
                                    onClick={() => leaveGroup(group.id).then(renderComponent)}
                                >Leave</button>
                                : <button className="joinButton"
                                    onClick={() => joinGroup(group.id).then(renderComponent)}
                                >Join</button>
                        }
                    </section>
                </>
            })}
        </>
    )
}