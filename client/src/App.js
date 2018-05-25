import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import SampleView from './components/SampleView'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to JAMS</h1>
        </header>

        <SampleView />
      </div>
    )
  }
}

export default App
