import React, { useState, useEffect, useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { getAllGroups, getUserGroups, joinGroup, leaveGroup, requestToJoin, getCurrentUser } from "./GroupProvider.js"
import { useParams } from "react-router"
import './Groups.css'


export const GroupFeed = () => {
    const [groups, setGroups] = useState([])
    const [userGroups, setUserGroups] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const history = useHistory()
    const pathname = window.location.pathname


    useEffect(() => {
        if (pathname === '/mygroups') {
            getUserGroups()
                .then(res => setGroups(res))
        } else {
            getAllGroups()
                .then(res => setGroups(res))
        }
    },
        [])

    useEffect(() => {
        getUserGroups()
            .then(res => setUserGroups(res))
    },
        [])

    useEffect(() => {
        getCurrentUser()
            .then(res => setCurrentUser(res))
    },
        {})

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


    //returns true if user has requested to join
    const userRequestSent = (group) => {
        const userArray = []
        for (const request of group.requests) {
            if (request.id === currentUser.id) {
                userArray.push(request.id)
            }
        }
        if (userArray[0]) {
            return true
        } else {
            return false
        }
    }

    //renders component when user joins/leaves a group
    const renderComponent = () => {
        getUserGroups()
            .then(res => {
                setUserGroups(res)
            })
    }

    return (
        <>
            <h2>{pathname === '/mygroups' ? 'My Groups:' : 'All Groups:'}</h2>
            <section className="groupsDisplay">
                {groups?.map(group => {
                    return <>
                        <section className="groupContainer">
                            <div className="groupHeader">
                                <h3>{`${group.name}`}</h3>
                                <h4>{`${group.description}`}</h4>
                            </div>
                            {
                                isUserMember(group.id)
                                    ? <>
                                        <button className="leaveButton"
                                            onClick={() => {
                                                (currentUser.id === group.admin.id)
                                                    ? window.alert("You cannot leave a group that you administrate.")
                                                    : leaveGroup(group.id).then(renderComponent)
                                            }}
                                        >Leave</button>
                                        <button className="viewButton"
                                            onClick={() => {
                                                history.push(`/groups/${group.id}`)
                                            }}>View</button>
                                    </>
                                    : (group.private) ?
                                        !(userRequestSent(group)) ?
                                            <button className="requestJoinButton"
                                                onClick={() => requestToJoin(group.id).then(renderComponent)}
                                            >Request to Join</button>
                                            : "Request Sent"
                                        : <button className="joinButton"
                                            onClick={() => joinGroup(group.id).then(renderComponent)}
                                        >Join</button>
                            }
                        </section>
                    </>
                })}
            </section>
        </>
    )
}