import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import "./Auth.css"
import { Button, TextField } from "@mui/material"


export const Login = () => {
    const username = useRef()
    const password = useRef()
    const history = useHistory()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch("https://quotewall.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: username.current.value,
                password: password.current.value
            })
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem("quotewall_user", res.token)
                    history.push("/")
                }
                else {
                    window.alert("Username or password incorrect.")
                }
            })
    }

    return (
        <main className="container--login">
            <section className="container--link">
                <form className="form--login" onSubmit={handleLogin}>
                    {/* <h1>Welcome to QuoteWall</h1> */}
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputUsername"> Username </label>
                        <TextField variant="filled" inputRef={username} type="text" id="username" className="form-control"  placeholder="Enter Username" required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <TextField variant="filled" inputRef={password} type="password" id="password" className="form-control" placeholder="Password" required />
                    </fieldset>
                    <fieldset style={{
                        textAlign: "center"
                    }}>
                        <Button color="secondary" variant="contained" className="btn btn-1 btn-sep icon-send" type="submit" >Sign In</Button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link className="link" to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}