import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import {Link, Route} from 'react-router-dom'

import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Session from './components/Session'
import Admin from './components/Admin'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      samples: []
    }
  }

  componentDidMount () {
    fetch('http://localhost:3000/api/samples')
      .then(res => res.json())
      .then(samples => this.setState({samples}))
  }

  render () {
    return (
      <div>
        <div className='App'>
          <header className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <h1 className='App-title'>Welcome to JAMS !</h1>
          </header>
        </div>

        <div>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/dashboard'>Dashboard</Link>
            </li>
            <li>
              <Link to='/session'>Session</Link>
            </li>
            <li>
              <Link to='/admin'>Admin</Link>
            </li>
          </ul>

          <hr />

          <Route exact path='/' component={Home} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/session' component={Session} />
          <Route path='/admin' component={Admin} />
        </div>

      </div>
    )
  }
}

export default App
