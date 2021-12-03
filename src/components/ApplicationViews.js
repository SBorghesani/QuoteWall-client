import React from "react"
import { Route } from "react-router-dom"
import { QuoteFeed } from "./quotes/QuoteFeed.js"

export const ApplicationViews = () => {
    return <>
        <main>
            <Route exact path="/">
                <QuoteFeed/>
            </Route>
        </main>
    </>
}