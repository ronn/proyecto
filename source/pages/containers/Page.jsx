import React from 'react'

import {
    Route,
    Switch,
} from 'react-router-dom';

import Home from './Home.jsx'
import Post from './Post.jsx'
import Profile from './Profile.jsx'
import Error404 from './Error404.jsx'

const Pages = () => (
    <main role="application">
        <Switch>
            {/*Lista de artículos*/}
            <Route
                path="/"
                exact
                component={Home}
            />
            {/*Detalle de artículo*/}
            <Route
                path="/post/:id"
                exact
                component={Post}
            />
            {/*Perfil de User*/}
            <Route
                path="/user/:id"
                exact
                component={Profile}
            />
            {/*Error 404*/}
            <Route component={Error404} />
        </Switch>
    </main>
)

export default Pages