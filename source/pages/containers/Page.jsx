import React from 'react'
import {
    Route,
    Switch,
} from 'react-router-dom';

import Header from '../../shared/components/Header'

import Home from './Home'
import Post from './Post'
import Profile from './Profile'
import Error404 from './Error404'

const Pages = () => (
    <main role="application">
        <Header />
        <Switch>
            {/* Lista de artículos */}
            <Route
                path="/"
                exact
                component={Home}
            />
            {/* Detalle de artículo */}
            <Route
                path="/post/:id"
                exact
                component={Post}
            />
            {/* Perfil de User */}
            <Route
                path="/user/:id"
                exact
                component={Profile}
            />
            {/* Error 404 */}
            <Route component={Error404} />
        </Switch>
    </main>
)

export default Pages