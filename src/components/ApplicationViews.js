import React from "react"
import { Route } from "react-router-dom"
import { QuoteFeed } from "./quotes/QuoteFeed.js"
import { GroupPage } from './groups/GroupPage.js'
import { QuoteForm } from "./quotes/QuoteForm.js"
import { GroupForm } from './groups/GroupForm.js'
import { GroupFeed } from './groups/GroupFeed.js'
import { EditQuote } from "./quotes/EditQuote.js"

export const ApplicationViews = () => {
    return <>
        <main>
            <Route exact path="/">
                <QuoteFeed/>
            </Route>
            <Route exact path="/myfeed">
                <QuoteFeed/>
            </Route>
            <Route exact path="/quotes/:quoteId(\d+)/edit">
                <EditQuote/>
            </Route>
            <Route exact path="/groups">
                <GroupFeed/>
            </Route>
            <Route exact path="/groups/:groupId(\d+)">
                <GroupPage/>
            </Route>
            <Route exact path="/groups/:groupId(\d+)/newquote">
                <QuoteForm/>
            </Route>
            <Route exact path="/groups/new">
                <GroupForm/>
            </Route>
        </main>
    </>
}