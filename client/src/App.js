import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import SampleViewLayout from './components/SampleViewLayout'

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

        <SampleViewLayout samples={this.state.samples} />
      </div>
    )
  }
}

export default App
