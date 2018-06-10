import React from 'react'
import { Route } from 'react-router-dom'

import MainHeader from './components/MainHeader'

import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Session from './components/Session'
import AdminPage from './components/admin/AdminPage'

const App = () => (
  <div>
    <MainHeader />

    <Route exact path='/' component={Home} />
    <Route path='/dashboard' component={Dashboard} />
    <Route path='/session' component={Session} />
    <Route path='/admin' component={AdminPage} />

  </div>
)

export default App
