import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { ThemeProvider, createTheme } from '@mui/material/styles'
import QuoteWallLogo from '../QuoteWallLogo.png'

export const QuoteWall = () => {
    document.title = "QuoteWall"

    const theme = createTheme({
        palette: {
            primary: {
                main: '#343A40',
            },
            secondary: {
                main: '#ADB5BD'
            }
        }
    })

    return (
        <>
            <ThemeProvider theme={theme} >
                <h1 id="logo"><img src={QuoteWallLogo} alt="logo" width="max" height="max" /></h1>
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
            </ThemeProvider>
        </>
    )
}