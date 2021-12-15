import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { Button, TextField } from "@mui/material"
import "./Auth.css"

export const Register = () => {
    const username = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const history = useHistory()

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": username.current.value,
                "password": password.current.value,
            }

            return fetch("https://quotewall.herokuapp.com/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("quotewall_user", res.token)
                        history.push("/")
                    }
                })
        } else {
            window.alert("Passwords do not match")
        }
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h2 className="h3 mb-3 font-weight-normal">Register an account</h2>
                <fieldset>
                    <label htmlFor="inputUsername">Username</label>
                    <TextField variant="filled" inputRef={username} type="text" name="username" className="form-control" placeholder="Username" required autoFocus/>
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <TextField variant="filled" inputRef={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <TextField variant="filled" inputRef={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <Button color="secondary" variant="contained" className="btn btn-1 btn-sep icon-send" type="submit" onClick={handleRegister}>Register</Button>
                </fieldset>
            </form>
            <section className="link--register">
                Already registered? <Link className="link" to="/login">Login</Link>
            </section>
        </main>
    )
}