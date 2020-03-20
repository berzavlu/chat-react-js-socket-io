// Dependencias necesarias de la APP
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

// Páginas
import Chat from './pages/chat'
import NotFound from './pages/404'

// Estilos de la APP
import '../assets/scss/main.scss'

const routes = (
  <BrowserRouter>
    <>
      <Switch>
        <Route path='/' component={Chat} />
        <Route component={NotFound} />
      </Switch>
    </>
  </BrowserRouter>
)

ReactDOM.render(routes, document.getElementById('app'))

module.hot.accept()
