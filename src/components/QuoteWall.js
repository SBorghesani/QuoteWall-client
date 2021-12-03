import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"

export const QuoteWall = () => {
    return (
    <>
        <Route render={() => {
            if (localStorage.getItem("quotewall_user")) {
                return <>
                    <NavBar />
                    <ApplicationViews />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={() => {
            return <Login />
        }} />

        <Route path="/register" render={() => {
            return <Register />
        }} />
    </>
    )
}