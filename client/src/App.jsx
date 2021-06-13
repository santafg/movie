import React from 'react'
import {BrowserRouter , Switch , Route} from 'react-router-dom'
import Home from './pages/Home'
import Add from './pages/Add'
import Update from './pages/Update'

const App = () => {
    return (
        <>
            <BrowserRouter>
            <Switch>
                <Route exact path='/'>
                    <Home/>
                </Route>
                <Route exact path='/add'>
                    <Add/>
                </Route>
                <Route exact path='/update/:id'>
                    <Update/>
                </Route>
            </Switch>
            </BrowserRouter>
        </>
    )
}

export default App
