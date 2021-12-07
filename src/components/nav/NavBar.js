import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const history = useHistory()

    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link" to="/"><img className="navbar__logo" alt="logo"/>Home</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/">All Posts</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/myfeed">My Feed</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/">Create Group</Link>
            </li>
            {
                (localStorage.getItem("quotewall_user") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("quotewall_user")
                                history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}